const express = require('express');
const router = express.Router();
const db = require('../db');

// --- Create student ---
router.post('/', (req, res) => {
    const { first_name, last_name, email, dob, uni_id, faculty_id, program_id, enrollment_year } = req.body;
    const sql = `INSERT INTO students 
                 (first_name,last_name,email,dob,uni_id,faculty_id,program_id,enrollment_year)
                 VALUES (?,?,?,?,?,?,?,?)`;
    db.query(sql, [first_name, last_name, email, dob, uni_id, faculty_id, program_id, enrollment_year], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Student added', id: result.insertId });
        });
});

// --- Read all students ---
router.get('/', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- Read single student ---
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM students WHERE student_id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// --- Update student ---
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, dob, uni_id, faculty_id, program_id, enrollment_year } = req.body;
    const sql = `UPDATE students SET first_name=?, last_name=?, email=?, dob=?, uni_id=?, faculty_id=?, program_id=?, enrollment_year=? 
                 WHERE student_id=?`;
    db.query(sql, [first_name, last_name, email, dob, uni_id, faculty_id, program_id, enrollment_year, id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Student updated' });
        });
});

// --- Delete student ---
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE student_id=?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student deleted' });
    });
});

module.exports = router;
