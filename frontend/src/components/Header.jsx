import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Globe from '../../src/images/globe.png';
import "./Header.css"

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/"); // or "/" if you want to redirect to the homepage
    };

    return (
        <>
            <header>
                <nav>
                    <Link to="/journal">
                        <img className='logo' src={Globe} alt="Globe" />
                    </Link>
                    <span>my travel journal.</span>
                </nav>
                <div className="header-actions">
                    <Link to='/add' className="add-journal-btn">Add Journal</Link>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>
        </>
    );
}
