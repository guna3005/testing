import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale  // Import RadialLinearScale for Radar charts
} from 'chart.js';
import { Pie, Line, Radar, Bar } from 'react-chartjs-2';

// Register necessary components from Chart.js including RadialLinearScale for Radar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

const Dashboard = () => {
    const [budgetData, setBudgetData] = useState({});
    const [expenseData, setExpenseData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const budgetResponse = await axios.get('http://159.203.162.71:5001/budgets', { withCredentials: true });
                const expenseResponse = await axios.get('http://159.203.162.71:5001/expenses', { withCredentials: true });
                if (budgetResponse.data && expenseResponse.data) {
                    prepareChartData(budgetResponse.data, expenseResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const prepareChartData = (budgets, expenses) => {
        const budgetChartData = {
            labels: budgets.map(b => b.title),
            datasets: [{
                label: 'Budgets',
                data: budgets.map(b => b.amount),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
            }]
        };

        const expenseChartData = {
            labels: expenses.map(e => e.category),
            datasets: [{
                label: 'Expenses',
                data: expenses.map(e => e.amount),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        };

        setBudgetData(budgetChartData);
        setExpenseData(expenseChartData);
    };

    return (
        <div className="container">
          
            <br>
            </br>
            <br></br>
            <h1>Visualizations of Budgets and Expenses</h1>
            <br></br>
            <div className="charts">
                {budgetData && budgetData.datasets && (
                    <div className="chart-container">
                        <h3>Budget Distribution (Pie Chart)</h3>
                        <Pie data={budgetData} />
                    </div>
                )}
                {budgetData && budgetData.datasets && (
                    <div className="chart-container">
                        <h3>Budget Trends (Line Chart)</h3>
                        <Line data={budgetData} />
                    </div>
                )}
                {expenseData && expenseData.datasets && (
                    <div className="chart-container">
                        <h3>Expense Categories (Radar Chart)</h3>
                        <Radar data={expenseData} />
                    </div>
                )}
                {expenseData && expenseData.datasets && (
                    <div className="chart-container">
                        <h3>Expense Breakdown (Bar Chart)</h3>
                        <Bar data={expenseData} options={{ scales: { y: { beginAtZero: true }, x: { stacked: true } } }} />
                    </div>
                )}
                <footer className="app-footer">
        <p>© 2024 Your Budget Buddy – Manage Money, Make Merriment!</p>
    </footer>
            </div>
        </div>
    );
};

export default Dashboard;
