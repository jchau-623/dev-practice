import React from 'react';
import './IconRibbon.css'; // Import the CSS file for styling

export default function IconRibbon() {
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

    return (
        <div className="icon-ribbon">
            {icons.map((item, index) => (
                <div key={index} className="icon-item">
                    <span className="icon">{item.icon}</span>
                    <span className="icon-label">{item.name}</span>
                </div>
            ))}
        </div>
    );
}
