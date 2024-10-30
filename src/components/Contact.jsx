import React, { useState } from 'react';
import './Contact.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Client, Databases, ID } from 'appwrite';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Set Appwrite credentials directly
  const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
  const APPWRITE_PROJECT_ID = "6721c41e0020584deddd";
  const APPWRITE_DATABASE_ID = "6721c5e9003ae74fbe18";
  const APPWRITE_COLLECTION_ID = "6721c60700220bd446e9";

  // Initialize Appwrite Client
  const client = new Client();
  const database = new Databases(client);

  // Set endpoint and project ID
  client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        ID.unique(),
        formData
      );

      alert('Form submitted successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="contact-section">
      <h1 className="main-title">Feel Free To Join Us</h1>
      <span className="title-underline"></span>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch With Us</h2>
          <p>We are the best NGO in Delhi NCR, India...</p>

          <div className="social-icons">
            {/* Social media links */}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Your Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
