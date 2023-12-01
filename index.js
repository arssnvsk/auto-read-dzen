import puppeteer, { KnownDevices } from 'puppeteer'
import { getRandomArbitrary, getRandomElementFromArray, getRandomElementFromObject } from './utils/helpers.js'

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()

  const randomDevice = getRandomElementFromObject(KnownDevices)[0]
  await page.emulate(KnownDevices[randomDevice])
  // Navigate the page to a URL
  await page.goto('https://dzen.ru/investment_friend')
  // await new Promise((resolve) => setTimeout(() => resolve(), getRandomArbitrary(1000, 5000)))
  // find cards
  await page.waitForSelector('article')
  const cards = await page.$$('article')
  // click on random card
  const randomCard = getRandomElementFromArray(cards)
  await randomCard?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  await randomCard.click()

  // setting new page
  let pages = []
  await new Promise((resolve) => {
    setTimeout(async () => {
      pages = await browser.pages()
      resolve()
    }, 1000)
  })
  //  auto scroll
  await autoScroll(pages[2])
  // await browser.close()
})()

async function autoScroll (page) {
  await page.evaluate(async () => {
    const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
    return new Promise((resolve) => {
      var totalHeight = 0
      var distance = getRandomArbitrary(50, 200)
      var scrolls = 0  // scrolls counter
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        scrolls++  // increment counter

        // stop scrolling if reached the end or the maximum number of scrolls
        if (totalHeight >= scrollHeight - window.innerHeight || scrolls >= maxScrolls) {
          clearInterval(timer)
          resolve()
        }
      }, getRandomArbitrary(1000, 5000))
    })
  })// pass maxScrolls to the function
}
