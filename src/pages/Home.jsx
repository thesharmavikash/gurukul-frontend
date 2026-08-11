import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AuthorCard from '../components/AuthorCard';
import { motion } from 'framer-motion';

const Home = () => {
    const [tests, setTests] = useState([]);
    
    useEffect(() => {
        setTests([
            { id: 2, name: "Comprehensive Mapping", question_count: 56, desc: "Deep analytical breakdown" }
        ]);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden'}}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute', top: '-20%', left: '30%', transform: 'translateX(-50%)',
                width: '80%', height: '800px', background: 'radial-gradient(ellipse at top, rgba(225, 29, 72, 0.15) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            <Header />

            <main className="portal-container" style={{flex: 1, zIndex: 1, maxWidth: '1400px', padding: '60px 20px'}}>
                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
                    gap: '60px',
                    alignItems: 'stretch'
                }}>
                    
                    {/* Left Side: Assessment Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', height: '100%' }}>
                        <motion.header 
                            className="portal-header"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{textAlign: 'left', marginBottom: '50px'}}
                        >
                            <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px'}}>
                                <motion.div 
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    style={{
                                        width: 80, height: 80, borderRadius: 20, border: '4px solid var(--primary)', 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        background: 'rgba(17, 17, 17, 0.8)', color: 'var(--primary)', fontWeight: 900, fontSize: 28,
                                        boxShadow: '0 0 30px rgba(225, 29, 72, 0.3)', backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    MI
                                </motion.div>
                                <div>
                                    <h1 style={{fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1', margin: 0, letterSpacing: '-2px'}}>
                                        MULTIPLE <br/><span style={{color: 'var(--primary)'}}>INTELLIGENCES</span>
                                    </h1>
                                </div>
                            </div>
                            <p style={{color: 'var(--secondary-text)', fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '10px'}}>
                                Unlock Your Cognitive Blueprint
                            </p>
                        </motion.header>

                        <motion.div 
                            style={{display: 'flex', flexDirection: 'column', gap: '25px', flex: 1}}
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {tests.map(test => (
                                <motion.div variants={itemVariants} key={test.id} style={{display: 'flex', flex: 1}}>
                                    <Link to={`/test/${test.id}`} className="test-card" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', padding: '60px 40px', textAlign: 'center', flex: 1, minHeight: '350px'}}>
                                        <div className="icon-circle" style={{margin: 0, flexShrink: 0, width: '100px', height: '100px'}}>
                                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                                             </svg>
                                        </div>
                                        <div>
                                            <h3 style={{fontSize: '2.2rem', margin: '0 0 15px 0'}}>{test.name}</h3>
                                            <p style={{color: 'var(--primary)', margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '1px'}}>{test.question_count} SCIENTIFIC QUESTIONS</p>
                                            <span style={{fontSize: '1.1rem', color: 'var(--secondary-text)', fontWeight: 600, lineHeight: 1.5, display: 'block'}}>{test.desc}</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Side: Author */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', paddingLeft: '10px'}}>
                            <div style={{height: '2px', width: '40px', background: 'var(--border)'}}></div>
                            <h2 style={{fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0}}>
                                Meet The <span style={{color: 'var(--primary)'}}>Author</span>
                            </h2>
                        </div>
                        
                        <div style={{flex: 1}}>
                            <AuthorCard />
                        </div>
                    </motion.div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
