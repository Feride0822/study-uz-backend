const express = require('express');
const router = express.Router();
const db = require('../db');

// Create enrollment
router.post('/', (req, res) => {
    const { student_id, course_id, enrollment_date, grade } = req.body;
    const sql = `INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES (?,?,?,?)`;
    db.query(sql, [student_id, course_id, enrollment_date, grade], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Enrollment added', id: result.insertId });
    });
});

// Get all enrollments
router.get('/', (req, res) => {
    db.query('SELECT * FROM enrollments', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update enrollment
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { student_id, course_id, enrollment_date, grade } = req.body;
    const sql = `UPDATE enrollments SET student_id=?, course_id=?, enrollment_date=?, grade=? WHERE enrollment_id=?`;
    db.query(sql, [student_id, course_id, enrollment_date, grade, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Enrollment updated' });
    });
});

// Delete enrollment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM enrollments WHERE enrollment_id=?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Enrollment deleted' });
    });
});

module.exports = router;
