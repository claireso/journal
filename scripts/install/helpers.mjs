import { createInterface } from 'node:readline'

// Logging functions
export const log = {
  info: (message) => echo(chalk.bold.blue(`${message}\n`)),
  success: (message) => echo(chalk.green(`${message}\n`)),
  error: (message) => echo(chalk.red(`${message}\n`)),
  warn: (message) => echo(chalk.yellow(`/!\\ ${message}\n`))
}
// Prompts for confirmation; returns true for "yes", false otherwise.
export async function confirm(message) {
  const result = await question(message)
  return ['y', 'yes', 'Y'].includes(result)
}

/**
 * Prompts the user to enter a password with input hidden.
 *
 * Uses the `readline` module to read input from the terminal,
 * masking the input with asterisks (*). Returns a promise that
 * resolves with the entered password.
 */
export function secretQuestion(query) {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    })

    rl.stdoutMuted = true
    rl.question(query, (answer) => {
      rl.history = rl.history.slice(1)
      rl.close()
      resolve(answer)
      echo('\n')
    })

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (rl.stdoutMuted) {
        rl.output.write('*')
      } else {
        rl.output.write(stringToWrite)
      }
    }
  })
}
