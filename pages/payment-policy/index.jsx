import * as React from "react";
import styles from "./payment.module.scss";
import Image from "next/image";
import Head from "next/head"; // Import Head for metadata [[0]](#__0)
import Link from "next/link"; // Import Link for internal navigation [[1]](#__1)
import { JsonLd } from "react-schemaorg"; // For structured data (install with npm) [[2]](#__2)

export default function PaymentPolicy() {
  // Define SEO metadata
  const pageTitle = "Payment Policy | COOLGARDS - Secure Payment Options";
  const pageDescription = "Learn about COOLGARDS' secure payment methods including credit cards and PayPal. We prioritize your security with encrypted transactions and never share your payment information.";
  const canonicalUrl = "https://coolgards.com/payment-policy"; // Replace with your actual URL [[3]](#__3)

  return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="keywords" content="COOLGARDS payment, secure payment options, credit card payment, PayPal payment, payment security" /> {/* Keywords for search engines [[0]](#__0) */}
          <meta name="robots" content="index, follow" /> {/* Allow search engines to index [[1]](#__1) */}
          <link rel="canonical" href={canonicalUrl} /> {/* Prevent duplicate content issues [[2]](#__2) */}

          {/* Open Graph tags for social sharing [[0]](#__0) */}
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content="https://coolgards.com/images/payment-security.jpg" /> {/* Replace with actual image URL [[1]](#__1) */}

          {/* Twitter Card tags [[2]](#__2) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content="https://coolgards.com/images/payment-security.jpg" /> {/* Replace with actual image URL [[3]](#__3) */}
        </Head>

        {/* JSON-LD structured data for better search results [[0]](#__0) */}
        <JsonLd
          item={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": pageTitle,
          "description": pageDescription,
          "publisher": {
            "@type": "Organization",
            "name": "COOLGARDS",
            "logo": {
              "@type": "ImageObject",
              "url": "https://coolgards.com/logo.png" // Replace with actual logo URL [[1]](#__1)
            }
          },
          "mainEntity": {
            "@type": "WebContent",
            "about": {
              "@type": "Thing",
              "name": "Payment Methods"
            }
          }
        }}
          />

          <div className={styles.container}>
            {/* Breadcrumb navigation for better SEO [[2]](#__2) */}
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <ol itemScope itemType="https://schema.org/BreadcrumbList" className={styles.breadcrumbList}>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/" itemProp="item">
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
                  <span itemProp="name">Payment Policy</span>
                  <meta itemProp="position" content="2" />
                </li>
              </ol>
            </nav>

            <div className={styles.bg}>
              <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                <div className="mt-5 max-w-xl text-center mx-auto">
                  <h1 className="block text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                    <span className="text-logo">COOLGARDS</span> Payment Policy
                  </h1>
                </div>

                {/* Last updated date for freshness signals [[3]](#__3) */}
                <div className="text-center text-sm text-gray-500 mt-4">
                  Last Updated: April 12, 2025
                </div>

                <div className="mt-8 max-w-3xl text-center mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">Secure Payment Methods</h2> {/* Added H2 heading for better structure [[0]](#__0) */}
                  <p className="text-lg text-gray-800 text-justify mb-4">
                    Payment for your purchases is made by credit card through the secure online payment system. We accept all major credit cards, as well as payments made through PayPal. PayPal is a safer, easier way to send and receive money online. Your credit card information is not processed through or stored on coolgards.com servers, and no information is ever released to a third party.
                  </p>

                  {/* Additional content sections for better keyword coverage [[1]](#__1) */}
                  <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Security</h2>
                  <p className="text-lg text-gray-800 text-justify mb-4">
                    At COOLGARDS, we prioritize your payment security. All transactions are encrypted using industry-standard SSL technology to ensure your personal and financial information remains protected. Our payment processing complies with PCI DSS (Payment Card Industry Data Security Standard) requirements for maximum security.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4 mt-8">Accepted Payment Methods</h2>
                  <p className="text-lg text-gray-800 text-justify mb-4">
                    We currently accept the following payment methods for all purchases on our website:
                  </p>

                  {/* List format for better readability [[2]](#__2) */}
                  <ul className="text-left text-lg text-gray-800 list-disc pl-8 mb-6">
                    <li>Visa</li>
                    <li>MasterCard</li>
                    <li>American Express</li>
                    <li>Discover</li>
                    <li>PayPal</li>
                  </ul>

                  <h2 className="text-2xl font-semibold mb-4 mt-8">Billing Process</h2>
                  <p className="text-lg text-gray-800 text-justify mb-4">
                    When you complete a purchase, your card will be charged immediately. You will receive an email confirmation with your order details and payment receipt. For subscription-based services, your card will be automatically billed according to your selected payment schedule until you cancel your subscription.
                  </p>
                </div>

                <div className="flex justify-center mt-8">
                  <figure> {/* Added figure element for better semantics [[3]](#__3) */}
                    <Image
                        width={375}
                        height={134}
                        src='/payments.jpg'
                        alt="Available payment methods including Visa, MasterCard, American Express, Discover, and PayPal"
                        loading="lazy" // Lazy loading for better performance [[0]](#__0)
                    />
                    <figcaption className="text-sm text-center text-gray-500 mt-2">Secure payment options accepted by COOLGARDS</figcaption> {/* Added caption [[1]](#__1) */}
                  </figure>
                </div>

                {/* FAQ section for additional keyword opportunities [[2]](#__2) */}
                <div className="mt-12 max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Is it safe to use my credit card on your website?</h3>
                    <p className="text-gray-800">Yes, all transactions on our website are secured with SSL encryption technology. We never store your complete credit card information on our servers.</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">When will my card be charged?</h3>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-2">Do you offer refunds?</h3>
                    <p className="text-gray-800">Please refer to our <Link href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link> for detailed information about our refund process.</p>
                  </div>
                </div>

                {/* CTA section for better conversion [[3]](#__3) */}
                <div className="mt-12 text-center">
                  <h2 className="text-2xl font-semibold mb-4">Ready to Make a Purchase?</h2>
                  <p className="mb-6">Shop with confidence knowing your payment information is secure.</p>
                  <Link href="/products" className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Our Products
                  </Link>
                </div>

                {/* Contact information for questions [[0]](#__0) */}
                <div className="mt-12 text-center text-gray-700">
                  <p>If you have any questions about our payment policy, please <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.</p>
                </div>
              </div>
            </div>
          </div>
        </>
          );
            }

          // Use getStaticProps for better performance [[1]](#__1)
          export async function getStaticProps() {
          return {
          props: {},
          // Re-generate at most once per week
          revalidate: 604800, // in seconds
        };
        }
