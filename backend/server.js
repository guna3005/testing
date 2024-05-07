const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./User'); // Correct path based on your setup
//const Budget = require('./Budget'); // Adjust path as necessary
//const Expense = require('./Expense'); // Ensure this path is correct
// Ensure that all model paths are correct
//const Budget = require('./Budget'); // Update the path to where your Budget model is located
//const Expense = require('./Expense'); // Update the path to where your Expense model is located


const app = express();
const PORT = 5001;
const SECRET_KEY = 'your_secret_key';  // Consider using environment variables for security

app.use(cors({
  origin: 'http://localhost:3000', // Assuming your React app runs on port 3000
  credentials: true
}));

mongoose.connect('mongodb://localhost:27017/project')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });

app.use(bodyParser.json());
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    try {
      await newUser.save();
      req.session.user = { id: newUser._id, name: newUser.name, email: newUser.email };
      res.json({ message: 'Signup successful', user: req.session.user });
    } catch (error) {
      res.status(500).json({ message: 'Error signing up', error: error.message });
    }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password: password });
  if (user) {
    req.session.user = { id: user._id, name: user.name, email: user.email };
    // Token set to expire in 60 seconds for demonstration
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '60s' });
    res.json({ message: 'Login successful', token, expiresIn: Date.now() + 60000 });  // Send expiration time to client
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.get('/api/refresh-token', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  try {
      jwt.verify(token, SECRET_KEY);  // Verify the old token
      const newToken = jwt.sign({ username: jwt.decode(token).username }, SECRET_KEY, { expiresIn: '60s' });
      res.json({ success: true, newToken });
  } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

// Home page route
app.get('/home', (req, res) => {
  if (req.session.user) {
    res.send(`<h1>Welcome ${req.session.user.name}</h1>`);
  } else {
    res.redirect('/login');
  }
});



// GET endpoint to retrieve all budgets for a user
app.get('/budgets', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Not authorized");
    }

    try {
        const budgets = await Budget.find({ user: req.session.user.id });
        res.json(budgets);
    } catch (error) {
        console.error("Error retrieving budgets:", error);
        res.status(500).json({ message: "Error retrieving budgets", error: error.toString() });
    }
});


//adding Budget

const Budget = require('./Budget'); // Adjust path as necessary

app.post('/add-budget', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    const { title, amount } = req.body;
    const newBudget = new Budget({
        title,
        amount,
        user: req.session.user.id // Assuming the user session has been set up correctly
    });

    try {
        const savedBudget = await newBudget.save();
        res.status(201).json(savedBudget);
    } catch (error) {
        console.error("Error saving budget:", error);
        res.status(400).json({ message: "Error saving budget", error: error.toString() });
    }
});

// PUT endpoint to update a budget
app.put('/update-budget/:id', async (req, res) => {
  if (!req.session.user) {
      return res.status(401).json({ message: "Not authorized" });
  }
  const { title, amount } = req.body;
  try {
      const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, { title, amount }, { new: true });
      if (!updatedBudget) {
          return res.status(404).json({ message: "Budget not found" });
      }
      res.json(updatedBudget);
  } catch (error) {
      console.error("Error updating budget:", error);
      res.status(500).json({ message: "Error updating budget", error: error.message });
  }
});







//Delete budget

// Endpoint to delete a budget
app.delete('/delete-budget/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const result = await Budget.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "Budget not found" });
        res.json({ message: "Budget deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting budget", error: error.toString() });
    }
});



//Expenses
const Expense = require('./Expense'); // Ensure this path is correct

// POST endpoint to add an expense
app.post('/add-expense', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not authorized");
  }

  const { category, amount, comment, date } = req.body;
  const newExpense = new Expense({
    category,
    amount,
    comment,
    date,
    user: req.session.user.id
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(400).json({ message: "Error saving expense", error: error.toString() });
  }
});

// GET endpoint to retrieve expenses
app.get('/expenses', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not authorized");
  }

  try {
    const expenses = await Expense.find({ user: req.session.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ message: "Error retrieving expenses", error: error.toString() });
  }
});

// PUT endpoint to update an expense
app.put('/update-expense/:id', async (req, res) => {
  if (!req.session.user) {
      return res.status(401).json({ message: "Not authorized" });
  }

  const { category, amount, comment, date } = req.body;
  try {
      const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, { category, amount, comment, date }, { new: true });
      if (!updatedExpense) {
          return res.status(404).json({ message: "Expense not found" });
      }
      res.json(updatedExpense);
  } catch (error) {
      console.error("Error updating expense:", error);
      res.status(500).json({ message: "Error updating expense", error: error.message });
  }
});


// DELETE endpoint to delete an expense
app.delete('/delete-expense/:id', async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
  
    try {
      const result = await Expense.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
      console.error("Error deleting expense:", error);
      res.status(500).json({ message: "Error deleting expense", error: error.toString() });
    }
  });
  


//logout

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Could not log out, please try again" });
      } else {
        res.clearCookie('connect.sid', { path: '/' });  // Adjust according to your cookie settings
        return res.status(200).json({ message: "Logout successful" });
      }
    });
});
