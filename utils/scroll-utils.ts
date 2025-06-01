import type React from "react"
export const scrollToElement = (elementId: string, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

export const createSmoothScrollHandler = (elementId: string, offset = 0) => {
  return (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToElement(elementId, offset)
  }
}
