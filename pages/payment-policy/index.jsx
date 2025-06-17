import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from 'react-schemaorg';

export default function PaymentPolicy() {
  // SEO metadata
  const pageTitle = 'Payment Policy | COOLGARDS - Secure Payment Options';
  const pageDescription =
    "Learn about COOLGARDS' secure payment methods including credit cards and PayPal. We prioritize your security with encrypted transactions and never share your payment information.";
  const canonicalUrl = 'https://coolgards.com/payment-policy';
  const ogImage = 'https://coolgards.com/og.webp';

  // Company information
  const companyInfo = {
    phone: '+1-778-776-2417',
    email: 'info@coolgards.com',
    address: {
      street: '8518 Glenlyon Parkway #132, Burnaby',
      city: 'Burnaby',
      country: 'Canada',
      postal: 'V5J 2X9',
    },
  };

  // Payment methods
  const paymentMethods = [
    { name: 'Visa', icon: '/visa.webp' },
    { name: 'MasterCard', icon: '/master-card.webp' },
    { name: 'American Express', icon: '/american-express.png' },
    { name: 'PayPal', icon: '/paypal.webp' },
  ];

  // FAQ schema for rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is it safe to use my credit card on your website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all transactions on our website are secured with SSL encryption technology. We never store your complete credit card information on our servers.',
        },
      },
      {
        '@type': 'Question',
        name: 'When will my card be charged?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When you complete a purchase, your card will be charged immediately. You will receive an email confirmation with your order details and payment receipt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer refunds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Please refer to our Refund Policy for detailed information about our refund process.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept Visa, MasterCard, American Express, Discover, and PayPal.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="COOLGARDS payment, secure payment options, credit card payment, PayPal payment, payment security, online transactions, encrypted payments"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags for social sharing */}
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
      </Head>

      {/* JSON-LD structured data for better search results */}
      <JsonLd
        item={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          publisher: {
            '@type': 'Organization',
            name: 'COOLGARDS',
            logo: {
              '@type': 'ImageObject',
              url: 'https://coolgards.com/logo.png',
            },
          },
          mainEntity: {
            '@type': 'WebContent',
            about: {
              '@type': 'Thing',
              name: 'Payment Methods',
            },
          },
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 pt-28 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[url('/about.svg')] bg-center bg-repeat"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-white">COOLGARDS</span> Payment Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Secure, convenient payment options for your peace of mind
          </p>
          <div className="mt-6">
            <p className="text-sm text-blue-100">Last Updated: April 12, 2025</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-2">
          <nav aria-label="Breadcrumb">
            <ol
              className="flex text-sm text-gray-600"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link href="/" className="hover:text-blue-600" itemProp="item">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
                <svg className="mx-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              ></li>
              <li
                aria-current="page"
                className="text-blue-600"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name">Payment Policy</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Overview Section */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <section className="mb-10">
              <h2 className="mb-6 text-3xl font-bold text-gray-800">Secure Payment Methods</h2>
              <div className="mb-8 rounded-lg bg-blue-50 p-6">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-3">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-blue-800">
                    Your security is our top priority
                  </p>
                </div>
                <p className="mt-4 text-gray-700">
                  Payment for your purchases is made by credit card through our secure online
                  payment system. We accept all major credit cards, as well as payments made through
                  PayPal. Your credit card information is not processed through or stored on
                  coolgards.com servers, and no information is ever released to a third party.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  Accepted Payment Methods
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {paymentMethods.map(method => (
                    <div
                      key={method.name}
                      className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-2 h-12 w-12">
                        <Image
                          src={method.icon}
                          alt={`${method.name} logo`}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="text-center text-sm font-medium text-gray-800">
                        {method.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="mb-8 text-center">
                <Image
                  width={375}
                  height={134}
                  src="/payments.jpg"
                  alt="Available payment methods including Visa, MasterCard, American Express, Discover, and PayPal"
                  className="mx-auto rounded-lg"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-sm text-gray-500">
                  Secure payment options accepted by COOLGARDS
                </figcaption>
              </figure>
            </section>

            {/* Payment Security Section */}
            <section className="mb-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Payment Security</h2>
              <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">SSL Encryption</h3>
                    <p className="mt-1 text-gray-700">
                      All transactions are encrypted using industry-standard SSL technology to
                      ensure your personal and financial information remains protected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">PCI DSS Compliance</h3>
                    <p className="mt-1 text-gray-700">
                      Our payment processing complies with PCI DSS (Payment Card Industry Data
                      Security Standard) requirements for maximum security.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">No Stored Card Data</h3>
                    <p className="mt-1 text-gray-700">
                      We never store your complete credit card information on our servers, ensuring
                      your sensitive data remains protected.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Billing Process Section */}
            <section className="mb-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Billing Process</h2>
              <div className="mb-6 rounded-lg bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-medium text-gray-800">How Our Billing Works</h3>
                <ol className="ml-6 list-decimal space-y-4 text-gray-700">
                  <li>
                    <strong>Immediate Processing:</strong> When you complete a purchase, your card
                    will be charged immediately.
                  </li>
                  <li>
                    <strong>Order Confirmation:</strong> You will receive an email confirmation with
                    your order details and payment receipt.
                  </li>
                  <li>
                    <strong>Subscription Billing (if applicable):</strong> For subscription-based
                    services, your card will be automatically billed according to your selected
                    payment schedule until you cancel your subscription.
                  </li>
                  <li>
                    <strong>Secure Transaction:</strong> All payment information is encrypted and
                    processed securely.
                  </li>
                </ol>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Important Note About Charges
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Please ensure your payment method has sufficient funds before placing an
                        order. Failed payment attempts may result in order processing delays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Currency and International Payments */}
            <section className="mb-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Currency and International Payments
              </h2>
              <p className="mb-6 text-gray-700">
                All prices on our website are displayed in Euros (€). If you&#39;re paying with a
                card issued in a different currency, your bank will convert the amount using their
                exchange rate, which may include additional fees. PayPal users may have the option
                to choose their preferred currency for the transaction.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-lg font-medium text-gray-800">Exchange Rates</h3>
                  <p className="text-gray-700">
                    Currency exchange rates are determined by your payment provider and may
                    fluctuate daily.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-lg font-medium text-gray-800">International Fees</h3>
                  <p className="text-gray-700">
                    Some banks may charge international transaction fees for purchases made from
                    foreign merchants.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  Is it safe to use my credit card on your website?
                </h3>
                <p className="text-gray-700">
                  Yes, all transactions on our website are secured with SSL encryption technology.
                  We never store your complete credit card information on our servers.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  When will my card be charged?
                </h3>
                <p className="text-gray-700">
                  Your card will be charged immediately when you complete your purchase. You&#39;ll
                  receive an email confirmation with your order details and payment receipt.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">Do you offer refunds?</h3>
                <p className="text-gray-700">
                  Please refer to our{' '}
                  <Link href="/refund-policy" className="text-blue-600 hover:underline">
                    Refund Policy
                  </Link>{' '}
                  for detailed information about our refund process.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">What if my payment fails?</h3>
                <p className="text-gray-700">
                  If your payment fails, you&#39;ll receive an error message during checkout. Please
                  verify your payment details and try again, or use an alternative payment method.
                  If problems persist, please contact our customer support team.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">Is PayPal safe to use?</h3>
                <p className="text-gray-700">
                  Yes, PayPal is a secure payment platform that allows you to pay without sharing
                  your financial information. PayPal also offers buyer protection policies for
                  eligible purchases.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white shadow-lg">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold">Ready to Make a Purchase?</h2>
              <p className="mb-6 text-lg">
                Shop with confidence knowing your payment information is secure.
              </p>
              <Link
                href="/products"
                className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-gray-100"
              >
                Browse Our Products
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Payment Questions or Concerns?
            </h2>

            <div className="rounded-lg bg-gray-50 p-6">
              <p className="mb-4 text-gray-700">
                If you have any questions about our payment policy or experience any issues with
                your transaction, please don&#39;t hesitate to contact us:
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <svg
                    className="mx-auto mb-2 h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="mb-1 font-semibold text-gray-800">Email</h3>
                  <a href={`mailto:${companyInfo.email}`} className="text-blue-600 hover:underline">
                    {companyInfo.email}
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <svg
                    className="mx-auto mb-2 h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <h3 className="mb-1 font-semibold text-gray-800">Phone</h3>
                  <a href={`tel:${companyInfo.phone}`} className="text-blue-600 hover:underline">
                    {companyInfo.phone}
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <svg
                    className="mx-auto mb-2 h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <h3 className="mb-1 font-semibold text-gray-800">Live Chat</h3>
                  <p className="text-sm text-gray-600">Available Monday-Friday</p>
                  <p className="text-sm text-gray-600">9:00 AM - 5:00 PM CET</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Contact Us
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Policies Section */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Related Policies</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/shipment-policy"
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="mb-2 font-bold text-gray-800">Shipment Policy</h3>
                <p className="text-sm text-gray-600">
                  Learn about our shipping methods, timeframes, and tracking information.
                </p>
                <div className="mt-auto pt-4 text-blue-600">Read more →</div>
              </Link>

              <Link
                href="/privacy-policy"
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="mb-2 font-bold text-gray-800">Privacy Policy</h3>
                <p className="text-sm text-gray-600">
                  How we collect, use, and protect your personal information.
                </p>
                <div className="mt-auto pt-4 text-blue-600">Read more →</div>
              </Link>

              <Link
                href="/payment-policy"
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="mb-2 font-bold text-gray-800">Payment Policy</h3>
                <p className="text-sm text-gray-600">
                  Details about supported payments and billing process.
                </p>
                <div className="mt-auto pt-4 text-blue-600">Read more →</div>
              </Link>

              <Link
                href="/refund-policy"
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="mb-2 font-bold text-gray-800">Refund Policy</h3>
                <p className="text-sm text-gray-600">
                  Learn more about our return conditions and procedures.
                </p>
                <div className="mt-auto pt-4 text-blue-600">Read more →</div>
              </Link>
            </div>
          </div>

          {/* Last Updated Information */}
          <div className="text-center text-sm text-gray-500">
            <p>This payment policy was last updated on April 12, 2025.</p>
            <p className="mt-2">
              For questions about this policy, please contact{' '}
              <a href={`mailto:${companyInfo.email}`} className="text-blue-600 hover:underline">
                {companyInfo.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Use getStaticProps for better performance
export async function getStaticProps() {
  return {
    props: {},
    // Re-generate at most once per week
    revalidate: 604800, // in seconds
  };
}
