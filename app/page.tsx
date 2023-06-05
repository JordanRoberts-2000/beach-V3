import Category from "./components/Category";
import pageData from '@/Data.json'
import PixiCanvas from "./components/PixiCanvas";
import Newest from "./components/Newest";
import GoogleImage from "./components/GoogleImage";
import THREEJS from "./components/THREEJS";

export default function Home() {
  return (
    <main className="flex flex-col px-2 gap-2 pt-40">
        <div className="fixed top-[5rem] text-center font-semibold text-5xl z-30 left-[50%] translate-x-[-50%]">Sezzi is<br/> gay</div>
        <div className="fixed bottom-[7rem] text-center font-semibold text-5xl whitespace-nowrap z-30 left-[50%] translate-x-[-50%]">Cows <span className=" underline">always</span><br/> win</div>
        {pageData.map(({imageUrl, title, subtitle, priceOptions, reviews, galleryImageUrls, blurImageUrl, introParagraph}, i) => (
            <>
                
                    {/* <Category key={title} imageUrl={imageUrl} title={title}/> */}
                
                {i === 1 && 
                    <>
                        <THREEJS key='hello'/>
                        {/* <Category key={title} imageUrl={imageUrl} title={title}/>
                        <GoogleImage key="google"/>
                        <Newest key={'key3'}/>
                        <PixiCanvas key={'key'}/> */}
                    </>
                }
            </>
        ))}
    </main>
  )
}
