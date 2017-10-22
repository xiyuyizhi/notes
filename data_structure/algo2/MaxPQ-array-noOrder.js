
/**
 * 
 * @param {number} max 
 */
function MaxPQ() {
    this.container = []
}

MaxPQ.prototype.insert = function (v) {
    this.container.push(v)
}

MaxPQ.prototype.less = function (i, j) {
    return this.container[i] < this.container[j]
}

MaxPQ.prototype.exch = function (i, j) {
    var t = this.container[i]
    this.container[i] = this.container[j]
    this.container[j] = t
}

MaxPQ.prototype.delMin = function () {
    var min = 0
    var n = this.container.length
    for (var i = 1; i < n; i++) {
        if (this.less(i, min)) {
            min = i
        }
    }
    this.exch(min, this.container.length - 1)
    return this.container.pop()
}
MaxPQ.prototype.size = function () {
    return this.container.length
}
MaxPQ.prototype.isEmpty = function () {
    return !this.container.length
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

