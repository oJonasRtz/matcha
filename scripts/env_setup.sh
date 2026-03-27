#!/bin/bash

GREEN='\033[32m'
RESET='\033[0m'

echo "Generating .env files..."

#secrets
DB_USER="user"
DB_PASSWORD=$(openssl rand -hex 32)
DB_NAME="mydb"
JWT_SECRET=$(openssl rand -hex 32)

#backend
cat > backend/.env << EOF
DB_HOST=database
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
JWT_SECRET=$JWT_SECRET
EOF

#frontend
cat > frontend/.env << EOF
EOF

#database
cat > database/.env << EOF
POSTGRES_USER=$DB_USER
POSTGRES_PASSWORD=$DB_PASSWORD
POSTGRES_DB=$DB_NAME
EOF

echo -e "${GREEN}.env files generated successfully.${RESET}"
