import { CardGrid, Group, Panel, Div, Avatar, Card, Cell, Spacing, Header, Progress, Link, Footer, FixedLayout } from "@vkontakte/vkui"
import React, { ReactElement, useEffect,useRef,useState} from "react"
import './Home.css'
import { Icon16Place, Icon24Search } from '@vkontakte/icons';
import { Icon24NotificationOutline } from '@vkontakte/icons';
import { Icon28StoryOutline } from '@vkontakte/icons';
import { Icon24StoryOutline } from '@vkontakte/icons';
import { Icon24NotificationCheckOutline } from '@vkontakte/icons';
//@ts-ignore
import logo from '../media/IQAir_logo.svg'
import { Icon24Dropdown } from '@vkontakte/icons';
import { Loader } from '../bricks/Loader'
import {ListItem} from '../bricks/ListItem'
import {PollutionItem} from '../bricks/PollutionItem'
import { WeatherItem } from "../bricks/WeatherItem";
import { Advice } from "../bricks/Advice";
import { EcoCityData, EcoCityType, EcoSearchData, EcoStation } from "../types/EcoTypes";
import { getDescriptionPollutant, getFullNamePollutant } from "../utils/pollutants";
import { getEcoSearchData } from "../dal/api";
import { StationItem } from "../bricks/StationItem";
import { getDistance } from "../utils/getDistance";



const LIGHT_BLUE = '#4475F1'
type PropsType={
    id: string,
    isGoodWind: boolean,
    city: EcoCityData | null,
    nativeCityId: string,
    go:(modal:string)=>void,
    isInit: boolean,
    bgApp: string,
    subscribeNoticification: ()=>void,
	unsubsubscribeNoticification: ()=>void,
	isCitySubscribed: boolean,
    snackbar: ReactElement<any,any> | null,
    doStory: ()=>void
}


