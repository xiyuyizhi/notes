# 《算法》第二章学习笔记js实现

> 对排序算法，我们重点关注比较次数和两个元素交换的次数，对于不交换元素的算法，我们重点关注访问数组的次数

### 选择排序

思想:循环找到数组中最小的元素，和第一个元素交换，在剩下的元素中找到最小的元素，和第二个元素交换，一直比较下去

```
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
function selectsort(arr) {

    var n = arr.length

    arr.forEach(function (x, i) {
        var min = i
        for (var j = i + 1; j < n; j++) {
            if (arr[min] > arr[j]) {
                min = j
            }
        }
        exchange(arr, i, min)
    })
}

```

- 复杂度分析

```
 对于长度为N的数组
/**
 * i  内循环 比较次数
 * 0   N-1
 * 1   N-2
 * .
 * .
 * .
 * N-2 1
 * N-1 无
**/
```
所以排序N个元素,总的比较次数为: （N-1)(1+N-1)/2 = (N-1)N/2  ~N^2/2 (等差数列) 

每次循环都会交换1次，总的交换次数就是N

所以时间复杂度是`平方级`

选择排序的特点:

- [x] 运行时间与输入无关

- [x] 数据移动是最少的

### 插入排序

思想：将要排序的元素插入到有序序列的适当位置，和选择排序一样，当前索引左侧的元素都是有序的，但他们的最终位置还不确定，可能会被移动

```
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
function insertsort(arr) {

    var n =arr.length

    arr.forEach((x, i) => {

        for (var j = i + 1; j < n && j > 0 && less(arr[j], arr[j - 1]); j--) {
            exchange(arr, j, j - 1)
        }

    })

    return arr
}

```

复杂度分析:

插入排序的效率和输入有关

在最好的情况下，元素都是有序的，则比较次数为N-1，交换次数为0

在最坏的情况下,元素都是逆序有序的

```
/**
 * 5 4 3 2 1
 * 4 5 3 2 1   第1次
 * 3 4 5 2 1   第2次
 * 
 * 外循环i   内循环j   比较   交换  
 * 0         1        1     1  
 * 1         2        2     2  
 * 2         3        3     3  
 * .
 * .
 * .
 * N-2       N-1      N-1   N-1
 * N-1       无   
 */
```

对于N个值的排序,总的比较次数 (1+N-1)(N-1)/2 = N(N-1)/2 ~ N^2/2 (等差数列) 

交换 和 比较一样

所以平均情况下 插入排序的时间复杂度也是`平方级`

### 归并排序