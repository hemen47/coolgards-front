import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  // SEO metadata
  const pageTitle = 'Privacy Policy | COOLGARDS';
  const pageDescription =
    'Learn about how COOLGARDS collects, uses, and protects your personal information. Our privacy policy explains your rights and our practices regarding your data.';
  const canonicalUrl = 'https://coolgards.com/privacy-policy';
  const ogImage = 'https://coolgards.com/og.webp';

  // Structured data for privacy policy page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'COOLGARDS Privacy Policy',
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
        name: 'Privacy Policy',
      },
    },
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
          content="COOLGARDS privacy policy, data protection, personal information, privacy rights, cookies policy"
        />
        <meta name="author" content="COOLGARDS" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white pt-28">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[url('/about.svg')] bg-center bg-repeat"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-white">COOLGARDS</span> Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            How we collect, use, and protect your personal information
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
                Privacy Policy
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-8 border-b border-gray-200 pb-6">
              <h2 className="mb-4 text-3xl font-bold text-gray-800">PRIVACY STATEMENT</h2>
              <p className="text-gray-600">
                This Privacy Policy describes how COOLGARDS collects, uses, and shares your personal
                information when you visit our website or make a purchase.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                WHAT DO WE DO WITH YOUR INFORMATION?
              </h2>
              <div className="rounded-lg bg-blue-50 p-6">
                <p className="text-gray-700">
                  When you purchase something from our store, as part of the buying and selling
                  process, we collect the personal information you give us such as your name,
                  address, phone number and email address. With your permission, we may send you
                  emails about our store, new products and other updates.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                YOUR INFORMATION IS <span className="text-blue-600">NOT</span> DISCLOSED TO OUTSIDE
                PARTIES
              </h2>
              <p className="mb-4 text-gray-700">
                We do not sell your Personal Information to third parties for their marketing or any
                other purposes. We may provide or make your Personal Information available to:
              </p>
              <ul className="ml-6 list-disc space-y-3 text-gray-700">
                <li>
                  Our employees, the staff in order to enable them to assist us to interact with you
                  via our Platforms for the marketing, ordering or delivery of goods.
                </li>
                <li>
                  Law enforcement, government officials, fraud detection agencies or other third
                  parties when the disclosure of Personal Information is necessary or appropriate in
                  connection with an investigation of fraud, intellectual property infringements, or
                  other activity that is illegal or may expose us to legal liability or financial
                  loss, to report or support the investigation into suspected illegal activity.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">CONSENT</h2>
              <p className="text-gray-700">
                When you provide us with personal information to complete a transaction, verify your
                credit card, place an order, arrange for a delivery, or return a purchase, we imply
                that you consent to our collecting it and using it for that specific reason only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                OPT-OUT FROM DIRECT MARKETING
              </h2>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <p className="text-gray-700">
                  You have the right to request us not to contact you for purposes of direct
                  marketing by any form of electronic communication, by contacting us at{' '}
                  <a href="mailto:info@coolgards.com" className="text-blue-600 hover:underline">
                    info@coolgards.com
                  </a>
                  .
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">DISCLOSURE</h2>
              <p className="text-gray-700">
                We may disclose your personal information if we are required by law to do so or if
                you violate our Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">THIRD-PARTY SERVICES</h2>
              <p className="text-gray-700">
                In general, the third-party providers used by us will only collect, use and disclose
                your information to the extent necessary to allow them to perform the services they
                provide to us. However, certain third-party service providers, such as payment
                gateways and other payment transaction processors, have their own privacy policies
                in respect to the information we are required to provide to them for your
                purchase-related transactions. Once you leave our store&#39;s website or are
                redirected to a third-party website or application, you are no longer governed by
                this Privacy Policy or our website&#39;s Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">COOKIES</h2>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="text-gray-700">
                  Cookies are small files that a site or its service provider transfers to your
                  computer&#39;s hard drive through your Web browser that enables the site&#39;s or
                  service provider&#39;s systems to recognize your browser and capture and remember
                  certain information.
                </p>
                <div className="mt-4 flex items-center rounded-lg bg-blue-100 p-3 text-sm text-blue-800">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>You can manage cookie preferences through your browser settings.</span>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                CHANGES TO THIS PRIVACY POLICY
              </h2>
              <p className="text-gray-700">
                We reserve the right to modify this privacy policy at any time, so please review it
                frequently. Changes and clarifications will take effect immediately upon their
                posting on the website.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                QUESTIONS AND CONTACT INFORMATION
              </h2>
              <div className="rounded-lg bg-blue-50 p-6">
                <p className="text-gray-700">
                  We welcome your questions, comments, and concerns about privacy. Please contact at{' '}
                  <a href="mailto:info@coolgards.com" className="text-blue-600 hover:underline">
                    info@coolgards.com
                  </a>{' '}
                  with all feedback pertaining to privacy, or any other issue as well.
                </p>
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

          {/* Additional Information */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl font-bold text-gray-800">Your Privacy Rights</h3>
              <p className="text-gray-700">
                Depending on your location, you may have certain rights regarding your personal
                data, such as the right to access, correct, or delete your information.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl font-bold text-gray-800">Data Security</h3>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information from
                unauthorized access, alteration, or disclosure.
              </p>
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

          {/* Last Updated Section */}
          <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-600">
            <p>This privacy policy was last updated on May 1, 2025.</p>
          </div>
        </div>
      </div>
    </>
  );
}
