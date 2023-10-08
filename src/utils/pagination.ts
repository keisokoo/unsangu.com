
const range = 2

export const getPagination = (page: number, pages: number[] = []) => {
  const printPage = pages.filter((pageNum) => {
    if (page < range + 1 && pageNum <= range * 2 + 1) {
      return true
    } else if (
      pages.length - page < range + 1 &&
      pageNum > pages.length - (range * 2 + 1)
    ) {
      return true
    } else if (pageNum >= page - range && pageNum <= page + range) {
      return true
    }
    return false
  })
  return printPage
}

export const getPages = (total: number, limit: number) => {
  let pages = [1]
  if (total && limit) {
    pages = Array.from(Array(Math.ceil(total / limit)).keys()).map((i) => i + 1)
  } else if (total === 0) {
    pages = [1]
  }
  return pages
}