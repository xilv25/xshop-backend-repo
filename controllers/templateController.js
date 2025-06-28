// controllers/templateController.js
const db = require('../db'); // Path ini benar karena db.js ada di root

// Mendapatkan semua template
exports.getAllTemplates = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM templates ORDER BY template_id ASC');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching templates (from templateController.js):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve templates due to server error',
            error: error.message
        });
    }
};

// (Opsional) Mendapatkan template berdasarkan ID
exports.getTemplateById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM templates WHERE template_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error(`Error fetching template with ID ${id}:`, error);
        res.status(500).json({ success: false, message: 'Failed to retrieve template', error: error.message });
    }
};

// (Opsional) Menambahkan template baru (khusus Admin)
exports.createTemplate = async (req, res) => {
    const { nama_template, deskripsi, harga, preview_image_url, theme_category } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO templates(nama_template, deskripsi, harga, preview_image_url, theme_category) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [nama_template, deskripsi, harga, preview_image_url, theme_category]
        );
        res.status(201).json({ success: true, message: 'Template created successfully', data: result.rows[0] });
    } catch (error) {
        console.error('Error creating template:', error);
        res.status(500).json({ success: false, message: 'Failed to create template', error: error.message });
    }
};
