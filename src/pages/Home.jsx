import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
    const [tests, setTests] = useState([]);
    
    useEffect(() => {
        setTests([
            { id: 1, name: "Quick Intelligence Mapping", question_count: 8 },
            { id: 2, name: "Comprehensive Intelligence Mapping", question_count: 56 }
        ]);
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header />
            <main className="portal-container" style={{flex: 1}}>
                <header className="portal-header">
                    <div style={{
                        width: 100, height: 100, borderRadius: 25, border: '4px solid var(--primary)', 
                        margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        background: '#111', color: 'var(--primary)', fontWeight: 900, fontSize: 32,
                        boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)'
                    }}>G</div>
                    <h1>MULTIPLE <span style={{color: 'var(--primary)'}}>INTELLIGENCES</span></h1>
                    <p>UNLOCK YOUR COGNITIVE BLUEPRINT. CHOOSE YOUR DEPTH.</p>
                </header>

                <div className="test-grid">
                    {tests.map(test => (
                        <Link to={`/test/${test.id}`} className="test-card" key={test.id}>
                            <div className="icon-circle">
                                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    {test.question_count <= 24 ? (
                                        <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>
                                    ) : (
                                        <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>
                                    )}
                                 </svg>
                            </div>
                            <h3>{test.name}</h3>
                            <p>{test.question_count} SCIENTIFIC QUESTIONS</p>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
