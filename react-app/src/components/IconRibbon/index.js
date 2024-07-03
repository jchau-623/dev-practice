import React, { useRef } from 'react';
import './IconRibbon.css';

export default function IconRibbon() {
    const scrollRef = useRef(null);

    const icons = [
        { name: 'Beach', icon: '🏖️' },
        { name: 'Mountain', icon: '🏔️' },
        { name: 'City', icon: '🌆' },
        { name: 'Forest', icon: '🌳' },
        { name: 'Desert', icon: '🏜️' },
        { name: 'Design', icon: '🎨' },
        { name: 'Camping', icon: '⛺️' },
        { name: 'Treehouses', icon: '🏠' },
        { name: 'Countryside', icon: '🏡' },
        { name: 'Farms', icon: '🚜' },
        { name: 'National parks', icon: '🏞️' },
        { name: 'Tropical', icon: '🌴' },
        { name: 'Play', icon: '🎮' },
        { name: 'Castles', icon: '🏰' },
        { name: 'Trending', icon: '📈' },
        { name: 'A-Frames', icon: '🔺' },
        { name: 'Off-the-grid', icon: '🌐' },
        { name: 'Vineyard', icon: '🍇' },
        { name: 'Luxury', icon: '💎' },
        { name: 'Islands', icon: '🏝️' },
        { name: 'Rooms', icon: '🛏️' },
        { name: 'Boats', icon: '⛵️' },
        { name: 'Top cities', icon: '🌆' },
        { name: 'Houseboats', icon: '🏠' },
        { name: 'Creative spaces', icon: '🎨' },
        { name: 'Domes', icon: '🏰' },
        { name: 'Caves', icon: '⛰️' }
    ];

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="icon-ribbon-container">
            <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
            <div className="icon-ribbon" ref={scrollRef}>
                {icons.map((item, index) => (
                    <div key={index} className="icon-item">
                        <span className="icon">{item.icon}</span>
                        <span className="icon-label">{item.name}</span>
                    </div>
                ))}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
        </div>
    );
}
