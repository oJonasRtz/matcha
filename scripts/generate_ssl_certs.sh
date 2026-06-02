#!/bin/bash
set -e

CERT="server/certificates/server.cert"
KEY="server/certificates/server.key"

# Install mkcert if not present
if ! command -v mkcert &> /dev/null; then
    echo "mkcert not found, installing..."
    curl -L -o /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
    chmod +x /usr/local/bin/mkcert
else
    echo "mkcert is already installed."
fi

# Install the local CA if not already installed
mkcert -install

# Gen certificates for localhost
mkcert -key-file "$KEY" -cert-file "$CERT" localhost 127.0.0.1 ::1

# define permissions 
chmod 700 server/certificates
chmod 600 server/certificates/server.key
chmod 644 server/certificates/server.cert


echo "✅ Certificate generated:"
echo " - $CERT"
echo " - $KEY"
