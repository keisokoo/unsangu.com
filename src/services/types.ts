
export type ServiceDataType<T> = {
  id: number
  attributes: T
}
export type ImageThumbnailType = {
  url: string
  width: number
  height: number
}
export type ThumbnailDataType = {
  data: {
    id: number
    attributes: ImageThumbnailType
  } | null
}
interface ImageThumbnail {
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
export interface ImageResponseType {
  data: ImageThumbnail
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
    slug: string | null
  }
}
export type CategoryListItem = {
  name: string
  posts: {
    data: {
      attributes: { count: number }
    }
  }
  thumbnail: ImageResponseType
  slug: string | null
}
export type CategoryListReturnType = {
  id: number,
  name: string,
  count: number,
  thumbnail: ImageThumbnailType,
  slug: string | null
}
export type ContentsType = {
  id: number
  subject: string
  details: string
  collapsed: boolean | null
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
  slug: string | null
  summary: string
}

export interface FileType {
  id: number;
  name: string;
  alternative_text: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: string | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  preview_url: string | null;
  provider: string;
  provider_metadata: string | null;
  folder_path: string;
  created_at: string;
  updated_at: string;
  created_by_id: number;
  updated_by_id: number;
}

export type RandomPostType = {
  id: number
  title: string,
  contents: ContentsType[]
  categories: {
    id: number,
    name: string
    slug: string | null
  }[]
  thumbnail: FileType | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  slug: string | null
}
export type GroupListResponse = {
  title: string
  description: string
  updatedAt: string
  thumbnail: ThumbnailDataType
  posts: {
    data: {
      attributes: {
        count: number
      }
    }
  }
}
export type GroupResponse = {
  title: string
  description: string
  thumbnail: ThumbnailDataType
  updatedAt: string
  posts: {
    data: ServiceDataType<PostType>[]
  }
}
export const validTarget = ['categories', 'groups'] as const
export type ValidTargetType = typeof validTarget[number]
export type TargetParams = {
  target: ValidTargetType
  slug: string;
  id: string;
}
export interface TargetProps {
  params: TargetParams
  searchParams: {
    page: string;
  };
}

export interface ProfileType {
  "name": string
  "specialty": string
  "email": string
  "description": string
  "createdAt": string
  "updatedAt": string
  "publishedAt": string
  "photo": {
    "data": {
      "id": number,
      "attributes": {
        "url": string
        "width": number
        "height": number
      }
    }
  }
}
export const workTypes = ['company', 'outsourcing', 'personal'] as const
export const isWorkType = (arg: unknown): arg is WorkType => {
  return workTypes.includes(arg as WorkType)
}
export const workTypeText = (arg: WorkType): string => {
  switch (arg) {
    case 'company':
      return '회사'
    case 'outsourcing':
      return '외주'
    case 'personal':
      return '개인'
  }
}
export type WorkType = typeof workTypes[number]
export type Works = {
  title: string
  sub_title?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  contents: string
  stack: Array<string>
  work_summary: string
  retrospective: any
  type: WorkType | null
  start: string
  end: string
  end_replace: string
  links: Array<{
    id: number
    url: string
    text: string
  }>
  thumbnails: {
    data: ImageThumbnail[] | null
  }
}
export type WorkCategory = {
  description: string
  createdAt: string
  updatedAt: string
  title_id: string
  name: string
  slug: string
  order: number
  start: string
  end?: string
  works: {
    data: ServiceDataType<Works>[] | null
  }
}