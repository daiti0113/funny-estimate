export const scrollToTarget = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return null
  const rect = element.getBoundingClientRect()
  const position = rect.top
  scrollTo(0, position)
  console.log("SCROLLED")
}
