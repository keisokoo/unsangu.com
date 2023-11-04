export async function copyToClipboard(text: string): Promise<string> {
  if (window.navigator?.clipboard && window.isSecureContext) {
    return new Promise((res, rej) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          res(text)
        })
        .catch((err) => {
          rej('error')
        })
    })
  } else {
    const El = document.createElement('textarea')
    El.style.position = 'absolute'
    El.style.opacity = '0'
    document.body.appendChild(El)
    El.value = text
    El.focus()
    El.select()
    return new Promise((res, rej) => {
      document.execCommand('copy') ? res(text) : rej('error')
      El.remove()
    })
  }
}
export const codeCopy = (e: Event) => {
  const currentTarget = e.currentTarget as HTMLElement
  const codeBlock = currentTarget.closest('[data-code]')?.querySelector('code') as HTMLElement
  if (!codeBlock) return
  const cloneBlock = codeBlock.cloneNode(true) as HTMLElement
  cloneBlock.style.position = 'absolute'
  cloneBlock.style.opacity = '0'
  document.body.appendChild(cloneBlock)
  // const linenumbers = cloneBlock?.querySelectorAll('span.linenumber')
  // linenumbers?.forEach(linenumber => linenumber.remove())
  cloneBlock?.textContent && copyToClipboard(cloneBlock.textContent)
  document.body.removeChild(cloneBlock)
}
