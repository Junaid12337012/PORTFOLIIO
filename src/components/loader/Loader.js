// src/components/Loader.js
import React, { useEffect, useState } from 'react';
import './Loader.css'; // Import the CSS for loader styles

function Loader() {
    const [showLine, setShowLine] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowLine(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black">
            {/* Logo */}
            <div className="mb-6">
                <img src="/path-to-your-logo.png" alt="Logo" className="w-12 h-12" />
            </div>

            {/* Centered, glowing line with animated loading */}
            {showLine && (
                <div className="relative w-1/5 h-1  shadow-teal-300  shadow-glow-effect overflow-hidden rounded glow-effect">
                    <div className="absolute top-0 left-0 h-full w-full  bg-teal-300 rounded animate-line-load"></div>
                </div>
            )}
        </div>
    );
}

export default Loader;
