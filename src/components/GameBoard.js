import React, { useState } from 'react';
import Node from './Node';
import Terminal from './Terminal';
import Edge from './Edge';
import './GameBoard.css';

const GameBoard = () => {
    const [vertices, setVertices] = useState([
        { id: 1, x: 100, y: 100, type: 'node', active: false },
        { id: 2, x: 300, y: 200, type: 'node', active: false },
        { id: 3, x: 200, y: 300, type: 'terminal', active: false }, // terminalも同様にactiveプロパティを持たせることが可能
        { id: 4, x: 400, y: 200, type: 'terminal', active: false },
        { id: 5, x: 500, y: 300, type: 'node', active: false },
        { id: 6, x: 300, y: 100, type: 'node', active: false }
    ]);

    const [edges, setEdges] = useState([
        { id: 1, from: 1, to: 2, active: false },
        { id: 2, from: 2, to: 3, active: false },
        { id: 3, from: 2, to: 4, active: false },
        { id: 4, from: 4, to: 5, active: false },
        { id: 5, from: 4, to: 6, active: false },
        { id: 6, from: 6, to: 1, active: false }
    ]);

    const toggleEdgeActive = (edgeId) => {
        const updatedEdges = edges.map(edge => edge.id === edgeId ? { ...edge, active: !edge.active } : edge);
        setEdges(updatedEdges);

        // 空のID集合Aを用意
        const activeVerticesSet = new Set();

        // 各ターミナルに対して処理
        vertices.filter(v => v.type === 'terminal').forEach(terminal => {
            // IDキューBを用意
            const queue = [terminal.id];

            // キューが空になるまで処理を続ける
            while (queue.length > 0) {
                const currentId = queue.shift(); // キューの先頭要素を取り出し

                if (!activeVerticesSet.has(currentId)) {
                    activeVerticesSet.add(currentId); // Aに追加

                    // この点とactiveなエッジによって隣接している点を全てキューBに加える
                    updatedEdges.forEach(edge => {
                        if (edge.active && (edge.from === currentId || edge.to === currentId)) {
                            const adjacentId = edge.from === currentId ? edge.to : edge.from;
                            if (!activeVerticesSet.has(adjacentId)) {
                                queue.push(adjacentId);
                            }
                        }
                    });
                }
            }
        });

        // 集合Aに含まれているIDのverticesをactiveをtrueにし、それ以外をfalseに
        const updatedVertices = vertices.map(vertex => ({
            ...vertex,
            active: activeVerticesSet.has(vertex.id)
        }));

        setVertices(updatedVertices);
    };

    // NodeとTerminalの描画処理はここに含まれる
    return (
        <div className="gameBoardContainer">
            <svg className="gameBoard">
                {edges.map(edge => (
                    <Edge
                        key={edge.id}
                        fromNode={vertices.find(v => v.id === edge.from)}
                        toNode={vertices.find(v => v.id === edge.to)}
                        active={edge.active}
                        onClick={() => toggleEdgeActive(edge.id)}
                    />
                ))}
                {vertices.map(vertex => vertex.type === 'node' ? (
                    <Node key={vertex.id} x={vertex.x} y={vertex.y} active={vertex.active} />
                ) : (
                    <Terminal key={vertex.id} x={vertex.x} y={vertex.y} />
                ))}
            </svg>
        </div>
    );
}

export default GameBoard;
