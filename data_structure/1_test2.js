
function Node(item) {
    this.item = item
    this.next = null
}

function Stack() {
    this.count = 0 //元素数量
    this.first = null //指向栈顶
}

Stack.prototype.isEmpty = function () {
    return this.first == null
}
Stack.prototype.size = function () {
    return this.count
}
Stack.prototype.push = function (ele) {
    var oldfirst = this.first
    var newnode = new Node(ele)
    newnode.next = oldfirst
    this.first = newnode
    this.count++
}
Stack.prototype.pop = function () {
    var ele = this.first.item
    this.first = this.first.next
    this.count--
    return ele
}
Stack.prototype.iterator = function () {
    var firstnode = this.first
    var count = this.count
    return {
        hasNext: function () {
            return count
        },
        next: function () {
            var ele = firstnode.item
            firstnode = firstnode.next
            count--
            return ele
        }
    }
}

var stack = new Stack()
stack.push('to')
stack.push('be')
stack.push('or')
stack.push('not')
stack.push('to')
stack.push('be')
console.log(stack.size())
// console.log(stack.pop())
var iterator = stack.iterator()
while (iterator.hasNext()) {
    console.log(iterator.next())
}


function Node(item) {
    this.item = item
    this.next = null
}


class Queue {

    constructor() {
        this.first = null
        this.last = null
        this.count = 0
    }

    isEmpty() {
        return this.first == null
    }
    size() {
        return this.count
    }
    enqueue(item) {
        const oldlast = this.last
        const last = new Node(item)
        this.last = last
        if (this.isEmpty()) {
            this.first = last
        } else {
            oldlast.next = last
        }
        this.count++
    }
    dequeue() {
        const ele = this.first.item
        this.first = this.first.next
        if (this.isEmpty()) {
            this.last = null
        }
        this.count--
        return ele
    }
    iterator() {
        let firstnode = this.first
        let count = this.count
        return {
            hasNext: function () {
                return count
            },
            next: function () {
                var ele = firstnode.item
                firstnode = firstnode.next
                count--
                return ele
            }
        }
    }
}

const queue=new Queue()
queue.enqueue('to')
queue.enqueue('be')
queue.enqueue('or')
queue.enqueue('not')
queue.enqueue('to')
queue.enqueue('be')
queue.dequeue()
console.log(queue.size())
iterator=queue.iterator()
while(iterator.hasNext()){
    console.log(iterator.next())
}