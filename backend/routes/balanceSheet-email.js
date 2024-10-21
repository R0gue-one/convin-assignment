import express from 'express';
import {authenticate} from '../utils/auth.js';
const router = express.Router();


router.get('/:email', authenticate, async (req, res) => {
  if (!global.db) {
    return res.status(500).json({ message: "Database not connected" });
  }
  const { email } = req.params;
  
  // Basic email validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const expenses = global.db.collection('expenses');
    const userExpenses = await expenses.find({ "participants.email": email }).toArray();
    
    // Calculate the total amount owed by the user
    let totalOwed = 0;
    const userExpenseDetails = userExpenses.map(expense => {
      const participant = expense.participants.find(p => p.email === email);
      
      let owedAmount = participant.owed;
      
      // Calculate owed amount based on splitType
      if (expense.splitType === "percentage") {
        owedAmount = (participant.owed / 100) * expense.amount;
      }
      // Accumulate total owed amount
      totalOwed += owedAmount;
      return {
        ...expense,
        userOwed: owedAmount // Add calculated owed amount
      };
    });
    
    res.status(200).json({ expenses: userExpenseDetails, totalOwed });
  } catch (err) {
    console.error("Error retrieving user expenses:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
