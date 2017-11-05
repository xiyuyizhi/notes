
/**
 * 找出所有与起点s相连的所有顶点
 */


class Graph {

    constructor(V) {
        this.V = V //定点数
        this.E = 0 //边数
        //邻接表
        this.adjs = new Array(V).fill(0).map(x => {
            return []
        })
    }

    addEdge(v, w) {
        this.adjs[v].unshift(w)
        this.adjs[w].unshift(v)
        this.E++
    }

    adj(v) {
        return this.adjs[v]
    }

    v() {
        return this.V
    }

    edge() {
        return this.E
    }

}



class DepthFirstSearch {

    /**
     * 
     * @param {Graph} G 
     * @param {number} s 顶点
     */
    constructor(G, s) {
        this._count = 0 //与s相连的顶点数量
        this._marked = new Array(G.v()).fill(0)
        this._dfs(G, s)
    }

    /**
     * 
     * @param {Graph} G 
     * @param {number} v 顶点 
     */
    _dfs(G, v) {
        this._marked[v] = true
        this._count++
        for (let w of G.adj(v)) {
            if (!this._marked[w]) {
                this._dfs(G, w)
            }
        }
    }

    marked(w) {
        return this._marked[w]
    }

    count() {
        return this._count
    }


}

//用例

const g = new Graph(13)
g.addEdge(0, 5)
g.addEdge(4, 3)
g.addEdge(0, 1)
g.addEdge(9, 12)
g.addEdge(6, 4)
g.addEdge(5, 4)
g.addEdge(0, 2)
g.addEdge(11, 12)
g.addEdge(9, 10)
g.addEdge(0, 6)
g.addEdge(7, 8)
g.addEdge(9, 11)
g.addEdge(5, 3)


function printMarked(g, dfs) {
    return new Array(g.v())
        .fill(0)
        .map((x, index) => index)
        .filter(x => dfs.marked(x))
}

let dfs = new DepthFirstSearch(g, 0)
console.log(dfs.count())
console.log('与0相连的顶点 ' + printMarked(g, dfs))
console.log('is connected? ' + (g.v() == dfs.count()))

console.log('---------');

dfs = new DepthFirstSearch(g, 9)
console.log(dfs.count())
console.log('与9相连的顶点 ' + printMarked(g, dfs))
console.log('is connected? ' + (g.v() == dfs.count()))