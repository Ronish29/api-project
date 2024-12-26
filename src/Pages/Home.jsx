import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LazyTable from '../Components/LazyTable';
import { ProductContext} from '../context/ProductContext';

const Home = () => {
    const { products, setProducts } = useContext(ProductContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (products.length === 0) {
            const getProducts = async () => {
                setIsLoading(true);
                const productData = await axios.get('https://fakestoreapi.com/products');
                setProducts(productData.data);
                setIsLoading(false);
            };
            getProducts();
        }
    }, [products, setProducts]);

    return (
        <>
            <h1 className="text-4xl font-bold text-blue-400 text-center mt-5">
                Products
            </h1>
            {
                isLoading ? <LazyTable />
                :
                (
                    <div className="container mx-auto p-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-r">ID</th>
                                        <th className="py-2 px-4 border-b border-r">Title</th>
                                        <th className="py-2 px-4 border-b border-r">Price</th>
                                        <th className="py-2 px-4 border-b border-r">Category</th>
                                        <th className="py-2 px-4 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b border-r border-gray-200">{product.id}</td>
                                            <td className="py-2 px-4 border-b border-r border-gray-200">{product.title}</td>
                                            <td className="py-2 px-4 border-b border-r border-gray-200">${product.price.toFixed(2)}</td>
                                            <td className="py-2 px-4 border-b border-r border-gray-200">{product.category}</td>
                                            <td className="border text-center px-4 py-2">
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Show
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Home;