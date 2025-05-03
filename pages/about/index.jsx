import * as React from 'react';
import styles from './about.module.scss';
import Link from 'next/link';
import Head from 'next/head'; // Add Head component for SEO
import Image from 'next/image'; // Add Next.js Image component

export default function About() {
  // Define meta content for SEO
  const pageTitle = 'About COOLGARDS | Rehabilitation Services & Products';
  const pageDescription =
    'COOLGARD provides comprehensive rehabilitation treatment services and premium products for athletes, physiotherapists, and health-conscious individuals.';
  const canonicalUrl = 'https://coolgards.com/about'; // Replace with your actual domain

  // Structured data for organization
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'COOLGARDS',
    url: 'https://coolgards.com',
    logo: 'https://coolgards.com/logo.png', // Replace with actual logo URL
    description:
      'COOLGARD provides comprehensive rehabilitation treatment services and premium products for athletes, physiotherapists, and health-conscious individuals.',
    sameAs: [
      'https://facebook.com/coolgards', // Replace with actual social media URLs
      'https://twitter.com/coolgards',
      'https://instagram.com/coolgards',
      'https://linkedin.com/company/coolgards',
    ],
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
        <meta property="og:image" content="https://coolgards.com/about-image.jpg" />{' '}
        {/* Replace with actual image URL */}
        {/* Twitter Card tags  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://coolgards.com/about-image.jpg" />{' '}
        {/* Replace with actual image URL */}
        {/* Additional meta tags for better SEO  */}
        <meta
          name="keywords"
          content="rehabilitation, physiotherapy, athletes, health products, COOLGARDS"
        />
        <meta name="author" content="COOLGARDS" />
        {/* JSON-LD structured data  */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.about}>
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
            <div className="mt-5 max-w-xl text-center mx-auto">
              <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                About <span className="text-logo">COOLGARDS</span>
              </h1>
            </div>

            {/* Optional: Add a hero image for better visual appeal and SEO  */}
            <div className="mt-8 text-center">
              <Image
                src="/images/about-hero.jpg" // Replace with your actual image path
                alt="COOLGARDS team providing rehabilitation services"
                width={800}
                height={400}
                priority // Load with priority as it's above the fold
                className="rounded-lg mx-auto"
              />
            </div>

            <div className="mt-5 max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-600 text-justify">
                COOLGARD was established with the aim of providing customers a comprehensive range
                of services for rehabilitation treatment, along with offering premium and affordable
                products and services. Our target audience includes professional and amateur
                athletes, as well as health professionals such as physiotherapists, and individuals
                who seek to maintain a healthy lifestyle.
              </p>
            </div>

            <div className="mt-8 max-w-3xl text-center mx-auto">
              <section aria-labelledby="quality-policy">
                {' '}
                {/* Semantic HTML  */}
                <h2 id="quality-policy" className="text-2xl font-bold mb-4 text-gray-800">
                  QUALITY POLICY
                </h2>
                <p className="text-lg text-gray-800 text-justify">
                  Our mission is to meet the high demands of our customers through continuous
                  product development. We are dedicated to achieving a leading position in the
                  industry we operate in. We carefully analyze any information related to
                  non-conformance or customer dissatisfaction and utilize it as valuable input for
                  improvement purposes.
                </p>
              </section>
            </div>

            {/* Add more structured content sections  */}
            <div className="mt-8 max-w-3xl text-center mx-auto">
              <section aria-labelledby="our-values">
                <h2 id="our-values" className="text-2xl font-bold mb-4 text-gray-800">
                  OUR VALUES
                </h2>
                <ul className="text-left list-disc pl-5 text-lg text-gray-800">
                  <li>Customer-focused rehabilitation solutions</li>
                  <li>Continuous innovation in health products</li>
                  <li>Professional expertise and knowledge sharing</li>
                  <li>Commitment to quality and affordability</li>
                </ul>
              </section>
            </div>

            <div className="text-center mt-10">
              <Link
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6"
                href="/contact"
                aria-label="Contact COOLGARDS for rehabilitation services" // Accessibility improvement
              >
                Please feel free to contact us!
                <svg
                  className="w-2.5 h-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true" // Accessibility improvement
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Add getStaticProps for better SEO performance
export async function getStaticProps() {
  // You can fetch any additional data needed for the about page here
  // For example, company stats, team members, etc.

  return {
    props: {
      // Add any props you want to pass to the component
    },
    // Re-generate at most once per day
    revalidate: 86400, // in seconds
  };
}
