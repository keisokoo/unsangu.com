export type ServiceDataType<T> = {
  id: number
  attributes: T
}
export type ServiceMetaType = {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
  }
}
export type ServiceResponse<T> = {
  meta: ServiceMetaType
  data: ServiceDataType<T>
}

export type ServiceCollectionResponse<T> = {
  meta: ServiceMetaType
  data: ServiceDataType<T>[]
}
export type CategoryType = {
  id: number
  attributes: {
    name: string
  }
}
export type CategoryListItem = {
  name: string
  posts: {
    data: {
      attributes: { count: number }
    }
  }
}
export type ContentsType = {
  id: number
  subject: string
  details: string
}
export type PostType = {
  title: string,
  contents: ContentsType[]
  categories: CategoryType[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}