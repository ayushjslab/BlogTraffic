import { scrapeWebsite } from '../api/website/add/scrape';

const TestPage = async() => {
    const scrapeData = await scrapeWebsite("https://authiq.vercel.app");
    console.log(scrapeData)
  return (
    <div>TestPage</div>
  )
}

export default TestPage