import React from 'react';
import './Footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>Explore</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/questions">Questions</a></li>
                    <li><a href="/articles">Articles</a></li>
                    <li><a href="/tutorials">Tutorials</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Support</h4>
                <ul>
                    <li><a href="https://www.deakin.edu.au/about-deakin/locations">FAQs</a></li>
                    <li><a href="https://www.deakin.edu.au/student-life-and-services/events">Help</a></li>
                    <li><a href="https://www.deakin.edu.au/help-hub?#tab__1--3">Contact Us</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Stay connected</h4>
                <ul>
                    <li><a href="http://facebook.com"><img src="/icons/facebook-logo.png" alt="Facebook" className="social-icon"/> Facebook</a></li>
                    <li><a href="http://twitter.com"><img src="/icons/x-logo.png" alt="X" className="social-icon"/> X</a></li>
                    <li><a href="http://instagram.com"><img src="/icons/instagram-logo.png" alt="Instagram" className="social-icon"/> Instagram</a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <h2>DEV@Deakin 2024</h2>
                <a href="https://www.deakin.edu.au/business-and-community/donate">Privacy Policy</a>  <a href="https://www.deakin.edu.au/about-deakin/leadership-and-governance">Terms</a>  <a href="https://www.deakin.edu.au/about-deakin/news-and-media-releases">Code of Conduct</a>
            </div>
        </footer>
    );
};

export default Footer;
