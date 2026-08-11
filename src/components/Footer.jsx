import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
      <div className="footer-container">
          <div className="footer-grid">
              <div className="footer-brand">
                  <h3>GURUKUL IAS</h3>
                  <p>Building the foundation for future leaders through scientific cognitive analysis and personalized learning profiles.</p>
              </div>
              <div className="footer-section">
                  <h4>Quick Links</h4>
                  <p><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Assessments</Link></p>
                  <p><Link to="/about" style={{color: 'inherit', textDecoration: 'none'}}>About Author</Link></p>
              </div>
              <div className="footer-section">
                  <h4>Contact Us</h4>
                  <p>123 Excellence Way, Delhi</p>
                  <p>+91 98765 43210</p>
                  <p>help@gurukulias.com</p>
              </div>
          </div>
          <div className="footer-bottom">
              © 2026 GURUKUL IAS. ALL RIGHTS RESERVED.
          </div>
      </div>
  </footer>
);

export default Footer;
