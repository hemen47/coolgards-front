import * as React from "react";
import styles from "./refund.module.scss";
import Head from "next/head";
import Link from "next/link";

export default function RefundPolicy() {
  // FAQ schema for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long do I have to return trading cards to COOLGARDS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must notify us of your intention to return within 7 days of receiving your delivery."
        }
      },
      {
        "@type": "Question",
        "name": "What condition must returned trading cards be in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Products must be returned in the original state with all elements (accessories, packaging, instructions, etc.)."
        }
      },
      {
        "@type": "Question",
        "name": "Who pays for shipping on returned trading cards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Return shipping costs are the customer's responsibility regardless of the reason for return."
        }
      }
    ]
  };

  return (
      <>
        <Head>
          <title>Trading Card Return & Refund Policy | COOLGARDS</title>
          <meta name="description" content="COOLGARDS offers a 7-day return policy on trading cards and collectibles. Learn about our fair refund process, exchange options, and return conditions." />
          <meta name="keywords" content="trading card returns, collectible card refunds, COOLGARDS return policy, trading card exchange policy, TCG refund policy" />
          <link rel="canonical" href="https://coolgards.com/refund-policy" />

          {/* Open Graph Tags */}
          <meta property="og:title" content="Trading Card Return & Refund Policy | COOLGARDS" />
          <meta property="og:description" content="COOLGARDS offers a 7-day return policy on trading cards and collectibles. Learn about our fair refund process, exchange options, and return conditions." />
          <meta property="og:url" content="https://coolgards.com/refund-policy" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://coolgards.com/images/refund-policy-og.jpg" />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Trading Card Return & Refund Policy | COOLGARDS" />
          <meta name="twitter:description" content="COOLGARDS offers a 7-day return policy on trading cards and collectibles. Learn about our fair refund process, exchange options, and return conditions." />
          <meta name="twitter:image" content="https://coolgards.com/images/refund-policy-twitter.jpg" />

          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Head>

        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <ol className="flex text-sm text-gray-500">
              <li className="flex items-center">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <svg className="mx-2 h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </li>
              <li className="flex items-center">
                <Link href="/customer-service" className="hover:text-blue-600">Customer Service</Link>
                <svg className="mx-2 h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </li>
              <li aria-current="page">Refund Policy</li>
            </ol>
          </nav>

          <div className={styles.titleContainer}>
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
              <div className="mt-5 max-w-xl text-center mx-auto">
                <h1 className="block text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                  <span className="text-logo">COOLGARDS</span> Refund Policy
                </h1>
              </div>

              {/* Last updated timestamp for freshness signals */}
              <p className="text-sm text-gray-500 text-center mt-3 mb-8">
                Last Updated: April 12, 2025
              </p>

              <div className={styles.contentContainer}>
                <section id="overview">
                  <h2 className="text-2xl font-bold mb-4">Trading Card Return Policy Overview</h2>
                  <p className="mb-6 text-lg">
                    At <strong>COOLGARDS</strong>, we are committed to providing you with the highest
                    quality trading cards and collectibles, ensuring excellent value for your investment.
                    However, if you find yourself unsatisfied with your order or product
                    for any reason, we kindly request that you notify us of your intention
                    to return it within <strong>7 days</strong> of receiving your delivery. Your
                    satisfaction is our top priority, and we will do our best to address
                    any concerns you may have.
                  </p>
                </section>

                <section id="legal-guarantees">
                  <h2 className="text-2xl font-bold mb-4">Legal Guarantees for Trading Card Purchases</h2>
                  <p className="mb-6 text-lg">
                    All our collectible trading cards and products benefit from the legal guarantee of conformity and
                    the guarantee against hidden defects. In the event of non-compliance
                    of a product sold, it may be returned, exchanged or refunded. All
                    complaints, requests for exchange or refund must be made by email to
                    <a href="mailto:returns@coolgards.com" className="text-blue-600 hover:underline ml-1">returns@coolgards.com</a> within
                    <strong> 7 days</strong> of delivery.
                  </p>
                </section>

                <section id="return-condition">
                  <h2 className="text-2xl font-bold mb-4">Trading Card Return Conditions</h2>
                  <p className="mb-6 text-lg">
                    The trading cards and collectibles must be returned to us in the state in which you received
                    them with all the elements (accessories, packaging, instructions,
                    protective sleeves, etc.). For sealed products, the original packaging must remain unopened
                    and undamaged to be eligible for a full refund.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold mb-2">Special Conditions for Collectible Cards:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Graded cards must be returned in their original cases</li>
                      <li>Sealed booster packs and boxes must remain factory sealed</li>
                      <li>Individual cards must be returned in the same protective sleeves or cases</li>
                      <li>Limited edition items may have special return restrictions</li>
                    </ul>
                  </div>
                </section>

                <section id="return-costs">
                  <h2 className="text-2xl font-bold mb-4">Return Shipping Costs</h2>
                  <p className="mb-6 text-lg">
                    Note that the return costs are your responsibility whatever the
                    reason. We recommend using tracked shipping methods to ensure your valuable
                    collectibles can be monitored throughout the return process. Once we receive
                    and verify your return, refunds will be processed within 3-5 business days.
                  </p>
                </section>

                <section id="exchange-options">
                  <h2 className="text-2xl font-bold mb-4">Exchange Options</h2>
                  <p className="mb-6 text-lg">
                    Instead of a refund, you may choose to exchange your item for another product of equal value.
                    For exchanges to higher-priced items, you will need to pay the difference. For exchanges to
                    lower-priced items, we will refund the difference to your original payment method.
                  </p>
                </section>

                <section id="non-returnable-items">
                  <h2 className="text-2xl font-bold mb-4">Non-Returnable Trading Card Items</h2>
                  <p className="mb-6 text-lg">
                    The following items cannot be returned or exchanged:
                  </p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Opened booster packs, boxes, or sealed products</li>
                    <li>Digital codes or online redemption cards that have been revealed</li>
                    <li>Items marked as &quot;Final Sale&quot; or &quot;As-Is&quot;</li>
                    <li>Custom or personalized card orders</li>
                    <li>Items damaged after delivery due to improper handling</li>
                  </ul>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-bold mb-4">Contact Our Trading Card Specialists</h2>
                  <p className="mb-6 text-lg">
                    If you have any questions about returning trading cards or our refund policy, please contact
                    our customer service team:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p><strong>Email:</strong> <a href="mailto:support@coolgards.com" className="text-blue-600 hover:underline">support@coolgards.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+18005551234" className="text-blue-600 hover:underline">1-800-555-1234</a></p>
                    <p><strong>Hours:</strong> Monday-Friday, 9am-5pm EST</p>
                  </div>
                </section>
              </div>

              {/* Related Policies Section */}
              <section className="mt-12 border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Related Policies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/shipping-policy" className="p-4 border rounded hover:bg-gray-50">
                    <h3 className="font-bold">Shipping Policy</h3>
                    <p className="text-sm text-gray-600">Learn about our shipping methods, timeframes, and tracking information.</p>
                  </Link>
                  <Link href="/grading-policy" className="p-4 border rounded hover:bg-gray-50">
                    <h3 className="font-bold">Card Grading Policy</h3>
                    <p className="text-sm text-gray-600">Understand how we grade and authenticate collectible trading cards.</p>
                  </Link>
                  <Link href="/terms-of-service" className="p-4 border rounded hover:bg-gray-50">
                    <h3 className="font-bold">Terms of Service</h3>
                    <p className="text-sm text-gray-600">Review our complete terms and conditions for using our services.</p>
                  </Link>
                  <Link href="/privacy-policy" className="p-4 border rounded hover:bg-gray-50">
                    <h3 className="font-bold">Privacy Policy</h3>
                    <p className="text-sm text-gray-600">How we collect, use, and protect your personal information.</p>
                  </Link>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mt-12 border-t pt-6" id="faq">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">How do I initiate a return for trading cards?</h3>
                    <p>Email returns@coolgards.com within 7 days of delivery with your order number and reason for return. Our team will provide you with return instructions and a return authorization number.</p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">Can I return opened booster packs?</h3>
                    <p>No, once a sealed product like a booster pack has been opened, it cannot be returned due to the nature of trading card products.</p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">How long does it take to process my refund?</h3>
                    <p>Once we receive your return, we&apos;ll inspect the items within 2 business days. If approved, your refund will be processed within 3-5 business days. The time it takes to appear in your account depends on your payment method and financial institution.</p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-bold mb-2">Do you offer store credit instead of refunds?</h3>
                    <p>Yes, we offer store credit with a 10% bonus value compared to cash refunds. This credit can be used on any future purchase and does not expire.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
  );
}
