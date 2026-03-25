# matcha

<h1 align="center">Stacks</h1>

<table align="center">
	<thead>
		<tr>
			<th>FRONTEND</th>
			<th>BACKEND</th>
			<th>INFRA</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td align="center">
				<img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=next.js"/>
				<img src="https://img.shields.io/badge/React-333?style=flat-square&logo=react"/>
				<img src="https://img.shields.io/badge/TypeScript-333?style=flat-square&logo=typescript"/>
				<img src="https://img.shields.io/badge/TailwindCSS-333?style=flat-square&logo=tailwindcss"/>
				<img src="https://img.shields.io/badge/ESLint-333?style=flat-square&logo=eslint"/>
			</td>
			<td align="center">
				<img src="https://img.shields.io/badge/Python-333?style=flat-square&logo=python"/>
				<img src="https://img.shields.io/badge/Flask-333?style=flat-square&logo=flask"/>
				<img src="https://img.shields.io/badge/PostgreSQL-333?style=flat-square&logo=postgresql"/>
			</td>
			<td align="center">
				<img src="https://img.shields.io/badge/Docker-333?style=flat-square&logo=docker"/>
				<img src="https://img.shields.io/badge/Docker%20Compose-333?style=flat-square&logo=docker"/>
				<img src="https://img.shields.io/badge/Apache-333?style=flat-square&logo=apache"/>
				<img src="https://img.shields.io/badge/Makefile-333?style=flat-square&logo=gnu-make"/>
			</td>
		</tr>
	</tbody>
</table>

## How to use

Get everything running with one command and access the app through HTTPS.

### 1. Prerequisites

- Docker and Docker Compose installed
- `make` available in your shell
- `.env` files created in both `backend/` and `frontend/`

### 2. Start the project

```bash
make
```

What this does:

- validates required `.env` files
- generates local TLS certificates
- builds images and starts all containers in detached mode

### 3. Open the app

- Frontend: `https://localhost`

Note: HTTP (`http://localhost`) is automatically redirected to HTTPS.

### 4. Useful commands

```bash
# stop containers
make down

# stop and remove volumes/orphans
make clean

# restart stack
make re

# full cleanup (including docker cache/volumes)
make fclean
```

### 5. Quick troubleshooting

- If startup fails with `.env file not found`, create missing `.env` in `backend/` and `frontend/`.
- If you see certificate warnings in browser, accept the local self-signed certificate for development.
- If port conflicts happen, free ports `80` and `443` before running `make`.
