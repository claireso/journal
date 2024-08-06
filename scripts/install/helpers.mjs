import readline from 'node:readline'

// Logging functions
export const log = {
  info: (message) => echo(chalk.bold.blue(`${message}\n`)),
  subinfo: (message) => echo(chalk.bold.hex('#FFAA76')(`${message}\n`)),
  success: (message) => echo(chalk.green(`✅ ${message}\n`)),
  error: (message) => echo(chalk.red(`🚫${message}\n`)),
  warn: (message) => echo(chalk.yellow(`⚠️  ${message}\n`))
}
// Prompts for confirmation; returns true for "yes", false otherwise.
export async function confirm(message) {
  const result = await question(`❓${message}`)
  return ['y', 'yes'].includes(result.trim().toLowerCase())
}

/**
 * Prompts the user to enter a password with input hidden.
 *
 * Uses the `readline` module to read input from the terminal,
 * masking the input with asterisks (*). Returns a promise that
 * resolves with the entered password.
 */
export async function secretQuestion(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    const stdin = process.openStdin()
    const onChar = (char) => {
      char = char + ''
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          stdin.pause()
          break
        default:
          process.stdout.clearLine()
          readline.cursorTo(process.stdout, 0)
          process.stdout.write(query + Array(rl.line.length + 1).join('*'))
          break
      }
    }
    process.stdin.on('data', onChar)
    rl.question(query, (answer) => {
      rl.history = rl.history.slice(1)
      process.stdin.removeListener('data', onChar)
      rl.close()
      resolve(answer)
    })
  })
}
