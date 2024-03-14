import React from 'react';

const Node = ({ key, x, y, active }) => (
    <>
        <circle cx={x} cy={y} r="20" stroke={active ? "blue" : "red"} strokeWidth="3" fill="white" />
    </>

);

export default Node;
