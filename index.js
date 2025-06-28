// index.js (file utama backend)
const express = require('express');
const cors = require('cors'); // PENTING untuk komunikasi frontend-backend
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Mengizinkan Express membaca JSON dari body request
app.use(express.urlencoded({ extended: true })); // Untuk parsing URL-encoded data

// --- Konfigurasi CORS Paling Terbuka untuk Pengembangan ---
// Pastikan ini ada di atas semua rute
app.use(cors()); // Ini mengizinkan semua origin. Aman untuk development.
                 // Di PRODUKSI, Anda harus membatasi origin ke frontend Anda saja:
                 // app.use(cors({ origin: 'https://URL-PUBLIK-FRONTEND-ANDA.replit.dev' }));

// Import Routes
const templateRoutes = require('./routes/templates'); // Path ini benar

// Definisikan Routes
app.use('/api/templates', templateRoutes);
// TODO: Anda akan menambahkan rute lainnya di sini nanti, seperti untuk orders, payment confirmations

// Route dasar untuk testing
app.get('/', (req, res) => {
    res.send('Welcome to Xshop Backend API!');
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Xshop Backend running on port ${PORT}`);
    console.log(`Access at http://localhost:${PORT} (internal Replit port)`);
    console.log(`Public URL: ${process.env.REPL_URL || 'Check Webview tab'}`); // Replit memberikan env var REPL_URL
});