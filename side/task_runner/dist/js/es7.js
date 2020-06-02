'use strict'
import { a, b, c as e } from '/src/js/es6.js';
console.log(a, b, e); 

import * as obj from '/src/js/es6.js';
console.log(obj);

// let type = require('/src/js/es6.js'); // require is api of commonJS
// https://blueshw.github.io/2017/05/16/ES-require-vs-import/