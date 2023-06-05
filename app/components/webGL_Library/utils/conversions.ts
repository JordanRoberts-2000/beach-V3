export const DeviceToNormalised = (coord: number, axisSize: number) => {
    let halfAxisSize = axisSize / 2
    let normalisedCoord = (coord / halfAxisSize) - 1
    return normalisedCoord
}

export const verticesConverter = (viewport: number[], position: number[], size: number[], type: string) => {
    let vertices
    switch(type){
        case 'square':
            vertices = [
                DeviceToNormalised(position[0], viewport[0]), DeviceToNormalised(position[1], viewport[1]),
                DeviceToNormalised(position[0], viewport[0]), DeviceToNormalised(position[1] + size[1], viewport[1]),
                DeviceToNormalised(position[0] + size[0], viewport[0]), DeviceToNormalised(position[1], viewport[1]),
                DeviceToNormalised(position[0], viewport[0]), DeviceToNormalised(position[1] + size[1], viewport[1]),
                DeviceToNormalised(position[0] + size[0], viewport[0]), DeviceToNormalised(position[1] + size[1], viewport[1]),
                DeviceToNormalised(position[0] + size[0], viewport[0]), DeviceToNormalised(position[1], viewport[1])
            ]
            break
        case 'line':
            vertices = [
                DeviceToNormalised(position[0], viewport[0]), DeviceToNormalised(position[1], viewport[1]),
                DeviceToNormalised(size[0], viewport[0]), DeviceToNormalised(size[1], viewport[1]),
            ]
            break
    }
    return vertices
}

export const colorConverter = (colorOf: number[], points: number) => { 
    let color: number[] = []
    for(let i = 0; i < points; i++){
        color.push( colorOf[0] ? colorOf[0]/255 : 0)
        color.push( colorOf[1] ? colorOf[1]/255 : 0)
        color.push( colorOf[2] ? colorOf[2]/255 : 0)
    }
    return color
}
