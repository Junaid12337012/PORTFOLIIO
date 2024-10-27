import React, { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
import Main from './components/Main';
import PortfolioTitle from './components/PortfolioTitle/PortfolioTitle'; // Adjust the path if necessary
import './App.css'; // Add styles for transitions

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
                    {!titleVisible && <Main />}
                </>
            )}
        </div>
    );
}

export default App;
