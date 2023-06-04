'use client'

import { useEffect, useLayoutEffect, useRef } from "react"
import { bindAttribute, createAndAddToArrayBuffer, createAndAddToElementBuffer, createFragShader, createVertexShader, setUpProgram, webglSetup } from "./NewestFunctions"

const Newest = () => {
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let gl = useRef<WebGLRenderingContext | null>(null)
    useLayoutEffect(() => {
        if(!canvasRef.current)return
        gl.current = canvasRef.current!.getContext("webgl")
        if(!gl.current)return
        
        let vertices = [
            // DeviceToNormalised(100, canvasRef.current.width), DeviceToNormalised(100, canvasRef.current.height), 0,
            // DeviceToNormalised(200, canvasRef.current.width), DeviceToNormalised(200, canvasRef.current.height), 0,
            // DeviceToNormalised(100, canvasRef.current.width), DeviceToNormalised(200, canvasRef.current.height), 0,
            // DeviceToNormalised(200, canvasRef.current.width), DeviceToNormalised(100, canvasRef.current.height), 0,
            // DeviceToNormalised(100, canvasRef.current.width), DeviceToNormalised(200, canvasRef.current.height), 0,
            // DeviceToNormalised(100, canvasRef.current.width), DeviceToNormalised(100, canvasRef.current.height), 0,
            .1, .1, 0,
            -0.1, -0.1, 0,
            -0.1, 0.1, 0,
            0.1, 0.1, 0,
            0.1, -0.1, 0,
            -0.1, -0.1, 0
            // 1, 1, 0,
            // -1, -1, 0,
            // -1, 1, 0,
            // 1, 1, 0,
            // 1, -1, 0,
            // -1, -1, 0
        ]
        let colors = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ]
        webglSetup(gl.current, vertices, colors)
        gl.current.clearColor(0.0,0.0,0.0,1.0)
         // gl.current.enable(gl.current.DEPTH_TEST) // allows 3d
        gl.current.clear(gl.current.COLOR_BUFFER_BIT)
        gl.current.viewport(0, 0, canvasRef.current.width, canvasRef.current.height)
        // gl.current.drawArrays(gl.current.LINES, 0, 4) 
        // gl.current.drawArrays(gl.current.LINE_STRIP, 0, 4) // connects all lines
        // gl.current.drawArrays(gl.current.LINE_LOOP, 0, 4)// connects all lines + first and last line
        // gl.current.drawElements(gl.current.TRIANGLES, 6, gl.current.UNSIGNED_SHORT, 0)
        gl.current.drawArrays(gl.current.TRIANGLES, 0, 6)
        // gl.current.drawArrays(gl.current.POINTS, 0, 3) // start at 0 end at 3
        // gl.current.drawElements(gl.current.TRIANGLES, indices.length, gl.current.UNSIGNED_SHORT, 0)
    },[])
    return (
        <canvas ref={canvasRef} height={400} width={400} className='border border-black'/>
    )
}

export default Newest