const delay = (timeout: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, timeout)
  })

export default delay
