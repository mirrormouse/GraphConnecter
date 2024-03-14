import React from 'react';
import { motion } from 'framer-motion';

const Edge = ({ fromNode, toNode, active, cost, onClick }) => {
    const strokeColor = active ? 'black' : '#ddd'; // 有効なエッジは黒、そうでない場合は薄灰色
    const hitAreaWidth = '15'; // 当たり判定用の線の太さ

    // エッジの中間点を計算
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2;



    return (
        <g onClick={onClick}>
            {/* エッジの描画 */}
            <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth="4"
                strokeLinecap="round"
                onClick={onClick}
            />
            {/* 当たり判定用の透明なエッジ */}
            <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="rgba(0,0,0,0)"
                strokeWidth={hitAreaWidth}
                strokeLinecap="round"
                onClick={onClick}
            />
            {/* 数字の背景としての円 */}
            <motion.circle
                cx={midX}
                cy={midY}
                r="14"
                fill="white"
                stroke="white"
                strokeWidth="1"
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none', // 文字列が選択されないようにする
                }}
                onClick={onClick}
            />
            {/* コストの値を表示 */}
            <motion.text
                x={midX}
                y={midY}
                fill="black"
                fontSize="24"
                textAnchor="middle"
                dy=".3em"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none', // 文字列が選択されないようにする
                }}
            >
                {cost}
            </motion.text>
        </g>
    );
}


export default Edge;