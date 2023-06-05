'use client'

import { mat4 } from "gl-matrix"
import { useEffect, useRef } from "react"
import { DeviceToNormalised } from "./NewestFunctions"

const GoogleImage = () => {
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let gl = useRef<WebGLRenderingContext | null>(null)
    useEffect(() => {
        const image = new Image()
        image.src = 'http://res.cloudinary.com/dewhcvhvq/image/upload/v1683148330/whxzhkab41ho8hcqdt7a.webp'
        image.setAttribute('crossorigin', 'anonymous');
        image.onload = () => {
            if(!canvasRef.current)return
            gl.current = canvasRef.current!.getContext('webgl')
            if(!gl.current)return
            // gl.current.viewport(0, 0, gl.current.drawingBufferWidth, gl.current.drawingBufferHeight)
            gl.current.viewport(0, 0, image.width, image.height)
            gl.current.clearColor(0, 0, 0, 1)
            gl.current.clear(gl.current.COLOR_BUFFER_BIT)
            // only runs for the amount of vertices
            const vertexShaderSource = `
                attribute vec2 position;
                varying vec2 texCoords;
                uniform mat4 matrix;

                void main(){
                    texCoords = (position + 1.0)/2.0;
                    texCoords.y = 1.0 - texCoords.y;
                    gl_Position = matrix * vec4(position, 0, 1.0);
                }
            `;
            // runs for every pixil
            // every run, varying variable changes, uniform is a constant
            const fragShaderSource = `
                precision highp float;
                varying vec2 texCoords;
                uniform sampler2D textureSampler;

                void main(){
                    gl_FragColor = texture2D(textureSampler, texCoords);
                }
            ` ;
            const vertexShader = gl.current.createShader(gl.current.VERTEX_SHADER)
            const fragShader = gl.current.createShader(gl.current.FRAGMENT_SHADER)

            gl.current.shaderSource(vertexShader!, vertexShaderSource)
            gl.current.shaderSource(fragShader!, fragShaderSource)

            gl.current.compileShader(vertexShader!)
            gl.current.compileShader(fragShader!)

            const program = gl.current.createProgram()
            gl.current.attachShader(program!, vertexShader!)
            gl.current.attachShader(program!, fragShader!)
            // compiled shaders so they are programs on the graphics card
            // now they will be linked to one program/ validates that they are compatible
            gl.current.linkProgram(program!)
            gl.current.useProgram(program!)

            const vertices = new Float32Array([
                -1, -1,
                -1,  1,
                1,  1,

                -1, -1,
                1,  1,
                1, -1
            ])
            const matrix = mat4.create()
            // mat4.scale(matrix, matrix, [.2, .2, 0])
            // mat4.translate(matrix, matrix, [0, 0, 0])
            // mat4.translate(matrix, matrix, [DeviceToNormalised(0, image.width), DeviceToNormalised(0, image.height), 0])
           
            // creates chunck of memory in graphics card with nothing on it
            const vertexBuffer = gl.current.createBuffer()
            gl.current.bindBuffer(gl.current.ARRAY_BUFFER, vertexBuffer)
            gl.current.bufferData(gl.current.ARRAY_BUFFER, vertices, gl.current.STATIC_DRAW)
            const positionLocation = gl.current.getAttribLocation(program!, "position")
            // how much memory?
            gl.current.vertexAttribPointer(positionLocation, 2, gl.current.FLOAT, false, 0, 0)
            gl.current.enableVertexAttribArray(positionLocation)

            const texture = gl.current.createTexture()
            gl.current.activeTexture(gl.current.TEXTURE0)
            gl.current.bindTexture(gl.current.TEXTURE_2D, texture)
            // image can be html element?
            gl.current.texImage2D(gl.current.TEXTURE_2D, 0, gl.current.RGBA, gl.current.RGBA, gl.current.UNSIGNED_BYTE, image)
            gl.current.texParameteri(gl.current.TEXTURE_2D, gl.current.TEXTURE_WRAP_S, gl.current.CLAMP_TO_EDGE)
            gl.current.texParameteri(gl.current.TEXTURE_2D, gl.current.TEXTURE_WRAP_T, gl.current.CLAMP_TO_EDGE)
            gl.current.texParameteri(gl.current.TEXTURE_2D, gl.current.TEXTURE_MIN_FILTER, gl.current.LINEAR)
            gl.current.texParameteri(gl.current.TEXTURE_2D, gl.current.TEXTURE_MAG_FILTER, gl.current.LINEAR)
            const uniformLocations = {
                matrix: gl.current.getUniformLocation(program!, 'matrix')
            }
            gl.current.uniformMatrix4fv(uniformLocations.matrix, false, matrix)

            gl.current.drawArrays(gl.current.TRIANGLES, 0, 6)
        }
    },[])
    return (
        <canvas ref={canvasRef} className='w-full aspect-[3/2]'/>
    )
}

export default GoogleImage