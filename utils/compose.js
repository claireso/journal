// https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d

const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)

export default compose
