
/**
 * 基于无序链表的顺序查找
 * 
 * 最坏情况(N次插入后)
 * 
 * 插入       查找
 *  N         N
 * 
 */

class Node {
    constructor(key, val, node) {
        this.key = key
        this.value = val
        this.next = node
    }
}

class SequentialSearchST {

    constructor() {
        this.n = 0
        this.first = null
    }

    put(key, val) {
        for (let node = this.first; node !== null; node = node.next) {
            if (node.key === key) {
                node.value = val
                return
            }
        }
        this.first = new Node(key, val, this.first)
        this.n++
    }

    get(key) {
        let node = this.first
        while (node) {
            if (node.key === key) {
                return node.value
            }
            node = node.next
        }
        return null
    }

    keys() {
        const keys = []
        let node = this.first
        while (node) {
            keys.unshift(node.key)
            node = node.next
        }
        return keys
    }

    contains(key) {
        if (this.get(key)) {
            return true
        }
    }

    size() {
        return this.n
    }

    delete(key) {
        let pre
        let node = this.first
        while (node) {
            if (node.key === key) {
                if (node == this.first) {
                    this.first = null
                } else {
                    pre.next = node.next
                }
                this.n--
                break;
            }
            pre = node
            node = node.next
        }
    }

}


var st = new SequentialSearchST()

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

console.log('keys: ' + st.keys());
