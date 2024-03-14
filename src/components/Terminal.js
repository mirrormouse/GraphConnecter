import React from 'react';

const Terminal = ({ x, y, active }) => (
    <rect x={x - 10} y={y - 10} width="20" height="20" fill={active ? "orange" : "orange"} />
);

export default Terminal;