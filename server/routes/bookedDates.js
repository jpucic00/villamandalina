import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/booked-dates - Public: Get all blocked dates
router.get('/', async (req, res) => {
  try {
    const result = await req.db.execute(
      'SELECT id, start_date as startDate, end_date as endDate FROM booked_dates ORDER BY start_date'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/booked-dates - Admin only: Block dates
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const result = await req.db.execute({
      sql: 'INSERT INTO booked_dates (start_date, end_date) VALUES (?, ?)',
      args: [startDate, endDate]
    });

    res.status(201).json({
      id: Number(result.lastInsertRowid),
      startDate,
      endDate
    });
  } catch (error) {
    console.error('Error creating booked date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/booked-dates/:id - Admin only: Remove blocked dates
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await req.db.execute({
      sql: 'DELETE FROM booked_dates WHERE id = ?',
      args: [parseInt(id)]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Booked date not found' });
    }

    res.json({ message: 'Booked date removed successfully' });
  } catch (error) {
    console.error('Error deleting booked date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
