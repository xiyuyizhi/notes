
function Node(item) {
    this.item = item
    this.next = null
}

function MaxPQ() {
    this.count = 0 //元素数量
    this.first = null //指向栈顶
}

MaxPQ.prototype.isEmpty = function () {
    return this.first == null
}
MaxPQ.prototype.size = function () {
    return this.count
}
MaxPQ.prototype.insert = function (ele) {
    var oldfirst = this.first
    var newnode = new Node(ele)
    newnode.next = oldfirst
    this.first = newnode
    this.count++
}
MaxPQ.prototype.delMin = function () {
    var minNode = this.first
    var nextNode = this.first.next
    var min
    while (nextNode) {
        if (this.less(nextNode, minNode)) {
            minNode = nextNode
        }
        nextNode = nextNode.next
    }
    this.exch(this.first, minNode)
    min = this.first.item
    this.first = this.first.next
    this.count--
    return min
}
MaxPQ.prototype.exch = function (node1, node2) {
    var t = node1.item
    node1.item = node2.item
    node2.item = t
}

MaxPQ.prototype.less = function (node1, node2) {
    return node1.item < node2.item
}

var max = 5
var arr = []
var maxPQ = new MaxPQ()
var input = [5, 7, 20, 18, 3, 1, 22, 53, 0, 6]
input.forEach(function (i) {
    maxPQ.insert(i)
    if (maxPQ.size() > 6) {
        maxPQ.delMin()
    }
})
while (!maxPQ.isEmpty()) {
    arr.push(maxPQ.delMin())
}
console.log(arr)