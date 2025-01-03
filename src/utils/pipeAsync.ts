// eslint-disable-next-line
type Args = any[]

type AsyncFn<R> = (...args: Args) => Promise<R>

// eslint-disable-next-line
function pipeAsync<R>(...fns: AsyncFn<unknown>[]): (...args: any[]) => Promise<R> {
  return async function (...args: Args): Promise<R> {
    let result: unknown

    for (const fn of fns) {
      result = await fn(...args)
    }

    return result as R
  }
}

export default pipeAsync
