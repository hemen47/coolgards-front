import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../_app";
import styles from "./contact.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ax } from "../../utils/axios";
import Head from "next/head"; // Add Head component for SEO
import Link from "next/link"; // Import Link for internal navigation

export default function Contact({ data, error }) {
  const { setError, setMessage } = useContext(AlertContext);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state for better UX

  // Define meta content for SEO
  const pageTitle = "Contact COOLGARDS | Get in Touch With Our Team";
  const pageDescription = "Have questions about our rehabilitation services or products? Contact COOLGARDS today. We're here to help with all your rehabilitation and health product needs.";
  const canonicalUrl = "https://coolgards.com/contact"; // Replace with your actual domain

  // Structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "COOLGARDS Contact Page",
    "description": "Contact COOLGARDS for rehabilitation services and health products",
    "mainEntity": {
      "@type": "Organization",
      "name": "COOLGARDS",
      "telephone": "+1-234-567-8900", // Replace with actual phone number
      "email": "info@coolgards.com", // Replace with actual email
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Rehab Street", // Replace with actual address
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345",
        "addressCountry": "Country"
      }
    }
  };

  if (error) {
    setError(error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state when form is submitted

    const data = new FormData(e.currentTarget);
    const model = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      subject: data.get("subject"),
      content: data.get("content"),
    };

    ax.post("/api/panel/messages", model)
        .then((res) => {
          setMessage("Message received successfully thank you");
          setSent(true);
          // Track form submission for analytics
          if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
              'event': 'form_submission',
              'form_name': 'contact_form'
            });
          }
        })
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
  };

  return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={canonicalUrl} />

          {/* Open Graph tags for social sharing  */}
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content="https://coolgards.com/contact-image.jpg" /> {/* Replace with actual image URL */}

          {/* Twitter Card tags  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content="https://coolgards.com/contact-image.jpg" /> {/* Replace with actual image URL */}

          {/* Additional meta tags for better SEO  */}
          <meta name="keywords" content="contact COOLGARDS, rehabilitation services contact, health products inquiry" />
          <meta name="author" content="COOLGARDS" />

          {/* JSON-LD structured data  */}
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>

        <div className={styles.container}>
          <div className={styles.contactContainer}>
            {/* Breadcrumb navigation for SEO and UX  */}
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <ol className={styles.breadcrumbList}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li aria-current="page">Contact</li>
              </ol>
            </nav>

            {sent ? (
                <div className={styles.form}>
                  <h1 className={styles.title}>Thank You!</h1>
                  <p>We have received your message successfully.</p>
                  <p>Our team will reach out to you soon!</p>
                  <Button
                      onClick={() => setSent(false)}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      aria-label="Send another message" // Accessibility improvement
                  >
                    Send another message?
                  </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form} aria-label="Contact form"> {/* Accessibility improvement  */}
                  <h1 className={styles.title}>Contact Us</h1>

                  {/* Add a brief introduction for better context  */}
                  <p className={styles.intro}>
                    Have questions about our rehabilitation services or products? Fill out the form below and our team will get back to you as soon as possible.
                  </p>

                  <TextField
                      margin="normal"
                      fullWidth
                      id="name"
                      label="Full Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      aria-label="Your full name" // Accessibility improvement
                  />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      type="email" // Specify input type for better form validation
                      aria-label="Your email address" // Accessibility improvement
                  />
                  <TextField
                      margin="normal"
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="tel" // Correct autocomplete attribute
                      type="tel" // Specify input type for better mobile experience
                      aria-label="Your phone number" // Accessibility improvement
                  />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="subject"
                      label="Subject"
                      name="subject"
                      aria-label="Message subject" // Accessibility improvement
                  />
                  <TextField
                      margin="normal"
                      rows={6}
                      required
                      fullWidth
                      id="content"
                      label="Message"
                      name="content"
                      multiline
                      aria-label="Your message" // Accessibility improvement
                  />

                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={loading} // Disable button during submission
                      aria-label="Submit contact form" // Accessibility improvement
                  >
                    {loading ? "Sending..." : "Submit Message"}
                  </Button>

                  {/* Add privacy policy notice for GDPR compliance  */}
                  <p className={styles.privacyNote}>
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy-policy">Privacy Policy</Link>. We'll only use your information to respond to your inquiry.
                  </p>
                </form>
            )}
          </div>

          {/* Additional contact information section for SEO and UX  */}
          <div className={styles.additionalContact}>
            <h2>Additional Ways to Reach Us</h2>
            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <h3>Email</h3>
                <a href="mailto:info@coolgards.com" aria-label="Send email to COOLGARDS">
                  info@coolgards.com
                </a>
              </div>
              <div className={styles.contactMethod}>
                <h3>Phone</h3>
                <a href="tel:+12345678900" aria-label="Call COOLGARDS">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className={styles.contactMethod}>
                <h3>Address</h3>
                <address>
                  123 Rehab Street<br />
                  City, State 12345<br />
                  Country
                </address>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

// Add getStaticProps for better SEO performance
export async function getStaticProps() {
  return {
    props: {},
    // Re-generate at most once per day
    revalidate: 86400, // in seconds
  };
}
