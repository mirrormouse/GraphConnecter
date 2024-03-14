import React from 'react';
import { motion } from 'framer-motion';

const Head = ({ totalCost, limitCost, Point, totalNode, stageId }) => {
    const remaining = limitCost - totalCost; // 残額を計算
    return (
        <>
            <motion.text
                x={20}
                y={30}
                fill="black"
                fontSize="16"
                textAnchor="left"
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none', // 文字列が選択されないようにする
                }}
            >
                ステージ: {stageId + 1}
            </motion.text>
            <motion.text
                x={150}
                y={35}
                fill="black"
                fontSize="24"
                textAnchor="left"
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none', // 文字列が選択されないようにする
                }}
            >
                残りエネルギー:
                <tspan fill={remaining < 0 ? "red" : "blue"}>{remaining}</tspan> {/* 数値部分の色を変更 */}
            </motion.text>
            <motion.text
                x={150}
                y={70}
                fill="black"
                fontSize="24"
                textAnchor="left"
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none', // 文字列が選択されないようにする
                }}
            >
                達成度:
                <tspan fill={Point >= totalNode ? "blue" : "black"}>{Point}/{totalNode}</tspan> {/* 数値部分の色を変更 */}
            </motion.text>
        </>
    );


}




export default Head;