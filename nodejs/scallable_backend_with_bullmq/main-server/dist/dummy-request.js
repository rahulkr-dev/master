"use strict";
const axios = require('axios');
for (let i = 0; i < 1000; i++) {
    axios.post('http://localhost:3000/add');
}
