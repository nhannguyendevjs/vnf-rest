**Use 'localhost' for the 'Common name'**

```bash
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt
```

**Add the cert to your key chain**

```bash
open localhost.crt
```
