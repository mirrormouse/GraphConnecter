import React, { useState } from 'react';
import Node from './Node';
import Terminal from './Terminal';
import Hub from './Hub';
import Edge from './Edge';
import './GameBoard.css';
// import { motion } from 'framer-motion';
import Head from './Head';
import { stages } from './stages';
import { useEffect } from 'react';




const GameBoard = () => {

    function addActiveProperty(datalist) {
        return datalist.map(data => ({ ...data, active: false }));
    }

    const [showOverlay, setShowOverlay] = useState(false);

    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    const [vertices, setVertices] = useState(addActiveProperty(stages[currentStageIndex].vertices));

    const [edges, setEdges] = useState(addActiveProperty(stages[currentStageIndex].edges));

    const [limitCost, setLimitCost] = useState(stages[currentStageIndex].limitcost);

    var totalNode = vertices.filter(vertex => vertex.type === 'node').length;

    //viewBoxはverticesの座標のx,yそれぞれの最大値に+100をしたものをmx, myとして、0,0,mx,myを指定する
    var viewBox = "0 0 " + (Math.max(...vertices.map(vertex => vertex.x)) + 100) + " " + (Math.max(...vertices.map(vertex => vertex.y)) + 100);

    useEffect(() => {
        resetCurrentStage();
        totalNode = vertices.filter(vertex => vertex.type === 'node').length;
        viewBox = "0 0 " + (Math.max(...vertices.map(vertex => vertex.x)) + 100) + " " + (Math.max(...vertices.map(vertex => vertex.y)) + 100);
    }, [currentStageIndex]);

    const resetStatus = () => {
        setTotalCost(0);
        setPoint(0);
        setShowOverlay(false); // オーバーレイを非表示にする
    }

    const resetCurrentStage = () => {
        // 現在のステージのverticesとedgesを初期状態にリセット
        setVertices(addActiveProperty(stages[currentStageIndex].vertices));
        setEdges(addActiveProperty(stages[currentStageIndex].edges));
        setLimitCost(stages[currentStageIndex].limitcost);
        // 必要に応じて他の状態もリセット
        resetStatus();
    };

    const [totalCost, setTotalCost] = useState(0);

    const [Point, setPoint] = useState(0);

    const goToNextStage = () => {
        setCurrentStageIndex(currentStageIndex + 1);

    };

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
        //activeなnodeの数を数える
        const activeNodeCount = updatedVertices.filter(vertex => vertex.type === 'node' && vertex.active).length;
        //Pointの更新
        setPoint(activeNodeCount);

        // 合計コストの更新
        const newTotalCost = updatedEdges.filter(edge => edge.active).reduce((acc, edge) => acc + edge.cost, 0);
        setTotalCost(newTotalCost);

        // ゲームクリア判定
        if (newTotalCost <= limitCost && activeNodeCount >= totalNode) {
            setShowOverlay(true);
        }

    };

    // NodeとTerminalの描画処理はここに含まれる
    return (
        <div className="gameBoardContainer">
            {/* <TotalCostDisplay totalCost={totalCost} limitCost={limitCost} /> */}
            <div className="gameBoard">
                <svg width="100%" height="100%" viewBox={viewBox}>
                    <Head totalCost={totalCost} limitCost={limitCost} Point={Point} totalNode={totalNode} stageId={currentStageIndex} />
                    {edges.map(edge => (
                        <Edge
                            key={edge.id}
                            fromNode={vertices.find(v => v.id === edge.from)}
                            toNode={vertices.find(v => v.id === edge.to)}
                            active={edge.active}
                            cost={edge.cost}
                            onClick={() => toggleEdgeActive(edge.id)}
                        />
                    ))}
                    {vertices.map(vertex => vertex.type === 'node' ? (
                        <Node key={vertex.id} x={vertex.x} y={vertex.y} active={vertex.active} />
                    ) : (
                        vertex.type === 'hub' ? (
                            <Hub key={vertex.id} x={vertex.x} y={vertex.y} active={vertex.active} />
                        ) : (
                            <Terminal key={vertex.id} x={vertex.x} y={vertex.y} />
                        )
                    ))}
                </svg>
            </div>

            {showOverlay && (
                <div className="overlay">
                    {currentStageIndex < stages.length - 1 ? (
                        <button className="nextStageButton" onClick={goToNextStage}>次のステージへ</button>
                    ) : (
                        <div className="gameCompleteMessage">現在登録されている {stages.length} ステージをすべてクリアしました！</div>
                    )}


                    <button className="nextStageButton" onClick={resetCurrentStage}>再挑戦</button>
                </div>
            )}

        </div>
    );
}

export default GameBoard;
