
function less(arr, i, j) {
    return arr[i] < arr[j]
}

function exch(arr, i, j) {
    var t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}

function sink(arr, k, N) {
    while (2 * k <= N) {
        var j = 2 * k
        if (j < N && less(arr, j, j + 1)) {
            j++
        }
        if (!less(arr, k, j)) break;
        exch(arr, k, j)
        k = j
    }
}

function swim(arr, k) {

    while (k > 1 && less(arr, Math.floor(k / 2), k)) {
        var half = Math.floor(k / 2)
        exch(arr, half, k)
        k = half
    }
}

function SortPQ(arr) {
    var n = arr.length
    for (var i = 1; i < n; i++) {
        swim(arr, i)
    }
    //已经是堆有序
    console.log(arr)
    n=n-1
    while (n > 1) {
        exch(arr, 1, n--)
        sink(arr, 1, n)
    }
}

var arr = [, 5, 7, 20, 18, 3, 1, 22, 53, 0, 6]

SortPQ(arr)

console.log(arr)