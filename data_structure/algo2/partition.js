
function quicksort(arr, start, end) {

    if (start >= end) return
    var j = partition(arr, start, end) //确定切分

    quicksort(arr, start, j - 1)

    quicksort(arr, j + 1, end)

}

function partition(arr, start, end) {

    var i = start
    var j = end + 1
    var v = arr[start]
    while (true) {

        while (less(v, arr[++i])) {
            if (i == end) {
                break;
            }
        }
        while (less(arr[--j], v)) {
            if (j == start) {
                break
            }
        }
        if (i >= j) break
        exchange(arr, i, j)
    }
    exchange(arr, start, j)
    return j
}

function less(x, y) {
    return x >= y
}

function exchange(arr, i, j) {
    var t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}

var arr = [5, 2, 4, 3, 9, 6, 7, 8, 0]

/**
 * 5, 2, 4, 3, 9, 6, 7, 8, 0
 *             i           j
 *             4           8 
 * 5, 2, 4, 3, 0, 6, 7, 8, 9
 * 0, 2, 4, 3, 5, 6, 7, 8, 9
 * 
 * 
 * 
 */

quicksort(arr, 0, arr.length - 1)

console.log(arr)