const PAGER = {
  first: {
    label: '««',
    title: 'First page'
  },
  prev: {
    label: '«',
    title: 'Previous page'
  },
  next: {
    label: '»',
    title: 'Next page'
  },
  last: {
    label: '»»',
    title: 'Last page'
  }
}

export default (pager) => {
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
