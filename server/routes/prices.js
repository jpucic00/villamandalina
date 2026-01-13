import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/prices - Public: Get all prices
router.get('/', async (req, res) => {
  try {
    const result = await req.db.execute(
      'SELECT id, start_date as startDate, end_date as endDate, price FROM prices ORDER BY start_date'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/prices - Admin only: Add a price range
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, price } = req.body;

    if (!startDate || !endDate || !price) {
      return res.status(400).json({ error: 'Start date, end date, and price are required' });
    }

    const result = await req.db.execute({
      sql: 'INSERT INTO prices (start_date, end_date, price) VALUES (?, ?, ?)',
      args: [startDate, endDate, price]
    });

    res.status(201).json({
      id: Number(result.lastInsertRowid),
      startDate,
      endDate,
      price
    });
  } catch (error) {
    console.error('Error creating price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/prices/:id - Admin only: Update a price range
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, price } = req.body;

    if (!startDate || !endDate || !price) {
      return res.status(400).json({ error: 'Start date, end date, and price are required' });
    }

    const result = await req.db.execute({
      sql: 'UPDATE prices SET start_date = ?, end_date = ?, price = ? WHERE id = ?',
      args: [startDate, endDate, price, parseInt(id)]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Price not found' });
    }

    res.json({
      id: parseInt(id),
      startDate,
      endDate,
      price
    });
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/prices/:id - Admin only: Remove a price range
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await req.db.execute({
      sql: 'DELETE FROM prices WHERE id = ?',
      args: [parseInt(id)]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Price not found' });
    }

    res.json({ message: 'Price removed successfully' });
  } catch (error) {
    console.error('Error deleting price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
