

//generator是可以暂定并重新开始的函数

//generator通过yield来暂定程序的执行，generators可以接受输入，对外输出通过yield

//实现迭代器

function* ObjectEntries(obj) {
    const keys = Object.keys(obj)

    for (let key of keys) {
        yield [key, obj[key]]
    }
}
const g1 = ObjectEntries({
    1: 1,
    2: 2,
    3: 3
})

// for(const [key,val] of g1){
//     console.log([key,val]);
// }

//Recursion via yield*

function* print1() {
    console.log('start print1');
    yield 'a'
    yield 'b'
    return 'result'
}

function* print2() {
    console.log('start print2')
    yield 'p1'
    const res = yield* print1()
    console.log(res);
    yield 'p2'
}
//  console.log([...print2()]);

const t = print2()
console.log(t.next());

//wrapper generators

function* testRecieve() {
    console.log('start')
    while (true) {
        let v1 = yield
        console.log(v1);
    }

}

// const g2 = testRecieve()
// g2.next()
// g2.next(1)
// g2.next(2)

function warpTestRecieve(generator) {
    return () => {
        const g = generator()
        g.next()
        return g
    }
}

// const g3 = warpTestRecieve(testRecieve)
// g3().next(11)


// return()


function* ret() {
    console.log('return');
    const d1 = yield
    console.log('d1 ' + d1);
    yield
    console.log('这里会执行吗');
}

const g4 = ret()
// g4.next()
// console.log(g4.next(1111));
// console.log(g4.next());

// g4.next()
// g4.next('input')
// console.log(g4.return('ok?'));



function asyncSleep(geneFn) {

    const gene = geneFn()

    handleGene(gene.next())

    function handleGene({ done, value }) {
        if (!done) {
            if (value.toString() == '[object Promise]') {
                value.then(res => {
                    handleGene(gene.next(res))
                }, error => {
                    handleGene(gene.next(error))
                })
            }
        }
    }
}

//use case
function sleep(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, delay)
    })
}
asyncSleep(function* geneSleep() {
    console.log(new Date().getTime())
    const inp = yield sleep(3000)
    console.log('input ' + inp);
    console.log(new Date().getTime())
    const inp1 = yield sleep(3000)
    console.log('input ' + inp);
    console.log(new Date().getTime())
})


