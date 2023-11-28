import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-section">
                <h3>StayQuest</h3>
                <p>© 2023 by StayQuest. Proudly created with our team.</p>
            </div>
            <div className="footer-section">
                <h4>Contact Us</h4>
                <p>Email: info@stayquest.com</p>
                <p>Phone: +1 234 567 890</p>
            </div>
            <div className="footer-section">
                <h4>Quick Links</h4>
                <p>About Us</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
            </div>
        </footer>
    );
};

export default Footer;