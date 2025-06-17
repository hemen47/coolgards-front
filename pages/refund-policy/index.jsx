import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function RefundPolicy() {
  // FAQ schema for rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long do I have to return products to COOLGARDS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You must notify us of your intention to return within 7 days of receiving your delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'What condition must returned products be in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Products must be returned in the original state with all elements (accessories, packaging, instructions, etc.).',
        },
      },
      {
        '@type': 'Question',
        name: 'Who pays for shipping on returned products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Return shipping costs are the customer's responsibility regardless of the reason for return.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do I initiate a return?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Email info@coolgards.com within 7 days of delivery with your order number and reason for return.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to process my refund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Once we receive your return, we'll inspect the items within 2 business days. If approved, your refund will be processed within 3-5 business days.",
        },
      },
    ],
  };

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

  // Additional structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'COOLGARDS',
    url: 'https://coolgards.com',
    logo: 'https://coolgards.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyInfo.phone,
      email: companyInfo.email,
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address.street,
      addressLocality: companyInfo.address.city,
      postalCode: companyInfo.address.postal,
      addressCountry: companyInfo.address.country,
    },
  };

  return (
    <>
      <Head>
        <title>Return & Refund Policy | COOLGARDS</title>
        <meta
          name="description"
          content="COOLGARDS offers a 7-day return policy on all products. Learn about our fair refund process, exchange options, and return conditions."
        />
        <meta
          name="keywords"
          content="COOLGARDS return policy, product refunds, return conditions, exchange policy, refund process"
        />
        <link rel="canonical" href="https://coolgards.com/refund-policy" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Return & Refund Policy | COOLGARDS" />
        <meta
          property="og:description"
          content="COOLGARDS offers a 7-day return policy on all products. Learn about our fair refund process, exchange options, and return conditions."
        />
        <meta property="og:url" content="https://coolgards.com/refund-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://coolgards.com/og.webp" />
        <meta property="og:site_name" content="COOLGARDS" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Return & Refund Policy | COOLGARDS" />
        <meta
          name="twitter:description"
          content="COOLGARDS offers a 7-day return policy on all products. Learn about our fair refund process, exchange options, and return conditions."
        />
        <meta
          name="twitter:image"
          content="https://coolgards.com/images/refund-policy-twitter.jpg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white pt-28">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[url('/about.svg')] bg-center bg-repeat"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-white">COOLGARDS</span> Refund Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Our commitment to your satisfaction and fair return process
          </p>
          <div className="mt-6">
            <p className="text-sm text-blue-100">Last Updated: May 2025</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
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
                Refund Policy
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Main Content */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <section id="overview" className="mb-10">
              <div className="mb-6 border-b border-gray-200 pb-6">
                <h2 className="mb-4 text-3xl font-bold text-gray-800">Return Policy Overview</h2>
                <p className="text-lg text-gray-700">
                  At <strong>COOLGARDS</strong>, we are committed to providing you with the highest
                  quality products, ensuring excellent value for your investment. However, if you
                  find yourself unsatisfied with your order or product for any reason, we kindly
                  request that you notify us of your intention to return it within{' '}
                  <strong>7 days</strong> of receiving your delivery. Your satisfaction is our top
                  priority, and we will do our best to address any concerns you may have.
                </p>
              </div>
            </section>

            <section id="legal-guarantees" className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Legal Guarantees for Purchases
              </h2>
              <div className="rounded-lg bg-blue-50 p-6">
                <p className="text-gray-700">
                  All our products benefit from the legal guarantee of conformity and the guarantee
                  against hidden defects. In the event of non-compliance of a product sold, it may
                  be returned, exchanged or refunded. All complaints, requests for exchange or
                  refund must be made by email to{' '}
                  <a href={`mailto:${companyInfo.email}`} className="text-blue-600 hover:underline">
                    {companyInfo.email}
                  </a>{' '}
                  within <strong>7 days</strong> of delivery.
                </p>
              </div>
            </section>

            <section id="return-condition" className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Return Conditions</h2>
              <p className="mb-6 text-gray-700">
                The products must be returned to us in the state in which you received them with all
                the elements (accessories, packaging, instructions, etc.). For sealed products, the
                original packaging must remain unopened and undamaged to be eligible for a full
                refund.
              </p>

              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  Special Return Conditions:
                </h3>
                <ul className="ml-6 list-disc space-y-2 text-gray-700">
                  <li>Products must be in their original condition</li>
                  <li>Sealed packages must remain factory sealed</li>
                  <li>All accessories and documentation must be included</li>
                  <li>Limited edition items may have special return restrictions</li>
                </ul>
              </div>
            </section>

            <section id="return-costs" className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Return Shipping Costs</h2>
              <div className="flex items-start rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="mr-3 flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <strong>Important:</strong> Return shipping costs are your responsibility
                  regardless of the reason for return. We recommend using tracked shipping methods
                  to ensure your valuable items can be monitored throughout the return process. Once
                  we receive and verify your return, refunds will be processed within 3-5 business
                  days.
                </p>
              </div>
            </section>

            <section id="exchange-options" className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Exchange Options</h2>
              <p className="mb-6 text-gray-700">
                Instead of a refund, you may choose to exchange your item for another product of
                equal value. For exchanges to higher-priced items, you will need to pay the
                difference. For exchanges to lower-priced items, we will refund the difference to
                your original payment method.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Store Credit</h3>
                  <p className="text-gray-700">
                    We offer store credit with a 5% bonus value compared to cash refunds. This
                    credit can be used on any future purchase and does not expire.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Direct Exchange</h3>
                  <p className="text-gray-700">
                    We can exchange your product for an identical replacement if the original was
                    defective or damaged.
                  </p>
                </div>
              </div>
            </section>

            <section id="non-returnable-items" className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Non-Returnable Items</h2>
              <p className="mb-4 text-gray-700">
                The following items cannot be returned or exchanged:
              </p>
              <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700">
                <li>Opened sealed products</li>
                <li>Digital codes or online redemption items that have been revealed</li>
                <li>Items marked as &#34;Final Sale&#34; or &#34;As-Is&#34;</li>
                <li>Custom or personalized orders</li>
                <li>Items damaged after delivery due to improper handling</li>
              </ul>
            </section>

            <section id="refund-process" className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Refund Process Timeline</h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Refund Timeline</h3>
                      <p className="mt-1 text-gray-600">
                        Once we receive your return, we&#39;ll inspect the items within 2 business
                        days. If approved, your refund will be processed within 3-5 business days.
                        The time it takes to appear in your account depends on your payment method
                        and financial institution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="mb-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Contact Information</h2>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-2 text-gray-700">
                  If you have any questions about our refund policy, please contact us:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-1 h-5 w-5 text-blue-600"
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
                    <span>
                      <strong>Email:</strong>{' '}
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {companyInfo.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-1 h-5 w-5 text-blue-600"
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
                    <span>
                      <strong>Phone:</strong>{' '}
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {companyInfo.phone}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-1 h-5 w-5 text-blue-600"
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
                    <span>
                      <strong>Address:</strong>
                      <br />
                      {companyInfo.address.street}
                      <br />
                      {companyInfo.address.city}, {companyInfo.address.postal}
                      <br />
                      {companyInfo.address.country}
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
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
            </section>
          </div>

          {/* FAQ Section */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg" id="faq">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  How do I initiate a return?
                </h3>
                <p className="text-gray-700">
                  Email {companyInfo.email} within 7 days of delivery with your order number and
                  reason for return. Our team will provide you with return instructions and a return
                  authorization number.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  Can I return opened products?
                </h3>
                <p className="text-gray-700">
                  No, once a sealed product has been opened, it cannot be returned due to the nature
                  of our products.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  How long does it take to process my refund?
                </h3>
                <p className="text-gray-700">
                  Once we receive your return, we&#39;ll inspect the items within 2 business days.
                  If approved, your refund will be processed within 3-5 business days. The time it
                  takes to appear in your account depends on your payment method and financial
                  institution.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  Do you offer store credit instead of refunds?
                </h3>
                <p className="text-gray-700">
                  Yes, we offer store credit with a 5% bonus value compared to cash refunds. This
                  credit can be used on any future purchase and does not expire.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  What if my item arrives damaged?
                </h3>
                <p className="text-gray-700">
                  If your item arrives damaged, please take photos of the damage and contact us at{' '}
                  {companyInfo.email}
                  within 48 hours of receiving your package. We&#39;ll work with you to resolve the
                  issue promptly.
                </p>
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
            <p>This refund policy was last updated on May 12, 2025.</p>
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
    // Re-generate at most once per week
    revalidate: 604800, // in seconds
  };
}
