import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h2>About StayQuest</h2>
            <p>Discovering new destinations or seeking a homely abode during your travels is now just a click away. With StayQuest, redefine your travel experience.</p>

            <div className="features-container">
                <div className="feature">
                    <h3>Vast Selection</h3>
                    <p>From luxurious suites to cozy cottages and backpacker's hostels, StayQuest offers a vast range of accommodations for every traveler.</p>
                </div>
                <div className="feature">
                    <h3>Seamless Navigation</h3>
                    <p>Our user-friendly interface and advanced filters ensure you can book your preferred accommodation swiftly and simply.</p>
                </div>
            </div>

            <h2>Meet the Developers</h2>
            <div className="devs-container">
                <div className="dev">
                    <h3>Michalis Michopoulos</h3>
                    <p>A passionate software developer who loves working on challenging projects. With expertise in front-end and back-end frameworks, they have a knack for creating responsive and user-friendly interfaces.</p>
                </div>
                <div className="dev">
                    <h3>Bill Mentzinis</h3>
                    <p>Driven by logic and problem-solving, this developer specializes in back-end systems and AI systems. They ensure that the foundation of every application is strong, secure, and scalable.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;