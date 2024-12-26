import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ProductContext } from '../context/ProductContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            const productFromContext = products.find((p) => p.id === parseInt(id));
            if (productFromContext) {
                setProduct(productFromContext);
                setIsLoading(false);
            } else {
                try {
                    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchProductDetails();
    }, [id, products]);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (isLoading) {
        return <h1 className="text-center text-blue-500 mt-10">Loading...</h1>;
    }

    if (!product) {
        return <h1 className="text-center text-red-500 mt-10">Product not found</h1>;
    }

    return (
        <div className="flex flex-col md:flex-row border p-4 max-w-4xl mx-auto mt-10">
            <div className="flex justify-center md:w-1/2">
                <div className="w-full flex justify-center">
                    <LazyLoadImage
                        alt={product.title}
                        className={`max-w-full h-auto object-contain transition-all duration-300 ${
                            imageLoaded ? 'blur-none' : 'blur-lg'
                        }`}
                        effect="blur"
                        src={product.image}
                        beforeLoad={() => setImageLoaded(false)}
                        onLoad={handleImageLoad}
                    />
                </div>
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="text-gray-600 mt-2">Product ID: {product.id}</p>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p className="text-gray-700 mt-2">{product.description}</p>
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Category</h2>
                    <p className="text-gray-700 mt-2">{product.category}</p>
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Rating</h2>
                    {product.rating ? (
                        <p className="text-gray-700 mt-2">Rate: {product.rating.rate}</p>
                    ) : (
                        <p className="text-gray-700 mt-2">No ratings available</p>
                    )}
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    {product.rating ? (
                        <p className="text-gray-700 mt-2">Count: {product.rating.count}</p>
                    ) : (
                        <p className="text-gray-700 mt-2">No reviews available</p>
                    )}
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                        Price: <span className="text-blue-600">${product.price.toFixed(2)}</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
