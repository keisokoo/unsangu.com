export type ServiceDataType<T> = {
  id: number
  attributes: T
}
export interface ImageResponseType {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        small: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
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
  categories: {
    data: CategoryType[]
  }
  thumbnail: ImageResponseType
  createdAt: string
  updatedAt: string
  publishedAt: string
}