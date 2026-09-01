# Deployment Guide – HealthLink

## 1. Deployment Architecture

The application is deployed using Docker, Jenkins, Kubernetes, and Amazon EKS.

```text
Developer
   |
   v
GitHub
   |
   v
Jenkins
   |
   +--> Maven Build
   |
   +--> Docker Build
   |
   +--> Push Image to Docker Hub
   |
   v
Amazon EKS
   |
   +-------------------+
   |                   |
   v                   v
Frontend              Backend
Nginx                 Spring Boot
   |                   |
LoadBalancer        ClusterIP
   |                   |
   +------ API --------+
```

## 2. Docker

Two Docker images are used:

* `doctor-booking-backend`
* `doctor-booking-frontend`

The frontend image uses a multi-stage Docker build:

1. Build the React application using Node.js.
2. Serve the production build using Nginx.

## 3. Kubernetes

The application uses Kubernetes Deployments and Services.

### Backend

```text
Backend Deployment
       |
       +-- Backend Pod
       |
       +-- Backend Pod
       |
       v
Backend ClusterIP Service
```

The backend uses a `ClusterIP` service because it does not need to be directly exposed to the internet.

### Frontend

```text
Frontend Deployment
       |
       +-- Frontend Pod
       |
       +-- Frontend Pod
       |
       v
Frontend LoadBalancer
       |
    Internet
```

The frontend is exposed through an AWS LoadBalancer.

## 4. Nginx Reverse Proxy

Nginx serves the React application and forwards API requests to the Kubernetes backend service.

```text
Browser
   |
   v
Frontend LoadBalancer
   |
   v
Nginx
   |
   | /api/*
   v
doctor-booking-backend-service:8081
   |
   v
Spring Boot Backend
```

This means the frontend does not depend on the backend AWS LoadBalancer DNS.

The backend uses the internal Kubernetes service name:

```text
doctor-booking-backend-service:8081
```

This is more stable because the Kubernetes service name remains the same even when backend pods are recreated.

## 5. Jenkins CI/CD

The Jenkins pipeline automates application deployment.

Main stages:

```text
Checkout Code
      ↓
Build Backend
      ↓
Build Docker Image
      ↓
Push Image to Docker Hub
      ↓
Deploy Backend to EKS
      ↓
Build Frontend
      ↓
Push Frontend Image
      ↓
Deploy Frontend to EKS
```

Jenkins also waits for the Kubernetes rollout to complete.

Example:

```bash
kubectl rollout restart deployment doctor-booking-backend
kubectl rollout status deployment doctor-booking-backend

kubectl rollout restart deployment doctor-booking-frontend
kubectl rollout status deployment doctor-booking-frontend
```

## 6. EKS Verification

Check cluster nodes:

```bash
kubectl get nodes
```

Check application pods:

```bash
kubectl get pods
```

Check services:

```bash
kubectl get svc
```

Expected setup:

```text
Backend    → ClusterIP
Frontend   → LoadBalancer
```

## 7. Application Access

The frontend can be accessed using the AWS LoadBalancer DNS returned by:

```bash
kubectl get svc
```

The backend does not need a public DNS because Nginx communicates with it through the Kubernetes ClusterIP service.

## 8. Deployment Verification

After Jenkins finishes successfully:

```bash
kubectl get pods
```

All frontend and backend pods should show:

```text
READY 1/1
STATUS Running
```

The Jenkins pipeline should finish with:

```text
Finished: SUCCESS
```

## 9. Important Notes

* Route 53 is not required for this deployment.
* The backend does not need a public LoadBalancer.
* Frontend API requests are handled by Nginx.
* Kubernetes Service DNS is used for internal backend communication.
* Docker images are stored in Docker Hub.
* Jenkins automates the deployment process.

## 10. Future Production Improvements

For a larger production environment, the application could be improved with:

* Kubernetes Ingress
* HTTPS/TLS
* AWS RDS
* AWS Secrets Manager
* Prometheus and Grafana
* Centralized logging
* Horizontal Pod Autoscaling
* Separate development and production environments
