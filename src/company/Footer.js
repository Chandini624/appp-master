import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Hospital Dashboard. All rights reserved. by <strong>EAST POINT HOSPITAL</strong></p>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Develope By Chandini</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
