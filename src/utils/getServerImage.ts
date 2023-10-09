export const getFromServer = (pathname: string) => {
  return process.env.NEXT_PUBLIC_SERVER_URL + pathname
}