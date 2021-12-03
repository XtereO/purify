import { Cell } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { isKrym } from '../utils/isKrym'
import { Badge } from './Badge'



type PropsType = {
    city: string,
    country: string,
    value?: number,
    id: string,
    onClick: () => void
}


export const PlaceItem: React.FC<PropsType> = ({ city, country, value, onClick, id }) => {

    let [bg, setBG] = useState('bg__good')
    useEffect(() => {
        if (value) {
            if (value >= 100) {
                setBG('bg__danger')
            } else if (value >= 50) {
                setBG('bg__okay')
            } else {
                setBG('bg__good')
            }
        }
    }, [value])

    return <div
    onClick={onClick}
    className='highlight_on_touch text__Inter-Regular'
    style={{
        paddingLeft:16,
        paddingRight:16,
        paddingBottom:4,
        paddingTop:4,
        display: 'grid',
        gridTemplateColumns: '1fr 50px'
    }}>
        <div>
            <div style={{fontSize:16}}>
                {city}
            </div>
            <div style={{marginTop:6,fontSize:15,color:'#606060'}}>
                {isKrym(id) ? 'Россия' : country}
            </div>
        </div>
        {value && <div className='center__y' >
            <Badge color={bg} value={value} >
                {value}
            </Badge> 
        </div>}
    </div>
}