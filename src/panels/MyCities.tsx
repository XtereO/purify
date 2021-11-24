import { Cell, ModalCard } from "@vkontakte/vkui"
import { EcoCityData } from "../types/EcoTypes"
import { Icon28ChevronRightOutline } from '@vkontakte/icons';
import { Icon16Place } from '@vkontakte/icons';





type PropsType={
    id: string,
    handleClose: ()=>void,
    cityFromSearch: EcoCityData,
    cityOfUser: EcoCityData,
    setCitySearch: (cityId:string)=>void,
    toHome: ()=>void
}


export const MyCities:React.FC<PropsType> = ({id,handleClose,cityFromSearch,cityOfUser,setCitySearch,toHome}) =>{
    
    
    const handleCityFromSearchClick = () =>{
        setCitySearch(cityFromSearch.id)
        toHome()
    }
    const handleCityOfUserClick = () =>{
        setCitySearch(cityOfUser.id)
        toHome()
    }

    return<ModalCard 
    onClose={handleClose}
    id={id}>
        <Cell onClick={handleCityFromSearchClick}>
        <div style={{display:'grid',gridTemplateColumns:'140px 28px 1fr'}}>
            <div>
                Город из поиска
            </div>
            <div className='center__x'>
                <Icon28ChevronRightOutline fill='#808080'/>
            </div>      
            <div 
            style={{display:'flex',justifyContent:'end'}}>
                <div style={{marginTop:2}} className='center__y'>
                    <Icon16Place fill='#808080' className='mr-1' />
                </div>
                <div className='center__y'>
                {cityFromSearch.name}
                </div>
            </div>     
        </div>
        </Cell>
        <Cell onClick={handleCityOfUserClick}>
        <div style={{display:'grid',gridTemplateColumns:'140px 28px 1fr'}}>
            <div>
                Текущее 
                <div>
                местоположение
                </div>
            </div>
            <div className='center__x'>
                <Icon28ChevronRightOutline fill='#808080'/>
            </div>      
            <div 
            style={{display:'flex',justifyContent:'end',marginTop:2}}>
                {cityOfUser.name}
            </div>     
        </div>
        </Cell>
    </ModalCard>
}