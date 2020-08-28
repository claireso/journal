const PAGER = {
  first: {
    label: '««',
    title: 'First page',
    testId: 'first-page'
  },
  prev: {
    label: '«',
    title: 'Previous page',
    testId: 'previous-page'
  },
  next: {
    label: '»',
    title: 'Next page',
    testId: 'next-page'
  },
  last: {
    label: '»»',
    title: 'Last page',
    testId: 'last-page'
  }
}

const usePagination = (pager) => {
  const items = Object.entries(PAGER)
    .map(([key, value]) => {
      const page = pager[key]

      if (!page) return undefined

      return [{ ...value, page: page }]
    })
    .filter((item) => item !== undefined)
    .reduce((acc, [item]) => [...acc, item], [])

  return items
}

export default usePagination
