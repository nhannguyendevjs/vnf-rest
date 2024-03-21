'use strict';

import crypto from 'node:crypto';

console.log(crypto.randomBytes(16).toString('hex'));
