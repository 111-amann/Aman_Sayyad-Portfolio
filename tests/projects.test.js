import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projects, projectCategories } from "../src/data/projectsData.js";

describe("Projects Data & Home Showcase Integrity", () => {
  it("maintains the full project catalog without data loss", () => {
    assert.equal(projects.length, 9, "All 9 projects must be present in projectsData");
  });

  it("exports valid project categories", () => {
    assert.deepEqual(projectCategories, [
      "All",
      "Full Stack",
      "Frontend",
      "API / Utility",
    ]);
  });

  it("verifies the 3 premier projects selected for home page display", () => {
    const featuredHomeProjectIds = ["talentiq", "popcornhub", "refokus"];
    const homeProjects = featuredHomeProjectIds.map((id) =>
      projects.find((p) => p.id === id)
    );

    // Exactly 3 projects
    assert.equal(homeProjects.length, 3);
    assert.equal(homeProjects.every(Boolean), true);

    // Check project 1: Talent IQ (Full Stack, WebRTC, Monaco Editor)
    const talentIq = homeProjects[0];
    assert.equal(talentIq.id, "talentiq");
    assert.equal(talentIq.category, "Full Stack");
    assert.match(talentIq.live, /^https?:\/\//);

    // Check project 2: Popcornhub (Modern Frontend, Redux Toolkit, TMDB API)
    const popcornhub = homeProjects[1];
    assert.equal(popcornhub.id, "popcornhub");
    assert.equal(popcornhub.category, "Frontend");
    assert.match(popcornhub.live, /^https?:\/\//);

    // Check project 3: Refokus (Advanced Motion, Framer Motion, Locomotive Scroll)
    const refokus = homeProjects[2];
    assert.equal(refokus.id, "refokus");
    assert.equal(refokus.category, "Frontend");
    assert.match(refokus.live, /^https?:\/\//);
  });

  it("ensures every project has required fields and unique IDs", () => {
    const ids = new Set();
    for (const project of projects) {
      assert.ok(project.id, `Project must have an id`);
      assert.ok(project.title, `Project ${project.id} must have a title`);
      assert.ok(project.category, `Project ${project.id} must have a category`);
      assert.ok(project.description, `Project ${project.id} must have a description`);
      assert.ok(Array.isArray(project.tech) && project.tech.length > 0, `Project ${project.id} must have tech array`);
      assert.ok(project.github, `Project ${project.id} must have a github link`);
      assert.equal(ids.has(project.id), false, `Duplicate project id: ${project.id}`);
      ids.add(project.id);
    }
  });
});
