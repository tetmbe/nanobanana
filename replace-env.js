const fs = require('fs');
const path = require('path');

// 读取 .env 文件
const envPath = path.join(__dirname, '.env');
let apiKey = '%APIMART_API_KEY%';

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/APIMART_API_KEY\s*=\s*(.+)/);
    if (match) {
        apiKey = match[1].trim();
    }
}

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/%APIMART_API_KEY%/g, apiKey);

fs.writeFileSync(htmlPath, html);

console.log('Environment variables replaced successfully');
