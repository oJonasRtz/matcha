#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CERT="server/certificates/server.cert"
KEY="server/certificates/server.key"

if [[ -f "$CERT" && -f "$KEY" ]]; then
    echo -e "${GREEN}Certificate and key already exist. Skipping generation.${RESET}"
    exit 0
fi

mkdir -p server/certificates

# generate self-signed certificate and key
openssl req -x509 -newkey rsa:4096 -keyout "$KEY" -out "$CERT" -days 365 -nodes -subj "/CN=localhost"


echo "✅ Certificate generated:"
echo " - $CERT"
echo " - $KEY"
