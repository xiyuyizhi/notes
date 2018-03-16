/**
 * 
 * 二叉查找树
 * 
 * 一颗二叉查找树是一个二叉树，
 * 且每个结点的键都大于其左子树中的任意结点的键并且小于其右子树中任意结点的键
 */

class Node {

    constructor(key, val, N) {
        this.key = key
        this.val = val
        this.N = N //以当前结点为根结点的子树的结点数量
        this.left = null //指向左子树
        this.right = null //指向右子树
    }

}

class BST {

    constructor() {
        this.root = null
    }

    size() {
        return this._size(this.root)
    }

    _size(node) {
        if (node) {
            return node.N
        }
        return 0
    }

    get(key) {
        let node = this.root
        let val
        while (node) {
            if (this.less(node.key, key)) {
                //从右子树中寻找
                node = node.right
            } else if (this.less(key, node.key)) {
                //从左子树中寻找
                node = node.left
            } else {
                node && (val = node.val)
                break
            }
        }
        return val
    }

    put(key, val) {
        this.root = this._put(this.root, key, val)
    }

    _put(node, key, val) {
        if (node == null) return new Node(key, val, 1)
        if (this.less(node.key, key)) {
            node.right = this._put(node.right, key, val)
        } else if (this.less(key, node.key)) {
            node.left = this._put(node.left, key, val)
        } else {
            node.val = val
        }
        node.N = this._size(node.left) + this._size(node.right) + 1
        return node
    }

    keys() {
        const keys = []
        this._iterator(this.root, keys,'LNR')
        return keys
    }

    //中序遍历
    keys_LNR() {
        return this.keys()
    }

    //前序遍历
    keys_NLR() {
        const keys = []
        this._iterator(this.root, keys,'NLR')
        return keys
    }

    //后序遍历
    keys_LRN() {
        const keys = []
        this._iterator(this.root, keys,'LRN')
        return keys
    }

    //遍历
    _iterator(node, arr, type) {
        if (!node) return
        if (type == 'NLR') arr.push(node.key)
        this._iterator(node.left, arr, type)
        if(type=='LNR') arr.push(node.key)
        this._iterator(node.right, arr, type)
        if(type=='LRN') arr.push(node.key)
    }


    //返回树中小于key的元素的数量
    rank(key) {
        return this._rank(this.root, key)
    }

    _rank(node, key) {
        if (!node) return 0
        if (this.less(key, node.key)) {
            return this._rank(node.left, key)
        } else if (this.less(node.key, key)) {
            return 1 + this._size(node.left) + this._rank(node.right, key)
        } else {
            return this._size(node.left)
        }
    }

    delete(key) {
        this.root = this._delete(this.root, key)
    }

    _delete(node, key) {
        if (!node) return
        if (this.less(node.key, key)) {
            node.right = this._delete(node.right, key)
        } else if (this.less(key, node.key)) {
            node.left = this._delete(node.left, key)
        } else {
            if (!node.left) return node.right
            if (!node.right) return node.left
            let tempNode = node
            node = this.min(tempNode.right)
            node.right = this._deleteMin(tempNode.right)
            node.left = tempNode.left
        }
        node.N = this._size(node.left) + this._size(node.right) + 1
        return node
    }

    _deleteMin(node) {
        if (!node.left) return node.right
        node.left = this._deleteMin(node.left)
        node.N = this._size(node.left) + this._size(node.right) + 1
        return node
    }

    min(node) {
        if (!node.left) return node
        return this.min(node.left)
    }

    less(x, y) {
        return x < y
    }
}

const st = new BST()

st.put('G', 27)
st.put('B', 15)
st.put('E', 16)
st.put('T', 65)
st.put('A', 5)
st.put('D', 6)
st.put('S', 19)
st.put('C', 15)
console.log(st.root);
console.log('中序 '+st.keys())
console.log('前序 '+st.keys_NLR())
console.log('后序 '+st.keys_LRN())

/**
 * 
 * 
 *                  G
 *          B               T
 *      A         E        S 
 *              D
 *             C 
 * 
 * 
 * 
 */

// console.log(st)