# 遊び方

ゲームは以下のリンクで遊べます（現在全7ステージ）
[https://mirrormouse.github.io/GraphConnecter/](https://mirrormouse.github.io/GraphConnecter/)

エッジ（数字の書かれた辺）はタップでONとOFFを切りかえられます。
全ての赤色のノードが電源（オレンジ色の四角）に繋がって青色に変化したらクリアです。

ただし、エッジをONにすると書かれている数字の分だけエネルギーを消費します。エネルギーが0以上の状態でなければクリアにはなりません。
エッジをOFFにするとその分のエネルギーは返還されます。

# もっと遊ぶ

1. このリポジトリをクローンし、下記のステージの編集方法に従ってステージを追加する。
2. npmをインストールし、コマンド`npm start`で実行してローカルで遊ぶ

面白いステージが完成したら是非pull requestしてください！
またこのリポジトリを原型にしてさまざまなグラフを使ったゲームを作成していただいても構いません

## ステージの編集方法

src/components/stages.jsに、各ステージの情報が記録されています。
stagesリストの第i要素がステージ{i+1}に対応しており、各ステージの情報は以下のような辞書型データで与えられます。
```
    {
        vertices: [
            { id: 1, x: 100, y: 100, type: 'hub' },
            { id: 2, x: 200, y: 200, type: 'node' },
            { id: 3, x: 300, y: 100, type: 'terminal' },
            { id: 4, x: 200, y: 300, type: 'node' },

        ],
        edges: [
            { id: 1, from: 1, to: 2, cost: 1 },
            { id: 2, from: 2, to: 3, cost: 3 },
            { id: 3, from: 1, to: 3, cost: 2 },
            { id: 4, from: 2, to: 4, cost: 2 },
        ],
        limitcost: 5,
    },
```

verticesが各頂点を表しています。
verticesの各要素について、x,yは座標に対応します。typeは「'node','hub','terminal'」の3種類で、'node'はノード、'hub'は黒いひし形のハブ、'terminal'はオレンジ色の電源を表します。idは被りなく設定する必要があります。

edgesが各エッジを表しています。
edgesの各要素について、from, toがどの頂点とどの頂点を結ぶかを表しており、この数字はverticesで指定したidに対応します。また、costはそのエッジをONにするのに必要なエネルギーを表します。idは被りなく設定する必要があります。

limitcostは最初に持っているエネルギーの大きさを表します。

# ライセンス
Apache License 2.0
@ 2024 mirrormouse
※本プログラムの使用により生じた一切の損害について、開発者は責任を負いかねます。予めご了承ください。