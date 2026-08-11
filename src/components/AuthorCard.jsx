import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthorCard = () => {
    const [isImageOpen, setIsImageOpen] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isImageOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isImageOpen]);

    const authorImage = "https://thesharmavikash.vercel.app/image.jpg";

    return (
        <>
            <div style={{background: 'var(--card)', padding: '50px', borderRadius: '32px', border: '2px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', width: '100%'}}>
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
                        <h2 style={{margin: '0 0 5px 0', fontSize: '2rem', color: '#fff'}}>Vikash Kumar Sharma</h2>
                        <p style={{margin: 0, color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase'}}>BCA Educator & Academic Mentor</p>
                    </div>
                </div>

                <p style={{color: 'var(--secondary-text)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px', textAlign: 'left'}}>
                    Welcome to the Multiple Intelligences Assessment platform. I am a dedicated educator and MCA graduate specializing in academic guidance and educational technology. 
                </p>

                <p style={{color: 'var(--secondary-text)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px', textAlign: 'left'}}>
                    My mission is to foster technological literacy and problem-solving skills among students by creating an engaging learning environment that seamlessly blends academic theory with real-world software development practices.
                </p>

                <div style={{background: 'var(--input-bg)', padding: '25px', borderRadius: '16px', borderLeft: '4px solid var(--primary)', textAlign: 'left'}}>
                    <h4 style={{margin: '0 0 10px 0', color: '#fff', fontSize: '1.2rem'}}>"Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid."</h4>
                    <p style={{margin: 0, color: 'var(--secondary-text)'}}>— Foundational Principle</p>
                </div>
            </div>

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
        </>
    );
};

export default AuthorCard;
