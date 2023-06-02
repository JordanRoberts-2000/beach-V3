'use client'

import { useEffect, useRef } from "react";

const PixiCanvas = () =>{
    let canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        let gl = canvasRef.current!.getContext('webgl')
        if(!gl){
            throw new Error('webGl not suppported')
        }
        const vertexData = [
            0, 1, 0, //point one, x, y, z
            1, -1, 0,
            -1, -1, 0
        ]
        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW) // DYNAMIC DRAW - graphic card ready to rewrite
        // shader is like a mini-program and runs on the gpu, the string is the langauge, then need to compile it
        // vertex shader is shape/points
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader!, `
        attribute vec3 position;
        void main(){
            gl_Position = vec4(position, 1);
        }
        `)
        gl.compileShader(vertexShader!)
        // fragment shader is the color
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader!, `
        void main(){
            gl_FragColor = vec4(1, 0, 0, 1);
        }
        `)
        gl.compileShader(fragmentShader!)
        // combine the shaders
        const program = gl.createProgram()
        gl.attachShader(program!, vertexShader!)
        gl.attachShader(program!, fragmentShader!)
        gl.linkProgram(program!)

        const positionLocation = gl.getAttribLocation(program!, 'position')
        gl.enableVertexAttribArray(positionLocation)
        gl.vertexAttribPointer(positionLocation!, 3, gl.FLOAT, false, 0, 0)

        //creates an .exe on the graphics card
        gl.useProgram(program)
        gl.drawArrays(gl.TRIANGLES, 0, 3) // type, startPosition, how many points
    },[])
    return (
        <canvas ref={canvasRef} id="webgl" width={400} height={400} className="border border-black mb-40"/>
    );
};

export default PixiCanvas