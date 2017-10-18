
less = function (j, i) {
    return tempArr[j] < tempArr[i]
}

function merge(arr, start, min, end) {
    var i = start
    var j = min + 1
    for (var k = 0; k <= end; k++) {
        tempArr[k] = arr[k]
        tempArr.push(arr[k])
    }
    for (var k = start; k <= end; k++) {
        if (i > min) {
            arr[k] = tempArr[j++]
        } else if (j > end) {
            arr[k] = tempArr[i++]
        } else if (less(j, i)) {
            arr[k] = tempArr[j++]
        } else {
            arr[k] = tempArr[i++]
        }
    }
}


function sort(arr) {
    var n = arr.length
    for (var sz = 1; sz < n; sz += sz) {
        for (var i = 0; i < n - sz; i += sz + sz) {
            merge(arr, i, i + sz - 1, Math.min(i + sz + sz - 1, n - 1))
        }
    }

}


var arr = [5, 3, 7, 9, 6, 8, 2, 4, 8]

var tempArr= new Array(arr.length).fill(0)

sort(arr)

console.log(arr)