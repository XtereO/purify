import React, { memo, useMemo } from "react"
import { Cell } from "@vkontakte/vkui"
import { Badge } from './Badge'
import { getDayOfWeek } from '../utils/getDayOfWeek'
import { Icon24ErrorCircle } from "@vkontakte/icons"

type Props = {
    day: number,
    value: any,
    mode: 'danger' | 'okay' | 'good',
}

export const WeatherItem = memo<Props>(({ day, value, mode }) => {
    const color = 'bg__' + mode
    const dayOfWeek = useMemo(()=>getDayOfWeek(day),[day])
    return <div style={{ fontSize: 16, color: '#454545' }} className='w-100'>
        <Cell
            disabled={true}
            after={<div>
                <Badge value={value} color={color} />
            </div>
            }
            before={mode === 'danger' && <Icon24ErrorCircle fill={'#EF462F'} />} >
            <div>
                <div className='center__y'>
                    {dayOfWeek}
                </div>
            </div>
        </Cell>
    </div>
})
