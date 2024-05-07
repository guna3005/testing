import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Budget.css';

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [newBudget, setNewBudget] = useState({ id: '', title: '', amount: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('http://localhost:5001/budgets', { withCredentials: true });
            setBudgets(response.data);
        } catch (error) {
            console.error('Failed to fetch budgets:', error);
        }
    };

    const openDialog = (budget = { id: '', title: '', amount: '' }) => {
        setNewBudget({ ...budget });
        setDialogVisible(true);
        setIsEditing(!!budget.id);
    };

    const handleInputChange = (e) => {
        setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
    };

    const submitBudget = async () => {
        if (!newBudget.title || !newBudget.amount) {
            alert("Both title and amount are required.");
            return;
        }
    
        const url = isEditing ? `http://localhost:5001/update-budget/${newBudget._id}` : 'http://localhost:5001/add-budget';
        const method = isEditing ? 'put' : 'post'; // Use 'put' for both creating and updating for simplicity in this case
    
        try {
            const response = await axios[method](url, newBudget, { withCredentials: true });
            if (response.status === 200 || response.status === 201) {
                const updatedBudgets = isEditing
                    ? budgets.map(budget => budget._id === newBudget._id ? response.data : budget)
                    : [...budgets, response.data];
                setBudgets(updatedBudgets);
                setDialogVisible(false);
                setNewBudget({ id: '', title: '', amount: '' });
                setIsEditing(false);
            }
        } catch (error) {
            console.error(`Failed to update budget:`, error);
            alert(`Failed to update budget: ` + (error.response ? error.response.data.message : 'Unknown error'));
        }
    };
    
    
    
    
    

    const deleteBudget = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5001/delete-budget/${id}`, {
                withCredentials: true
            });
            if (response.status === 200) {
                setBudgets(budgets.filter(budget => budget._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete budget:', error.response ? error.response.data.message : error.message);
            alert('Failed to delete budget: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="container">
        <br>
        </br>
        <br>
        </br>
            <h2>Budget List</h2>
            <button onClick={() => openDialog()}>Add Budget</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {budgets.map(budget => (
                        <tr key={budget._id}>
                            <td>{budget.title}</td>
                            <td>${budget.amount}</td>
                            <td>
                                <button onClick={() => openDialog(budget)}>Edit</button>
                                <button onClick={() => deleteBudget(budget._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {dialogVisible && (
                <div className="overlay">
                    <div className="dialog">
                        <h4>{isEditing ? 'Edit Budget' : 'Add New Budget'}</h4>
                        <label>Title:</label>
                        <input type="text" name="title" value={newBudget.title} onChange={handleInputChange} />
                        <label>Amount:</label>
                        <input type="number" name="amount" value={newBudget.amount} onChange={handleInputChange} />
                        <button onClick={submitBudget}>{isEditing ? 'Update' : 'Add'}</button>
                        <button onClick={() => setDialogVisible(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Budget;
