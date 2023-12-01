export const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
export const getRandomElementFromArray = (array = []) => {
  const index = getRandomArbitrary(0, array.length - 1)
  return array[Math.floor(index)]
}
export const getRandomElementFromObject = (object) => {
  const [key, value] = getRandomElementFromArray(Object.entries(object))
  return [key, value]
}

export const autoScroll = async (page) => {
  await page.evaluate(async () => {
    console.log('here')
    await new Promise((resolve) => {
      var totalHeight = 0
      var distance = 100
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
}
