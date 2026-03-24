# matcha

## Stacks

### Frontend
- Next.js 16.2.1
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4 (with PostCSS)
- ESLint 9 (eslint-config-next)

The frontend runs on port 3000 inside its container and is served through Apache in production via reverse proxy.

### Backend
- Python 3.12 (`python:3.12-slim` image)
- Flask
- python-dotenv

The backend exposes the API on port 5000

### Infrastructure and Local Deployment
- Docker and Docker Compose
- Apache HTTP Server (`httpd:latest`) as the reverse proxy server
- Makefile for orchestration (`make up`, `make down`, `make clean`)

Request flow:
- `/api/*` -> Flask backend (`backend:5000`)
- All other routes -> Next.js frontend (`frontend:3000`)