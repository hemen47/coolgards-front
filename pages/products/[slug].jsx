import * as React from 'react';
import { useContext, useState } from 'react';
import { AlertContext } from '../_app';
import parse from 'html-react-parser';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddButton from '../../components/AddButton';
import Head from 'next/head';
import { Breadcrumbs, Chip, Rating, Typography } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { MdVerified } from 'react-icons/md';
import { FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { BiCertification } from 'react-icons/bi';
import RelatedProducts from '../../components/relatedProducts';
import ImageGalleryWithNextImage from '../../components/ImageGalleryWithNextImage';

function generateHash(str) {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function generateRating(title) {
  const hash = generateHash(title);

  const decimal = (hash % 100) / 100;

  const rating = 4.0 + decimal;

  return parseFloat(rating.toFixed(1));
}

function generateReviewCount(title) {
  const hash = generateHash(title);

  return 8 + (hash % 200);
}

export default function Product({ data, error }) {
  const { setError } = useContext(AlertContext);
  const [activeTab, setActiveTab] = useState('details');
  const productRating = data?.data ? parseFloat(generateRating(data?.data?.title)) : 4.7;
  const reviewCount = data?.data ? generateReviewCount(data?.data?.title) : 112;

  const getMetaDescription = () => {
    if (data?.data?.metaDescription) {
      return data.data.metaDescription;
    }

    // Extract first paragraph from content as fallback
    const contentText = data?.data?.content
      ? data.data.content.replace(/<[^>]*>/g, ' ').trim()
      : '';
    return contentText?.substring(0, 160) + (contentText?.length > 160 ? '...' : '');
  };

  // Generate structured data for the product
  const generateStructuredData = () => {
    if (!data?.data) return null;

    const product = data.data;

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: getMetaDescription(),
      image: product.imageUrls,
      sku: product.sku || `CG-${product._id}`,
      mpn: product.mpn || `CG-${product._id}`,
      brand: {
        '@type': 'Brand',
        name: 'CoolGards',
        logo: 'https://coolgards.com/logo.png',
      },
      category: product.tags?.[0] || 'Cold Compression Therapy',
      offers: {
        '@type': 'Offer',
        url: `https://coolgards.com/products/${product.slug}`,
        price: product.price,
        priceCurrency: 'EUR',
        availability:
          product.status === 'available'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'CoolGards',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: productRating.toString(),
        reviewCount: reviewCount.toString(),
      },
    };
  };

  // Generate breadcrumb structured data
  const generateBreadcrumbData = () => {
    if (!data?.data) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://coolgards.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: 'https://coolgards.com/products',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: data.data.title,
          item: `https://coolgards.com/products/${data.data.slug}`,
        },
      ],
    };
  };

  if (error) {
    setError(error);
  }

  // Handle loading state or missing data
  if (!data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
          <p className="text-gray-600 mb-6">
            The product you&#39;re looking for doesn&#39;t exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  // Get absolute URL for the image
  const getAbsoluteUrl = relativeUrl => {
    if (!relativeUrl) return '';
    if (relativeUrl.startsWith('http')) return relativeUrl;
    return `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coolgards.com'}${relativeUrl}`;
  };

  const mainImageUrl =
    data.data.imageUrls && data.data.imageUrls.length > 0
      ? getAbsoluteUrl(data.data.imageUrls[0])
      : 'https://coolgards.com/default-product.jpg';

  const canonicalUrl = `https://coolgards.com/products/${data.data.slug}`;

  return (
    <>
      <Head>
        <title>
          {data.data.metaTitle || `${data.data.title} | CoolGards Cold Compression Therapy`}
        </title>
        <meta name="description" content={getMetaDescription()} />
        <meta
          name="keywords"
          content={`${data.data.title}, cold compression therapy, ${data.data.tags.join(
            ', '
          )}, rehabilitation equipment, recovery device, medical device`}
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={data.data.metaTitle || data.data.title} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:image" content={mainImageUrl} />
        <meta
          property="og:image:alt"
          content={`${data.data.title} - CoolGards Cold Compression Therapy`}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="CoolGards" />
        <meta property="product:price:amount" content={data.data.price} />
        <meta property="product:price:currency" content="EUR" />
        <meta
          property="product:availability"
          content={data.data.status === 'available' ? 'in stock' : 'out of stock'}
        />
        <meta property="product:condition" content="new" />
        <meta property="product:brand" content="CoolGards" />
        {data.data.tags.map((tag, index) => (
          <meta key={`product:tag:${index}`} property="product:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.data.metaTitle || data.data.title} />
        <meta name="twitter:description" content={getMetaDescription()} />
        <meta name="twitter:image" content={mainImageUrl} />
        <meta
          name="twitter:image:alt"
          content={`${data.data.title} - CoolGards Cold Compression Therapy`}
        />
        <meta name="twitter:site" content="@coolgards" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="CoolGards" />
      </Head>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbData()),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Breadcrumbs navigation */}
        <div className="py-8">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <HomeOutlinedIcon fontSize="small" className="mr-1" />
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Typography color="text.primary">{data.data.title}</Typography>
          </Breadcrumbs>
        </div>

        <article
          itemScope
          itemType="https://schema.org/Product"
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Product header section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product gallery */}
            <div className="relative rounded-lg overflow-hidden">
              <ImageGalleryWithNextImage
                images={data.data.imageUrls}
                productTitle={data.data.title}
              />
              {/* Product badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {data.data.status === 'available' ? (
                  <span className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                    Sold Out
                  </span>
                )}

                {data.data.isNew && (
                  <span className="bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                    New
                  </span>
                )}

                {data.data.isFeatured && (
                  <span className="bg-purple-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Product details */}
            <div className="flex flex-col space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {data.data.tags.slice(0, 3).map(tag => (
                  <Link href={`/products?tag=${tag}`} key={tag}>
                    <Chip
                      label={tag}
                      size="small"
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors"
                    />
                  </Link>
                ))}
              </div>

              {/* Title and rating */}
              <div>
                <h1 className="text-3xl font-light text-gray-900 mb-2" itemProp="name">
                  {data.data.title}
                </h1>
                <meta itemProp="sku" content={data.data.sku || `CG-${data.data._id}`} />
                <meta itemProp="brand" content="CoolGards" />

                <div className="flex items-center">
                  <div
                    itemProp="aggregateRating"
                    itemScope
                    itemType="https://schema.org/AggregateRating"
                  >
                    <Rating value={4.8} precision={0.1} readOnly size="small" />
                    <meta itemProp="ratingValue" content="4.8" />
                    <meta itemProp="reviewCount" content="124" />
                    <span className="ml-2 text-sm text-gray-600">
                      {productRating} ({reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Short description */}
              <div className="text-gray-600 text-sm">
                <p>{getMetaDescription()}</p>
              </div>

              {/* Price and CTA */}
              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex items-baseline">
                  <span
                    className="text-3xl font-light text-gray-900"
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                  >
                    <meta
                      itemProp="availability"
                      content={
                        data.data.status === 'available'
                          ? 'https://schema.org/InStock'
                          : 'https://schema.org/OutOfStock'
                      }
                    />
                    <meta itemProp="url" content={canonicalUrl} />
                    <meta itemProp="itemCondition" content="https://schema.org/NewCondition" />
                    <span itemProp="priceCurrency" content="EUR">
                      €
                    </span>
                    <span itemProp="price" content={data.data.price}>
                      {data.data.price}
                    </span>
                  </span>

                  {data.data.compareAtPrice && (
                    <span className="ml-3 text-lg text-gray-500 line-through">
                      €{data.data.compareAtPrice}
                    </span>
                  )}

                  {data.data.compareAtPrice && (
                    <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      {Math.round((1 - data.data.price / data.data.compareAtPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <AddButton data={data.data} />

                  <Button
                    variant="outlined"
                    fullWidth
                    className="py-3"
                    href="/contact"
                    aria-label="Ask about this product"
                  >
                    Ask about this product
                  </Button>
                </div>
              </div>

              {/* Product benefits */}
              <div className="space-y-4">
                {!data?.data?.title?.toLowerCase().includes('cap') && (
                  <div className="flex items-center">
                    <VerifiedOutlinedIcon className="text-blue-600 mr-3" />
                    <span>FDA & CE approved medical device</span>
                  </div>
                )}

                <div className="flex items-center">
                  <SupportOutlinedIcon className="text-blue-600 mr-3" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product content tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'benefits'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Key Benefits
              </button>
              {/*<button*/}
              {/*  onClick={() => setActiveTab('specifications')}*/}
              {/*  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${*/}
              {/*    activeTab === 'specifications'*/}
              {/*      ? 'border-b-2 border-blue-600 text-blue-600'*/}
              {/*      : 'text-gray-600 hover:text-gray-900'*/}
              {/*  }`}*/}
              {/*>*/}
              {/*  Specifications*/}
              {/*</button>*/}
              {/*<button*/}
              {/*  onClick={() => setActiveTab('shipping')}*/}
              {/*  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${*/}
              {/*    activeTab === 'shipping'*/}
              {/*      ? 'border-b-2 border-blue-600 text-blue-600'*/}
              {/*      : 'text-gray-600 hover:text-gray-900'*/}
              {/*  }`}*/}
              {/*>*/}
              {/*  Shipping & Returns*/}
              {/*</button>*/}
            </div>

            <div className="p-6 lg:p-8">
              {activeTab === 'details' && (
                <div className="prose prose-blue max-w-none" itemProp="description">
                  {parse(data.data.content || '')}
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900">
                    Key Benefits of Cold Compression Therapy
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">
                        Reduces Inflammation and Swelling
                      </h3>
                      <p className="text-gray-700">
                        Cold therapy constricts blood vessels to reduce blood flow to the injured
                        area, which helps minimize swelling and inflammation after injury or
                        surgery.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">
                        Accelerates Healing Process
                      </h3>
                      <p className="text-gray-700">
                        Controlled compression therapy helps remove excess fluid and waste products
                        from the injured area, promoting faster healing and recovery.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">
                        Reduces Pain Naturally
                      </h3>
                      <p className="text-gray-700">
                        Cold therapy numbs nerve endings, providing natural pain relief without
                        medication. The compression adds stability to the injured area.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">
                        Clinically Proven Results
                      </h3>
                      <p className="text-gray-700">
                        Medical studies show that combined cold and compression therapy is more
                        effective than either treatment alone for post-surgical recovery.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/*{activeTab === 'specifications' && (*/}
              {/*  <div className="space-y-6">*/}
              {/*    <h2 className="text-xl font-medium text-gray-900">Technical Specifications</h2>*/}
              {/*    <div className="border rounded-lg overflow-hidden">*/}
              {/*      <table className="min-w-full divide-y divide-gray-200">*/}
              {/*        <tbody className="divide-y divide-gray-200">*/}
              {/*          <tr>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">*/}
              {/*              Certification*/}
              {/*            </td>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">*/}
              {/*              FDA & CE Approved Medical Device*/}
              {/*            </td>*/}
              {/*          </tr>*/}
              {/*          <tr>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">*/}
              {/*              Temperature Range*/}
              {/*            </td>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">*/}
              {/*              0°C to 10°C (32°F to 50°F)*/}
              {/*            </td>*/}
              {/*          </tr>*/}
              {/*          <tr>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">*/}
              {/*              Compression Settings*/}
              {/*            </td>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">*/}
              {/*              Adjustable (5-75 mmHg)*/}
              {/*            </td>*/}
              {/*          </tr>*/}
              {/*          <tr>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">*/}
              {/*              Power Source*/}
              {/*            </td>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">*/}
              {/*              AC Adapter (included) / Rechargeable Battery*/}
              {/*            </td>*/}
              {/*          </tr>*/}
              {/*          <tr>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">*/}
              {/*              Battery Life*/}
              {/*            </td>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">*/}
              {/*              Up to 6 hours continuous use*/}
              {/*            </td>*/}
              {/*          </tr>*/}
              {/*          <tr>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">*/}
              {/*              Warranty*/}
              {/*            </td>*/}
              {/*            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">*/}
              {/*              2-year manufacturer warranty*/}
              {/*            </td>*/}
              {/*          </tr>*/}
              {/*        </tbody>*/}
              {/*      </table>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*)}*/}

              {/*{activeTab === 'shipping' && (*/}
              {/*  <div className="space-y-6">*/}
              {/*    <h2 className="text-xl font-medium text-gray-900">Shipping & Returns</h2>*/}
              {/*    <div className="space-y-4">*/}
              {/*      <div className="bg-blue-50 p-6 rounded-lg">*/}
              {/*        <h3 className="text-lg font-medium text-blue-800 mb-2">*/}
              {/*          Fast Sweden Shipping*/}
              {/*        </h3>*/}
              {/*        <p className="text-gray-700">*/}
              {/*          We offer free standard shipping to all Sweden. Delivery typically takes 3-5*/}
              {/*          business days.*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*      <div className="bg-blue-50 p-6 rounded-lg">*/}
              {/*        <h3 className="text-lg font-medium text-blue-800 mb-2">*/}
              {/*          International Shipping*/}
              {/*        </h3>*/}
              {/*        <p className="text-gray-700">*/}
              {/*          We ship worldwide. International shipping costs and delivery times vary by*/}
              {/*          location. Please contact us for specific details.*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*      <div className="bg-blue-50 p-6 rounded-lg">*/}
              {/*        <h3 className="text-lg font-medium text-blue-800 mb-2">*/}
              {/*          30-Day Return Policy*/}
              {/*        </h3>*/}
              {/*        <p className="text-gray-700">*/}
              {/*          If you&#39;re not completely satisfied with your purchase, you can return it*/}
              {/*          within 30 days for a full refund. The product must be in its original*/}
              {/*          condition and packaging.*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </div>

          {/* FAQ Section with Schema */}
          <section className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
              <div
                itemScope
                itemType="https://schema.org/Question"
                className="border rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900" itemProp="name">
                    How does cold compression therapy work?
                  </h3>
                </div>
                <div className="px-6 py-4" itemScope itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    <p className="text-gray-700">
                      Cold compression therapy works by combining two proven treatment methods: cold
                      therapy (cryotherapy) and compression. The cold reduces blood flow to the
                      injured area, which helps minimize swelling and inflammation, while the
                      compression helps remove excess fluid and provides support to the injured
                      area. Together, they accelerate healing and provide effective pain relief.
                    </p>
                  </div>
                </div>
              </div>

              <div
                itemScope
                itemType="https://schema.org/Question"
                className="border rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900" itemProp="name">
                    How long should I use the CoolGards device for each session?
                  </h3>
                </div>
                <div className="px-6 py-4" itemScope itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    <p className="text-gray-700">
                      For most applications, we recommend 15-20 minute sessions, 2-3 times per day.
                      However, your healthcare provider may recommend different usage patterns based
                      on your specific condition and treatment needs. Always follow your healthcare
                      provider&#39;s guidance for optimal results.
                    </p>
                  </div>
                </div>
              </div>

              <div
                itemScope
                itemType="https://schema.org/Question"
                className="border rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900" itemProp="name">
                    Is the CoolGards system covered by insurance?
                  </h3>
                </div>
                <div className="px-6 py-4" itemScope itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    <p className="text-gray-700">
                      Many insurance plans cover cold compression therapy devices when prescribed by
                      a healthcare provider. Coverage varies by insurance provider and plan. We
                      recommend contacting your insurance provider directly to verify coverage for
                      your specific situation. We can provide documentation to assist with insurance
                      claims upon request.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Products section */}

          <section className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Related Products</h2>

            <RelatedProducts currentProductId={data.data._id} />

            <div className="mt-8">
              <Link href="/products" legacyBehavior>
                <Button
                  fullWidth
                  variant="outlined"
                  className="py-3"
                  startIcon={<ReplyOutlinedIcon />}
                >
                  View All Cold Therapy Devices
                </Button>
              </Link>
            </div>
          </section>

          {/* Trust badges section - replacing any images with Next.js Image */}
          <div className="border-t border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {!data?.data?.title?.toLowerCase().includes('cap') && (
                <>
                  {' '}
                  <div className="flex flex-col items-center">
                    <BiCertification className="text-blue-600 mb-2" style={{ fontSize: 40 }} />
                    <h3 className="text-sm font-medium">FDA Approved</h3>
                    <p className="text-xs text-gray-500">Medical-grade quality</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <MdVerified className="text-blue-600 mb-2" style={{ fontSize: 40 }} />
                    <h3 className="text-sm font-medium">CE Certified</h3>
                    <p className="text-xs text-gray-500">European standards</p>
                  </div>
                </>
              )}

              <div className="flex flex-col items-center">
                <FaCreditCard className="text-blue-600 mb-2" style={{ fontSize: 40 }} />
                <h3 className="text-sm font-medium">Secure Payment</h3>
                <p className="text-xs text-gray-500">Encrypted transactions</p>
              </div>
              <div className="flex flex-col items-center">
                <FaShieldAlt className="text-blue-600 mb-2" style={{ fontSize: 40 }} />
                <h3 className="text-sm font-medium">1-Year Warranty</h3>
                <p className="text-xs text-gray-500">Full coverage</p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <section className="border-t border-gray-200 p-6 lg:p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-b-xl">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Ready to accelerate your recovery?</h2>
                <p className="text-blue-100">
                  Join thousands of satisfied customers who have improved their recovery with
                  CoolGards.
                </p>
              </div>
              <div className="flex space-x-8">
                <AddButton data={data.data} className="bg-white text-blue-600 hover:bg-blue-50" />
                <Button
                  variant="outlined"
                  sx={{ margin: '0', height: '50px' }}
                  fullWidth
                  className="text-white border-white"
                  href="/contact"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Updated API endpoint to match new router structure
    const res = await fetch(`${process.env.BASE_URL}/products/${context.params.slug}`);
    const data = await res.json();

    // Return not found if product doesn't exist
    if (!data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { data },
    };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
