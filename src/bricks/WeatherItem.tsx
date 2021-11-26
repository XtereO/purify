import { Icon24ChevronCompactRight, Icon24ErrorCircle } from "@vkontakte/icons"
import { Cell } from "@vkontakte/vkui"
import React, { memo } from "react"
import {Badge} from './Badge'
import {getDayOfWeek} from '../utils/getDayOfWeek'


type PropsType={
    day: number,
    value: any,
    mode: 'danger' | 'okay' | 'good',
    onClick: ()=>void
}

export const WeatherItem:React.FC<PropsType>=memo(({day, value, mode, onClick})=>{
    const color='bg__'+mode
    return<div style={{fontSize:16, color:'#454545'}} className='w-100'>
        <Cell
        disabled={true}
        after={<div>
        <Badge value={value}  color={color} />
        {/*<Icon24ChevronCompactRight fill='#C1C1C1' />*/}
        </div>
        }
        before={mode==='danger' && <Icon24ErrorCircle fill={'#EF462F'}/>} >
        <div>
            <div className='center__y'>
            {getDayOfWeek(day)}
            </div>
        </div>
        </Cell>
    </div>
})