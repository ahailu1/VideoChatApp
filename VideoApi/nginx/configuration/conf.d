server {
listen 80;
server_name localhost;
root /var/www;

location / {

proxy_pass http://host.docker.internal:3000;

}

location /profile {
    root /srv;
}

location http://host.docker.internal:5001 {
    proxy_pass http://host.docker.internal:3000;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_pass http://socket_nodes;
}

}