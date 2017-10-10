
/**
 * addListener
 * 
 * emit
 */

class EE {
    constructor() {
        this.content = {}
    }

    addListener(...rest) {
        const [eventName, listenFn] = rest
        this.content[eventName] ? this.content[eventName].push(listenFn) : this.content[eventName] = [listenFn]
    }

    emit(...rest) {
        const [eventName, ...args] = rest
        const listeners = this.content[eventName]
        if (listeners && listeners.length) {
            listeners.forEach(listener => {
                listener.apply(null, args)
            })
        }
    }

}

const e = new EE()

e.addListener('addEvent', data => {
    console.log('listener1', data)
})
e.addListener('addEvent', data => {
    console.log('listener2', data)
})

e.emit('addEvent', 'data1')
