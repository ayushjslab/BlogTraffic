import React from 'react'
import { scrapeWebsite } from '../api/website/add/scrape';

const TestPage = async() => {
    const scrapeData = await scrapeWebsite("https://www.convex.dev");
    console.log(scrapeData)
  return (
    <div>TestPage</div>
  )
}

export default TestPage