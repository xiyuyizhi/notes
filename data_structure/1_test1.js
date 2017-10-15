
function Queue() {
    this.container = []
}
Queue.prototype.enqueue = function (ele) {
    this.container.push(ele)
}
Queue.prototype.dequeue = function () {
    return this.container.shift()
}
Queue.prototype.isEmpty = function () {
    return !this.container.length
}
Queue.prototype.size = function () {
    return this.container.length
}

Queue.prototype.iterator = function () {
    var container = this.container
    var current = 0
    return {
        hasNext: function () {
            return current !== container.length
        },
        next: function () {
            return container[current++]
        }
    }
}

var Qu = new Queue()
Qu.enqueue('to')
Qu.enqueue('be')
Qu.enqueue('or')
Qu.enqueue('not')
Qu.dequeue()
var iterator = Qu.iterator()
while (iterator.hasNext()) {
    console.log(iterator.next())
}


class Stack {

    constructor() {
        this.container = []
    }

    push(ele) {
        this.container.unshift(ele)
    }

    pop() {
        return this.container.shift()
    }

    isEmpty() {
        return !this.container.length
    }
    size() {
        return this.container.length
    }

    iterator() {
        var container = this.container
        var current = 0
        return {
            hasNext: function () {
                return current !== container.length
            },
            next: function () {
                return container[current++]
            }
        }
    }

}