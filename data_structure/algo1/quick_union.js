

class UF {

    /**
     * 
     * @param {number} N 
     */
    constructor(N) {
        this.id = new Array(N).fill(0).map((x, index) => index)
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
        id[pRoot] = qRoot
        this.count--
    }

}