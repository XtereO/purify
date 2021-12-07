import { Icon20Info } from "@vkontakte/icons"
import {Tooltip} from './Tooltip'
import React, { memo, useEffect, useState } from "react"



type PropsType = {
    title: string,
    value: number,
    tooltipDescription: string,
    bar: string,
    aqi?: number,
    bgApp: string
}

export const PollutionItem: React.FC<PropsType> = memo(({ title, value, tooltipDescription, bar, aqi, bgApp }) => {

    let [isOpen, setOpen] = useState(false)
    let [isClosed, setClosed] = useState(false)

    const showTooltip = () => {
        setOpen(true)
        /*setTimeout(() => {
            setShow(false)
        }, 4000)*/
    }
    useEffect(()=>{
        if(isOpen){
            setTimeout(()=>{
                setClosed(true)
                setOpen(false)
                setClosed(false)
            },3000)
        }
        return()=>{
            setClosed(true)
            setClosed(false)
        }
    },[isOpen])

    return <div
        style={{paddingRight:4,paddingLeft:4, color:bgApp==='bg__app__light' ? '#454545' : 'white'}}
        className='w-100 pollution__item'>
        <div style={{fontSize:16,overflow:'hidden'}} >
            {title}
        </div>
        <div className='center__y'>
            <progress className={bar} value={aqi ? aqi : value } max={100}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end'}}>
            <div className='text__gray' style={{fontSize:14,height:20,overflow:'hidden'}}>
                {value}  μm<sup>3</sup>
            </div>
            <div onClick={(!isClosed) ? showTooltip : ()=>{}} style={{marginLeft:3}}>
                {(!isClosed) && <Tooltip tooltipDescription={tooltipDescription}>
                    <Icon20Info fill='#C1C1C1' />
                </Tooltip>}
                {(isClosed) && <Tooltip tooltipDescription={tooltipDescription}>
                <Icon20Info fill='#C1C1C1' />
                    </Tooltip>}
            </div>
        </div>
    </div>
})
