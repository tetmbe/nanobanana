const fs = require('fs');
const path = require('path');

const apiKey = process.env.APIMART_API_KEY || '%APIMART_API_KEY%';

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/%APIMART_API_KEY%/g, apiKey);

fs.writeFileSync(htmlPath, html);

console.log('Environment variables replaced successfully');
