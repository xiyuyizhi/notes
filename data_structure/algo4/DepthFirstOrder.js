
/**
 * 基于深度优先的顶点排序
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

class DepthFirstOrder {

    constructor(G) {
        this.marked = new Array(G.v()).fill(0)
        this._pre = []
        this._post = []
        this._reversePost = []
        for (let v = 0; v < G.v(); v++) {
            if (!this.marked[v]) {
                this.dfs(G, v)
            }
        }
    }

    dfs(G, v) {
        this._pre.push(v)
        this.marked[v] = true
        for (let w of G.adj(v)) {
            if (!this.marked[w]) {
                this.dfs(G, w)
            }
        }
        this._post.push(v)
        this._reversePost.unshift(v)
    }

    pre(){
        return this._pre
    }

    post(){
        return this._post
    }

    reversePost(){
        return this._reversePost
    }

}

const g = new Digraph(13)

g.addEdge(0, 1)
g.addEdge(2, 0)
g.addEdge(2, 3)
g.addEdge(0, 6)
g.addEdge(0, 5)
g.addEdge(5,4)
g.addEdge(3,5)
g.addEdge(6,4)
g.addEdge(6,9)
g.addEdge(8,7)
g.addEdge(7,6)
g.addEdge(9,10)
g.addEdge(9,11)
g.addEdge(11,12)
g.addEdge(9,12)

const dOrder =new DepthFirstOrder(g)

console.log(dOrder.pre());
console.log(dOrder.post());
console.log(dOrder.reversePost());