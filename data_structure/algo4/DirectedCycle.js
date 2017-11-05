

/**
 * 
 * 有向无环图
 */

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

class DirectedCiycle {

    constructor(G) {
        this.marked = new Array(G.v()).fill(0)
        this.edgeTo = new Array(G.v()).fill(0)
        this.onStack = new Array(G.v()).fill(0)
        this._cycle = []
        for (let v = 0; v < G.v(); v++) {
            if (!this.marked[v]) {
                this.dfs(G, v)
            }
        }
    }

    dfs(G, v) {
        this.marked[v] = true
        this.onStack[v] = true
        for (let w of G.adj(v)) {
            if (this.hasCycle()) return
            else if (!this.marked[w]) {
                this.edgeTo[w] = v
                this.dfs(G, w)
            } else if (this.onStack[w]) {
                for (let x = v; x != w; x = this.edgeTo[x]) {
                    this._cycle.unshift(x)
                }
                this._cycle.unshift(w)
                this._cycle.unshift(v)
            }
        }
        this.onStack[v] = false
    }

    hasCycle() {
        return this._cycle.length
    }

    //有向环中的所有顶点(如果存在的话)
    cycle() {
        return this._cycle
    }

}

const g = new Digraph(13)

g.addEdge(0, 1)
g.addEdge(2, 0)
g.addEdge(2, 3)
g.addEdge(0, 6)
g.addEdge(0, 5)
g.addEdge(5, 4)
g.addEdge(3, 5)
g.addEdge(6, 4)
g.addEdge(6, 9)
g.addEdge(8, 7)
g.addEdge(7, 6)
g.addEdge(9, 10)
g.addEdge(9, 11)
g.addEdge(11, 12)
g.addEdge(9, 12)

const directedCiycle = new DirectedCiycle(g)
console.log(directedCiycle.cycle());