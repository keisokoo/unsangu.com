
import { checkHasString, checkOnlyNumber } from "@/utils/valid"
import * as cheerio from 'cheerio'
import { CategoryListItem, CategoryListReturnType, GroupListResponse, GroupResponse, PostType, ProfileType, RandomPostType, ServiceCollectionResponse, ServiceResponse } from "./types"

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
  },
  cache: 'no-cache' as RequestCache
}
const sorting = `&sort[0]=id:desc`
const pageSize = 12

const imagePopulate = (target: string) => `&populate[${target}][fields][0]=url&populate[${target}][fields][1]=width&populate[${target}][fields][2]=height&populate[${target}][fields][3]=hash`
const getCategoryFilter = (filterTitle: string, category?: number | string | null) => category ? `&filters[${filterTitle}][${typeof category === 'number' ? 'id' : checkHasString(category) ? 'slug' : 'id'}]=${category}` : ''
export async function getPostByID(id: number, category?: number | string | null, filterTitle: string = 'categories') {
  try {
    const categoryFilter = getCategoryFilter(filterTitle, category)
    const prevQuery = `/posts/?filters[$and][0][id][$gt]=${id}&pagination[pageSize]=1&sort[0]=id:asc${categoryFilter}`
    const nextQuery = `/posts/?filters[$and][0][id][$lt]=${id}&pagination[pageSize]=1&sort[0]=id:desc${categoryFilter}`
    const prevPost = await fetch(process.env.NEXT_PUBLIC_API_URL + prevQuery, fetchOptions)
    const currentPost = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts/${id}?populate=*${categoryFilter}`, fetchOptions)
    const nextPost = await fetch(process.env.NEXT_PUBLIC_API_URL + nextQuery, fetchOptions)

    const prevPostJSON = (await prevPost.json() as ServiceCollectionResponse<PostType>).data?.[0]
    const currentPostJSON = (await currentPost.json() as ServiceResponse<PostType>).data
    const nextPostJSON = (await nextPost.json() as ServiceCollectionResponse<PostType>).data?.[0]
    return {
      prevPost: prevPostJSON,
      currentPost: currentPostJSON,
      nextPost: nextPostJSON,
    }
  } catch (error) {
    console.error(error)
  }
}
export async function getPostMetadataById(id: number) {
  try {
    const currentPost = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts/${id}?populate=thumbnail`, fetchOptions)
    return {
      currentPost: (await currentPost.json() as ServiceResponse<PostType>).data
    }
  } catch (error) {
    console.error(error)
  }
}
export async function getPosts(page?: number, category?: number | string | null, filterTitle: string = 'categories') {
  try {
    const categoryFilter = getCategoryFilter(filterTitle, category)
    const query = process.env.NEXT_PUBLIC_API_URL + `/posts?pagination[page]=${page ?? 1}&pagination[pageSize]=${pageSize}&populate[contents]=true&populate[categories]=true${categoryFilter}${sorting}${imagePopulate('thumbnail')}`
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      cache: 'no-cache'
    })
    return await response.json() as ServiceCollectionResponse<PostType>
  } catch (error) {
    console.error(error)
  }
}

export async function getRecentPosts() {
  try {
    const query = process.env.NEXT_PUBLIC_API_URL + `/posts?pagination[page]=1&pagination[pageSize]=4&populate[contents]=true&populate[categories]=true${sorting}${imagePopulate('thumbnail')}`
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      cache: 'no-cache'
    })
    return await response.json() as ServiceCollectionResponse<PostType>
  } catch (error) {
    console.error(error)
  }
}

