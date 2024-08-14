import React, { useState, useEffect } from 'react';
import './ProductList.css';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';

const ProductList = () => {
    // State variables for products, search, sorting, loading, error, cart, and total price
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('asc');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let sortedProducts = [...products].sort((a, b) =>
            sortOption === 'asc' ? a.price - b.price : b.price - a.price
        );

        setFilteredProducts(
            sortedProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, sortOption, products]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        calculateTotalPrice();
    }, [cart]);

    // Function to add product to the cart
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Function to remove product from the cart
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
    };

    // Function to calculate total price
    const calculateTotalPrice = () => {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-list-container">
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <SortDropdown sortOption={sortOption} onSort={setSortOption} />
            
            {/* Shopping Cart on the Left Side */}
            <div className="cart">
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <p>{item.name} - ${item.price} x {item.quantity}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        ))}
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <button onClick={clearCart}>Clear Cart</button>
                    </div>
                )}
            </div>

            {/* Product List on the Right Side */}
            <div className="product-list">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
