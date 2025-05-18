import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AlertContext } from '../_app';
import Link from 'next/link';
import Button from '@mui/material/Button';
import AddButton from '../../components/AddButton';
import Head from 'next/head';
import {
  Breadcrumbs,
  Chip,
  TextField,
  InputAdornment,
  Skeleton,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import { useRouter } from 'next/router';

export default function Products({ data, error, currentPage, totalPages, productsPerPage }) {
  const { setError } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [sortOption, setSortOption] = useState('price-high');
  const router = useRouter();

  // Error handling
  if (error) {
    setError(error);
  }

  // Fix: Check if data exists and has a data property
  const products = data?.data || [];
  const totalProducts = data?.total || 0;

  // Extract all unique tags from products
  const allTags = React.useMemo(() => {
    const tags = new Set();
    products.forEach(product => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [products]);

  // Handle image loading
  useEffect(() => {
    if (products.length > 0) {
      const preloadImages = () => {
        let loadedCount = 0;
        const totalImages = Math.min(products.length, 6); // Preload first 6 images

        products.slice(0, 6).forEach(product => {
          if (product.imageUrls && product.imageUrls.length > 0) {
            const img = new Image();
            img.src = product.imageUrls[0];
            img.onload = () => {
              loadedCount++;
              if (loadedCount >= totalImages) {
                setIsLoading(false);
              }
            };
          }
        });

        // Fallback in case some images fail to load
        setTimeout(() => setIsLoading(false), 1500);
      };

      preloadImages();
    } else {
      setIsLoading(false);
    }
  }, [products]);

  // Handle sort change with server-side sorting
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);

    // Map frontend sort options to backend sort parameters
    let sortParams;
    switch (newSortOption) {
      case 'newest':
        sortParams = { sort: 'createdAt', order: 'desc' };
        break;
      case 'oldest':
        sortParams = { sort: 'createdAt', order: 'asc' };
        break;
      case 'price-high':
        sortParams = { sort: 'price', order: 'desc' };
        break;
      case 'price-low':
        sortParams = { sort: 'price', order: 'asc' };
        break;
      case 'name-asc':
        sortParams = { sort: 'title', order: 'asc' };
        break;
      case 'name-desc':
        sortParams = { sort: 'title', order: 'desc' };
        break;
      default:
        sortParams = { sort: 'createdAt', order: 'desc' };
    }

    // Navigate with updated sort parameters
    router.push({
      pathname: '/products',
      query: {
        ...router.query,
        sort: sortParams.sort,
        order: sortParams.order,
        page: 1 // Reset to first page when sorting changes
      }
    });
  };

  // Filter products based on search term and tags (client-side filtering)
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
          product =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (product.tags &&
                  product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Apply tag filters
    if (activeTags.length > 0) {
      result = result.filter(
          product => product.tags && activeTags.every(tag => product.tags.includes(tag))
      );
    }

    setFilteredProducts(result);
  }, [products, searchTerm, activeTags]);

// Initialize sortOption from URL on component mount
  useEffect(() => {
    const { sort, order } = router.query;

    if (sort && order) {
      // Map backend sort parameters to frontend sort options
      if (sort === 'createdAt' && order === 'desc') {
        setSortOption('newest');
      } else if (sort === 'createdAt' && order === 'asc') {
        setSortOption('oldest');
      } else if (sort === 'price' && order === 'desc') {
        setSortOption('price-high');
      } else if (sort === 'price' && order === 'asc') {
        setSortOption('price-low');
      } else if (sort === 'title' && order === 'asc') {
        setSortOption('name-asc');
      } else if (sort === 'title' && order === 'desc') {
        setSortOption('name-desc');
      }
    } else {
      // Default sort option
      setSortOption('price-high');
    }
  }, []);

  // Handle tag toggle
  const toggleTag = tag => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    // Navigate to the new page with query parameters
    router.push({
      pathname: '/products',
      query: {
        ...router.query,
        page: value
      }
    });

    // Scroll to top of product grid
    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate structured data for product list
  const generateStructuredData = () => {
    const itemListElements = products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        image: product.imageUrls[0],
        url: `https://coolgards.com/products/${product.slug}`,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'EUR',
        },
      },
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: itemListElements,
    };
  };

  // Determine which products to display - use filtered products if search/tags are active
  const displayProducts = searchTerm || activeTags.length > 0 ? filteredProducts : products;

  return (
      <>
        <Head>
          <title>Cold Compression Therapy Devices | CoolGards Medical Equipment</title>
          <meta
              name="description"
              content="Explore CoolGards' innovative cold compression therapy devices for post-injury rehabilitation, pain relief, and swelling reduction. FDA & CE approved medical equipment."
          />
          <meta
              name="keywords"
              content="cold compression therapy, cold therapy device, compression therapy, rehabilitation equipment, post-surgery recovery, sports injury treatment"
          />
          <link rel="canonical" href="https://coolgards.com/products" />

          {/* Open Graph tags for social sharing */}
          <meta property="og:title" content="Cold Compression Therapy Devices | CoolGards" />
          <meta
              property="og:description"
              content="Explore CoolGards' innovative cold compression therapy devices for rehabilitation and recovery."
          />
          <meta property="og:image" content="https://coolgards.com/images/products-banner.jpg" />
          <meta property="og:url" content="https://coolgards.com/products" />
          <meta property="og:type" content="website" />

          {/* Twitter Card data */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Cold Compression Therapy Devices | CoolGards" />
          <meta
              name="twitter:description"
              content="Explore CoolGards' innovative cold compression therapy devices for rehabilitation and recovery."
          />
          <meta name="twitter:image" content="https://coolgards.com/images/products-banner.jpg" />

          {/* Schema markup for products page */}
          <script type="application/ld+json">{JSON.stringify(generateStructuredData())}</script>
        </Head>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          {/* Breadcrumbs navigation */}
          <div className="py-4">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <HomeOutlinedIcon fontSize="small" className="mr-1" />
                Home
              </Link>
              <Typography color="text.primary">Products</Typography>
            </Breadcrumbs>
          </div>

          {/* Hero section - Reduced size */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-8 max-w-3xl">
              <h1 className="text-3xl font-light text-white mb-3">
                Cold Compression Therapy Devices
              </h1>
              <p className="text-blue-100 text-base mb-4">
                FDA & CE approved medical equipment for faster recovery and pain relief
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip label="Medical Grade" size="small" className="bg-white text-blue-700" />
                <Chip label="Post-Surgery Recovery" size="small" className="bg-white text-blue-700" />
                <Chip label="Sports Injuries" size="small" className="bg-white text-blue-700" />
              </div>
            </div>
          </div>

          {/* Search and filter section */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="w-full md:w-1/2">
                <TextField
                    fullWidth
                    placeholder="Search products..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                      ),
                    }}
                />
              </div>

              <div className="flex items-center gap-2">
                <FormControl variant="outlined" size="small" className="min-w-[180px]">
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                      labelId="sort-select-label"
                      value={sortOption}
                      onChange={e => handleSortChange(e.target.value)}
                      label="Sort By"
                      startAdornment={
                        <InputAdornment position="start">
                          <SortIcon fontSize="small" />
                        </InputAdornment>
                      }
                  >
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="oldest">Oldest First</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="name-asc">Name: A to Z</MenuItem>
                    <MenuItem value="name-desc">Name: Z to A</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Tags filter */}
            <div className="mt-3">
              <div className="flex items-center mb-2">
                <FilterListIcon fontSize="small" className="mr-2" />
                <Typography variant="subtitle2">Filter by Tags:</Typography>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                    <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onClick={() => toggleTag(tag)}
                        color={activeTags.includes(tag) ? 'primary' : 'default'}
                        variant={activeTags.includes(tag) ? 'filled' : 'outlined'}
                        className="cursor-pointer"
                    />
                ))}
              </div>
            </div>

            {/* Active filters */}
            {(activeTags.length > 0 || searchTerm) && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Typography variant="body2" className="text-gray-600">
                    Active filters:
                  </Typography>

                  {searchTerm && (
                      <Chip
                          label={`Search: ${searchTerm}`}
                          onDelete={() => setSearchTerm('')}
                          size="small"
                      />
                  )}

                  {activeTags.map(tag => (
                      <Chip key={tag} label={tag} onDelete={() => toggleTag(tag)} size="small" />
                  ))}

                  {(activeTags.length > 0 || searchTerm) && (
                      <Button
                          variant="text"
                          size="small"
                          onClick={() => {
                            setActiveTags([]);
                            setSearchTerm('');
                          }}
                      >
                        Clear All
                      </Button>
                  )}
                </div>
            )}
          </div>

          {/* Results summary */}
          <div className="flex justify-between items-center mb-4">
            <Typography variant="body2" className="text-gray-600">
              Showing {displayProducts.length > 0 ? ((currentPage - 1) * productsPerPage) + 1 : 0}-
              {Math.min(currentPage * productsPerPage, searchTerm || activeTags.length > 0 ? displayProducts.length : totalProducts)} of {searchTerm || activeTags.length > 0 ? displayProducts.length : totalProducts}{' '}
              products
            </Typography>
          </div>

          {/* Product grid - Updated to have 2 columns on mobile, smaller tiles overall */}
          <section
              id="product-grid"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
              aria-label="Product listing"
          >
            {isLoading ? (
                // Skeleton loading state
                Array.from(new Array(8)).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full"
                    >
                      <Skeleton variant="rectangular" height={160} animation="wave" />
                      <div className="p-3">
                        <Skeleton variant="text" height={24} width="80%" animation="wave" />
                        <Skeleton variant="text" height={32} width="40%" animation="wave" />
                        <div className="mt-3">
                          <Skeleton variant="rectangular" height={32} animation="wave" />
                        </div>
                      </div>
                    </div>
                ))
            ) : displayProducts.length === 0 ? (
                // Empty state
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Typography variant="h6" className="text-gray-600 mb-2">
                    No products found
                  </Typography>
                  <Typography variant="body2" className="text-gray-500 max-w-md mb-4">
                    We couldn&#39;t find any products matching your criteria. Try adjusting your filters
                    or search term.
                  </Typography>
                  <Button
                      variant="outlined"
                      onClick={() => {
                        setActiveTags([]);
                        setSearchTerm('');
                      }}
                  >
                    Clear Filters
                  </Button>
                </div>
            ) : (
                // Product cards - Smaller design
                displayProducts.map(product => (
                    <article
                        key={product._id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-md"
                        itemScope
                        itemType="https://schema.org/Product"
                    >
                      <Link
                          href={`/products/${product.slug}`}
                          className="block relative pb-[65%] overflow-hidden"
                      >
                        <img
                            src={product?.imageUrls[0]}
                            alt={`CoolGards ${product?.title} - Cold Compression Therapy Device`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            itemProp="image"
                            loading="lazy"
                            width="300"
                            height="300"
                        />
                        {product.status !== 'available' && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Sold Out
                            </div>
                        )}
                      </Link>

                      <div className="p-3 flex flex-col flex-grow">
                        <div className="mb-1 flex flex-wrap gap-1">
                          {product.tags &&
                              product.tags
                                  .slice(0, 1)
                                  .map(tag => (
                                      <Chip
                                          key={tag}
                                          label={tag}
                                          size="small"
                                          className="bg-gray-100 text-xs"
                                      />
                                  ))}
                        </div>

                        <Link href={`/products/${product.slug}`} className="block">
                          <h2
                              className="text-base font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2"
                              itemProp="name"
                          >
                            {product.title}
                          </h2>
                        </Link>

                        <p
                            className="text-xl font-medium text-gray-900 mb-3"
                            itemProp="offers"
                            itemScope
                            itemType="https://schema.org/Offer"
                        >
                    <span itemProp="priceCurrency" content="EUR">
                      €
                    </span>
                          <span itemProp="price" content={product.price}>
                      {product.price}
                    </span>
                        </p>

                        <div className="mt-auto grid grid-cols-1 gap-2">
                          <AddButton data={product} />
                          <Link href={`/products/${product.slug}`} className="w-full">
                            <Button fullWidth variant="outlined" size="small" className="h-[40px] text-xs">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </article>
                ))
            )}
          </section>

          {/* Server-side Pagination - Only show when not filtering client-side */}
          {totalPages > 1 && !(searchTerm || activeTags.length > 0) && (
              <div className="flex justify-center mt-8">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    siblingCount={1}
                />
              </div>
          )}

          {/* Benefits section - More elegant and compact */}
          <section className="bg-gray-50 rounded-xl p-6 mt-10">
            <h2 className="text-xl font-medium text-gray-900 mb-5 text-center">
              Benefits of Cold Compression Therapy
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Pain Reduction</h3>
                <p className="text-sm text-gray-600">
                  Reduces pain and inflammation after surgery or injury through targeted cold therapy.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Accelerated Healing</h3>
                <p className="text-sm text-gray-600">
                  Accelerates healing through controlled compression therapy and improved circulation.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Reduced Swelling</h3>
                <p className="text-sm text-gray-600">
                  Minimizes swelling and bruising in affected areas by constricting blood vessels.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Medical-Grade Quality</h3>
                <p className="text-sm text-gray-600">
                  FDA & CE approved equipment for home, clinical, and athletic use with proven
                  results.
                </p>
              </div>
            </div>
          </section>

          {/* Trust badges - More elegant and compact */}
          <section className="mt-8 bg-white rounded-lg shadow-sm p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <LocalShippingOutlinedIcon className="text-blue-600 mb-2" style={{ fontSize: 32 }} />
                <h3 className="text-sm font-medium">Free Shipping</h3>
                <p className="text-xs text-gray-500">For Sweden</p>
              </div>
              <div className="flex flex-col items-center">
                <VerifiedOutlinedIcon className="text-blue-600 mb-2" style={{ fontSize: 32 }} />
                <h3 className="text-sm font-medium">FDA & CE Approved</h3>
                <p className="text-xs text-gray-500">Medical-grade equipment</p>
              </div>
              <div className="flex flex-col items-center">
                <SupportOutlinedIcon className="text-blue-600 mb-2" style={{ fontSize: 32 }} />
                <h3 className="text-sm font-medium">Expert Support</h3>
                <p className="text-xs text-gray-500">24/7 customer service</p>
              </div>
              <div className="flex flex-col items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3 className="text-sm font-medium">2-Year Warranty</h3>
                <p className="text-xs text-gray-500">On all products</p>
              </div>
            </div>
          </section>
        </main>
      </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Extract pagination parameters from query
    const page = parseInt(context.query.page) || 1;
    const size = parseInt(context.query.size) || 20; // Default to 20 items per page

    // Add any other query parameters
    const { title, tags, price, sort = 'price', order = 'desc', status } = context.query;

    // Build query string
    const queryParams = new URLSearchParams();
    queryParams.append('page', page);
    queryParams.append('size', size);

    if (title) queryParams.append('title', title);
    if (tags) queryParams.append('tags', tags);
    if (price) queryParams.append('price', price);
    queryParams.append('sort', sort);
    queryParams.append('order', order);
    if (status) queryParams.append('status', status);

    // Make API request with pagination parameters
    const res = await fetch(`${process.env.BASE_URL}/products?${queryParams.toString()}`);
    const data = await res.json();

    return {
      props: {
        data,
        currentPage: page,
        totalPages: data.pages || 1,
        productsPerPage: size
      },
    };
  } catch (err) {
    console.log('err', err);
    return {
      props: {
        error: err.response?.data?.message || err.message,
        currentPage: 1,
        totalPages: 1,
        productsPerPage: 20
      }
    };
  }
}
