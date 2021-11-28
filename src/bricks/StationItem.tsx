import { Icon24ChevronCompactRight, Icon24ErrorCircle } from "@vkontakte/icons"
import { Cell } from "@vkontakte/vkui"
import React, { memo } from "react"
import {Badge} from './Badge'
//@ts-ignore
import stationPNG from '../media/station.svg'
import { Icon12ErrorCircle } from '@vkontakte/icons';


type PropsType={
    stationName: string,
    value: any,
    mode: 'danger' | 'okay' | 'good',
    onClick?: ()=>void,
    distance: number
}

export const StationItem:React.FC<PropsType>=memo(({value, mode, stationName, distance})=>{
    const color='bg__'+mode
    return<div style={{fontSize:16, color:'#454545'}} className='w-100'>
        <Cell
        disabled={true}
        after={<div>
        <Badge value={value}  color={color} />
        {/*<Icon24ChevronCompactRight fill='#C1C1C1' />*/}
        </div>
        }>
        <div className='d-flex'>
            <div className='center__y'>
                <img src={stationPNG} style={{marginRight:16}} />
            </div>
            <div>
            <div style={{fontSize:16,width:200,overflowX:'scroll'}}>
                {stationName}
            </div>
            <div className="text__gray">
                
                {distance>10 && <div
                className='d-flex'><div style={{height:18,marginRight:5}} className='center__y'>
                    <Icon12ErrorCircle fill='C1C1C1'/>
                </div><div 
                className='center__y'
                style={{fontSize:15,height:18}}>Может быть неточной</div></div>}
            </div>
            </div>
        </div>
        </Cell>
    </div>
})