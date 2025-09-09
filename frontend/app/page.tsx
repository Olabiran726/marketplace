'use client';

import { useEffect, useState } from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
    brand?: {
        name: string;
        email: string;
    };
};

const brandColors: { [key: string]: string } = {
    'Alice': '#ffcccc',
    'Bob': '#ccffcc',
    'Charlie': '#ccccff',
};

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch(console.error);
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Products</h2>
            {products.length === 0 && <p>No products available.</p>}
            {products.map((p) => (
                <div
                    key={p.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: brandColors[p.brand?.name] || '#eee', // safe access
                    }}
                >
                    <strong>{p.name}</strong> - <br />
                    Brand: {p.brand?.name || 'Unknown'} ({p.brand?.email || 'N/A'})<br />
                    Price: 
                </div>
            ))}
        </div>
    );
}
