import React, { memo } from "react";


type PropsType={
    value: any,
    color: string,
    style?: any
}

export const Badge:React.FC<PropsType> = memo(({value,color,style}) =>{

    return<span {...style} className={'badge' + ' ' + color } >
        {value}
    </span>
})