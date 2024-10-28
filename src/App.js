import React, { useState, useEffect } from 'react';
import Loader from './components/startup/loader/Loader';
import PortfolioTitle from './components/startup/PortfolioTitle/PortfolioTitle'; // Adjust the path if necessary
import './App.css'; // Add styles for transitions
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
    const [loading, setLoading] = useState(true);
    const [showTitle, setShowTitle] = useState(false);
    const [titleVisible, setTitleVisible] = useState(false);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false); // Hide Loader
            setTitleVisible(true); // Show PortfolioTitle

            const titleDisplayTimer = setTimeout(() => {
                setTitleVisible(false); // Hide PortfolioTitle after some time
            }, 2000); // PortfolioTitle visible for 2 seconds

            return () => clearTimeout(titleDisplayTimer); // Clear the title display timer
        }, 2000); // Loading for 2 seconds

        return () => clearTimeout(loadingTimer); // Clear the loading timer
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {titleVisible && (
                        <div className={`flex items-center justify-center w-full h-full transition-transform duration-700 ${titleVisible ? 'slide-in' : 'slide-out'}`}>
                            <PortfolioTitle />
                        </div>
                    )}
                    {!titleVisible 
                    && 
                    <Router>
            <Navbar />
            <div className="pt-20">
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
            </div>
        </Router>}
                </>
            )}
        </div>
    );
}

export default App;
