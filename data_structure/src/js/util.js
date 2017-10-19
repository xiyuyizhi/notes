

export function numberCreator(size = 30, max = 10000) {
    const container = new Array(size).fill(0)

    return container.map(x => {
        return Math.ceil(Math.random() * max)
    })

}

export function query(selector) {
    return document.querySelector(selector)
}

export function getOption(data) {
    return {
        color: ['#3398DB'],
        xAxis: [
            {
                type: 'category',
                data: [],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                type: 'bar',
                data
            }
        ]
    };
}