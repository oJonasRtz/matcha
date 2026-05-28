#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CERT="server/certificates/server.cert"
KEY="server/certificates/server.key"

needs_regen=true

if [[ -f "$CERT" && -f "$KEY" ]]; then
    if openssl x509 -in "$CERT" -noout -ext subjectAltName 2>/dev/null | grep -q "DNS:localhost"; then
        needs_regen=false
    fi
fi

if [[ "$needs_regen" == false ]]; then
    echo "Certificate and key already exist with SAN localhost. Skipping generation."
    exit 0
fi

mkdir -p server/certificates

cat > /tmp/local-ssl.cnf <<'EOF'
[req]
default_bits = 4096
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[dn]
CN = localhost

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = host.docker.internal
IP.1 = 127.0.0.1
IP.2 = ::1
EOF

# generate self-signed certificate and key
openssl req -x509 -newkey rsa:4096 -keyout "$KEY" -out "$CERT" -days 365 -nodes -config /tmp/local-ssl.cnf -extensions req_ext

rm -f /tmp/local-ssl.cnf


echo "✅ Certificate generated:"
echo " - $CERT"
echo " - $KEY"
