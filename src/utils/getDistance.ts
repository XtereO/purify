type GetDistance = {
    point1:{
        latitude:number,
        longitude:number
    },
    point2:{
        latitude:number,
        longitude:number
    }
}

export const getDistance = ({point1,point2}:GetDistance):number =>{
    const RADIUS_EARTH = 6371
    const P = Math.PI
    
    const distance = (((((point1.latitude-point2.latitude)**2) + ((point2.longitude-point2.longitude)**2))**0.5)/180)*P*RADIUS_EARTH 

    return (+(String(distance).slice(0,3)))
}
