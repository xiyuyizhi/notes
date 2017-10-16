

class UF {

    /**
     * 
     * @param {number} N 
     */
    constructor(N) {
        this.id = new Array(N).fill(0).map((x, index) => index)
        this.count = 0
    }

    count(){
        return this.count
    }

    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    connected(p,q){
        return this.find(p)===this.find(q)
    }

    /** 
     * @param {number} p 
     */
    find(p){
        return this.id[p]
    }
    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    union(p,q){
        let pId=this.id[p]
        let qId=this.id[q]
        if(pId==qId) return
        this.id.forEach(x=>{
            if(id[x]==pId){
                id[x]==qId
            }
        })
        this.count--
    }

}