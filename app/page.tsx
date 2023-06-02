import Category from "./components/Category";
import pageData from '@/Data.json'

export default function Home() {
  return (
    <main className="flex flex-col px-2 gap-2 pt-40">
        {pageData.map(({imageUrl, title, subtitle, priceOptions, reviews, galleryImageUrls, blurImageUrl, introParagraph}) => (
            <Category key={title} imageUrl={imageUrl} title={title}/>
        ))}
    </main>
  )
}
