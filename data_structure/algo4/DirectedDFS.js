

class Digraph {

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

    reverse() {
        let d = new Digraph()
        for (let v = 0; v < this.v; v++) {
            for (let w of this.adj(v)) {
                d.addEdge(w, v)
            }
        }
        return d
    }

}

class DirectedDFS {

    constructor(G, sources) {
        this._marked = new Array(G.v()).fill(0)
        for (let s of sources) {
            if (!this._marked[s]) {
                this.dfs(G, s)
            }
        }
    }

    dfs(G, v) {
        this._marked[v] = true
        for (let w of G.adj(v)) {
            if (!this._marked[w]) {
                this.dfs(G, w)
            }
        }
    }

    marked(v) {
        return this._marked[v]
    }
}

//用例

const g = new Digraph(13)

g.addEdge(4, 2)
g.addEdge(2, 3)
g.addEdge(3, 2)
g.addEdge(6, 0)
g.addEdge(0, 1)
g.addEdge(2, 0)
g.addEdge(11, 12)
g.addEdge(12, 9)
g.addEdge(9, 10)
g.addEdge(9, 11)
g.addEdge(8, 9)
g.addEdge(10, 12)
g.addEdge(11, 4)
g.addEdge(4, 3)
g.addEdge(3, 5)
g.addEdge(7, 8)
g.addEdge(8, 7)
g.addEdge(5, 4)
g.addEdge(0, 5)
g.addEdge(6, 4)
g.addEdge(6, 9)
g.addEdge(7, 6)

const directedDFS = new DirectedDFS(g, [1, 2, 6])
function printMarked(g, dfs) {
    return new Array(g.v())
        .fill(0)
        .map((x, index) => index)
        .filter(x => dfs.marked(x))
}
console.log(printMarked(g, directedDFS))