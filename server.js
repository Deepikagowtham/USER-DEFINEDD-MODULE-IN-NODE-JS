// server.js

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const calculator = require('./calculator');

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end(`
                <!DOCTYPE html>
            <html>
            <head>
                <title>404 Not Found</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        text-align: center;
                        margin-top: 100px;
                    }
                    h1 {
                        color: blue;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>404 Not Found</h1>
                    <p>Oops! The page you are looking for cannot be found.</p>
                    <img src="https://i.pinimg.com/564x/d2/21/fc/d221fc6c9f74bd3dda13cdec024fcbac.jpg" alt="img1" width="400" height="300">
                </div>
            </body>
            </html>
                `);
            } 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else if (pathname === '/calculate' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            const formData = qs.parse(body);
            const num1 = parseInt(formData.num1);
            const num2 = parseInt(formData.num2);
            const operation = formData.operation;
            let result;
            switch (operation) {
                case 'add':
                    result = calculator.add(num1, num2);
                    break;
                case 'subtract':
                    result = calculator.subtract(num1, num2);
                    break;
                case 'multiply':
                    result = calculator.multiply(num1, num2);
                    break;
                case 'divide':
                    result = calculator.divide(num1, num2);
                    break;
                case 'modulus':
                    result = calculator.modulus(num1, num2);
                    break;
                case 'square':
                    result = calculator.square(num1);
                    break;
                case 'cube':
                    result = calculator.cube(num1);
                    break;
                case 'power':
                    result = calculator.power(num1, num2);
                    break;
                case 'factorial':
                    result = calculator.factorial(num1);
                    break;
                default:
                    result = "Invalid operation";
            }
            // Send the result back as plain text
            const resultHTML = `<h1 style="color: #0c2ae; font-size: 60px; text-align: center; text-shadow: 2px 2px 4px #00FFFF;">Result: ${result}</h1>`;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(resultHTML);
            return res.end(`
            <div style="text-align: center;">
            <img src="https://i.pinimg.com/564x/67/35/88/673588ec9e345419b207930cab49ffa0.jpg" alt="success" width=800 height=700>
            </div>
            `);
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`
        <!DOCTYPE html>
            <html>
            <head>
                <title>404 Not Found</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        text-align: center;
                        margin-top: 100px;
                    }
                    h1 {
                        color: blue;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>404 Not Found</h1>
                    <p>Oops! The page you are looking for cannot be found.</p>
                    <img src="https://i.pinimg.com/564x/d2/21/fc/d221fc6c9f74bd3dda13cdec024fcbac.jpg" alt="img1" width="400" height="300">
                </div>
            </body>
            </html>
        `);
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
