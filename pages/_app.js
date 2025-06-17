import './globals.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainMenu from '../components/MainMenu';
import Authenticator from '../components/Authenticator';
import PanelSideBar from '../components/PanelSideBar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../components/Footer';
import Head from 'next/head';
import Shipment from '../components/shipment';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import NextTopLoader from 'nextjs-toploader';
import { ax } from '../utils/axios';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/captions.css';

export const UserContext = createContext();
export const AlertContext = createContext();
export const CartContext = createContext();

// SEO configuration
const SEO_CONFIG = {
  titleTemplate: '%s | CoolGards - Cold + Compression Therapy',
  defaultTitle: 'CoolGards - Cold + Compression Therapy Systems',
  description:
    'CoolGards offers FDA & CE approved Cold + Compression Therapy devices for post-injury rehabilitation, pain relief, and swelling reduction. Perfect for clinics, athletic training rooms, and home use.',
  canonical: 'https://coolgards.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coolgards.com',
    siteName: 'CoolGards',
    title: 'CoolGards - Cold + Compression Therapy Systems',
    description:
      'Medical-grade cold compression therapy devices for rehabilitation, pain relief, and swelling reduction. FDA & CE approved.',
    images: [
      {
        url: 'https://coolgards.com/og.webp',
        width: 1228,
        height: 797,
        alt: 'CoolGards Cold + Compression Therapy System',
      },
    ],
  },
  twitter: {
    handle: '@coolgards',
    site: '@coolgards',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'cold compression therapy, rehabilitation, pain relief, swelling reduction, medical device, sports injury, post-surgery recovery',
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
  const [user, setUser] = useState(null); // Initialize as null instead of empty string
  const [isLoadingUser, setIsLoadingUser] = useState(true); // Add loading state
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(null);

  // Fetch user data on app initialization and store in state
  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is authenticated according to localStorage
      const isAuthenticated = localStorage.getItem('authenticated') === 'true';

      if (isAuthenticated) {
        try {
          const response = await ax.get('/api/users/me');
          setUser(response.data.data);
        } catch (err) {
          // If token is invalid, clear authentication state
          console.error('Error fetching user data:', err);
          localStorage.removeItem('authenticated');
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoadingUser(false);
    };

    fetchUserData();
  }, []);

  // Persist user state changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('authenticated', 'true');
      // Optionally store minimal user info in localStorage for faster initial render
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          id: user?.id,
          roles: user?.roles,
        })
      );
    }
  }, [user]);

  // read cart from local storage for the first time
  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(window.localStorage.getItem('cart')));
    }
  }, []);

  // write cart to local storage on change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    import('preline');
  }, []);

  // Track page views for analytics
  useEffect(() => {
    const handleRouteChange = url => {
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
      !router.pathname.includes('/panel') &&
      router.pathname !== '/login' &&
      router.pathname !== '/signup'
    )
      return <MainMenu />;
  };

  const renderPanelSideBar = () => {
    if (router.pathname.includes('/panel') && user?.roles?.includes('admin'))
      return <PanelSideBar />;
  };

  const renderFooter = () => {
    if (!router.pathname.includes('/panel')) {
      return <Footer />;
    }
  };

  const handleCloseAlert = () => {
    setError('');
    setMessage('');
  };

  // Show loading state while checking authentication
  if (isLoadingUser && router.pathname.includes('/panel')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'CoolGards',
                    url: 'https://coolgards.com',
                    logo: 'https://coolgards.com/logo.png', // Update with actual logo URL
                    description:
                      'CoolGards offers FDA & CE approved Cold + Compression Therapy devices for rehabilitation, pain relief, and swelling reduction.',
                    sameAs: [
                      'https://facebook.com/coolgards',
                      'https://twitter.com/coolgards',
                      'https://instagram.com/coolgards',
                    ],
                    contactPoint: {
                      '@type': 'ContactPoint',
                      telephone: '+1-778-776-2417',
                      contactType: 'customer service',
                      availableLanguage: ['English'],
                    },
                    address: {
                      '@type': 'PostalAddress',
                      addressCountry: 'US', // Update with your actual location
                    },
                  }),
                }}
              />
              {/* Product structured data - add to product pages dynamically */}
            </Head>
            <NextTopLoader />
            <Shipment />
            <Authenticator />
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} variant="filled" severity={'error'}>
                {error}
              </Alert>
            </Snackbar>
            <Snackbar open={!!message} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} variant="filled" severity={'success'}>
                {message}
              </Alert>
            </Snackbar>

            {renderMainMenu()}
            {renderPanelSideBar()}
            {router.pathname.includes('/panel') && !user?.roles?.includes('admin') ? (
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-red-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Access Required</h2>
                  <p className="text-gray-600 mb-6">
                    You need to be logged in as an administrator to access this page.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => router.push('/login?redirect=' + router.pathname)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push('/')}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              </div>
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
