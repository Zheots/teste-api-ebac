pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Zheots/teste-api-ebac'
                bat 'npm install'
            }
        }
        stage('Pull ServeRest Image') {
            steps {
                bat 'docker pull paulogoncalvesbh/serverest:latest'
            }
        }
        stage('Start ServeRest') {
            steps {
                bat 'docker run -d -p 3000:3000 --name serve-rest paulogoncalvesbh/serverest:latest'
            }
        }
        stage('Test') {
            steps {
                bat '''set NO_COLOR=1
npx cypress run'''
            }
        }
        stage('Stop ServeRest') {
            steps {
                bat 'docker stop serve-rest || echo "No running container to stop"'
                bat 'docker rm serve-rest || echo "No container to remove"'
            }
        }
    }
}
