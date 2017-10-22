
function MaxPQ() {
    this.container = []
    this.n = 0
}

MaxPQ.prototype.isEmpty = function () {
    return this.n == 0
}

MaxPQ.prototype.size = function () {
    return this.n
}

MaxPQ.prototype.less = function (i, j) {
    return this.container[i] > this.container[j]
}

MaxPQ.prototype.insert = function (el) {
    this.container[++this.n] = el
    this.swim(this.n)
}

MaxPQ.prototype.delMin = function () {
    var min = this.container[1]
    this.exch(1, this.n--)
    this.sink(1)
    return min
}

//下沉
MaxPQ.prototype.sink = function (k) {
    while (2 * k <= this.n) {
        var j = 2 * k
        if (j < this.n && this.less(j, j + 1)) {
            j++
        }
        if (!this.less(k, j)) break;
        this.exch(k, j)
        k = j
    }
}

//上浮
MaxPQ.prototype.swim = function (k) {
    while (k > 1 && this.less(Math.floor(k / 2), k)) {
        var half = Math.floor(k / 2)
        this.exch(half, k)
        k = half
    }
}



MaxPQ.prototype.exch = function (i, j) {
    var t = this.container[i]
    this.container[i] = this.container[j]
    this.container[j] = t
}

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
