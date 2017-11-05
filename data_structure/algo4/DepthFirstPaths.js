
/**
 * 
 * 深度优先实现查找顶点s和顶点v之间的路径
 * 
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

class DepthFirstPaths {

    constructor(G, s) {
        this._marked = new Array(G.v()).fill(0)
        this.edgeTo = new Array(G.v()).fill(0)
        this.s = s
        this.dfs(G, s)
    }

    dfs(g, v) {
        this._marked[v] = true
        for (let w of g.adj(v)) {
            if (!this._marked[w]) {
                this.edgeTo[w] = v
                this.dfs(g, w)
            }
        }
    }

    hasPathTo(v) {
        return this._marked[v]
    }

    pathTo(v) {
        const path = []
        if (!this.hasPathTo(v)) return
        for (let w = v; w != this.s; w = this.edgeTo[w]) {
            path.unshift(w)
        }
        path.unshift(this.s)
        return path
    }

}

//用例

const g = new Graph(6)
g.addEdge(0, 5)
g.addEdge(2, 4)
g.addEdge(2, 3)
g.addEdge(1, 2)
g.addEdge(0, 1)
g.addEdge(3, 4)
g.addEdge(3, 5)
g.addEdge(0, 2)

function printAllPath(g, dfp, v) {
    for (let i = 0; i < g.v(); i++) {
        console.log(`${v} to ${i} | ` + dfp.pathTo(i))
    }
}

let dfp = new DepthFirstPaths(g, 0)
printAllPath(g, dfp, 0)

console.log('-----------');

dfp = new DepthFirstPaths(g, 2)
printAllPath(g, dfp, 2)

