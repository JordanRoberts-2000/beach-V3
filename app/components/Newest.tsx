'use client'

import { useEffect, useLayoutEffect, useRef } from "react"
import { webGL_2DTriangle90Deg } from "./NewestFunctions"
import { mat4 } from "gl-matrix"
import { webGL_2DIMAGE, webGL_2DLine, webGL_2DRect, webGL_Background } from "./webGL_Library/draw"

const Newest = () => {
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let gl = useRef<WebGLRenderingContext | null>(null)
    let Xtranslation = useRef(0)
    let Ytranslation = useRef(0)
    useLayoutEffect(() => {
        const image = new Image()
        image.src = '/AMONG_US.png'
        image.setAttribute('crossorigin', 'anonymous');
        image.onload = () => {
            if(!canvasRef.current)return
            gl.current = canvasRef.current!.getContext("webgl")
            if(!gl.current)return
            console.log(canvasRef.current.width, canvasRef.current.height, 'karate')
            gl.current.viewport(0, 0, 800, 800)
            // let vertices = webGL_2DTriangle90Deg([0, 0], [50, 100], canvasRef.current, gl.current)
            const matrix = mat4.create()
            // mat4.scale(matrix, matrix, [1, 1, 0])
            // mat4.translate(matrix, matrix, [.3, .3, 0])
            // mat4.rotateZ(matrix, matrix, 1)
            // webGL_2DLine(canvasRef.current!, gl.current!, [20, 200], 10, [1, 0, 1, 1, 0, 1])
            webGL_Background(gl.current!, [0, 0, 0])
            webGL_2DIMAGE([800, 800], gl.current!, [100 + Xtranslation.current!,100 + Ytranslation.current!], [100, 100], [100, 0, 100], matrix, image)
            webGL_2DRect([800, 800], gl.current!, [0 + Xtranslation.current!,0 + Ytranslation.current!], [50, 50], [100, 0, 100], matrix)
            const animate = () => {
                webGL_Background(gl.current!, [0, 0, 0])
                webGL_2DLine([800, 800], gl.current!, [canvasRef.current!.width/2, 0], [canvasRef.current!.width/2, canvasRef.current!.height], 10.0, [255, 255, 255])
                webGL_2DLine([800, 800], gl.current!, [0, canvasRef.current!.height/2], [canvasRef.current!.width, canvasRef.current!.height/2], 10.0, [255, 255, 255])
                webGL_2DRect([800, 800], gl.current!, [(canvasRef.current!.width/2) + Xtranslation.current!,(canvasRef.current!.width/2) + Ytranslation.current!], [100, 100], [100, 0, 100], matrix)
                window.requestAnimationFrame(animate)
            }
            // animate()
            window.addEventListener("keydown", (event) => {
                var keyCode = event.key;
                switch (keyCode) {
                    case 'w' || 'ArrowUp': 
                        Ytranslation.current += 1
                        break;
                    case 'a':
                        Xtranslation.current -= 1
                        break;
                    case 's':
                        Ytranslation.current -= 1
                        break;
                    case 'd': 
                        Xtranslation.current += 1
                        break;
                }
            });
            
            // gl.current.drawArrays(gl.current.LINES, 0, 4) 
            // gl.current.drawArrays(gl.current.LINE_STRIP, 0, 4) // connects all lines
            // gl.current.drawArrays(gl.current.LINE_LOOP, 0, 4)// connects all lines + first and last line
            // gl.current.drawElements(gl.current.TRIANGLES, 6, gl.current.UNSIGNED_SHORT, 0)
            // gl.current.drawArrays(gl.current.POINTS, 0, 3) // start at 0 end at 3
            // gl.current.drawElements(gl.current.TRIANGLES, indices.length, gl.current.UNSIGNED_SHORT, 0)
        }
    },[])
    return (
        <canvas ref={canvasRef} height={400} width={400} className='border border-black'/>
    )
}

export default Newest