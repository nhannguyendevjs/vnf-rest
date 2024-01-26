**RUN UBUNTU IMAGE**

```bash
docker run --name ntgvn-ubuntu --network ntgvn-network -p 80:8080 -p 443:8443 -p 22:22 -itd ubuntu:latest
```

**ENTER INTO UBUNTU CONTAINER**

```bash
docker exec -it ntgvn-ubuntu bash
```

**PACKAGES**

```bash
apt update
apt install curl nano net-tools tree neofetch iputils-ping systemctl -y
```

**NODEJS**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

--> restart

```bash
nvm install --lts
```

**NGINX**

```bash
apt install nginx -y
nano /etc/nginx/nginx.conf
```

```txt
...
server {
    listen 8080;
    listen [::]:8080;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    server_name localhost www.localhost;

    location / {
        try_files $uri $uri/ =404;
    }
}
...
```

```bash
systemctl enable nginx
service nginx stop
service nginx start
```
