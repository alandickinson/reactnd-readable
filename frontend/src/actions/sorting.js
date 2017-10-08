export const SORT_BY_LATEST = 'LATEST'
export const SORT_BY_POPULAR = 'POPULAR'

/***************
Sorting
***************/

export const sortByPopular = () => {
  return { type: SORT_BY_POPULAR }
}

export const sortByLatest = () => {
  return { type: SORT_BY_LATEST }
}
