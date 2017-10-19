
/**
 * 左边的元素都是有序的，但最终位置还不确定
 * 
 */


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
 * 判断两个值的大小
 * @param {*} x 
 * @param {*} y 
 */
function less(x, y) {
    return x < y
}

/**
 * @param {array} arr 
 */
export default function insertsort(arr, fn) {

    var n = arr.length

    arr.forEach((x, i) => {
        for (var j = i + 1; j < n && j > 0 && less(arr[j], arr[j - 1]); j--) {
            exchange(arr, j, j - 1)
            fn && fn(arr)
        }

    })

    return arr
}

/**
 * 最好的情况，顺序排列 ，比较n-1次,交换0次
 * 
 * 最坏的情况
 * 
 * 5 4 3 2 1
 * 4 5 3 2 1
 * 3 4 5 2 1
 * 
 * i   j   比较   交换  
 * 0   1    1     1  
 * 1   2    2     2  
 * 2   3    3     3  
 * .
 * .
 * .
 * N-2 N-1  N-1   N-1
 * 
 * 对于N个值的排好序,
 * 比较 (1+N-1)(N-1)/2 = N(N-1)/2 ~ N^2/2  
 * 交换 和 比较一样
 * 
 */

