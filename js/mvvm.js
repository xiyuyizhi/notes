

function Watcher(exp, fn) {
    Subpub.target = this
    this.exp = exp
    this.value = user[exp] //这里写死的user，应该是当前环境下的数据，比如angular中$scope
    this.fn = fn
    Subpub.target = null
}
Watcher.prototype.render = function () {
    const oldValue = this.value
    const newValue = user[this.exp]
    this.fn(newValue, oldValue)
}
Watcher.prototype.addSubpub = function (subpub) {
    subpub.addSub(this)
}
// 1. 劫持的数据是用来绑定到模板上的
// 2. 怎么绑定，定义watcher监听模板上的表达式
// 3. 数据变了，通知watcher更新模板
// 4. 谁来通知watcher

function Subpub() {
    this.subList = [] //保存订阅某个属性的订阅者们
}
Subpub.prototype.addSub = function (watcher) {
    this.subList.push(watcher)
}
//通知订阅者们，数据变化了，你们要各自行动了
Subpub.prototype.notice = function () {
    this.subList.forEach(item => {
        item.render()
    })
}

Subpub.prototype.addWatcher = function () {
    Subpub.target.addSubpub(this)
}

//劫持数据
function gs(obj, key, val) {
    let originVal = val
    const subpub = new Subpub()
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            //这里应该确定订阅者是谁
            Subpub.target && subpub.addWatcher()
            return originVal
        },
        set(value) {
            originVal = value
            //订阅了当前属性的都要更新
            subpub.notice()
        }
    })

}

function observe(data) {
    const keys = Object.keys(data)
    keys.forEach(key => {
        gs(data, key, data[key])
    })
}

const user = {
    name: '初始的卢云',
    kongfu: '无'
}

observe(user)

new Watcher('name', function (newVal,old) {
    console.log(newVal)
    console.log(old)
})
new Watcher('kongfu', function (newVal,old) {
    console.log(newVal)
})

user.name = "后来的卢云"
user.kongfu=['无双连拳','正十七', '无绝心法']