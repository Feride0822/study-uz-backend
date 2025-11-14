const express = require('express');
const router = express.Router();
const db = require('../db');

// Create course
router.post('/', (req, res) => {
    const { program_id, name, code, credits, semester } = req.body;
    const sql = `INSERT INTO courses (program_id,name,code,credits,semester) VALUES (?,?,?,?,?)`;
    db.query(sql, [program_id, name, code, credits, semester], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Course added', id: result.insertId });
    });
});

// Get all courses
router.get('/', (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update course
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { program_id, name, code, credits, semester } = req.body;
    const sql = `UPDATE courses SET program_id=?, name=?, code=?, credits=?, semester=? WHERE course_id=?`;
    db.query(sql, [program_id, name, code, credits, semester, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Course updated' });
    });
});

// Delete course
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM courses WHERE course_id=?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Course deleted' });
    });
});

module.exports = router;
