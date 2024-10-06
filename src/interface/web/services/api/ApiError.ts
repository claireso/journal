class ApiError extends Error {
  public response: Response

  constructor(response: Response) {
    super(response.statusText)
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.response = response
  }
}

export default ApiError
