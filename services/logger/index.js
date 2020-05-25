export default (...args) => {
  if (!process.env.isProduction) {
    console.log(...args)
  }
}
