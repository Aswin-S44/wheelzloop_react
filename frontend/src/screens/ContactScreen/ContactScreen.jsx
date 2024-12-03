import React, { useState } from "react";
import "./ContactScreen.css";

function ContactScreen() {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted by ${name} (${email}): ${feedback}`);
    // Here you can integrate a backend API to send the feedback data
    setName("");
    setEmail("");
    setFeedback("");
  };

  return (
    <div className="contact-screen mt-5">
      <div className="contact-header">
        <h2>We’d Love To Hear From You</h2>
        <p>Drop your thoughts or feedback and help us improve</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your Name"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your Email"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            placeholder="Your Feedback"
            className="textarea-field"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Send Feedback
        </button>
      </form>
    </div>
  );
}

export default ContactScreen;
