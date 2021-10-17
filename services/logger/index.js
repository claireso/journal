const logger = (...args) => {
  if (['production', 'test'].includes(process.env.NODE_ENV) === false) {
    console.log(...args)
  }
}

export default logger
