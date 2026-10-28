import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Contact Form & EmailJS Integration", () => {
  const contactFilePath = path.resolve(
    process.cwd(),
    "src/Components/Sections/Contact.jsx"
  );
  const contactSource = fs.readFileSync(contactFilePath, "utf-8");

  it("ensures form inputs use consistent names: 'name', 'email', and 'message'", () => {
    // Verify name attributes in JSX
    assert.match(
      contactSource,
      /name="name"/,
      "Input field for sender name must have name=\"name\""
    );
    assert.match(
      contactSource,
      /name="email"/,
      "Input field for sender email must have name=\"email\""
    );
    assert.match(
      contactSource,
      /name="message"/,
      "Textarea for message content must have name=\"message\""
    );
  });

  it("ensures input controls use readOnly instead of disabled during processing so FormData includes all fields", () => {
    // If inputs are disabled during submission, new FormData(form) excludes them per HTML spec,
    // resulting in an empty email body and missing sender info in EmailJS.
    assert.equal(
      contactSource.includes('id="name"\n                      name="name"\n                      required\n                      value={formData.name}\n                      onChange={(e) =>\n                        setFormData({ ...formData, name: e.target.value })\n                      }\n                      placeholder="e.g. Alex Morgan"\n                      disabled={isProcessing}'),
      false,
      "Name input must not be disabled during processing; use readOnly to allow FormData serialization"
    );

    assert.match(
      contactSource,
      /<input[\s\S]*?id="name"[\s\S]*?readOnly={isProcessing}[\s\S]*?\/>/,
      "Name input must use readOnly={isProcessing}"
    );

    assert.match(
      contactSource,
      /<input[\s\S]*?id="email"[\s\S]*?readOnly={isProcessing}[\s\S]*?\/>/,
      "Email input must use readOnly={isProcessing}"
    );

    assert.match(
      contactSource,
      /<textarea[\s\S]*?id="message"[\s\S]*?readOnly={isProcessing}[\s\S]*?\/>/,
      "Message textarea must use readOnly={isProcessing}"
    );
  });

  it("ensures the submit button retains disabled={isProcessing} to prevent double-dispatch", () => {
    assert.match(
      contactSource,
      /<button[^>]*type="submit"[^>]*disabled={isProcessing}/,
      "Submit button must be disabled while processing to prevent multiple dispatches"
    );
  });

  it("ensures emailjs.sendForm is called with serviceId, templateId, formRef.current, and publicKey", () => {
    // Verify presence of formRef on form element
    assert.match(
      contactSource,
      /<form[^>]*ref={formRef}/,
      "Form must be attached with ref={formRef}"
    );

    // Verify emailjs.sendForm invocation structure
    assert.match(
      contactSource,
      /emailjs\s*\.\s*sendForm\s*\(\s*serviceId\s*,\s*templateId\s*,\s*formRef\.current\s*,\s*publicKey\s*\)/,
      "emailjs.sendForm must pass serviceId, templateId, formRef.current, and publicKey"
    );
  });

  it("preserves Abstract API validation before attempting EmailJS submission", () => {
    const verifyIndex = contactSource.indexOf("fetch(verifyUrl");
    const sendFormIndex = contactSource.indexOf("emailjs.sendForm");

    assert.ok(
      verifyIndex !== -1,
      "Verification fetch call must exist"
    );
    assert.ok(
      sendFormIndex !== -1,
      "EmailJS sendForm call must exist"
    );
    assert.ok(
      verifyIndex < sendFormIndex,
      "Email verification must precede EmailJS submission in the flow"
    );
  });

  it("preserves configuration verification checks before invoking EmailJS", () => {
    assert.match(
      contactSource,
      /if\s*\(\s*!serviceId\s*\|\|\s*!templateId\s*\|\|\s*!publicKey\s*\)/,
      "Contact form must verify that EmailJS environment configuration is present"
    );
  });
});
