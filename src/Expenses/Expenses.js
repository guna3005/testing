import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Expenses.css';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ category: '', amount: '', comment: '', date: new Date().toISOString().slice(0, 10) });
    const [displayDialog, setDisplayDialog] = useState(false);
    const [editing, setEditing] = useState(false); // Track if we are editing an existing expense

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5001/expenses', { withCredentials: true });
            setExpenses(response.data);
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        }
    };

    const handleInputChange = (e, field) => {
        setNewExpense({ ...newExpense, [field]: e.target.value });
    };

    const openDialogForEdit = (expense) => {
        setNewExpense(expense);
        setDisplayDialog(true);
        setEditing(true);
    };

    const submitExpense = async () => {
        const url = editing ? `http://localhost:5001/update-expense/${newExpense._id}` : 'http://localhost:5001/add-expense';
        const method = editing ? 'put' : 'post';

        try {
            const response = await axios[method](url, newExpense, { withCredentials: true });
            if (response.status === 200 || response.status === 201) {
                const updatedExpenses = editing
                    ? expenses.map(exp => exp._id === newExpense._id ? response.data : exp)
                    : [...expenses, response.data];
                setExpenses(updatedExpenses);
                setNewExpense({ category: '', amount: '', comment: '', date: new Date().toISOString().slice(0, 10) });
                setDisplayDialog(false);
                setEditing(false);
            }
        } catch (error) {
            console.error(`${editing ? 'Updating' : 'Adding'} expense failed:`, error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/delete-expense/${id}`, { withCredentials: true });
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Failed to delete expense:', error);
        }
    };

    return (
        <div className="container">
             <br>
        </br>
        <br>
        </br>
            <h2>Expense List</h2>
            <button onClick={() => {
                setNewExpense({ category: '', amount: '', comment: '', date: new Date().toISOString().slice(0, 10) });
                setDisplayDialog(true);
                setEditing(false);
            }}>Add Expense</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{expense.category}</td>
                            <td>${expense.amount}</td>
                            <td>{expense.date}</td>
                            <td>{expense.comment}</td>
                            <td>
                                <button onClick={() => openDialogForEdit(expense)}>Edit</button>
                                <button onClick={() => deleteExpense(expense._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {displayDialog && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setDisplayDialog(false)}>&times;</span>
                        <h3>{editing ? 'Edit Expense' : 'Add New Expense'}</h3>
                        <label>Category:</label>
                        <input type="text" value={newExpense.category} onChange={(e) => handleInputChange(e, 'category')} />
                        <label>Amount:</label>
                        <input type="number" value={newExpense.amount} onChange={(e) => handleInputChange(e, 'amount')} />
                        <label>Date:</label>
                        <input type="date" value={newExpense.date} onChange={(e) => handleInputChange(e, 'date')} />
                        <label>Comment:</label>
                        <input type="text" value={newExpense.comment} onChange={(e) => handleInputChange(e, 'comment')} />
                        <button onClick={submitExpense}>{editing ? 'Update Expense' : 'Add Expense'}</button>
                    </div>
                </div>
            )}
            <footer className="app-footer">
                <p>© 2024 Your Budget Buddy – Manage Money, Make Merriment!</p>
            </footer>
        </div>
    );
};

export default Expenses;
