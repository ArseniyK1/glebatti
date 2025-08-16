FROM node:20-alpine AS builder
WORKDIR /app
COPY front/package*.json ./
RUN npm i
COPY front/ ./
RUN npm run build

FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/spa ./
COPY front/public/favicon.ico /usr/share/nginx/html/favicon.ico

# Basic nginx config with API proxy
RUN printf '%s\n' \
  'server {' \
  '  listen 80;' \
  '  server_name _;' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '  gzip on;' \
  '  gzip_types text/plain application/javascript application/json text/css application/octet-stream;' \
  '  location /api/ {' \
  '    proxy_http_version 1.1;' \
  '    proxy_set_header Host $host;' \
  '    proxy_set_header X-Real-IP $remote_addr;' \
  '    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' \
  '    proxy_set_header X-Forwarded-Proto $scheme;' \
  '    proxy_pass http://back:7000/api/;' \
  '  }' \
  '  location /uploads/ {' \
  '    proxy_set_header Host $host;' \
  '    proxy_pass http://back:7000/uploads/;' \
  '  }' \
  '  location / {' \
  '    try_files $uri $uri/ /index.html;' \
  '  }' \
  '}' > /etc/nginx/conf.d/default.conf

EXPOSE 80


