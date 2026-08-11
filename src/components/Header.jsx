import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="main-header">
            <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none'}}>
                <div style={{
                    width: 40, height: 40, borderRadius: 10, border: '2px solid var(--primary)', 
                    background: '#111', color: 'var(--primary)', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', fontWeight: 900, fontSize: 18,
                    boxShadow: '0 0 15px rgba(225, 29, 72, 0.2)'
                }}>MI</div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{color: 'var(--text)', fontWeight: 900, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '-0.5px'}}>
                        MULTIPLE <span style={{color: 'var(--primary)'}}>INTELLIGENCES</span>
                    </div>
                    <div style={{fontSize: '10px', color: 'var(--secondary-text)', fontWeight: 600, letterSpacing: '1px'}}>BY THESHARMAVIKASH</div>
                </div>
            </Link>

            <nav className="main-nav">
                <Link to="/" style={{
                    color: location.pathname === '/' ? 'var(--primary)' : 'var(--text)', 
                    textDecoration: 'none', 
                    fontWeight: 900, 
                    fontSize: '14px', 
                    textTransform: 'uppercase',
                    transition: '0.3s'
                }}>
                    Home
                </Link>
                <Link to="/history" style={{
                    color: location.pathname === '/history' ? 'var(--primary)' : 'var(--text)', 
                    textDecoration: 'none', 
                    fontWeight: 900, 
                    fontSize: '14px', 
                    textTransform: 'uppercase',
                    transition: '0.3s'
                }}>
                    History
                </Link>
                <Link to="/about" style={{
                    color: location.pathname === '/about' ? 'var(--primary)' : 'var(--text)', 
                    textDecoration: 'none', 
                    fontWeight: 900, 
                    fontSize: '14px', 
                    textTransform: 'uppercase',
                    transition: '0.3s'
                }}>
                    About Author
                </Link>
                <button 
                    onClick={toggleTheme} 
                    style={{
                        background: 'var(--input-bg)', border: '2px solid var(--border)', 
                        color: 'var(--text)', padding: '5px 10px', borderRadius: '8px', 
                        cursor: 'pointer', fontSize: '14px'
                    }}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </nav>
        </header>
    );
};

export default Header;
