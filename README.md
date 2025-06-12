## 🛠️ Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Node.js and npm installed (for frontend)

---

### Clone and Run Backend

```bash
git clone https://github.com/Beost94/GolfStoreBackend.git
cd GolfStoreBackend
docker-compose up --build
```

This will start the following backend services:

- Spring Boot API: [http://localhost:8080](http://localhost:8080)
- PostgreSQL database (internal on port 5432)
- Keycloak server: [http://localhost:8180](http://localhost:8180)

---

### Clone and Run Frontend (React + Next.js)

```bash
git clone https://github.com/Dontoni98/golfstore.git
cd golfstore
npm install
npm run dev
```

The frontend will run at: [http://localhost:3000](http://localhost:3000)

Ensure the frontend environment variables are set correctly to connect with:

- Backend API: `http://localhost:8080`
- Keycloak: `http://localhost:8180`
