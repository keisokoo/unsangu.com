
import { CategoryListItem, PostType, ServiceCollectionResponse, ServiceResponse } from "./types"
const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
  },
  cache: 'no-cache' as RequestCache
}
export async function getRecentPost() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts?populate=*&pagination[pageSize]=1&sort[id]=desc', { ...fetchOptions })
    return (await response.json() as ServiceCollectionResponse<PostType>).data?.[0]
  } catch (error) {
    console.error(error)
  }
}
export async function getPostByID(id: number, category?: number | null) {
  try {
    const categoryFilter = category ? `&filters[$and][1][categories][id]=${category}` : ''
    const prevQuery = `/posts/?filters[$and][0][id][$lt]=${id}&pagination[pageSize]=1&sort[id]=desc${categoryFilter}`
    const nextQuery = `/posts/?filters[$and][0][id][$gt]=${id}&pagination[pageSize]=1&sort[id]=asc${categoryFilter}`
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
export async function getPosts(page?: number) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts?pagination[page]=${page}`, {
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
export async function getPostsByCategoryId(id: number, page?: number) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts?filters[categories][id]=${id}&populate=contents&pagination[page]=${page}`, {
      cache: 'no-cache',
    })
    return await response.json() as ServiceCollectionResponse<PostType>
  } catch (error) {
    console.error(error)
  }
}
export async function getPostWithoutRecentPost(id: number) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts?populate=*&filters[id][$lt]=${id}`, {
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
export async function getCategoryList() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/categories?populate[posts][count]=true', {
      cache: 'no-cache',
    })
    const data = await response.json() as ServiceCollectionResponse<CategoryListItem>
    if (!data?.data) return []
    return data.data.map(category => ({
      id: category.id,
      name: category.attributes.name,
      count: category.attributes.posts.data.attributes.count
    }))
  } catch (error) {
    console.error(error)
  }
}