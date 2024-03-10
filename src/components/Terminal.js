import React from 'react';

const Terminal = ({ x, y }) => (
    <polygon points={`${x - 15},${y + 15} ${x},${y - 15} ${x + 15},${y + 15}`} stroke="orange" strokeWidth="2" fill="white" />
);

export default Terminal;