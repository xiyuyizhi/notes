
import echarts from "echarts"
import Rx from "rxjs"
import {
    query,
    numberCreator,
    getOption
} from "./js/util"

import {
    sortTypes
} from "./js/config"

import "./index.less"


const chartContainer = document.querySelector('.chart-container')

const echartInstance = echarts.init(chartContainer)


/**
 *  数据流
 * 
 *  --click$----
 * 
 *  --select$---
 * 
 * 
 * 
 */
let j = 1

const select$ = Rx.Observable.fromEvent(query('.sortTypes'), 'change')
    .map(e => e.target)
    .map(x => x.options[x.selectedIndex].value)

const createNumber$ = Rx.Observable.fromEvent(query('.numberCreator'), 'click')
    .map(e => {
        return numberCreator()
    })
    .do(nums => {
        const option = getOption(nums)
        echartInstance.setOption(option)
    })

Rx.Observable.combineLatest(
    createNumber$,
    select$
).subscribe(x => {
    console.log(x)
    j = 1
    const start = new Date().getTime()
    const fnName = sortTypes[parseInt(x[1])]
    fnName && fnName(x[0], render)
    console.log(new Date().getTime() - start)
})

function render(arr) {
    const temp = JSON.parse(JSON.stringify(arr))
    setTimeout(function () {
        const option = getOption(temp)
        echartInstance.setOption(option)
    }, 50 * j++)
}