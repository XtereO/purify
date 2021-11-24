

//@ts-ignore
import React, { memo, useRef } from "react";
import { Layer, Stage, Image, Text } from "react-konva";
//@ts-ignore
import placePNG from "../media/place.png";
import { EcoCityData } from "../types/EcoTypes";
import useImage from 'use-image';


type PropsType = {
    city: EcoCityData|null
}

export const MyCanvas:React.FC<PropsType> = ({city}) => {

    

    if(city){
    return<Stage
    id={'canvas'}
    className={city.current.aqi > 100 ?
        'home__bad__weather' : 'home__good__weather'}
        style={{ width: 253, height: 250, borderRadius: 20 }}
        width={253} height={250}
    >

        <Layer>
            <Text
                fontFamily={'SF-Pro-Rounded-Heavy'}
                text="Качество воздуха:"
                x={55}
                fontSize={15}
                y={52}
                fill='rgba(0, 0, 0, 0.5)'
                width={123}
                height={30}
            />
            <Text
                fontFamily={'SF-Pro-Rounded-Heavy'}
                text={city.current.aqi > 100 ? "Плохое" : "Хорошее"}
                x={city.current.aqi>100 ? 66 : 53.5 } //53.5
                fontSize={32}
                y={76}
                fill='rgba(0, 0, 0, 0.5)'
                width={city.current.aqi>100 ? 121 : 146}//146
                height={38}
            />
            <Text
                fontFamily={'SF-Pro-Rounded-Regular'}
                text={city.name}
                x={(253-(city.name.length*8))/2}
                fontSize={17}
                y={130}
                fill='rgba(0, 0, 0, 0.5)'
                width={200}
                height={100}
            />
            <PlaceImage x={(253-(city.name.length*8)-30)/2}/>
        </Layer>

    </Stage>}
    return <canvas></canvas>
}

type PropsPlaceType={
    x: number
}
const PlaceImage:React.FC<PropsPlaceType> = ({x}) => {
    const [image] = useImage(placePNG);
    return <Image
        x={x}
        y={130}
        image={image} />;
};