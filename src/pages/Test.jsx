import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import translations from '../data/translations';
import { MIMetadata, getCareerSuggestions } from '../data/mappings';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Test = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const STORAGE_KEY = `gurukul_test_${id}`;
    
    // States
    const [lang, setLang] = useState('en');
    const [candidateName, setCandidateName] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [scores, setScores] = useState([]);
    const [topIndices, setTopIndices] = useState([]);
    
    const chartRef = useRef(null);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setCandidateName(parsed.candidateName || '');
                setLang(parsed.lang || 'en');
                setIsStarted(parsed.isStarted || false);
                setCurrentIndex(parsed.currentIndex || 0);
                setAnswers(parsed.answers || []);
                setIsCompleted(parsed.isCompleted || false);
                setScores(parsed.scores || []);
                setTopIndices(parsed.topIndices || []);
            } catch (e) {
                console.error("Failed to parse saved state");
            }
        }
    }, [id]);

    // Save to localStorage on change
    useEffect(() => {
        if (!isStarted && !candidateName) return; 
        const state = {
            candidateName, lang, isStarted, currentIndex, answers, isCompleted, scores, topIndices
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [candidateName, lang, isStarted, currentIndex, answers, isCompleted, scores, topIndices, id]);

    useEffect(() => {
        if (isCompleted) {
            setTimeout(() => { downloadNativePDF(); }, 500);
        }
    }, [isCompleted]);

    // Clear state
    const handleClearAndExit = () => {
        localStorage.removeItem(STORAGE_KEY);
        navigate('/');
    };

    // id=1 is 8 questions, id=2 is 56 questions
    const testType = id === '1' ? '8' : '56';
    const questions = testType === '8' ? translations[lang].questions8 : translations[lang].questions56;
    const t = translations[lang];

    const handleAnswer = (val) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = val;
        setAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
        }
    };

    const handleFinish = () => {
        const numCategories = 8;
        let newScores = new Array(numCategories).fill(0);
        
        for (let i = 0; i < answers.length; i++) {
            const catIndex = testType === '8' ? i : (i % numCategories);
            newScores[catIndex] += answers[i];
        }

        let max1 = -1, max2 = -1, idx1 = 0, idx2 = 1;
        for (let i = 0; i < 8; i++) {
            if (newScores[i] > max1) { max2 = max1; idx2 = idx1; max1 = newScores[i]; idx1 = i; }
            else if (newScores[i] > max2) { max2 = newScores[i]; idx2 = i; }
        }

        setScores(newScores);
        setTopIndices([idx1, idx2]);
        setIsCompleted(true);
    };

    const downloadNativePDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const marginLeft = 20;

        // Branding Header
        pdf.setFillColor(225, 29, 72); // var(--primary)
        pdf.rect(0, 0, pageWidth, 15, 'F');
        
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(24);
        pdf.setTextColor(0, 0, 0);
        pdf.text("GURUKUL IAS", marginLeft, 30);
        
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(14);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Multiple Intelligences Assessment Report", marginLeft, 38);

        // Candidate Details Box
        pdf.setDrawColor(200, 200, 200);
        pdf.setFillColor(245, 245, 245);
        pdf.roundedRect(marginLeft, 45, pageWidth - 40, 20, 3, 3, 'FD');

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(120, 120, 120);
        pdf.text("CANDIDATE NAME", marginLeft + 5, 52);
        pdf.text("TEST DEPTH", marginLeft + 90, 52);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text(candidateName.toUpperCase(), marginLeft + 5, 60);
        pdf.text(`${testType} Questions`, marginLeft + 90, 60);

        // Scores Table
        pdf.setFontSize(14);
        pdf.text("Cognitive Scores", marginLeft, 80);
        
        let startY = 88;
        t.categories.forEach((cat, index) => {
            const isTop = topIndices.includes(index);
            if (isTop) {
                pdf.setFillColor(225, 29, 72, 0.1);
                pdf.rect(marginLeft, startY - 4, 80, 8, 'F');
                pdf.setTextColor(225, 29, 72);
            } else {
                pdf.setTextColor(50, 50, 50);
            }
            
            pdf.setFont("helvetica", isTop ? "bold" : "normal");
            pdf.setFontSize(11);
            pdf.text(cat, marginLeft + 2, startY);
            
            pdf.setFont("helvetica", "bold");
            pdf.text(scores[index].toString(), marginLeft + 70, startY);
            
            startY += 9;
        });

        // Insert Chart Image
        if (chartRef.current) {
            const chartImage = chartRef.current.toBase64Image();
            // x=110, y=75, w=80, h=80
            pdf.addImage(chartImage, 'PNG', 110, 75, 80, 80);
        }

        // Dominant Profile Section
        const profileY = 170;
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.text("Dominant Profile:", marginLeft, profileY);
        
        pdf.setTextColor(225, 29, 72);
        pdf.text(MIMetadata[topIndices[0]].name, marginLeft + 48, profileY);

        // Description
        pdf.setTextColor(80, 80, 80);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        const splitDesc = pdf.splitTextToSize(MIMetadata[topIndices[0]].desc, pageWidth - 40);
        pdf.text(splitDesc, marginLeft, profileY + 10);

        // Career Suggestions
        const careerY = profileY + 15 + (splitDesc.length * 5);
        pdf.setFillColor(248, 248, 248);
        pdf.setDrawColor(225, 29, 72);
        pdf.setLineWidth(1);
        pdf.rect(marginLeft, careerY, pageWidth - 40, 30, 'FD'); // Background
        pdf.line(marginLeft, careerY, marginLeft, careerY + 30); // Left border accent

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(150, 150, 150);
        pdf.text("SUGGESTED CAREER PATHS", marginLeft + 5, careerY + 8);
        
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        const splitCareers = pdf.splitTextToSize(getCareerSuggestions(topIndices), pageWidth - 50);
        pdf.text(splitCareers, marginLeft + 5, careerY + 18);

        // Footer
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.setFont("helvetica", "normal");
        pdf.text("Generated by Gurukul IAS Cognitive Analytics System", marginLeft, 285);
        
        pdf.line(pageWidth - 60, 275, pageWidth - 20, 275);
        pdf.text("Authorized Signature", pageWidth - 55, 282);

        pdf.save(`Gurukul_MI_Report_${candidateName.replace(/\s+/g, '_') || 'Result'}.pdf`);
    };

    const chartData = {
        labels: t.categories,
        datasets: [
            {
                label: 'Score',
                data: scores,
                backgroundColor: 'rgba(225, 29, 72, 0.2)',
                borderColor: '#e11d48',
                borderWidth: 3,
                pointBackgroundColor: '#e11d48',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#e11d48',
                pointRadius: 5
            }
        ]
    };

    const chartOptions = {
        scales: {
            r: {
                angleLines: { color: 'rgba(0,0,0,0.1)' },
                grid: { color: 'rgba(0,0,0,0.1)' },
                pointLabels: {
                    font: { size: 11, family: 'Inter', weight: 'bold' },
                    color: '#444'
                },
                ticks: { display: false, min: 0 }
            }
        },
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
        animation: false // Disable animation so we can capture base64 instantly if needed
    };

    if (!isStarted) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{background: 'var(--card)', padding: '50px 40px', borderRadius: '32px', border: '2px solid var(--primary)', maxWidth: '450px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(225, 29, 72, 0.15)'}}>
                    <h2 style={{color: 'var(--primary)', marginBottom: '30px', fontSize: '2rem', textTransform: 'uppercase'}}>CANDIDATE DETAILS</h2>
                    {localStorage.getItem(STORAGE_KEY) && (
                        <div style={{background: '#222', color: 'var(--primary-light)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '12px', fontWeight: 900}}>
                            RESUMING SAVED SESSION
                        </div>
                    )}
                    <input 
                        type="text" 
                        placeholder="ENTER FULL NAME" 
                        value={candidateName} 
                        onChange={e => setCandidateName(e.target.value)} 
                        style={{width: '100%', padding: '20px', background: 'var(--input-bg)', border: '2px solid var(--border)', color: '#fff', borderRadius: '16px', marginBottom: '30px', fontSize: '18px', textAlign: 'center'}}
                    />
                    <button 
                        onClick={() => setIsStarted(true)} 
                        className="btn-primary" 
                        style={{width: '100%', padding: '20px', borderRadius: '16px', fontSize: '18px'}}
                        disabled={!candidateName.trim()}
                    >
                        {localStorage.getItem(STORAGE_KEY) ? 'RESUME ASSESSMENT' : 'START ASSESSMENT'}
                    </button>
                    <button 
                        onClick={handleClearAndExit} 
                        style={{width: '100%', padding: '20px', borderRadius: '16px', fontSize: '16px', marginTop: '15px', background: 'transparent', border: 'none', color: 'var(--secondary-text)', cursor: 'pointer', fontWeight: 900}}
                    >
                        CANCEL & CLEAR
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <header style={{display: 'flex', justifyContent: 'space-between', padding: '20px 40px', background: 'var(--card)', borderBottom: '2px solid var(--border)'}}>
                <div style={{color: 'var(--primary)', fontWeight: 900, cursor: 'pointer', fontSize: '20px', textTransform: 'uppercase'}} onClick={handleClearAndExit}>{t.title}</div>
                <div>
                    <select value={lang} onChange={e => setLang(e.target.value)} style={{background: 'var(--input-bg)', color: '#fff', border: '2px solid var(--border)', padding: '10px 15px', borderRadius: '8px', fontWeight: 900}}>
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                    </select>
                </div>
            </header>

            <main style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px'}}>
                {!isCompleted ? (
                    <div style={{maxWidth: '850px', width: '100%', background: 'var(--card)', padding: '60px', borderRadius: '32px', border: '2px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--secondary-text)', fontSize: '14px', textTransform: 'uppercase'}}>
                            <span>{t.step} {currentIndex + 1} {t.of} {questions.length}</span>
                            <span>{Math.round(((currentIndex) / questions.length) * 100)}% {t.complete}</span>
                        </div>
                        <div style={{width: '100%', height: '8px', background: 'var(--input-bg)', borderRadius: '4px', marginBottom: '50px', overflow: 'hidden'}}>
                            <div style={{width: `${((currentIndex) / questions.length) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.4s cubic-bezier(0.19, 1, 0.22, 1)'}} />
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 style={{fontSize: '2.5rem', marginBottom: '50px', color: '#fff', lineHeight: 1.3, letterSpacing: '-1px'}}>{questions[currentIndex]}</h2>
                                
                                <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '15px'}}>
                                    {[1, 2, 3, 4, 5].map((val, idx) => (
                                        <button key={val} 
                                            onClick={() => handleAnswer(val)}
                                            style={{
                                                padding: '25px 30px', 
                                                background: answers[currentIndex] === val ? 'rgba(225,29,72,0.1)' : 'var(--input-bg)', 
                                                border: answers[currentIndex] === val ? '2px solid var(--primary)' : '2px solid var(--border)', 
                                                color: answers[currentIndex] === val ? '#fff' : 'var(--secondary-text)', 
                                                borderRadius: '16px', 
                                                fontSize: '18px', 
                                                textAlign: 'left', 
                                                cursor: 'pointer', 
                                                transition: '0.2s', 
                                                display: 'flex',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <span style={{color: answers[currentIndex] === val ? 'var(--primary)' : '#444', fontSize: '24px'}}>{val}</span> 
                                            <span style={{color: '#fff'}}>{t.options[idx]}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '50px'}}>
                            <button onClick={() => setCurrentIndex(c => Math.max(0, c - 1))} disabled={currentIndex === 0} style={{padding: '20px 40px', background: 'var(--input-bg)', border: 'none', color: '#fff', borderRadius: '16px', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', opacity: currentIndex === 0 ? 0.5 : 1, fontWeight: 900}}>
                                {t.btnPrev}
                            </button>
                            {currentIndex === questions.length - 1 ? (
                                <button onClick={handleFinish} disabled={answers.length < questions.length || !answers[currentIndex]} className="btn-primary" style={{padding: '20px 40px', borderRadius: '16px', fontSize: '18px'}}>
                                    {t.btnFinish}
                                </button>
                            ) : (
                                <button onClick={() => setCurrentIndex(c => c + 1)} disabled={!answers[currentIndex]} className="btn-primary" style={{padding: '20px 40px', borderRadius: '16px', fontSize: '18px'}}>
                                    {t.btnNext}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div id="result-view" className="result-card">
                        <div style={{position: 'absolute', top: '60px', right: '60px', width: '100px', height: '100px', background: '#0a0a0a', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, border: '4px solid var(--primary)'}}>
                            GURUKUL
                        </div>
                        <h1 className="result-title">{t.resultTitle}</h1>
                        <p style={{fontSize: '1.2rem', color: '#666', marginBottom: '40px', fontWeight: 600}}>{t.resultP}</p>
                        
                        <div className="result-info">
                            <div><span>Candidate</span><strong>{candidateName.toUpperCase()}</strong></div>
                            <div><span>Test Depth</span><strong>{testType} Questions</strong></div>
                        </div>

                        <div style={{display: 'flex', gap: '40px', marginBottom: '40px'}}>
                            <div style={{flex: '1', minWidth: '0'}}>
                                <div style={{height: '350px', background: '#f8f9fa', borderRadius: '24px', padding: '20px'}}>
                                    <Radar ref={chartRef} data={chartData} options={chartOptions} />
                                </div>
                            </div>
                            <div style={{flex: '1', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                {t.categories.map((cat, i) => (
                                    <div key={i} className={`cat-row ${topIndices.includes(i) ? 'top' : ''}`} style={{padding: '10px 20px'}}>
                                        <span style={{fontSize: '14px'}}>{cat}</span>
                                        <strong style={{fontSize: '16px'}}>{scores[i]}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{background: '#0a0a0a', color: '#fff', padding: '40px', borderRadius: '24px', marginBottom: '40px'}}>
                            <h3 style={{color: 'var(--primary)', margin: '0 0 20px 0', fontSize: '1.8rem', textTransform: 'uppercase'}}>Dominant Profile: {MIMetadata[topIndices[0]].name}</h3>
                            <p style={{fontSize: '1.2rem', lineHeight: 1.6, margin: '0 0 25px 0', color: '#ccc', fontWeight: 600}}>{MIMetadata[topIndices[0]].desc}</p>
                            <div style={{background: '#111', padding: '25px', borderRadius: '16px', borderLeft: '4px solid var(--primary)'}}>
                                <h4 style={{margin: '0 0 10px 0', color: '#888', textTransform: 'uppercase', fontSize: '12px'}}>Suggested Career Paths</h4>
                                <div style={{fontSize: '18px', fontWeight: 900}}>{getCareerSuggestions(topIndices)}</div>
                            </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '50px'}} id="action-buttons">
                            <button onClick={downloadNativePDF} style={{background: '#2563eb', color: '#fff', border: 'none', padding: '20px 40px', fontSize: '16px', fontWeight: 900, borderRadius: '40px', cursor: 'pointer', textTransform: 'uppercase'}}>Download Official PDF</button>
                            <button onClick={handleClearAndExit} style={{background: '#111', color: '#fff', border: 'none', padding: '20px 40px', fontSize: '16px', fontWeight: 900, borderRadius: '40px', cursor: 'pointer', textTransform: 'uppercase'}}>Back to Home</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Test;
