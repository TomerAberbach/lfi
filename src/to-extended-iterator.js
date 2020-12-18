export const toExtendedIterator = iterator => {
  let result

  const hasNext = () => (result ?? (result = iterator.next())).done !== true
  const getNext = () => {
    if (hasNext()) {
      const { value } = result
      result = null
      return value
    } 
      return null
    
  }

  return { hasNext, getNext }
}
