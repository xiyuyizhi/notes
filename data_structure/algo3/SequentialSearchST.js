
/**
 * 基于无序链表的顺序查找
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
        let node = this.first
        while (node) {
            if (node.key === key) {
                node.value = val
                break;
            }
            node = node.next
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

st.put('a', 11)
st.put('b', 22)
st.put('c', 33)
st.put('d', 44)

console.log("size: " + st.size());
console.log('b: ' + st.get('b'));
st.delete('a')
console.log('delete a 后: ' + st.size())

/**
 * object toString()  valueOf()
 * 
 * toString() 字符串表示 [].toString() 是 “”
 * valueOf()  返回对象的原始值
 * 
 * toPrimitive(obj,type)  对基本类型不转换,对对象的话，如果是date，type是string，其他为number
 * 
 * 内部:obj为基本类型,type为number，直接返回，
 * 否则调用valueOf()，结果为基本类型，返回，
 * 否则在调用toString()返回
 * 
 */
console.log('keys: '+st.keys());
