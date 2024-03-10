import React from 'react';

const Edge = ({ nodes, key, fromNode, toNode, active, onClick }) => {
    const strokeColor = active ? 'black' : '#ddd'; // 有効なエッジは黒、そうでない場合は薄灰色
    const strokeWidth = active ? '6' : '4'; // アクティブなエッジは少し太く表示
    const hitAreaWidth = '10'; // 当たり判定用の線の太さを10に設定

    return (
        <>
            {/* 見た目用のエッジ */}
            <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round" // 端点を丸くする
            />
            {/* 当たり判定用の透明なエッジ */}
            <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="rgba(0,0,0,0)" // 完全に透明
                strokeWidth={hitAreaWidth}
                strokeLinecap="round" // 端点を丸くする
                onClick={onClick}
            />
        </>
    );
}

export default Edge;