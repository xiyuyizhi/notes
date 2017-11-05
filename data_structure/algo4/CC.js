


/**
 * 使用深度优先搜索查找连通分量
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

class CC {
    constructor(G) {
        this.marked = new Array(G.v()).fill(0)
        this.ids = new Array(G.v()).fill(0)
        this._count = 0
        for (let i = 0; i < G.v(); i++) {
            if (!this.marked[i]) {
                this.dfs(G, i)
                this._count++
            }
        }
    }

    dfs(G, v) {
        this.marked[v] = true
        this.ids[v] = this._count
        for (let w of G.adj(v)) {
            if (!this.marked[w]) {
                this.dfs(G, w)
            }
        }
    }

    count() {
        return this._count
    }

    connected(v, w) {
        return this.ids[v] === this.ids[w]
    }

    id(v) {
        return this.ids[v]
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

const cc = new CC(g)
const count = cc.count()

console.log(`${count} components`)

let arr = new Array(count).fill(0).map(x => [])
for (let i = 0; i < count; i++) {
    for (let j = 0; j < g.v(); j++) {
        if (cc.ids[j] == i) {
            arr[i].push(j)
        }
    }
}
arr.forEach(x => {
    console.log(x)
})


