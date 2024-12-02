type AsyncFn<T extends any[], R> = (...args: T) => Promise<R>

function pipeAsync<T extends any[], R>(...fns: AsyncFn<any[], unknown>[]): (...args: T) => Promise<R> {
  return async function (...args: T): Promise<R> {
    let result: unknown

    for (const fn of fns) {
      result = await fn(...args)
    }

    return result as R
  }
}

export default pipeAsync
