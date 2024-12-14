import React, { useState } from "react";
import "./ContactScreen.css";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import Swal from "sweetalert2";

function ContactScreen() {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (feedback.length > 150) {
      setError("Feedback should not exceed 150 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      let res = await axios.post(
        `${BACKEND_URL}/api/v1/customer/feedback/send`,
        { name, email, feedback }
      );
      setLoading(false);
      Swal.fire({
        title: "Thank YOU",
        text: "You clicked the button!",
        icon: "success",
      });
      setName("");
      setEmail("");
      setFeedback("");
    }
  };

  return (
    <div className="contact-screen mt-5">
      {loading && (
        <div className="overlay show">
          <div className="message">Please Wait...</div>
        </div>
      )}
      <div className="contact-header">
        <h2>We’d Love To Hear From You</h2>
        <p>Drop your thoughts or feedback and help us improve</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        {error && <p className="error-message">{error}</p>}
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
            maxLength="150"
          ></textarea>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          Send Feedback
        </button>
      </form>
    </div>
  );
}

export default ContactScreen;
