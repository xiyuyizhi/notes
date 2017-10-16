

class UF {

    /**
     * 
     * @param {number} N 
     */
    constructor(N) {
        this.id = new Array(N).fill(0).map((x, index) => index)
        //各个根节点所对应的分量的大小
        this.sz = new Array(N).fill(1)
        this.count = 0
    }

    count() {
        return this.count
    }

    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    connected(p, q) {
        return this.find(p) === this.find(q)
    }

    /** 
     * 找到根触点，即分量的标识符
     * @param {number} p 
     */
    find(p) {
        while (p !== this.id[p]) p = this.id[p]
        return p
    }
    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    union(p, q) {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if (pRoot == qRoot) return
        //将小树连接到大树上
        if (sz[pRoot] < sz[qRoot]) {
            id[p] = qRoot
            sz[qRoot] += sz[pRoot]
        } else {
            id[q] = pRoot
            sz[pRoot] += sz[qRoot]
        }
        this.count--
    }

}