import React, { memo } from "react"
import { Cell } from "@vkontakte/vkui"
import { Badge } from './Badge'
//@ts-ignore
import stationPNG from '../media/station.svg'
import { Icon12ErrorCircle } from '@vkontakte/icons';
import './StationItem.css'

type Props = {
    stationName: string,
    value: any,
    mode: 'danger' | 'okay' | 'good',
    distance: number
}

export const StationItem = memo<Props>(({ value, mode, stationName, distance }) => {
    const color = 'bg__' + mode
    return <div style={{ fontSize: 16, color: '#454545' }} className='w-100'>
        <Cell
            disabled={true}
            after={<div>
                <Badge value={value} color={color} />
            </div>
            }>
            <div className='d-flex'>
                <div className='center__y'>
                    <img src={stationPNG} style={{ marginRight: 16 }} />
                </div>
                <div>
                    <div
                        className=''
                        style={{ fontSize: 16, width: window.innerWidth - 182, textOverflow: 'ellipsis', overflowX: 'hidden' }}>
                        {stationName}
                    </div>
                    <div className="text__gray">
                        {distance > 10 && <div
                            className='d-flex' ><div style={{ marginRight: 4 }}
                                className='center__y'>
                                <Icon12ErrorCircle fill='C1C1C1' />
                            </div><div
                                className='break center__y'>
                                <div
                                    style={{ fontSize: 15, overflowWrap: 'break-word', width: window.innerWidth - 194 }}>
                                    Может быть неточной
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </Cell>
    </div>
})
