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

# install mkcert if not installed
if ! command -v mkcert &> /dev/null; then
    echo "mkcert not found, installing..."
    curl -L -o /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
    chmod +x /usr/local/bin/mkcert
else
    echo "mkcert already installed."
fi

# install the local authority if it doesn't exist
mkcert -install

# generate the certificate and key
mkcert -key-file "$KEY" -cert-file "$CERT" localhost 127.0.0.1 ::1


echo "✅ Certificate generated:"
echo " - $CERT"
echo " - $KEY"
