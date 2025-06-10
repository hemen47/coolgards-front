import { useEffect, useState } from 'react';
import { Skeleton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';

const RelatedProducts = ({ currentProductId = null }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch a few products to display as related
    const fetchRelatedProducts = async () => {
      try {
        setIsLoading(true);
        // Use existing API endpoint with a small limit
        const res = await fetch(`/api/products?limit=8`);
        const data = await res.json();

        // Filter out the current product if an ID is provided
        let filteredProducts = currentProductId
          ? data.data.filter(product => product._id !== currentProductId)
          : data.data;

        // Shuffle the array to get random products each time
        filteredProducts = shuffleArray(filteredProducts);

        // Take only the first 4 products
        setRelatedProducts(filteredProducts.slice(0, 4));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId]);

  // Helper function to shuffle array
  const shuffleArray = array => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton variant="rectangular" height={160} animation="wave" />
            <div className="p-3">
              <Skeleton variant="text" height={24} width="80%" animation="wave" />
              <Skeleton variant="text" height={32} width="40%" animation="wave" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return <Typography>No related products found.</Typography>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {relatedProducts.map(product => (
        <article
          key={product._id}
          className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-md"
        >
          <Link
            href={`/products/${product.slug}`}
            className="block relative aspect-[3/2] overflow-hidden"
          >
            <Image
              src={product?.imageUrls[0] || '/placeholder-product.jpg'}
              alt={`CoolGards ${product?.title}`}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {product.status !== 'available' && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Sold Out
              </div>
            )}
          </Link>

          <div className="p-3 flex flex-col flex-grow">
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="text-base font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>

            <p className="text-lg font-medium text-gray-900 mb-3">€{product.price}</p>

            <div className="mt-auto">
              <Link href={`/products/${product.slug}`} className="w-full">
                <Button fullWidth variant="outlined" size="small" className="h-[36px] text-xs">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default RelatedProducts;
