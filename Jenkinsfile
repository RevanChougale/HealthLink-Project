pipeline {
    agent any

    tools {
        maven 'Maven3'
    }

    stages {

        stage('Git-Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/RevanChougale/HealthLink-Project.git'
            }
        }

        stage('Maven-Build') {
            steps {
                sh '''
                    cd doctor-booking/doctor-booking
                    mvn clean package -DskipTests
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                    docker build \
                    -t revan02/doctor-booking-backend:latest \
                    -f doctor-booking/Dockerfile .
                '''
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh '''
                    docker build \
                    -t revan02/doctor-booking-frontend:latest \
                    -f frontend/Dockerfile frontend
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                    docker push revan02/doctor-booking-backend:latest
                    docker push revan02/doctor-booking-frontend:latest
                '''
            }
        }

        stage('Deploy Backend to EKS') {
            steps {
                sh '''
                    kubectl rollout restart deployment doctor-booking-backend
                    kubectl rollout status deployment doctor-booking-backend
                '''
            }
        }

        stage('Deploy Frontend to EKS') {
            steps {
                sh '''
                    kubectl rollout restart deployment doctor-booking-frontend
                    kubectl rollout status deployment doctor-booking-frontend
                '''
            }
        }
    }
}
