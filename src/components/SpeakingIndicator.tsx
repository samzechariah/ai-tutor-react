import React from 'react';
import './SpeakingIndicator.css';

const SpeakingIndicator: React.FC = () => {
    return (
        <div className="speaking-indicator">
            <div className="wave-container">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
                <div className="wave wave4"></div>
                <div className="wave wave5"></div>
            </div>
            <p className="speaking-text">AI is speaking...</p>
        </div>
    );
};

export default SpeakingIndicator;