# HealthLink – Doctor Booking Application

A full-stack Doctor Booking application built with **React, Spring Boot, MySQL, Docker, Kubernetes, and Jenkins CI/CD**.

## 🚀 Features

* Patient registration and login
* JWT-based authentication
* Role-based access: Patient, Doctor, Admin
* Search doctors by city and specialization
* View doctor details
* View available appointment slots
* Book appointments
* Cancel appointments
* View patient appointments
* REST APIs
* Swagger API documentation
* Containerized using Docker
* Deployed on Amazon EKS
* Automated deployment using Jenkins

## 🛠️ Technology Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* MySQL
* Apache Kafka
* Redis
* Swagger / OpenAPI

### Frontend

* React
* JavaScript
* Axios
* React Router
* Vite
* Nginx

### DevOps / Cloud

* Git & GitHub
* Maven
* Docker
* Docker Hub
* Jenkins
* Kubernetes
* Amazon EKS
* AWS LoadBalancer

## 🏗️ Architecture

```text
                         GitHub
                           |
                           v
                        Jenkins
                           |
                    Build & Test
                           |
                    Docker Images
                           |
                           v
                       Docker Hub
                           |
                           v
                    Amazon EKS
                    /          \
                   /            \
                  v              v
          Frontend Pods      Backend Pods
             Nginx              Spring Boot
                |                  |
                |                  |
                +------ API -------+
                       |
                Backend ClusterIP
                       |
                     MySQL
```

## 📁 Project Structure

```text
HealthLink-Project/
│
├── doctor-booking/
│   ├── doctor-booking/
│   ├── Dockerfile
│   ├── backend-deployment.yaml
│   └── backend-service.yaml
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
│
├── Jenkinsfile
└── README.md
```

## 🔄 CI/CD Pipeline

The Jenkins pipeline performs the following steps:

```text
Developer pushes code
        ↓
      GitHub
        ↓
      Jenkins
        ↓
   Maven Build
        ↓
 Docker Image Build
        ↓
 Push to Docker Hub
        ↓
 Deploy to Amazon EKS
        ↓
 Kubernetes Rollout
        ↓
 Application Updated
```

## 🐳 Docker

Separate Docker images are used for the backend and frontend.

### Backend

The Spring Boot application is packaged into a Docker image and deployed as Kubernetes pods.

### Frontend

The React application is built and served using Nginx.

Nginx also forwards `/api` requests to the Kubernetes backend service.

This avoids depending on a changing AWS backend LoadBalancer DNS.

## ☸️ Kubernetes

The application uses Kubernetes Deployments and Services.

### Backend

```text
Deployment
    ↓
2 Backend Pods
    ↓
ClusterIP Service
```

### Frontend

```text
Deployment
    ↓
2 Frontend Pods
    ↓
LoadBalancer Service
    ↓
Internet
```

## 🌐 Nginx

Nginx serves the React production build and forwards API requests:

```text
Browser
   ↓
Frontend LoadBalancer
   ↓
Nginx
   ↓
/api/*
   ↓
doctor-booking-backend-service:8081
   ↓
Spring Boot Backend
```

## ☁️ AWS EKS Deployment

The application is deployed on Amazon EKS with:

* 2 worker nodes
* 2 backend replicas
* 2 frontend replicas
* Backend ClusterIP service
* Frontend LoadBalancer service

## 🔐 Security

* JWT authentication
* Spring Security
* Password encryption using BCrypt
* Role-based authorization
* CORS configuration
* Stateless authentication

## 📌 Future Improvements

* HTTPS using a proper domain
* AWS RDS for production database
* Centralized logging
* Prometheus and Grafana monitoring
* Kubernetes Ingress
* Horizontal Pod Autoscaling
* Secrets management

## 👨‍💻 Author

**Revan Chougale**

Software Engineer | Java | Spring Boot | Microservices | DevOps

---
