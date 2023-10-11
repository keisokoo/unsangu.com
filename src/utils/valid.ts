export const checkOnlyNumber = (value: string) => {
  const regex = /^[0-9]+$/
  return regex.test(value)
}
export const checkHasString = (value: string) => {
  const regex = /[a-zA-Z가-힣]+/
  return regex.test(value)
}