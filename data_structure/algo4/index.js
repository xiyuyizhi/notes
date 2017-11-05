
/**
 * 
 * 图是由一组顶点和一组能够将两个顶点相连的边组成的
 * 
 * 当两个顶点通过一条边相连时，我们称这两个顶点是相连的
 * 
 * 某个顶点的度数即为依附于它的边的总数
 * 
 * 在图中，路径是由边顺序连接的一系列顶点，简单路径是一条没有重复顶点的路径
 * 
 * 路径的长度为其中包含的边数
 * 
 * 如果从任意一个顶点都存在一条路径到达另一个任意顶点，这幅图就是连通图
 * 
 */

/**
 * 图的邻接表表示法:
 * 
 * 使用一个以顶点为索引的列表数组，其中每个元素都是和该顶点相邻的顶点列表
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

console.log(g.edge());
console.log(g.adj(0))
console.log(g.adj(1))