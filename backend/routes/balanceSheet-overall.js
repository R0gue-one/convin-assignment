import express from 'express';
import {authenticate} from '../utils/auth.js';
const router = express.Router();

// Helper function to calculate user expenses
async function calculateUserExpenses(email, db) {
  const expenses = db.collection('expenses');
  const userExpenses = await expenses.find({ "participants.email": email }).toArray();
  
  let totalOwed = 0;
  const userExpenseDetails = userExpenses.map(expense => {
    const participant = expense.participants.find(p => p.email === email);
    
    let owedAmount = participant.owed;
    
    if (expense.splitType === "percentage") {
      owedAmount = (participant.owed / 100) * expense.amount;
    }
    totalOwed += owedAmount;

    return {
      ...expense,
      userOwed: owedAmount
    };
  });
  
  return { expenses: userExpenseDetails, totalOwed };
}

router.get('/',authenticate, async (req, res) => {
  if (!global.db) {
    return res.status(500).json({ message: "Database not connected" });
  }
  try {
    const users = global.db.collection('users');
    const allUsers = await users.find().toArray();

    // Create an object to store total expenses per user
    const userExpenses = {};
    
    // Calculate expenses for each user
    for (const user of allUsers) {
      const { totalOwed } = await calculateUserExpenses(user.email, global.db);
      userExpenses[user.email] = totalOwed;
    }
    
    res.status(200).json(userExpenses);
  } catch (err) {
    console.error("Error retrieving overall expenses:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
