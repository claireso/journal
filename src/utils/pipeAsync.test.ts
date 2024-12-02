import pipeAsync from './pipeAsync'

describe('pipeAsync', () => {
  const fns = [
    jest.fn().mockImplementation(() => Promise.resolve(1)),
    jest.fn().mockImplementation(() => Promise.resolve(2)),
    jest.fn().mockImplementation(() => Promise.resolve(3))
  ]

  const fns2 = [
    jest.fn().mockImplementation(() => Promise.resolve(1)),
    jest.fn().mockImplementation(() => Promise.reject(new Error('failed'))),
    jest.fn().mockImplementation(() => Promise.resolve(3))
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a function', async () => {
    const fn = pipeAsync(...fns)
    expect(fn).toBeInstanceOf(Function)
  })

  it('should return the last assignment value', async () => {
    const fn = pipeAsync(...fns)
    expect(await fn()).toBe(3)
  })

  it('should call all the composed fonctions with initial arguments', async () => {
    const fn = pipeAsync(...fns)
    await fn(1, 2)

    fns.forEach((fn) => {
      expect(fn).toHaveBeenCalledWith(1, 2)
    })
  })

  it('should stop if a function throw an error', async () => {
    const fn = pipeAsync(...fns2)

    await expect(fn(1, 2)).rejects.toThrow('failed')

    expect(fns2[0]).toHaveBeenCalledWith(1, 2)
    expect(fns2[1]).toHaveBeenCalledWith(1, 2)
    expect(fns2[2]).not.toHaveBeenCalled()
  })
})
