import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Explore</h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>About</h3>
        <ul>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/careers">Careers</Link>
          </li>
          <li>
            <Link to="/press">Press</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Help</h3>
        <ul>
          <li>
            <Link to="/payments">Payments</Link>
          </li>
          <li>
            <Link to="/shipping">Shipping</Link>
          </li>
          <li>
            <Link to="/returns">Returns</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section" style={{ marginLeft: "50px" }}>
        <h3>Connect</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/">
              <i className="fab fa-facebook"></i>Facebook
            </a>
          </li>
          <li>
            <a href="https://twitter.com/">
              <i className="fab fa-twitter"></i>Twitter
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <i className="fab fa-instagram"></i>Instagram
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-section" style={{ marginLeft: "50px" }}>
        <h3>Download Our App</h3>
        <ul className="app-links">
          <li>
            <Link to="https://play.google.com/">
              <FaGooglePlay />
              Play Store
            </Link>
          </li>
          <li>
            <Link to="https://www.apple.com/app-store/">
              <FaAppStoreIos />
              App Store
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Legal</h3>
        <ul>
          <li>
            <Link to="/terms">Terms of Use</Link>
          </li>
          <li>
            <Link to="/policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/cookie">Cookie Policy</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Corporate</h3>
        <ul>
          <li>
            <Link to="/about-company">About Company</Link>
          </li>
          <li>
            <Link to="/investors">Investors</Link>
          </li>
          <li>
            <Link to="/affiliate">Affiliate</Link>
          </li>
          <li>
            <Link to="/sitemap">Sitemap</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Subscribe</h3>
        <p>Subscribe to our newsletter for updates and offers.</p>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer-section" style={{ marginLeft: "50px" }}>
        <h3>Customer Support</h3>
        <p>For any queries, contact our customer support.</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: support@example.com</p>
      </div>
      <div className="footer-section" style={{ marginLeft: "50px" }}>
        <h3>Address</h3>
        <p>123 Street, City</p>
        <p>Country</p>
      </div>
      <hr />
      <div className="footer-section">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
