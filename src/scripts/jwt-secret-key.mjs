import crypto from 'node:crypto';

console.log(crypto.randomBytes(256).toString('hex'));
