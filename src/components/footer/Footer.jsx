import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-4xl font-bold mb-4">
              Home <span className="text-primary">Villa</span>
            </h3>
            <p>Your trusted partner in finding the perfect home.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>123 Real Estate St.</p>
            <p>City, State 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@homevilla.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-primary">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-primary">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-primary">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2026 Home Villa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
