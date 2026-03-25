#!/bin/bash

GREEN='\033[32m'
RESET='\033[0m'

echo "Generating .env files..."

#secrets
API_KEY=$(openssl rand -hex 32)
DB_USER="user"
DB_PASSWORD=$(openssl rand -hex 32)
DB_NAME="mydb"

#backend
cat > backend/.env << EOF
API_KEY=$API_KEY
DB_HOST=database
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
EOF

#frontend
cat > frontend/.env << EOF
API_KEY=$API_KEY
EOF

#database
cat > database/.env << EOF
POSTGRES_USER=$DB_USER
POSTGRES_PASSWORD=$DB_PASSWORD
POSTGRES_DB=$DB_NAME
EOF

echo -e "${GREEN}.env files generated successfully.${RESET}"