import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';

const AboutAuthor = () => {
    const [isImageOpen, setIsImageOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isImageOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isImageOpen]);

    const authorImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000&q=80";

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative'}}>
            <Header />

            <main className="portal-container" style={{flex: 1, padding: '60px 20px', maxWidth: '800px', textAlign: 'left', margin: '0 auto', width: '100%'}}>
                <h1 style={{fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '-2px'}}>
                    About The Author
                </h1>
                
                <div style={{background: 'var(--card)', padding: '50px', borderRadius: '32px', border: '2px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px', flexWrap: 'wrap'}}>
                        <motion.img 
                            src={authorImage}
                            alt="Author Profile"
                            onClick={() => setIsImageOpen(true)}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ 
                                scale: 1, 
                                opacity: 1,
                                boxShadow: ['0px 0px 0px rgba(225, 29, 72, 0)', '0px 0px 30px rgba(225, 29, 72, 0.5)', '0px 0px 0px rgba(225, 29, 72, 0)']
                            }}
                            transition={{ 
                                scale: { duration: 0.5 },
                                opacity: { duration: 0.5 },
                                boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            whileHover={{ scale: 1.05 }}
                            style={{
                                width: 140, 
                                height: 140, 
                                borderRadius: '50%', 
                                border: '4px solid var(--primary)', 
                                objectFit: 'cover',
                                cursor: 'zoom-in'
                            }}
                        />
                        <div>
                            <h2 style={{margin: '0 0 5px 0', fontSize: '2rem', color: '#fff'}}>Gurukul Architect</h2>
                            <p style={{margin: 0, color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase'}}>Chief Cognitive Analyst</p>
                        </div>
                    </div>

                    <p style={{color: 'var(--secondary-text)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px'}}>
                        Welcome to the Multiple Intelligences Assessment platform. I designed this psychological tool to bridge the gap between abstract psychological theories and actionable career counseling. 
                    </p>

                    <p style={{color: 'var(--secondary-text)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px'}}>
                        Based on Dr. Howard Gardner's groundbreaking Theory of Multiple Intelligences, this system evaluates your cognitive blueprint across 8 distinct scientific parameters. Our mission at Gurukul IAS is to ensure that no student's potential goes unrecognized simply because they don't fit the mold of traditional linguistic or logical-mathematical scoring.
                    </p>

                    <div style={{background: 'var(--input-bg)', padding: '25px', borderRadius: '16px', borderLeft: '4px solid var(--primary)'}}>
                        <h4 style={{margin: '0 0 10px 0', color: '#fff', fontSize: '1.2rem'}}>"Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid."</h4>
                        <p style={{margin: 0, color: 'var(--secondary-text)'}}>— Foundational Principle</p>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Lightbox / Full Image Overlay */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsImageOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0, 0, 0, 0.9)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'zoom-out'
                        }}
                    >
                        <div style={{ position: 'absolute', top: '30px', right: '40px', color: '#fff', fontSize: '40px', fontWeight: 900, cursor: 'pointer' }}>
                            &times;
                        </div>
                        <motion.img
                            src={authorImage}
                            alt="Full Author Profile"
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                borderRadius: '24px',
                                border: '4px solid var(--primary)',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                                objectFit: 'contain',
                                cursor: 'default'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AboutAuthor;
