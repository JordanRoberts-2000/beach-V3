'use client'

import { mat4 } from "gl-matrix";
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

        const colorData = [
            1, 0, 0, //red, vertex 1 color
            0, 1, 0, // vertex 2
            0, 0, 1, // vertex 3
        ]

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW) // DYNAMIC DRAW - graphic card ready to rewrite
        // shader is like a mini-program and runs on the gpu, the string is the langauge, then need to compile it
        // vertex shader is shape/points

        const colorBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW) // DYNAMIC DRAW - graphic card ready to rewrite
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        // uniform = global javascript and c variable
        gl.shaderSource(vertexShader!, `
        precision mediump float;
        
        attribute vec3 position;
        attribute vec3 color;
        varying vec3 vColor;

        uniform mat4 matrix;
        
        void main() {
            vColor = color;
            gl_Position = matrix * vec4(position, 1);
        }
        
        `)
        gl.compileShader(vertexShader!)
        // fragment shader is the color
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader!, `
        precision mediump float;
        varying vec3 vColor;
        void main(){
            gl_FragColor = vec4(vColor, 1);
        }
        `)
        gl.compileShader(fragmentShader!)
        // combine the shaders
        const program = gl.createProgram();
        gl.attachShader(program!, vertexShader!);
        gl.attachShader(program!, fragmentShader!);
        
        gl.linkProgram(program!);
        
        const positionLocation = gl.getAttribLocation(program!, `position`);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        
        const colorLocation = gl.getAttribLocation(program!, `color`);
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
        
        gl.useProgram(program);

        const uniformLocations = {
            matrix: gl.getUniformLocation(program!, 'matrix')
        }

        const matrix = mat4.create()

        gl.drawArrays(gl.TRIANGLES, 0, 3);
        const animate = (gl: WebGLRenderingContext) => {
            // mat4.translate(matrix, matrix, [.2, .5, 0])
            mat4.rotateZ(matrix, matrix, Math.PI/2/70)
            gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
            window.requestAnimationFrame(() => animate(gl))
        }
        animate(gl)
    },[])
    return (
        <canvas ref={canvasRef} id="webgl" width={400} height={400} className="border border-black mb-40"/>
    );
};

export default PixiCanvas