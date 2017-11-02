
/**
 * 
 * 使用散列的查找算法分为两步
 * 1. 用散列函数将被查找的建转化为数组的索引
 * 2. 处理碰撞冲突（两个或多个键散列到相同的索引值的情况）
 * 
 */

/**
 * 散列表是算法在时间和空间上作出权衡的经典例子
 */

/**
 * 如果我们有一个能够保存M个键值对的数组，那么我们就需要一个能够将任意键转化为该数组范围内的索引
 * 的散列函数，我们的函数应该易于计算并且能够均匀分布所有的键
 * 
 */

/**
 * 基于拉链法的散列表
 * 对碰撞的处理是将大小为M的数组中的每一个元素指向一条链表，链表中的每一个结点都存储着散列值为该元素的索引的
 * 键值对
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

class SeparateChianingHashST {

    constructor(M) {
        this.M = M
        this.st = new Array(M).fill(0).map(x => {
            return new SequentialSearchST()
        })
    }

    hashCode(str) {
        str = String(str)
        var h = 0;
        var len = str.length;
        var t = 2147483648;
        for (var i = 0; i < len; i++) {
            h = 31 * h + str.charCodeAt(i);
            if (h > 2147483647) h %= t;
        }
        return h % this.M;
    }


    put(key, value) {
        this.st[this.hashCode(key)].put(key, value)
    }

    get(key){
        return this.st[this.hashCode(key)].get(key)
    }


}

const st= new SeparateChianingHashST(5)

st.put('a',19)
st.put('b',10)
st.put('c',18)
st.put('d',12)
st.put('e',1)
st.put('f',1)
st.put('ftyu','ftyu')

console.log(st)
console.log(st.get('ftyu'))