export const Home:React.FC<PropsType> = ({ id, snackbar, bgApp, isGoodWind, city, go, isInit, nativeCityId, isCitySubscribed, subscribeNoticification, unsubsubscribeNoticification, doStory }) => {

    const [isShowMore,setShowMore] = useState(false)
    const [isShowBigImage, setShowBigImage] = useState(false)
    const [stations,setStations] = useState<EcoStation[]>([])

    useEffect(()=>{
        if(city){
            getEcoSearchData(city.name).then((res:{data:EcoSearchData})=>{
                if(res.data){
                    setStations(res.data.stations)
                }
            })
            setShowMore(false)    
        }
        return()=>{
            setShowMore(false)
        }
    },[city])

    const handlerOpenImage=()=>{
        setShowBigImage(true)
    }
    const handlerCloseImage=()=>{
        setShowBigImage(false)
    }
    const goToForecastPollutionForTheDay=()=>{
        go('FORECAST_POLLUTION_FOR_THE_DAY')
    }
    
    const stationsJSX = city ? stations.map((c,index)=><>
    <StationItem 
    distance={getDistance({point1:c.coordinates,point2:city.coordinates})}
    stationName={c.name}
    key={`${index}${c.name}`}
    value={c.aqi} mode={c.aqi > 100 ? 'danger' : ((c.aqi>50) ? 'okay' : 'good')} />
    {(index+1)!==stations.length && <Spacing
    key={`station_spacing${index}`}
    className="spacing" separator size={16} />}
</>) : []

    const pollutantsJSX = city ? city.current.pollutants.map((p,index)=><>
    <PollutionItem
    bgApp={bgApp}
    key={`${index}${p.pollutantName}`}
    title={getFullNamePollutant(p.pollutantName)}
    value={p.concentration}
    aqi={p.aqi}
    tooltipDescription={getDescriptionPollutant(p.pollutantName)}
    bar={p.aqi>100 ? 'bad_bar' : p.aqi>50 ? 'okay_bar' : 'good_bar'}
    /> 
    {(index+1)!==city.current.pollutants.length && <Spacing 
    key={`pollutant_spacing${index}`}
    className="spacing"
    separator size={32} />}
    </>) : []

    const currentDay = (new Date()).getDay()
    const forecastsJSX = city ? city.forecasts.daily.map((c,index)=><>
        <WeatherItem 
        key={`${index}-${c.temperature}${c.aqi}`}
        onClick={goToForecastPollutionForTheDay}
        day={currentDay+index+1} value={c.aqi} mode={c.aqi > 100 ? 'danger' : ((c.aqi>50) ? 'okay' : 'good')} />
        {(index+1)!==city.forecasts.daily.length && <Spacing 
        key={`weather_spacing${index}`}
        className="spacing" separator size={16} />}
    </>) : []
    

    return <Panel id={id}>
        <Group
        style={{paddingTop:42}}
        className={bgApp}>
            {isShowBigImage && 
            <div 
            onClick={handlerCloseImage}
            style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                position:'fixed',
                zIndex:1000,
                width:'100%',
                height:'100%'
                }}>
                <Loader />
            </div>
            }
            <Div
                className={(isInit ? 'bg__init card' : 'card' + ' ' + ((city && city.current.aqi<=50) ? 'home__good__weather' : (city && city.current.aqi<=100) ? 'home__okay__weather' : 'home__bad__weather'))}>
                <div className='home__main__title'>
                    {isInit ?  <div
                    style={{height:24,width:61}}
                    className='bg__init__home'></div> : <div
                    style={{fontSize:24,fontWeight:'inherit',lineHeight:2.2,color:'rgba(0,0,0,0.5)'}}
                    className='text__SF-Pro-Rounded-Semibold'>{city && city.current.aqi} AQI</div>}
                </div>
                <div className='center__x text__Inter-Medium' style={{color:'rgba(0,0,0,0.5)'}}>
                    {isInit && <div 
                    style={{height:16, width:97, marginTop:10}}
                    className='bg__init__home'></div> }
                    <div 
                    style={{fontSize:17}}
                    className='center__y'>
                    {(city && nativeCityId===city.id && (!isInit)) && <Icon16Place fill='rgba(0,0,0,0.5)' style={{marginRight:3}} />}
                    </div>
                    {((!isInit) && city) && city.name}
                </div>
                <div>
                    <div className='mt-4 home__main__bottom__side'>
                    <div>
                        <div 
                        className='home__search__cell__rounded home__search__cell__rounded_active'
                        onClick={()=>go('POLLUTION_CITIES')}
                        style={{opacity:0.5}}>
                        <Avatar 
                        style={{backgroundColor:'rgba(255, 255, 255, 0.35)'}}
                        shadow={false}>
                            {(!isInit) && <Icon24Search  fill='#000' />}
                        </Avatar>
                        </div>
                    </div>
                    <div
                        className='home__main__bottom__right__side'>
                        <div 
                        style={{opacity:0.5}}
                        onClick={city ? (isCitySubscribed ? unsubsubscribeNoticification : subscribeNoticification) : ()=>{}}
                        className='home__search__cell__rounded home__search__cell__rounded_active'>
                        
                        <Avatar 
                        style={{backgroundColor:'rgba(255, 255, 255, 0.35)'}}
                        shadow={false}>
                            {(!isInit) && (!isCitySubscribed) && <Icon24NotificationOutline fill='#000' />}
                            {(!isInit) && (isCitySubscribed) && <Icon24NotificationCheckOutline fill='#000' />}
                        </Avatar>
                        </div>
                        <div
                        className='ml-1' 
                        style={{opacity:0.5}}
                        onClick={city ? doStory : ()=>{}}
                        >
                        <Avatar
                        className='home__search__cell__rounded home__search__cell__rounded_active' 
                        style={{backgroundColor:'rgba(255, 255, 255, 0.35)'}}
                        shadow={false}>
                            {(!isInit) && <Icon24StoryOutline fill='#000' />}
                        </Avatar>
                        </div>
                    </div>
                    </div>
                </div>
            </Div>
            <Div>
                {(city && (!isInit)) && <Advice
                bgApp={bgApp}
                doStory={doStory}
                pollution={city.recommendations.pollution}
                isGoodWind={isGoodWind}
                />}
                {isInit && <Card 
                className='card__app'
                mode='shadow'>
                    <div className='d-flex'>
                        <div 
                        className='bg__init'
                        style={{height:24,width:24,borderRadius:20000}}>
                        </div>
                        <div className='bg__init ml-2'
                        style={{height:17,width:122}}>
                        </div>
                    </div>
                </Card>}
            </Div>  
            <Div>
                <Header className='text__SF-Pro-Rounded-Semibold'>
                    {(!isInit) ? <span className="text__gray">
                    ЗАГРЯЗНИТЕЛИ
                    </span> : <div
                    style={{height:12, width:85}}
                    className='bg__init'>
                    </div>}    
                </Header>
                <Card 
                mode='shadow'
                className='card__app'
                >
                    <div
                    className='card__app'>
                    {(isInit) && [3,2,1,0].map((c)=><><div
                    key={`pollutant${c}`}
                    style={{display:'grid',gridTemplateColumns:'1fr 50px'}}>
                        <div 
                        style={{width:91,height:17}}
                        className='bg__init'>
                        </div>
                        <div style={{width:24,height:24,display:'flex',justifyContent:'end'}}
                        className='bg__init'>
                        </div></div>
                        {c!==0 && <Spacing key={`pollutant_key${c}`} className="spacing" separator size={32}/>}</>)} 
                    {(!isInit) && [...pollutantsJSX].slice(0,4)}
                    {((!isShowMore) && (pollutantsJSX.length>4)) && <Cell onClick={()=>setShowMore(true)}><ListItem bgApp={bgApp} description={<Link>Показать все</Link>}>
                        <Icon24Dropdown fill={LIGHT_BLUE}/>
                    </ListItem></Cell>}
                    {(isShowMore && (!isInit)) && <>{[...pollutantsJSX].slice(4,6)}</>}
                    </div>
                </Card> 
            </Div>
            <Div>
                <Header className='text__SF-Pro-Rounded-Semibold'>
                    {(!isInit) ? <span className='text__gray'>
                        ПРОГНОЗ НА НЕДЕЛЮ
                    </span> : <div
                    style={{height:12, width:85}}
                    className='bg__init'>
                    </div>}
                </Header>
                <Card  
                mode='shadow'
                className='card__app'>
                    <div className=''>
                    {(isInit) && [5,6,7,8,9,4,10].map((c)=><><div 
                    key={`weather${c}`}
                    style={{display:'grid',gridTemplateColumns:'24px 1fr 50px', gridGap:'10px'}}>
                        <div 
                        style={{width:24,height:24}}
                        className='bg__init'>
                        </div>
                        <div 
                        style={{width:91,height:17}}
                        className='bg__init'>
                        </div>
                        <div style={{width:52,height:24,display:'flex',justifyContent:'end'}}
                        className='bg__init'>
                        </div>
                    </div>{c!==10 && <Spacing key={`weather_spacing${c}`} className="spacing" separator size={16} />}</>)}
                        {(!isInit) && forecastsJSX}
                    </div>
                </Card>
            </Div>
            {stations.length!==0 && <Div>
                <Header className='text__SF-Pro-Rounded-Semibold'>
                    {(!isInit) ? <span className='text__gray'>
                        СТАНЦИИ
                    </span> : <div
                    style={{height:12, width:85}}
                    className='bg__init'>
                    </div>}
                </Header>
                <Card  
                mode='shadow'
                className='card__app'>
                    <div className=''>
                    {(isInit) && [5,6,7,8,9,4,10].map((c)=><><div 
                    key={`station${c}`}
                    style={{display:'grid',gridTemplateColumns:'24px 1fr 50px', gridGap:'10px'}}>
                        <div 
                        style={{width:24,height:24}}
                        className='bg__init'>
                        </div>
                        <div 
                        style={{width:91,height:17}}
                        className='bg__init'>
                        </div>
                        <div style={{width:52,height:24,display:'flex',justifyContent:'end'}}
                        className='bg__init'>
                        </div>
                    </div>{c!==10 && <Spacing key={`station_spacing${c}}`} separator className="spacing" size={16} />}</>)}
                        {(!isInit) && stationsJSX}
                    </div>
                </Card>
            </Div>}
            {/*<Div>
                <Header>
                    <span className='text__gray'>
                        ИНТЕРАКТИВНАЯ КАРТА
                    </span>
                </Header>
                <Card mode='outline'>
                    <Loader />
                    <div className='home__map__bottom'>
                    <div 
                    onClick={handlerOpenImage}
                    className='home__map__button home__map__button_active'>
                        <Icon24Fullscreen/>
                        <div className='ml-1'>Открыть</div>
                    </div>
                    </div>
                </Card>
            </Div>*/}
            <Footer style={{paddingTop:4,paddingLeft:4}}>
                <Div className='text__SF-Pro-Rounded-Semibold'>
                Информация предоставлена
                </Div>
                <Div className="">
                    <img src={logo} />
                </Div>
            </Footer>
            <FixedLayout>
                {snackbar}
            </FixedLayout>
        </Group>
    </Panel>
}



