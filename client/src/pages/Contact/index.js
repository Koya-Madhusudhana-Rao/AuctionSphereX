import React, { useState, useRef } from 'react';
import './Contact.css';
import emailjs from 'emailjs-com';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import {SiGmail} from 'react-icons/si';
import Nav from '../Navbar/Nav';
import Footer from '../Navbar/foot';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formData.name || !isEmailValid(formData.email) || !formData.subject || !formData.message) {
      setIsError(true);
      return;
    }

    setIsSending(true);

    emailjs
      .sendForm('service_8msxxrj', 'template_43ivxke', form.current, 'OtyldcbYOdHaCwa89')
      .then(
        (result) => {
          console.log(result.text);
          setIsSending(false);
          setIsSent(true);
          setIsError(false);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        },
        (error) => {
          console.error('Error sending email:', error);
          setIsSending(false);
          setIsSent(false);
          setIsError(true);
        }
      );
  };

  return (
    <div className="contact-container">
      <Nav />
      <div className='align-center'>Any Queries ?</div>
      <div className="contact">

        <h2>Contact US</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          <br></br>
          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
        {isError && (
          <p className="error-message">Please fill in all required fields and provide a valid email address.</p>
        )}
        {isSent && <p className="success-message">Email sent successfully!</p>}
        {isError && !isSent && (
          <p className="error-message">Email not sent. Please try again later.</p>
        )}
        <div className="contact-social-links">
          <a href="https://www.linkedin.com/in/koya-madhusudhana-rao-7a2974233" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Koya-Madhusudhana-Rao" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="mailto:madhusudhanaraokoya@gmail.com" target="_blank" rel="noopener noreferrer">
            <SiGmail />
          </a>
          <a href="https://www.instagram.com/madhu63096/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
}

export default Contact;