export async function getCategoryList(): Promise<CategoryListReturnType[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/categories?populate[posts][count]=true${sorting}&pagination[pageSize]=999${imagePopulate('thumbnail')}`, {
      cache: 'no-cache',
    })
    const data = await response.json() as ServiceCollectionResponse<CategoryListItem>
    if (!data?.data) return [] as CategoryListReturnType[]
    return data.data.map(category => ({
      id: category.id,
      name: category.attributes.name,
      count: category.attributes.posts.data.attributes.count,
      thumbnail: {
        url: category.attributes.thumbnail.data?.attributes.url ?? '',
        width: category.attributes.thumbnail.data?.attributes.width ?? 0,
        height: category.attributes.thumbnail.data?.attributes.height ?? 0,
      },
      slug: category.attributes.slug,
    })) as CategoryListReturnType[]
  } catch (error) {
    console.error(error)
    return [] as CategoryListReturnType[]
  }
}
export async function getRandomPost(config?: {
  limit?: number | null
  postId?: number | string | null
  categorySlug?: string | null
}) {
  try {
    const {
      limit = 4,
      postId = null,
      categorySlug = null
    } = config || {
    }
    const categoryId = categorySlug ? checkOnlyNumber(categorySlug) && !checkHasString(categorySlug) ? Number(categorySlug) : null : null
    const query = `/post/random?limit=${limit}${postId ? '&postId=' + postId : ''}${categorySlug ? `&${categoryId ? 'categoryId' : 'categorySlug'}=` + categorySlug : ''}`
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + query, {
      cache: 'no-cache',
    })
    return await response.json() as RandomPostType[]
  } catch (error) {
    console.error(error)
  }
}
export async function getRecentSeriesList() {
  try {
    const query = process.env.NEXT_PUBLIC_API_URL + `/groups?populate[posts][count]=true${imagePopulate('thumbnail')}${sorting}&pagination[pageSize]=2`
    const response = await fetch(query, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceCollectionResponse<GroupListResponse>
  } catch (error) {
    console.error(error)
  }
}
export async function getPostSeriesList(page?: number | string | null) {
  try {
    const currentPage = page ? Number(page) : 1
    const query = process.env.NEXT_PUBLIC_API_URL + `/groups?pagination[page]=${currentPage}&populate[posts][count]=true${imagePopulate('thumbnail')}${sorting}&pagination[pageSize]=999`
    const response = await fetch(query, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceCollectionResponse<GroupListResponse>
  } catch (error) {
    console.error(error)
  }
}
export async function getPostSeriesCount(slug: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/groups/${slug}?populate[posts][count]=true${imagePopulate('thumbnail')}`, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceResponse<GroupListResponse>
  } catch (error) {
    console.error(error)
  }
}
export async function getPostSeries(slug: string) {
  try {
    const query = process.env.NEXT_PUBLIC_API_URL + `/groups/${slug}?populate[posts][populate][contents]=true&populate[posts][populate][thumbnail][fields][1]=url&populate[posts][populate][thumbnail][fields][2]=width&populate[posts][populate][thumbnail][fields][3]=height&populate[thumbnail]=true`
    const response = await fetch(query, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceResponse<GroupResponse>
  } catch (error) {
    console.error(error)
  }
}
export async function getOgMeta(url: string) {
  try {
    const response = await fetch(`${url}`, {
      cache: 'no-cache',
    })
    const html = await response.text()
    const $ = cheerio.load(html)
    const title = $('meta[property="og:title"]').attr('content')
    const description = $('meta[property="og:description"]').attr('content')
    const image = $('meta[property="og:image"]').attr('content')
    const imageWidth = $('meta[property="og:image:width"]').attr('content')
    const imageHeight = $('meta[property="og:image:height"]').attr('content')
    return {
      title,
      description,
      image,
      imageWidth,
      imageHeight,
    }

  } catch (error) {
    console.error(error)
  }

}

export async function getProfile() {
  try {
    const query = process.env.NEXT_PUBLIC_API_URL + `/profile?populate[photo][fields][0]=url&populate[photo][fields][1]=width&populate[photo][fields][2]=height`
    const response = await fetch(query, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceResponse<ProfileType>
  } catch (error) {
    console.error(error)
  }
}

export async function getApps() {
  try {
    const query = process.env.NEXT_PUBLIC_API_URL + `/app?populate[box]=true`
    const response = await fetch(query, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceResponse<{
      box: {
        id: number
        title: string
        contents: string
      }[]
    }>
  } catch (error) {
    console.error(error)
  }
}

export async function getWorks() {
  try {
    const query = process.env.NEXT_PUBLIC_API_URL + `/works?populate=*`
    const response = await fetch(query, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceCollectionResponse<{
      id: number
      title: string
      contents: string
      url: string
      thumbnail: {
        url: string
        width: number
        height: number
      }
    }>
  } catch (error) {
    console.error(error)
  }
}