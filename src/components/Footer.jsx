import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
      <div className="footer-container">
          <div className="footer-grid">
              <div className="footer-brand">
                  <h3>MULTIPLE INTELLIGENCES</h3>
                  <p>Building the foundation for future leaders through scientific cognitive analysis and personalized learning profiles.</p>
              </div>
              <div className="footer-section">
                  <h4>Quick Links</h4>
                  <p><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Assessments</Link></p>
                  <p><Link to="/history" style={{color: 'inherit', textDecoration: 'none'}}>History</Link></p>
                  <p><Link to="/about" style={{color: 'inherit', textDecoration: 'none'}}>About Author</Link></p>
              </div>
              <div className="footer-section">
                  <h4>Author</h4>
                  <p>Vikash Sharma</p>
                  <p><a href="https://thesharmavikash.vercel.app/" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>Portfolio Website</a></p>
              </div>
          </div>
          <div className="footer-bottom">
              © {new Date().getFullYear()} MULTIPLE INTELLIGENCES BY THESHARMAVIKASH. ALL RIGHTS RESERVED.
          </div>
      </div>
  </footer>
);

export default Footer;
