pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Configure Git') {
            steps {
                bat 'git config --global user.email "aman@example.com"'
                bat 'git config --global user.name "Aman Jenkins"'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                bat 'npm run deploy'
            }
        }

    }
}