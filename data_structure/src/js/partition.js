
function quicksort(arr, start, end, fn) {

    if (start >= end) return
    var j = partition(arr, start, end) //确定切分

    fn && fn(arr)

    quicksort(arr, start, j - 1, fn)

    quicksort(arr, j + 1, end, fn)

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


export default function quick_sort(arr, fn) {
    quicksort(arr, 0, arr.length - 1, fn)
}