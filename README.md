# 📝 Todo App with CI/CD

This is a simple full-stack **Todo App** built with:

- **Backend**: Node.js, Express, MongoDB (Atlas)
- **Frontend**: React (Vite)
- **Database**: MongoDB Atlas
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions → Docker Hub → EC2

---

## 🚀 Features
- Add, view, update, and delete todos (CRUD).
- REST API built with Express and Mongoose.
- React frontend styled with Tailwind.
- Persistent storage using MongoDB Atlas.
- Deployed on AWS EC2 via Docker Compose.
- Automated build & deploy with GitHub Actions.

---

## 📂 Project Structure
```
.
├── todo-backend/ # Express + MongoDB backend
│ ├── src/
│ ├── tests/
│ └── Dockerfile
├── todo-frontend/ # React (Vite) frontend
│ ├── src/
│ └── Dockerfile
├── docker-compose.yml # Service definitions
└── .github/workflows/ci-cd.yml # CI/CD pipeline
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- MongoDB Atlas account

### Run locally (without Docker)
```bash
# Backend
cd todo-backend
npm install
npm run dev

# Frontend
cd todo-frontend
npm install
npm run dev
```

Backend runs on http://localhost:5000, frontend on http://localhost:3000.

### Run with Docker Compose
```bash
docker-compose up --build
```


Frontend → http://localhost:80

Backend → http://localhost:5000

### 🌐 Deployment (AWS EC2)
1. Install Docker & Docker Compose on EC2.
2. Copy docker-compose.yml to EC2.
3. Run:
    ```bash
    docker-compose up -d
    ```
4. Access the app via EC2 public IP: http://<EC2_PUBLIC_IP>/.

### ⚡ CI/CD Pipeline
* On every push to main:
    1. Build backend & frontend Docker images.
    2. Push images to Docker Hub.
    3. SSH into EC2 & run docker-compose pull && docker-compose up -d.

* Secrets required in GitHub:
    - DOCKER_HUB_USERNAME
    - DOCKER_HUB_TOKEN
    - EC2_HOST
    - EC2_SSH_KEY
