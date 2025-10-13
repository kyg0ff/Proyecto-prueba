// server.js (en la raíz del proyecto)

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = path.join(__dirname, 'backend', 'interfaces');

const server = http.createServer((req, res) => {
    let filePath = path.join(BASE_DIR, 'paginaprincipal.html');
    let contentType = 'text/html';

    // 1. Manejar la ruta del CSS
    if (req.url === '/styles.css') {
        filePath = path.join(BASE_DIR, 'styles.css');
        contentType = 'text/css';
    } 
    // Si necesitas el script.js para el cliente:
    else if (req.url === '/script.js') {
        // Asumiendo que el script.js de la interfaz está en /backend/interfaces/
        filePath = path.join(BASE_DIR, 'script.js'); 
        contentType = 'text/javascript';
    } 
    // 2. Manejar la ruta raíz (el HTML principal)
    else if (req.url !== '/' && req.url !== '/paginaprincipal.html') {
         // Si se pide otra cosa, devolvemos 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }

    // 3. Leer y servir el archivo
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Este error puede ser un archivo no encontrado, pero lo gestionamos para evitar crashes
            res.writeHead(500);
            res.end(`Error al cargar el archivo: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n\n🟢 Servidor iniciado en: http://localhost:${PORT}`);
    console.log(`Puedes abrir la interfaz principal en el navegador.\n`);
});