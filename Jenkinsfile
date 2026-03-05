pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Configure Git') {
            steps {
                bat 'git config --global user.email "111-amann@users.noreply.github.com"'
                bat 'git config --global user.name "Aman CI"'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                bat 'npm run deploy'
            }
        }

    }
}