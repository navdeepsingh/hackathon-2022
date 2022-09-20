HOSTNAME="hackathon.falabella.com"
CERT_KEY=hackathon.falabella.com-key.pem
CERT_CRT=hackathon.falabella.com.pem

if ! brew list --formula | grep mkcert > /dev/null
then
  echo "installing mkcert ..."
  brew install mkcert
fi

if [[ ! -f "$CERT_KEY" || ! -f "$CERT_CRT" ]]
then
  echo "creating certificates ..."
  rm hackathon.falabella.com*.pem
  mkcert -install
  mkcert $HOSTNAME
fi

if ! grep $HOSTNAME /etc/hosts >> /dev/null
then
  echo "adding $HOSTNAME to /etc/hosts ..."
  sudo echo "127.0.0.1 $HOSTNAME" >> /etc/hosts
fi

echo "lifting docker container ..."
docker run --rm -it \
  --name ui-nginx \
  -v "$(pwd)/nginx.conf:/etc/nginx/nginx.conf" \
  -v "$(pwd)/hackathon.falabella.com.pem:/etc/nginx/certs/hackathon.falabella.com.pem" \
  -v "$(pwd)/hackathon.falabella.com-key.pem:/etc/nginx/certs/hackathon.falabella.com-key.pem" \
  -p 80:80 -p 443:443 nginx:alpine
