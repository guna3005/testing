import React from 'react';
import './Home.css';  // Make sure to import the CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
    <section className="welcome-content">
        <h2>Hey There, Savvy Spender!</h2>
        <p>Wave goodbye to mysterious bank statements and hello to clear financial skies with <strong>Your Budget Buddy!</strong></p>

        <h3>Why Just Spend When You Can Spend Wisely?</h3>
        <p>Our app, <strong>Your Budget Buddy</strong>, is your new financial sidekick. We make budgeting less of a chore and more of a cheer! Ready to dive into your finances without drowning? We've got you covered with intuitive tools and dashboards that make sense of cents (and dollars!).</p>
        <p>Strap in, sign up, and watch your financial fears melt away. Your journey to mastering money management starts here. Let's crunch some numbers and crack some smiles!</p>
    </section>

    <footer className="app-footer">
        <p>© 2024 Your Budget Buddy – Manage Money, Make Merriment!</p>
    </footer>
</div>

    );
};

export default Home;
