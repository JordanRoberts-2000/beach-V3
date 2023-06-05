import { mat4 } from "gl-matrix"
import { bindAttribute } from "./utils/attributes"
import { createAndAddToArrayBuffer } from "./utils/buffers"
import { colorConverter, verticesConverter } from "./utils/conversions"
import { setUpProgram } from "./utils/program"
import { createFragShader, createVertexShader } from "./utils/shaders"

export const webGL_Background = (gl: WebGLRenderingContext, color: number[]) => {
    color = colorConverter(color, 1)
    gl.clearColor(color[0],color[1], color[2],1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

export const webGL_2DRect = (viewport: number[], gl:WebGLRenderingContext, position: number[], size: number[], colorOf: number[], matrix: any, image?: any) => {
    let vertices = verticesConverter(viewport, position, size, "square")
    let color = colorConverter(colorOf, 6)
    let verticesBuffer = createAndAddToArrayBuffer(gl, vertices!)
    let vertexSource = `
        attribute vec2 coordinates;
        attribute vec3 color;
        varying vec3 vColor;
        uniform mat4 matrix;

        void main(void){
            gl_Position = matrix * vec4(coordinates, 0, 1.0);
            vColor = color;
        }`
    let vertexShader = createVertexShader(gl, vertexSource)
    let colorBuffer = createAndAddToArrayBuffer(gl, color)
    let fragSource = `
        precision mediump float;
        varying vec3 vColor;

        void main(void){
            gl_FragColor = vec4(vColor, 1.0);
        }`
    let fragShader = createFragShader(gl, fragSource)
    let program = setUpProgram(gl, vertexShader, fragShader)
    bindAttribute(gl, program, verticesBuffer, "coordinates", 2)
    bindAttribute(gl, program, colorBuffer, "color", 3)
    const uniformLocations = {
        matrix: gl.getUniformLocation(program!, 'matrix')
    }
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
    if(image){
        const texture = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    }
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

export const webGL_2DLine = (viewport: number[], gl:WebGLRenderingContext, position: number[], position2: number[], size: number, colorOf: number[]) => {
    let vertices = verticesConverter(viewport, position, position2, 'line')
    let verticesBuffer = createAndAddToArrayBuffer(gl, vertices!)
    let vertSource = `
        attribute vec2 coordinates;
        attribute vec3 color;
        varying vec3 vColor;

        void main(void){
            gl_Position = vec4(coordinates,0.0, 1.0);
            vColor = color;
        }
    `
    let vertexShader = createVertexShader(gl, vertSource)
    let colorBuffer = createAndAddToArrayBuffer(gl, colorOf)
    let fragSource = `
        precision mediump float;
        varying vec3 vColor;

        void main(void){
            gl_FragColor = vec4(vColor, 1.0);
        }
    `
    let fragShader = createFragShader(gl, fragSource)
    let program = setUpProgram(gl, vertexShader, fragShader)
    bindAttribute(gl, program, verticesBuffer, "coordinates", 2)
    bindAttribute(gl, program, colorBuffer, "color", 3)
    gl.drawArrays(gl.LINES, 0, 2)
}

export const webGL_2DIMAGE = (viewport: number[], gl:WebGLRenderingContext, position: number[], size: number[], colorOf: number[], matrix: any, image?: any) => {
    let vertexData = verticesConverter(viewport, position, size, "square")
    console.log(vertexData, 'answers')
    // let vertexData = [
    //     0, 0, 0,
    //     0, 1, 0,
    //     1, 0, 0,

    //     1, 0, 0,
    //     0, 1, 0,
    //     1, 1, 0,
    // ]
    let uvData = [
        0, 0,
        0, 1,
        1, 0,
        
        0, 1,
        1, 1,
        1, 0
        
      
      
    ]
    let positionBuffer = createAndAddToArrayBuffer(gl, vertexData!)
    let uvBuffer = createAndAddToArrayBuffer(gl, uvData)
    const brick = loadTexture(gl, image);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, brick);
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader!, `
    precision mediump float;

    attribute vec2 position;
    attribute vec2 uv;

    varying vec2 vUV;

    uniform mat4 matrix;

    void main() {
        vUV = uv;
        gl_Position = matrix * vec4(position, 0, 1);
        
    }
    `);
    gl.compileShader(vertexShader!);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader!, `
    precision mediump float;

    varying vec2 vUV;
    uniform sampler2D textureID;

    void main() {
        gl_FragColor = texture2D(textureID, vUV);
    }
    `);
    gl.compileShader(fragmentShader!);
    // Texture
    // =================================
    const program = gl.createProgram();
    gl.attachShader(program!, vertexShader!);
    gl.attachShader(program!, fragmentShader!);

    gl.linkProgram(program!);

    const positionLocation = gl.getAttribLocation(program!, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uvLocation = gl.getAttribLocation(program!, `uv`);
    gl.enableVertexAttribArray(uvLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    let uniformLocations;
    uniformLocations = {
        matrix: gl.getUniformLocation(program!, `matrix`),
        textureID: gl.getUniformLocation(program!, 'textureID'),
    };

    gl.uniform1i(uniformLocations.textureID, 0);
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

function loadTexture(gl: WebGLRenderingContext, image: any) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    return texture;
}

// POINT 

// export const webGL_2DLine = (canvas: HTMLCanvasElement, gl:WebGLRenderingContext, position: number[], position2: number[], size: number, colorOf: number[]) => {
//     let vertices = verticesConverter(canvas, position, position2, 'line')
//     let verticesBuffer = createAndAddToArrayBuffer(gl, vertices!)
//     let vertSource = `
//         attribute vec2 coordinates;
//         attribute vec3 color;
//         varying vec3 vColor;
//         uniform float pointSize;

//         void main(void){
//             gl_Position = vec4(coordinates,0.0, 1.0);
//             vColor = color;
//             gl_PointSize = pointSize;
//         }
//     `
//     let vertexShader = createVertexShader(gl, vertSource)
//     let colorBuffer = createAndAddToArrayBuffer(gl, colorOf)
//     let fragSource = `
//         precision mediump float;
//         varying vec3 vColor;

//         void main(void){
//             gl_FragColor = vec4(vColor, 1.0);
//         }
//     `
//     let fragShader = createFragShader(gl, fragSource)
//     let program = setUpProgram(gl, vertexShader, fragShader)
//     bindAttribute(gl, program, verticesBuffer, "coordinates", 2)
//     bindAttribute(gl, program, colorBuffer, "color", 3)
//     const uniformLocations = {
//         matrix: gl.getUniformLocation(program!, 'pointSize')
//     }
//     gl.uniform1f(uniformLocations.matrix, size)
//     gl.drawArrays(gl.POINTS, 0, 2)
// }


