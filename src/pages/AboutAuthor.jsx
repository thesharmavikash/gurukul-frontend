import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AuthorCard from '../components/AuthorCard';

const AboutAuthor = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative'}}>
            <Header />

            <main className="portal-container" style={{flex: 1, padding: '60px 20px', maxWidth: '800px', textAlign: 'left', margin: '0 auto', width: '100%'}}>
                <h1 style={{fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '-2px'}}>
                    About The Author
                </h1>
                
                <AuthorCard />
            </main>

            <Footer />
        </div>
    );
};

export default AboutAuthor;
