import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MIMetadata } from '../data/mappings';
import { motion, AnimatePresence } from 'framer-motion';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            const saved = JSON.parse(localStorage.getItem('gurukul_history') || '[]');
            setHistory(saved);
        } catch (e) {
            console.error("Failed to load history", e);
        }
    }, []);

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to delete all past test records?")) {
            localStorage.removeItem('gurukul_history');
            setHistory([]);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative'}}>
            <Header />

            <main className="portal-container" style={{flex: 1, padding: '60px 20px', maxWidth: '900px', textAlign: 'left', margin: '0 auto', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px'}}>
                    <div>
                        <h1 style={{fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '-2px'}}>
                            Assessment History
                        </h1>
                        <p style={{color: 'var(--secondary-text)', fontSize: '1.1rem', margin: 0, fontWeight: 600}}>
                            Review your past cognitive blueprints and track your journey.
                        </p>
                    </div>
                    {history.length > 0 && (
                        <button onClick={clearHistory} style={{background: 'transparent', border: '2px solid var(--border)', color: 'var(--text)', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 900, fontSize: '14px', transition: '0.3s'}}>
                            Clear History
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div style={{background: 'var(--card)', border: '2px solid var(--border)', borderRadius: '24px', padding: '60px', textAlign: 'center'}}>
                        <div style={{fontSize: '48px', marginBottom: '20px'}}>🗂️</div>
                        <h3 style={{fontSize: '1.5rem', color: 'var(--text)', margin: '0 0 10px 0'}}>No history found</h3>
                        <p style={{color: 'var(--secondary-text)', margin: 0}}>You haven't completed any assessments yet.</p>
                    </div>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <AnimatePresence>
                            {history.map((record, index) => (
                                <motion.div 
                                    key={record.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{
                                        background: 'var(--card)', 
                                        border: '2px solid var(--border)', 
                                        borderRadius: '24px', 
                                        padding: '30px', 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '20px'
                                    }}
                                >
                                    <div style={{flex: 1}}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
                                            <h3 style={{fontSize: '1.8rem', fontWeight: 900, margin: 0, color: 'var(--text)', textTransform: 'uppercase'}}>
                                                {record.candidateName}
                                            </h3>
                                            <span style={{background: 'rgba(225, 29, 72, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 900}}>
                                                {record.testType} QUESTIONS
                                            </span>
                                        </div>
                                        <div style={{color: 'var(--secondary-text)', fontSize: '0.9rem', marginBottom: '15px'}}>
                                            {formatDate(record.date)}
                                        </div>
                                        
                                        <div style={{background: 'var(--input-bg)', padding: '15px 20px', borderRadius: '12px', borderLeft: '4px solid var(--primary)'}}>
                                            <span style={{display: 'block', fontSize: '12px', color: 'var(--secondary-text)', textTransform: 'uppercase', fontWeight: 900, marginBottom: '5px'}}>Dominant Profile</span>
                                            <strong style={{fontSize: '1.2rem', color: 'var(--text)'}}>
                                                {MIMetadata[record.dominantProfileIndex]?.name || 'Unknown'}
                                            </strong>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default History;
