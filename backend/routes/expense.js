import express from 'express';
import {authenticate} from '../utils/auth.js';
const router = express.Router();

router.post('/',authenticate, async (req, res) => {
  if (!global.db) {
    return res.status(500).json({ message: "Database not connected" });
  }

  const {expenseID, payer, amount, participants, splitType, splitDetails } = req.body;

  // Input validation
  if (!expenseID || !payer || !amount || !participants || !splitType) {
    return res.status(400).json({ message: "Invalid input" });
  }
  
  let sumcheck = amount;

  if (!['percentage', 'equal', 'exact'].includes(splitType)) {
    return res.status(400).json({ message: "splitType must be one of: 'percentage', 'equal', 'exact'" });
  }

  //validation for percentage split
  if (splitType === "percentage") {
    sumcheck = 100;
  }
  
  // console.log(sumcheck);
  const total = participants.reduce((sum, participant) => sum + participant.owed, 0);
  // console.log(total); 
  if (total !== sumcheck) {
    if(splitType === "percentage"){
      return res.status(400).json({ message: "Percentages must add up to 100" });
    }

    else{
      return res.status(400).json({ message: "Idivisual amount must add up to ${amount}" });
    }
  }


  try {
    const expenses = global.db.collection('expenses');
    await expenses.insertOne({expenseID, payer, amount, participants, splitType, splitDetails, date: new Date() });

    res.status(201).json({ message: "Expense added successfully" });
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
