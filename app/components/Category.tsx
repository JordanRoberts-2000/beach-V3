'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Props = {
    title: string,
    imageUrl: string
}

const Category = ({title, imageUrl}: Props) => {
    let imageRef = useRef<HTMLImageElement>(null)
    let imageWrapperRef = useRef<HTMLDivElement>(null)
    const FPS = 120
    const nextFrame = 1000/FPS
    let lastAnimateTime = useRef(0)
    let animationTimer = useRef(0)
    const raf = async (timeStamp: number) => {
        const deltaTIme = timeStamp - lastAnimateTime.current
        lastAnimateTime.current = timeStamp;
        if(animationTimer.current > nextFrame){
            animationTimer.current = 0
            if(imageWrapperRef.current!.getBoundingClientRect().top <= window.innerHeight && imageWrapperRef.current!.getBoundingClientRect().top >= -imageWrapperRef.current!.getBoundingClientRect().height){
                let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
                let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.35)
                imageRef.current!.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .7))}px) scale(1.7)`
            }
        }else{
            animationTimer.current += deltaTIme
        }
        window.requestAnimationFrame(raf)
    }
    useEffect(() => {
        raf(0)
    },[])
    return (
        <>
            <div ref={imageWrapperRef} className='relative w-full aspect-[3/2] overflow-hidden'>
                <Image ref={imageRef} src={imageUrl} alt='placeholder' fill className='object-cover will-change-transform duration-[5ms]'/>
            </div>
        </>
    )
}

export default Category