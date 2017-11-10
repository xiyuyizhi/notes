
/**
 * 优先队列
 */
function MaxPQ() {
    this.container = []
}

MaxPQ.prototype.insert = function (v) {
    this.container.push(v)
}

MaxPQ.prototype.less = function (i, j) {
    return this.container[i].weight() < this.container[j].weight()
}

MaxPQ.prototype.exch = function (i, j) {
    var t = this.container[i]
    this.container[i] = this.container[j]
    this.container[j] = t
}

MaxPQ.prototype.delMin = function () {
    var min = 0
    var n = this.container.length
    for (var i = 1; i < n; i++) {
        if (this.less(i, min)) {
            min = i
        }
    }
    this.exch(min, this.container.length - 1)
    return this.container.pop()
}
MaxPQ.prototype.size = function () {
    return this.container.length
}
MaxPQ.prototype.isEmpty = function () {
    return !this.container.length
}

class Edge {

    constructor(v, w, weight) {
        this.v = v
        this.w = w
        this._weight = weight
    }

    weight() {
        return this._weight
    }

    either() {
        return this.v
    }

    other(v) {
        let vertex
        v == this.v ? (vertex = this.w) : (vertex = this.v)
        return vertex
    }

    campareTo(that) {
        this._weight > that._weight ? 1 : -1
    }

}

/**
 * 加权无向图
 */
class EdgeWeightedGraph {

    constructor(V) {
        this.V = V
        this.E = 0
        this.adjs = new Array(V).fill(0).map(x => {
            return []
        })
    }

    /**
     * 
     * @param {Edge} e 
     */
    addEdge(e) {
        let v = e.either()
        let w = e.other(v)
        this.adjs[v].unshift(e)
        this.adjs[w].unshift(e)
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

class LazyPrimMST {

    constructor(G) {
        this.marked = new Array(G.v()).fill(0)
        this.mst = [] //最小生成树的边
        this.pq = new MaxPQ()
        this.visit(G, 0)
        while (!this.pq.isEmpty()) {
            let e = this.pq.delMin()
            let v = e.either()
            let w = e.other(v)
            if (this.marked[v] && this.marked[w]) continue
            this.mst.push(e)
            if (!this.marked[v]) this.visit(G, v)
            if (!this.marked[w]) this.visit(G, w)
        }
    }


    visit(G, v) {
        this.marked[v] = true

        for (let e of G.adj(v)) {
            if (!this.marked[e.other(v)]) {
                this.pq.insert(e)
            }
        }
    }

    edges() {
        return this.mst
    }

}

//用例

const g = new EdgeWeightedGraph(8)

g.addEdge(new Edge(4, 5, 0.35))
g.addEdge(new Edge(4, 7, 0.37))
g.addEdge(new Edge(5, 7, 0.28))
g.addEdge(new Edge(0, 7, 0.16))
g.addEdge(new Edge(1, 5, 0.32))
g.addEdge(new Edge(0, 4, 0.38))
g.addEdge(new Edge(2, 3, 0.17))
g.addEdge(new Edge(1, 7, 0.19))
g.addEdge(new Edge(0, 2, 0.26))
g.addEdge(new Edge(1, 2, 0.36))
g.addEdge(new Edge(1, 3, 0.29))
g.addEdge(new Edge(2, 7, 0.34))
g.addEdge(new Edge(6, 2, 0.40))
g.addEdge(new Edge(3, 6, 0.52))
g.addEdge(new Edge(6, 0, 0.58))
g.addEdge(new Edge(6, 4, 0.93))

const mst = new LazyPrimMST(g)

console.log(mst);
// console.log(mst.edges());