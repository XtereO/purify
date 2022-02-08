import React from "react";
//@ts-ignore
import loader from "../media/loader.gif";

type Props={}

export const Loader = React.memo<Props>((props)=>{
    return<img className='w-100' src={loader} />
})
