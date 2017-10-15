
var data = [-4, 2, -16, -8, -6, 5, -1, 0, 1, -29, -18, 3, 10]

function threesum(arr) {
    var length = arr.length
    var count = 0
    for (var i = 0; i < length; i++) {
        for (var j = i + 1; j < length; j++) {
            for (var k = j + 1; k < length; k++) {
                if (arr[i] + arr[j] + arr[k] == 0) {
                    count++
                    console.log(arr[i] + " " + arr[j] + " " + arr[k])
                }
            }
        }
    }
    return count
}
console.log(threesum(data))

var data1 = [-4, 2, -16, -8, -6, 5, -1, 0, 1, -29, -18, 3, 10]

//二分查找
function binarySearch(key, arr) {
    var start = 0
    var end = arr.length - 1
    while (start <= end) {
        var mid = start + Math.floor((end - start) / 2)
        if (key < arr[mid]) {
            end = mid - 1
        } else if (key > arr[mid]) {
            start = mid + 1
        } else {
            return mid
        }
    }
    return -1
}

function threesum1(arr) {
    var N = arr.length
    var count = 0
    arr = arr.sort(function (a, b) {
        return a > b ? 1 : -1
    })
    for (var i = 0; i < N; i++) {
        for (var j = i + 1; j < N; j++) {
            if (binarySearch(-arr[i] - arr[j], arr) > j) {
                console.log(arr[i]+" "+arr[j]+" "+(-arr[i]-arr[j]))
                count++
            }
        }
    }
    return count
}
console.log(threesum1(data1))
