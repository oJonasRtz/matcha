#!/bin/bash

GREEN='\033[32m'
RESET='\033[0m'

echo "Generating .env files..."

API_KEY=$(openssl rand -hex 32)

#backend
if [ ! -f "backend/.env" ]; then
  cat > backend/.env << EOF
API_KEY=$API_KEY
EOF
fi

#frontend
if [ ! -f "frontend/.env" ]; then
	cat > frontend/.env << EOF
VITE_API_KEY=$API_KEY
EOF
fi

echo -e "${GREEN}.env files generated successfully.${RESET}"