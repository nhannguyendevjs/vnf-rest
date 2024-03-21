import crypto from 'node:crypto';

const algorithm = 'aes-256-ctr';
const secretKey = '3cab543a844956f13dda3b4a8df2492a';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    success: true,
    data: {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    },
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return {
    success: true,
    data: decrypted.toString(),
  };
};

export { encrypt, decrypt };
