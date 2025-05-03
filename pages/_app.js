import "./globals.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainMenu from "../components/MainMenu";
import Authenticator from "../components/Authenticator";
import PanelSideBar from "../components/PanelSideBar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Footer from "../components/Footer";
import Head from "next/head";
import Shipment from "../components/shipment";
import Script from "next/script";
import { DefaultSeo } from 'next-seo';
import NextTopLoader from 'nextjs-toploader';

export const UserContext = createContext();
export const AlertContext = createContext();
export const CartContext = createContext();

// SEO configuration
const SEO_CONFIG = {
  titleTemplate: '%s | CoolGards - Cold + Compression Therapy',
  defaultTitle: 'CoolGards - Cold + Compression Therapy Systems',
  description: 'CoolGards offers FDA & CE approved Cold + Compression Therapy devices for post-injury rehabilitation, pain relief, and swelling reduction. Perfect for clinics, athletic training rooms, and home use.',
  canonical: 'https://coolgards.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coolgards.com',
    siteName: 'CoolGards',
    title: 'CoolGards - Cold + Compression Therapy Systems',
    description: 'Medical-grade cold compression therapy devices for rehabilitation, pain relief, and swelling reduction. FDA & CE approved.',
    images: [
      {
        url: 'https://coolgards.com/images/og-image.jpg', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'CoolGards Cold + Compression Therapy System',
      },
    ],
  },
  twitter: {
    handle: '@coolgards', // Replace with your Twitter handle
    site: '@coolgards',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'cold compression therapy, rehabilitation, pain relief, swelling reduction, medical device, sports injury, post-surgery recovery',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);

  // read cart from local storage for the first time
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(window.localStorage.getItem("cart")));
    }
  }, []);

  // write cart to local storage on change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    import("preline");
  }, []);

  // Track page views for analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const renderMainMenu = () => {
    if (
        !router.pathname.includes("/panel") &&
        router.pathname !== "/login" &&
        router.pathname !== "/signup"
    )
      return <MainMenu />;
  };
  const renderPanelSideBar = () => {
    if (router.pathname.includes("/panel") && user.roles?.includes("admin"))
      return <PanelSideBar />;
  };

  const renderFooter = () => {
    if (!router.pathname.includes("/panel")) {
      return <Footer />;
    }
  };

  const handleCloseAlert = () => {
    setError("");
    setMessage("");
  };

  return (
      <>
        <DefaultSeo {...SEO_CONFIG} />
        <AlertContext.Provider value={{ setMessage, setError }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <UserContext.Provider value={{ user, setUser }}>
              <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {/* Preconnect to domains for performance */}
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://www.google-analytics.com" />
                {/* Structured data for rich results */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "CoolGards",
                        "url": "https://coolgards.com",
                        "logo": "https://coolgards.com/logo.png", // Update with actual logo URL
                        "description": "CoolGards offers FDA & CE approved Cold + Compression Therapy devices for rehabilitation, pain relief, and swelling reduction.",
                        "sameAs": [
                          "https://facebook.com/coolgards", // Replace with actual social links
                          "https://twitter.com/coolgards",
                          "https://instagram.com/coolgards"
                        ],
                        "contactPoint": {
                          "@type": "ContactPoint",
                          "telephone": "+1-123-456-7890", // Replace with actual contact number
                          "contactType": "customer service",
                          "availableLanguage": ["English"]
                        },
                        "address": {
                          "@type": "PostalAddress",
                          "addressCountry": "US" // Update with your actual location
                        }
                      })
                    }}
                />
                {/* Product structured data - add to product pages dynamically */}
              </Head>
              <NextTopLoader />
              <Shipment />
              <Authenticator />
              <Snackbar
                  open={!!error}
                  autoHideDuration={6000}
                  onClose={handleCloseAlert}
              >
                <Alert
                    onClose={handleCloseAlert}
                    variant="filled"
                    severity={"error"}
                >
                  {error}
                </Alert>
              </Snackbar>
              <Snackbar
                  open={!!message}
                  autoHideDuration={6000}
                  onClose={handleCloseAlert}
              >
                <Alert
                    onClose={handleCloseAlert}
                    variant="filled"
                    severity={"success"}
                >
                  {message}
                </Alert>
              </Snackbar>

              {renderMainMenu()}
              {renderPanelSideBar()}
              {router.pathname.includes("/panel") &&
              !user.roles?.includes("admin") ? (
                  "Please Login As Admin"
              ) : (
                  <Component {...pageProps} />
              )}
              {renderFooter()}

              {/* Google Analytics - fixed the quotes issue */}
              <Script
                  strategy="afterInteractive"
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
              </Script>
            </UserContext.Provider>
          </CartContext.Provider>
        </AlertContext.Provider>
      </>
  );
}

export default MyApp;
