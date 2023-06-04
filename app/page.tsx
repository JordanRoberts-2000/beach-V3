import Category from "./components/Category";
import pageData from '@/Data.json'
import PixiCanvas from "./components/PixiCanvas";
import Canvas2 from "./components/Canvas2";
import Newest from "./components/Newest";
import GoogleImage from "./components/GoogleImage";

export default function Home() {
  return (
    <main className="flex flex-col px-2 gap-2 pt-40">
        {pageData.map(({imageUrl, title, subtitle, priceOptions, reviews, galleryImageUrls, blurImageUrl, introParagraph}, i) => (
            <>
                
                    {/* <Category key={title} imageUrl={imageUrl} title={title}/> */}
                
                {i === 1 && 
                    <>
                        <Category key={title} imageUrl={imageUrl} title={title}/>
                        <GoogleImage key="google"/>
                        <Newest key={'key3'}/>
                        <PixiCanvas key={'key'}/>
                        {/* <Canvas2 key={'key2'}/> */}
                    </>
                }
            </>
        ))}
    </main>
  )
}
