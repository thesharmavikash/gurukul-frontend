import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <header style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px 40px', 
            background: 'var(--card)', 
            borderBottom: '2px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none'}}>
                <div style={{
                    width: 40, height: 40, borderRadius: 10, border: '2px solid var(--primary)', 
                    background: '#111', color: 'var(--primary)', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', fontWeight: 900, fontSize: 18,
                    boxShadow: '0 0 15px rgba(225, 29, 72, 0.2)'
                }}>G</div>
                <div style={{color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '-0.5px'}}>
                    GURUKUL <span style={{color: 'var(--primary)'}}>IAS</span>
                </div>
            </Link>

            <nav style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
                <Link to="/" style={{
                    color: location.pathname === '/' ? 'var(--primary)' : '#fff', 
                    textDecoration: 'none', 
                    fontWeight: 900, 
                    fontSize: '14px', 
                    textTransform: 'uppercase',
                    transition: '0.3s'
                }}>
                    Home
                </Link>
                <Link to="/about" style={{
                    color: location.pathname === '/about' ? 'var(--primary)' : '#fff', 
                    textDecoration: 'none', 
                    fontWeight: 900, 
                    fontSize: '14px', 
                    textTransform: 'uppercase',
                    transition: '0.3s'
                }}>
                    About Author
                </Link>
            </nav>
        </header>
    );
};

export default Header;
