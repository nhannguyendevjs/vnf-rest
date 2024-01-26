**SSL Scripting**

```bash
openssl req -new -x509 -days 365 -keyout server-ca-key.pem -out server-ca-crt.pem

openssl genrsa -out server-key.pem 4096

openssl req -new -sha256 -key server-key.pem -out server-csr.pem

openssl x509 -req -days 365 -in server-csr.pem -CA server-ca-crt.pem -CAkey server-ca-key.pem -CAcreateserial -out server-crt.pem

openssl verify -CAfile server-ca-crt.pem server-crt.pem
```
