import express from 'express';
import {authenticate} from '../utils/auth.js';
const router = express.Router();

import { Parser } from '@json2csv/plainjs';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/:email',authenticate, async (req, res) => {
  if (!db) {
    return res.status(500).json({ message: "Database not connected" });
  }

  const { email } = req.params;

  try {
    const expenses = db.collection('expenses');
    const userExpenses = await expenses.find({ "participants.email": email }).toArray();

    // Convert to CSV
    const fields = ['expenseID', 'payer', 'amount', 'participants', 'splitType', 'date'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(userExpenses);

    // Write to a file (optional)
    const filePath = path.join(__dirname, 'balance_sheet.csv');
    fs.writeFileSync(filePath, csv);

    // Send the CSV file to client
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment;filename=balance_sheet.csv');
    res.status(200).end(csv);
  } catch (err) {
    console.error("Error generating balance sheet CSV:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
