# Certificate Generation Project

## Overview

This is a full-stack certificate generation project built using:

- **Backend:** NestJS with PostgreSQL
- **Frontend:** Next.js (15.2.1) with MUI (Material-UI)
- **Docker:** Docker Compose integration (though the backend has an issue with Puppeteer)
- **Additional Features:**
  - Multi-step form with navigation
  - File upload with preview for the certificate logo
  - HTML content input for the certificate body
  - Responsive certificate view
  - Swagger API documentation
  - Full data validation
  - Unit tests for both frontend and backend

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- PostgreSQL
- Docker (optional but has issues with Puppeteer)

### Backend Setup (NestJS)

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and update values accordingly.
4. Start the backend server:
   ```sh
   npm run start:dev
   ```
5. Access API documentation at:
   ```
   http://localhost:3001/api-doc
   ```

### Frontend Setup (Next.js)

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```
4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Docker Setup (Optional but Not Recommended)

While Docker Compose is configured for this project, the **backend has issues with Puppeteer**, causing it to fail. Running the project without Docker is advised.

To attempt running with Docker:

```sh
   docker-compose up --build
```

If Puppeteer issues arise, consider running the backend and frontend separately as mentioned above.

## API Documentation

The backend is fully documented with Swagger.

- Visit: `http://localhost:3001/api-doc`

## Troubleshooting

- **Backend not starting in Docker?** Puppeteer dependencies might be missing or failing in a containerized environment.
- **Database connection issues?** Ensure PostgreSQL is running and `.env` is correctly configured.
- **Frontend issues?** Delete `.next` folder and restart the server:
  ```sh
  rm -rf .next && npm run dev
  ```

## Future Improvements

- Fix Puppeteer issues in Docker
- Improve styling and UI animations
- Implement advanced certificate customization

---

