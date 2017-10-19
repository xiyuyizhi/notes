
/**
 * 
 * @param {array} arr 
 * @param {number} x 
 * @param {number} y 
 */
function exchange(arr, x, y) {
    var t = arr[x]
    arr[x] = arr[y]
    arr[y] = t
}

/**
 * 
 * @param {array} arr 
 */
export default function selectsort(arr, fn) {

    var n = arr.length
    var timer

    arr.forEach(function (x, i) {
        var min = i
        for (var j = i + 1; j < n; j++) {
            if (arr[min] > arr[j]) {
                min = j
            }
        }
        exchange(arr, i, min)
        fn && fn(arr)
    })
}
/**交换 比较
 * i  内循环
 * 0   N-1
 * 1   N-2
 * .
 * .
 * .
 * N-2 1
 * N-1 无
 * 
 * N   (N-1)(1+N-1)/2 = N(N-1)/2 ~ n^2/2
 */

