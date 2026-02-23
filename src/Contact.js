import { useState } from 'react';
import { useForm } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const [state, handleFormspreeSubmit] = useForm("mwvnwvkgY");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('kbatool@brynmawr.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getButtonLabel = () => {
    if (state.submitting) return 'Sending...';
    if (state.succeeded) return 'Message Sent! 🚀';
    return 'Send Message';
  };

  return (
    <section id="contact" className="contact-section">
      {/* Background Ambience */}
      <div className="ambient-glow" />

      <div className="contact-container">

        {/* LEFT SIDE: Info */}
        <div className="contact-content">
          <div className="status-badge">
            <span className="status-dot" />
            <span>Available for new projects</span>
          </div>

          <h2 className="contact-title">
            Let's Build<br />Something Amazing
          </h2>

          <p className="contact-subtitle">
            Whether you're looking for a developer, a designer, or a creative partner—I'm ready to bring your ideas to life.
          </p>

          <div className="social-grid">
            <div className="social-card" onClick={copyEmail} style={{cursor: 'pointer'}}>
              <span style={{fontSize: '1.2rem'}}>📧</span>
              <div>
                <div style={{fontSize: '0.75rem', color: '#888'}}>Email Me</div>
                <div style={{fontWeight: '500'}}>{copied ? 'Copied!' : 'kbatool@brynmawr.edu'}</div>
              </div>
            </div>

            <a href="https://linkedin.com/in/kashafbatool1" target="_blank" rel="noopener noreferrer" className="social-card">
              <span style={{fontSize: '1.2rem'}}>💼</span>
              <div>
                <div style={{fontSize: '0.75rem', color: '#888'}}>Connect</div>
                <div style={{fontWeight: '500'}}>LinkedIn</div>
              </div>
            </a>

            <a href="https://github.com/kashafbatool" target="_blank" rel="noopener noreferrer" className="social-card">
              <span style={{fontSize: '1.2rem'}}>💻</span>
              <div>
                <div style={{fontSize: '0.75rem', color: '#888'}}>Check Code</div>
                <div style={{fontWeight: '500'}}>GitHub</div>
              </div>
            </a>

            <a href="tel:+16103481965" className="social-card">
              <span style={{fontSize: '1.2rem'}}>📱</span>
              <div>
                <div style={{fontSize: '0.75rem', color: '#888'}}>Call Me</div>
                <div style={{fontWeight: '500'}}>(610) 348-1965</div>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="form-card">
          <form onSubmit={handleFormspreeSubmit}>
            <div className="input-group">
              <label className="form-label">YOUR NAME</label>
              <input
                type="text"
                name="name"
                className="styled-input"
                placeholder="What should I call you?"
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">YOUR EMAIL</label>
              <input
                type="email"
                name="email"
                className="styled-input"
                placeholder="Where can I reach you?"
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">THE PROJECT</label>
              <textarea
                name="message"
                className="styled-textarea"
                placeholder="Tell me about your idea..."
                required
              />
            </div>

            {state.errors && state.errors.length > 0 && (
              <div style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '12px' }}>
                {state.errors.map((err, i) => (
                  <div key={i}>{err.message}</div>
                ))}
              </div>
            )}

            <button type="submit" className="submit-btn-fancy" disabled={state.submitting}>
              {getButtonLabel()}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
