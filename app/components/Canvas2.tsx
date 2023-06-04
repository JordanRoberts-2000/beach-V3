'use client'

import GLC from './GLCommander'
import React, { useEffect, useRef } from 'react'
import { createTriangle } from './WebGLFunctions'

const Canvas2 = () => {
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let gl = useRef<WebGLRenderingContext | null>(null)
    const FPS = 30
    const nextFrame = 1000/FPS
    let lastAnimateTime = useRef(0)
    let animationTimer = useRef(0)
    const render = (timeStamp: number) => {
        const deltaTIme = timeStamp - lastAnimateTime.current
        lastAnimateTime.current = timeStamp;
        if(animationTimer.current > nextFrame){
            animationTimer.current = 0
            renderFunction()
        }else{
            animationTimer.current += deltaTIme
        }
        window.requestAnimationFrame(render)
    }
    const renderFunction = () => {
        const vertexData = [
            0, 1, 0, //point one, x, y, z
            1, -1, 0,
            -1, -1, 0
        ]
        const colorData = [
            1, 0, 0,
        ]
        createTriangle(gl.current!, vertexData, colorData); //white
        gl.current!.drawArrays(gl.current!.TRIANGLES, 0, 3);
        
    }
    useEffect(() => {
        gl.current = canvasRef.current!.getContext("webgl");
        if(!gl.current)return
        render(0)
        
    },[])
  return (
    <canvas ref={canvasRef} width={400} height={400} className='border border-black'/>
  )
}

export default Canvas2