import React from 'react';

const Hub = ({ x, y, active }) => {
    // ダイヤ型（斜めになった正方形）のサイドの長さを定義します。
    const sideLength = 15; // この値はお好みで調整できます。
    // 回転させるときの中心点を計算します。この例では、正方形の中心を基準にします。
    const centerX = x;
    const centerY = y - 10;

    return (
        <rect
            x={centerX}
            y={centerY}
            width={sideLength}
            height={sideLength}
            // SVG の transform 属性を使用して正方形を45度回転させます。
            // 回転の中心は正方形の中心です。
            transform={`rotate(45 ${centerX} ${centerY})`}
            stroke="black"
            strokeWidth="3"
            fill="black"
        />
    );
};

export default Hub;
