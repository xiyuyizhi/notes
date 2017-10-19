

function MergeSort(arr, render) {
    this.source = arr
    this.render = render
    this.tempArr = new Array(arr.length).fill(0)
    this.init()
}

MergeSort.prototype.init = function () {
    var len = this.source.length
    this.sort(this.source, 0, len - 1)
}

/**
 * 判断两个值的大小
 * @param {number} j 
 * @param {number} i 
 */
MergeSort.prototype.less = function (j, i) {
    return this.tempArr[j] < this.tempArr[i]
}

/**
 * 将两个有序数组合并成一个
 * @param {array} arr 
 * @param {number} start 
 * @param {number} min 
 * @param {number} end 
 */
MergeSort.prototype.merge = function (arr, start, min, end) {
    var i = start
    var j = min + 1
    for (var k = 0; k <= end; k++) {
        this.tempArr[k] = arr[k]
        this.tempArr.push(arr[k])
    }
    for (var k = start; k <= end; k++) {
        if (i > min) {
            arr[k] = this.tempArr[j++]
        } else if (j > end) {
            arr[k] = this.tempArr[i++]
        } else if (this.less(j, i)) {
            arr[k] = this.tempArr[j++]
        } else {
            arr[k] = this.tempArr[i++]
        }
    }
    this.render(arr)
}
/**
 * 自顶向下的归并排序
 */
MergeSort.prototype.sort = function (arr, start, end) {
    if (start >= end) return
    var min = start + Math.floor((end - start) / 2)
    this.sort(arr, start, min)
    this.sort(arr, min + 1, end)
    this.merge(arr, start, min, end)
}




export default function up_down_merge_sort(arr, fn) {
    new MergeSort(arr, fn)
}

















































