import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ShipmentPolicy() {
  // SEO metadata
  const pageTitle = 'Shipping Policy | COOLGARDS';
  const pageDescription =
    'Learn about COOLGARDS shipping methods, delivery timeframes, international shipping options, and our free shipping policy for Sweden customers.';
  const canonicalUrl = 'https://coolgards.com/shipping-policy';
  const ogImage = 'https://coolgards.com/cover.webp';

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

  // Structured data for shipping policy page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'COOLGARDS Shipping Policy',
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
        name: 'Shipping Policy',
      },
    },
  };

  // FAQ schema for rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is shipping free in Sweden?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, COOLGARDS provides complimentary shipping services to customers within Sweden.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does shipping take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The estimated shipping time for deliveries is approximately 2 to 3 working days within Europe.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is your shipping partner?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We entrust the safe and secure delivery of your goods to our shipping partners',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there additional fees for international shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For international shipments, customs fees, tariffs, and taxes may apply and vary depending on the destination country. These charges are the responsibility of the customer.',
        },
      },
    ],
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
          content="COOLGARDS shipping, free shipping to Sweden, international shipping, shipping timeframes"
        />
        <meta name="author" content="COOLGARDS" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white pt-28">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[url('/about.svg')] bg-center bg-repeat"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-white">COOLGARDS</span> Shipping Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Fast, reliable shipping to your doorstep
          </p>
          <div className="mt-6">
            <p className="text-sm text-blue-100">Last Updated: May 2025</p>
          </div>
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
                Shipping Policy
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            {/* European Shipping Section */}
            <section className="mb-10">
              <div className="mb-6 flex items-center">
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
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">European Shipping</h2>
              </div>

              <div className="mb-6 rounded-lg bg-blue-50 p-6">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-600 p-2">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-blue-800">
                    Free Shipping Throughout Sweden
                  </p>
                </div>
                <p className="mt-4 text-gray-700">
                  We provide complimentary shipping services to all customers within Sweden. Your
                  order will be carefully packaged and shipped via our partners for reliable
                  delivery.
                </p>
              </div>

              <p className="mb-6 text-lg text-gray-700">
                All orders are promptly processed within one business day, excluding weekends and
                holidays. The estimated shipping time for deliveries is approximately 2 to 3 working
                days. Please note that while we strive to meet these timelines, we have limited
                control over the actual delivery process.
              </p>

              <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-800">Order Tracking</h3>
                <p className="text-gray-700">
                  To help you stay updated on your order&#39;s progress, a confirmation email
                  containing tracking information will be automatically sent within 24 hours of
                  shipment.
                </p>
              </div>
            </section>

            {/* International Shipping Section */}
            <section className="mb-10">
              <div className="mb-6 flex items-center">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">International Shipping</h2>
              </div>

              <p className="mb-6 text-lg text-gray-700">
                For international shipments outside of Europe, it&#39;s important to mention that
                customs fees, tariffs, and taxes may apply and vary depending on the destination
                country. These charges are the sole responsibility of the customer.
              </p>

              <div className="mb-6 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
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
                      Important Information About International Orders
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Please be aware that international shipments may be subject to:</p>
                      <ul className="mt-1 list-disc pl-5 space-y-1">
                        <li>Import duties and taxes levied by the destination country</li>
                        <li>Customs clearance delays</li>
                        <li>Additional documentation requirements</li>
                        <li>Longer delivery timeframes (typically 7-14 business days)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping FAQ Section */}
            <section>
              <div className="mb-6 flex items-center">
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Shipping FAQ</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <button className="flex w-full items-center justify-between text-left">
                    <span className="font-medium text-gray-800">
                      What happens if my package is lost?
                    </span>
                  </button>
                  <div className="mt-2 text-gray-700">
                    <p>
                      In the rare event that your package is lost during transit, please contact us
                      at {companyInfo.email}
                      with your order number. We&#39;ll work with our shipping partner to locate
                      your package or process a replacement shipment.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <button className="flex w-full items-center justify-between text-left">
                    <span className="font-medium text-gray-800">
                      Can I change my shipping address after placing an order?
                    </span>
                  </button>
                  <div className="mt-2 text-gray-700">
                    <p>
                      Address changes must be requested within 2 hours of placing your order. Please
                      contact us immediately at {companyInfo.email} with your order number and the
                      new shipping address.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <button className="flex w-full items-center justify-between text-left">
                    <span className="font-medium text-gray-800">Do you ship to P.O. boxes?</span>
                  </button>
                  <div className="mt-2 text-gray-700">
                    <p>
                      Yes, we can ship to P.O. boxes within Europe. For international orders, we
                      recommend using a physical address to ensure smoother customs processing.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Information */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Shipping Questions or Concerns?
            </h2>

            <div className="rounded-lg bg-gray-50 p-6">
              <p className="mb-4 text-gray-700">
                If you have any questions about our shipping policy or need assistance tracking your
                order, please don&#39;t hesitate to contact us:
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="mb-1 font-semibold text-gray-800">Address</h3>
                  <address className="not-italic">
                    {companyInfo.address.street}
                    <br />
                    {companyInfo.address.city}, {companyInfo.address.postal}
                    <br />
                    {companyInfo.address.country}
                  </address>
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
            <p>This shipping policy was last updated on May 12, 2025.</p>
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
    // Re-generate at most once per month
    revalidate: 2592000, // in seconds (30 days)
  };
}
