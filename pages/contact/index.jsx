import * as React from 'react';
import { useContext, useState } from 'react';
import { AlertContext } from '../_app';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ax } from '../../utils/axios';
import Head from 'next/head';
import Link from 'next/link';
import ContactCards from '../../components/ContactCards';
import Image from 'next/image';

export default function Contact({ error }) {
  const { setError, setMessage } = useContext(AlertContext);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // SEO metadata
  const pageTitle = 'Contact COOLGARDS | Get in Touch With Our Team';
  const pageDescription =
    "Have questions about our rehabilitation services or products? Contact COOLGARDS today. We're here to help with all your rehabilitation and health product needs.";
  const canonicalUrl = 'https://coolgards.com/contact';
  const ogImage = 'https://coolgards.com/cover.jpg';

  // Structured data for contact page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'COOLGARDS Contact Page',
    description: 'Contact COOLGARDS for rehabilitation services and health products',
    mainEntity: {
      '@type': 'Organization',
      name: 'COOLGARDS',
      telephone: '+1-778-776-2417',
      email: 'info@coolgards.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Skrivarevägen 46',
        addressLocality: 'Lund',
        postalCode: '226 27',
        addressCountry: 'Sweden',
      },
    },
  };

  if (error) {
    setError(error);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const model = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      subject: data.get('subject'),
      content: data.get('content'),
    };

    ax.post('/api/panel/messages', model)
      .then(res => {
        setMessage('Message received successfully thank you');
        setSent(true);
        // Track form submission for analytics
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'form_submission',
            form_name: 'contact_form',
          });
        }
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="COOLGARDS" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional meta tags */}
        <meta
          name="keywords"
          content="contact COOLGARDS, rehabilitation services contact, health products inquiry, medical support"
        />
        <meta name="author" content="COOLGARDS" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <div className="relative h-64 w-full bg-gradient-to-r from-blue-600 to-blue-800 md:h-80">
        <div className="absolute inset-0 "></div>
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg">
            We&#39;re here to help with all your rehabilitation and health product needs
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex text-sm text-gray-600">
              <li className="flex items-center">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <svg className="mx-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li aria-current="page" className="text-blue-600">
                Contact
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-16 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 rounded-full bg-green-100 p-4">
                  <svg
                    className="h-12 w-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h2 className="mb-2 text-3xl font-bold text-gray-800">Thank You!</h2>
                <p className="mb-6 text-lg text-gray-600">
                  We have received your message successfully.
                </p>
                <p className="mb-8 text-gray-600">Our team will reach out to you soon!</p>
                <Button
                  onClick={() => setSent(false)}
                  variant="contained"
                  color="primary"
                  size="large"
                  aria-label="Send another message"
                  className="px-8 py-3"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h2 className="mb-4 text-3xl font-bold text-gray-800">Get in Touch</h2>
                  <p className="mb-6 text-gray-600">
                    Have questions about our rehabilitation services or products? Fill out the form
                    and our team will get back to you as soon as possible.
                  </p>
                  <div className="mb-6 rounded-lg bg-blue-50 p-4">
                    <h3 className="mb-2 font-semibold text-blue-800">Why Contact Us?</h3>
                    <ul className="ml-5 list-disc text-gray-700">
                      <li className="mb-1">Learn about our rehabilitation solutions</li>
                      <li className="mb-1">Get expert advice for your specific needs</li>
                      <li className="mb-1">Request product information or demonstrations</li>
                      <li>Schedule a consultation with our specialists</li>
                    </ul>
                  </div>
                  <Image
                    src="/contact-us.svg"
                    alt="Contact us illustration"
                    width={300}
                    height={200}
                    className="mx-auto hidden md:block"
                  />
                </div>

                <form onSubmit={handleSubmit} aria-label="Contact form" className="space-y-4">
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    aria-label="Your full name"
                    variant="outlined"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    aria-label="Your email address"
                    variant="outlined"
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="tel"
                    type="tel"
                    aria-label="Your phone number"
                    variant="outlined"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    aria-label="Message subject"
                    variant="outlined"
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
                    aria-label="Your message"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    aria-label="Submit contact form"
                    className="mt-6"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="mr-2 h-5 w-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Submit Message'
                    )}
                  </Button>
                  <p className="mt-4 text-sm text-gray-500">
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    . We&#39;ll only use your information to respond to your inquiry.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Contact Cards Section */}
        <ContactCards showContactForm={true} />
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find quick answers to common questions</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {[
            {
              question: 'What are your business hours?',
              answer:
                "Our office is open Monday through Friday, 9:00 AM to 5:00 PM CET. We're closed on weekends and public holidays.",
            },
            {
              question: 'How quickly can I expect a response?',
              answer: 'We typically respond to all inquiries within 24-48 business hours.',
            },
            {
              question: 'Do you offer international shipping?',
              answer:
                'Yes, we ship our products globally. Shipping costs and delivery times vary by location.',
            },
          ].map((faq, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
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
