import * as React from "react";
import { useContext, useState } from "react";
import { AlertContext } from "../_app";
import ImageGallery from "react-image-gallery";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import Link from "next/link";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddButton from "../../components/AddButton";
import Head from "next/head";
import { Breadcrumbs, Chip, Typography, Rating, Skeleton } from "@mui/material";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { MdVerified} from "react-icons/md";
import { FaShieldAlt, FaCreditCard } from "react-icons/fa";
import { BiCertification } from "react-icons/bi";

export default function Product({ data, error }) {
  const { setError } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  // Handle image loading
  React.useEffect(() => {
    if (data?.data) {
      const preloadImages = () => {
        data.data.imageUrls.forEach((url) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            setIsLoading(false);
          };
        });
      };
      preloadImages();
    }
  }, [data]);

  const sliderItemsGenerator = (urls) => {
    return urls.map((url, index) => {
      return {
        original: url,
        thumbnail: url,
        thumbnailClass: "shadow-md m-4 transition-transform duration-300 hover:scale-110",
        originalAlt: `${data?.data?.title} - Image ${index + 1} - CoolGards Cold Compression Therapy`,
        thumbnailAlt: `Thumbnail ${index + 1} for ${data?.data?.title}`,
        originalHeight: "450px",
        originalWidth: "100%",
        thumbnailHeight: "60px",
        thumbnailWidth: "60px",
        loading: "lazy"
      };
    });
  };

  if (error) {
    setError(error);
  }

  // Extract first paragraph for meta description if available
  const getMetaDescription = () => {
    if (data?.data?.metaDescription) {
      return data.data.metaDescription;
    }

    // Extract first paragraph from content as fallback
    const contentText = data?.data?.content.replace(/<[^>]*>/g, ' ').trim();
    return contentText?.substring(0, 160) + (contentText?.length > 160 ? '...' : '');
  };

  return (
      <>
        <Head>
          <title>{data?.data?.metaTitle || `${data?.data?.title} | CoolGards Cold Compression Therapy`}</title>
          <meta name="description" content={getMetaDescription()} />
          <meta name="keywords" content={`${data?.data?.title}, cold compression therapy, ${data?.data?.tags.join(', ')}, rehabilitation equipment, recovery device`} />
          <link rel="canonical" href={`https://coolgards.com/products/${data?.data?.slug}`} />

          {/* Open Graph tags for social sharing */}
          <meta property="og:title" content={data?.data?.metaTitle || data?.data?.title} />
          <meta property="og:description" content={getMetaDescription()} />
          <meta property="og:image" content={data?.data?.imageUrls[0]} />
          <meta property="og:url" content={`https://coolgards.com/products/${data?.data?.slug}`} />
          <meta property="og:type" content="product" />

          {/* Twitter Card data */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={data?.data?.metaTitle || data?.data?.title} />
          <meta name="twitter:description" content={getMetaDescription()} />
          <meta name="twitter:image" content={data?.data?.imageUrls[0]} />

          {/* Product schema markup for rich results */}
          <script type="application/ld+json">
            {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "${data?.data?.title}",
            "description": "${getMetaDescription().replace(/"/g, '\\"')}",
            "image": "${data?.data?.imageUrls.map(url => url)}",
            "brand": {
              "@type": "Brand",
              "name": "CoolGards"
            },
            "offers": {
              "@type": "Offer",
              "price": "${data?.data?.price}",
              "priceCurrency": "EUR",
              "availability": "${data?.data?.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}",
              "url": "https://coolgards.com/products/${data?.data?.slug}"
            }
          }
        `}
          </script>
        </Head>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          {/* Breadcrumbs navigation */}
          <div className="py-4">
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
              <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <HomeOutlinedIcon fontSize="small" className="mr-1" />
                Home
              </Link>
              <Link href="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Typography color="text.primary">{data?.data?.title}</Typography>
            </Breadcrumbs>
          </div>

          <article itemScope itemType="https://schema.org/Product"
                   className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Product header section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product gallery */}
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                {isLoading ? (
                    <Skeleton variant="rectangular" height={450} animation="wave"/>
                ) : (
                    <ImageGallery
                        showPlayButton={false}
                        showFullscreenButton={true}
                        items={sliderItemsGenerator(data?.data?.imageUrls)}
                        additionalClass="product-gallery"
                        useBrowserFullscreen={true}
                    />
                )}
              </div>

              {/* Product details */}
              <div className="flex flex-col space-y-6">
                {/* Status and tags */}
                <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    data?.data?.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}>
                  {data?.data?.status === 'available' ? 'In Stock' : 'Sold Out'}
                </span>

                  {data?.data?.tags.slice(0, 3).map((tag) => (
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
                    {data?.data?.title}
                  </h1>
                  <div className="flex items-center">
                    <Rating value={4.8} precision={0.1} readOnly size="small"/>
                    <span className="ml-2 text-sm text-gray-600">4.8 (124 reviews)</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="border-t border-b border-gray-200 py-4">
                  <div className="flex items-baseline">
                  <span className="text-3xl font-light text-gray-900" itemProp="offers" itemScope
                        itemType="https://schema.org/Offer">
                    <span itemProp="priceCurrency" content="EUR">€</span>
                    <span itemProp="price" content={data?.data?.price}>{data?.data?.price}</span>
                  </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <AddButton data={data?.data}/>

                    <Button
                        variant="outlined"
                        fullWidth
                        className="py-3"
                        href="/contact"
                    >
                      Ask about this product
                    </Button>
                  </div>
                </div>

                {/* Product benefits */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <LocalShippingOutlinedIcon className="text-blue-600 mr-3"/>
                    <span>Free shipping in europe</span>
                  </div>
                  <div className="flex items-center">
                    <VerifiedOutlinedIcon className="text-blue-600 mr-3"/>
                    <span>FDA & CE approved medical device</span>
                  </div>
                  <div className="flex items-center">
                    <SupportOutlinedIcon className="text-blue-600 mr-3"/>
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product content tabs */}
            <div className="border-t border-gray-200">
              <div className="flex border-b">
                <button
                    onClick={() => setActiveTab("details")}
                    className={`px-6 py-3 text-sm font-medium ${
                        activeTab === "details"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Product Details
                </button>
                <button
                    onClick={() => setActiveTab("benefits")}
                    className={`px-6 py-3 text-sm font-medium ${
                        activeTab === "benefits"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Key Benefits
                </button>
                <button
                    onClick={() => setActiveTab("specifications")}
                    className={`px-6 py-3 text-sm font-medium ${
                        activeTab === "specifications"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Specifications
                </button>
              </div>

              <div className="p-6 lg:p-8">
                {activeTab === "details" && (
                    <div className="prose prose-blue max-w-none" itemProp="description">
                      {parse(data?.data?.content || '')}
                    </div>
                )}

                {activeTab === "benefits" && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-medium text-gray-900">Key Benefits of Cold Compression Therapy</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-lg font-medium text-blue-800 mb-2">Reduces Inflammation and Swelling</h3>
                          <p className="text-gray-700">
                            Cold therapy constricts blood vessels to reduce blood flow to the injured area, which helps
                            minimize swelling and inflammation after injury or surgery. [[0]](#__0)
                          </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-lg font-medium text-blue-800 mb-2">Accelerates Healing Process</h3>
                          <p className="text-gray-700">
                            Controlled compression therapy helps remove excess fluid and waste products from the injured
                            area, promoting faster healing and recovery. [[1]](#__1)
                          </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-lg font-medium text-blue-800 mb-2">Reduces Pain Naturally</h3>
                          <p className="text-gray-700">
                            Cold therapy numbs nerve endings, providing natural pain relief without medication. The
                            compression adds stability to the injured area. [[2]](#__2)
                          </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-lg font-medium text-blue-800 mb-2">Clinically Proven Results</h3>
                          <p className="text-gray-700">
                            Medical studies show that combined cold and compression therapy is more effective than
                            either treatment alone for post-surgical recovery. [[3]](#__3)
                          </p>
                        </div>
                      </div>
                    </div>
                )}

                {activeTab === "specifications" && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-medium text-gray-900">Technical Specifications</h2>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">Certification</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">FDA & CE Approved Medical
                              Device
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Temperature
                              Range
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">0°C to 10°C (32°F to
                              50°F)
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Compression
                              Settings
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Adjustable (5-75 mmHg)
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Power
                              Source
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">AC Adapter (included) /
                              Rechargeable Battery
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Battery
                              Life
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Up to 6 hours continuous
                              use
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Warranty</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-year manufacturer
                              warranty
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                )}
              </div>
            </div>

            {/* Related products section */}
            <section className="border-t border-gray-200 bg-gray-50 p-6 lg:p-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Related Categories</h2>
              <div className="flex flex-wrap gap-3">
                {data?.data.tags.map((tag) => (
                    <Link href={`/products?tag=${tag}`} key={tag}>
                      <Chip
                          label={tag}
                          className="bg-gray-700 text-white hover:bg-gray-600 cursor-pointer transition-colors px-4 py-3"
                      />
                    </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/products" legacyBehavior>
                  <Button
                      fullWidth
                      variant="outlined"
                      className="py-3"
                      startIcon={<ReplyOutlinedIcon/>}
                  >
                    View All Cold Therapy Devices
                  </Button>
                </Link>
              </div>
            </section>

            {/* Trust badges */}
            <div className="border-t border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <BiCertification className="text-blue-600 mb-2" style={{fontSize: 40}}/>
                  <h3 className="text-sm font-medium">FDA Approved</h3>
                  <p className="text-xs text-gray-500">Medical-grade quality</p>
                </div>
                <div className="flex flex-col items-center">
                  <MdVerified className="text-blue-600 mb-2" style={{fontSize: 40}}/>
                  <h3 className="text-sm font-medium">CE Certified</h3>
                  <p className="text-xs text-gray-500">European standards</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaCreditCard className="text-blue-600 mb-2" style={{fontSize: 40}}/>
                  <h3 className="text-sm font-medium">Secure Payment</h3>
                  <p className="text-xs text-gray-500">Encrypted transactions</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaShieldAlt className="text-blue-600 mb-2" style={{fontSize: 40}}/>
                  <h3 className="text-sm font-medium">2-Year Warranty</h3>
                  <p className="text-xs text-gray-500">Full coverage</p>
                </div>
              </div>
            </div>
          </article>
        </main>
      </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Updated API endpoint to match new router structure
    const res = await fetch(
        `${process.env.BASE_URL}/products/${context.params.slug}`
    );
    const data = await res.json();

    // Return not found if product doesn't exist
    if (!data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {data},
    };
  } catch (err) {
    return {props: {error: err.response?.data?.message || err.message}};
  }
}
