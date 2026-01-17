import MDXEditor from '@/components/app-components/blogs/mdx-editor';
import { scrapeWebsite } from '../api/website/add/scrape';

const TestPage = async () => {
  const scrapeData = await scrapeWebsite("https://authiq.vercel.app");
  console.log(scrapeData)
  return (
    <div>
      <MDXEditor />
    </div>
  )
}

export default TestPage