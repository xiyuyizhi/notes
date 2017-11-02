
/**
 * 
 * 基于有序数组的二分查找
 * 最优的查找效率和空间需求，能进行有序性的相关操作
 * 插入操作很慢
 * 
 * 最坏情况(N次插入后)
 * 
 * 插入       查找
 * 2N        lgN
 * 
 * 
 */

class BinarySearch {

    constructor() {
        this.n = 0
        this.Keys = []
        this.Values = []
    }

    less(x, y) {
        return x < y
    }

    size() {
        return this.n
    }

    keys() {
        return this.Keys
    }

    get(key) {
        const len = this.Keys.length
        const i = this.rank(key, 0, len - 1)
        return this.Values[i]
    }

    contains(key) {
        return this.Keys.includes(keys)
    }

    put(key, value) {
        const len = this.n
        const i = this.rank(key, 0, len - 1)
        if (this.Keys[i] === key) {
            this.Values[i] = value
        } else {
            for (let x = len - 1; x >= i; x--) {
                this.Keys[x + 1] = this.Keys[x]
                this.Values[x + 1] = this.Values[x]
            }
            this.Keys[i] = key
            this.Values[i] = value
            this.n++
        }
    }

    delete(key) {
        const i = this.rank(key, 0, this.Keys.length - 1)
        if (i >= 0 && i < this.Keys.length) {
            this.Keys.splice(i, 1)
            this.Values.splice(i, 1)
            this.n--
        }
    }

    /**
     * 返回小于key的元素的个数
     * @param {*} key 
     * @param {number} start 
     * @param {number} end 
     */
    rank(key, start, end) {
        if (end < start) {
            return start
        }
        let mid = start + Math.floor((end - start) / 2)
        if (this.less(key, this.Keys[mid])) {
            return this.rank(key, start, mid - 1)
        } else if (this.less(this.Keys[mid], key)) {
            return this.rank(key, mid + 1, end)
        } else {
            return mid
        }

    }

}

const st = new BinarySearch()

st.put('D', 27)
st.put('B', 15)
st.put('T', 65)
st.put('A', 5)
st.put('A', 6)
st.put('23', 19)
st.put('15', 15)
st.delete('D')
console.log(st)
console.log(st.size())
console.log(st.keys())
