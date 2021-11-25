import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, ScreenSpinner, AdaptivityProvider, AppRoot, ModalRoot, ConfigProvider, usePlatform } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Intro } from './panels/Intro';
import { Home } from './panels/Home';
import './App.css'
import { ForecastPollutionForDay } from './panels/ForecastPollutionForDay';
import { PollutionCities } from './panels/PollutionCities';
import { getCityByCoordinate, getEcologyCity, getEcologyCountry, 
	getEcoSearchData, getSubscribes, subscribeNoticification, unsubscribeNoticification } from './dal/api';
import { MyCities } from './panels/MyCities';
import { MyCanvas } from './bricks/MyCanvas';
import { MySnackbar } from './bricks/MySnackbar';
import { Layer, Stage, Image, Text, Rect } from "react-konva";
import placePNG from "./media/place.png";
import useImage from 'use-image';
import bg_okay from './media/bg_okay.jpg'
import bg_good from './media/bg_good.jpg'
import bg_bad from './media/bg_bad.jpg'
import chevron_right from "./media/chevron_right.png";
import { TurnNoticifications } from './panels/TurnNoticifications';



const ROUTES = {
	INFO: 'INFO',
	POLLUTION_CITIES: 'POLLUTION_CITIES',
	HOME: 'HOME',
	FORECAST_POLLUTION_FOR_THE_DAY: 'FORECAST_POLLUTION_FOR_THE_DAY',
	MY_CITIES: 'MY_CITIES',
	TURN_NOTICIFICATIONS: 'TURN_NOTICIFICATIONS'
}
const STATE_KEYS = {
	IS_CHECK_INFO: 'IS_CHECK_INFO',
	IS_ALLOWED_PLACE: 'IS_ALLOWED_PLACE',
	DEFAULT_CITY_ID: 'DEFAULT_CITY_ID',
	DEFAULT_COUNTRY_NAME:'DEFAULT_COUNTRY_NAME',
	DEFAULT_COUNTRY_ID: 'DEFAULT_COUNTRY_ID'
}
const DEFAULT_CITY_ID = '5b163b6f7fa2b15e076ad2a6'
const DEFAULT_COUNTRY_ID = 'qNvxAidZLbwhRmQXR'
const DEFAULT_COUNTRY_NAME = 'Россия'

const App = () => {
	
	const [isInit, setInit] = useState(false)
	const [activePanel, setActivePanel] = useState(ROUTES.HOME);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [activeModal, setActiveModal] = useState(null)
	const [snackbar, setSnackbar] = useState(null)
	const [state, setState] = useState({
		isCheckInfo: false,
		isAllowedPlace: false,
		defaultCityId: DEFAULT_CITY_ID,
		defaultCountryId: DEFAULT_COUNTRY_ID,
		ecoCity: null,
		nativeCity: null,
		subscribedCities: [],
		defaultCountryName: DEFAULT_COUNTRY_NAME
	})
	
	const handlerCloseModal = () => {
		setActiveModal(null)
	}
	const [platform,setPlatform] = useState('mobile')
	const [bgApp,setBgApp] = useState('bg__app__light')
	useEffect(async () => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				console.log(data.appearance);
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				const title = new RegExp('light')
				if((data.scheme==='vkcom') || (data.scheme.match(title))){
					setBgApp('bg__app__light')
					if(data.scheme==='vkcom'){
						setPlatform('pc')
					}else{	
						setPlatform('mobile')
					}
					bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#F5F5F5"})
				}else{
					setBgApp('bg__app__dark')
					bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#373737"})
				}
				
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const res = (await bridge.send('VKWebAppStorageGet', { keys: Object.values(STATE_KEYS) }))

			let data = res.keys
				data.forEach((s) => {
					let value = s.value ? JSON.parse(s.value) : null
					switch (s.key) {
						case STATE_KEYS.IS_CHECK_INFO:
							if (!value) {
								setActiveModal(ROUTES.INFO)
							} else {
								setState(prev => {
									return {
										...prev,
										isCheckInfo: true
									}
								})
							}
							break
						case STATE_KEYS.IS_ALLOWED_PLACE:
							if (value) {
								setState(prev => {
									return {
										...prev,
										isAllowedPlace: true
									}
								})
							}
							break
						case STATE_KEYS.DEFAULT_COUNTRY_ID:
							if(value) {
								setState(prev=>{
									return{
										...prev,
										defaultCountryId: s.value
									}	
								})
							}
						case STATE_KEYS.DEFAULT_CITY_ID:
							if (value) {
								setState(prev => {
									return {
										...prev,
										defaultCityId: s.value
									}
								})
							}
							break
						case STATE_KEYS.DEFAULT_COUNTRY_NAME:
							if(value) {
								setState(prev=>{
									return{
										...prev,
										defaultCountryName:s.value
									}
								})
							}
							break
						default:
							break;
					}
				})
		}
		fetchData()
	}, []);
	const go = (modal) => {
		setActiveModal(modal)
	}
	const checkInfo = () => {
		try {
			bridge.send('VKWebAppStorageSet',
				{
					key: STATE_KEYS.IS_CHECK_INFO,
					value: 'true'
				})
			setState(prev => {
				return {
					...prev,
					isCheckInfo: true
				}
			})
			handlerCloseModal()
		} catch (e) {

		}
	}


	useEffect(async () => {
		if (state.isAllowedPlace) {
			try {
				setInit(true)
				let { lat, long } = await bridge.send('VKWebAppGetGeodata', { key: 'location' })
				const { city } = await getCityByCoordinate( lat, long)

				let id = DEFAULT_CITY_ID
				let idCountry = DEFAULT_COUNTRY_ID
				let defaultNameCountry = DEFAULT_COUNTRY_NAME
				let cityName = city 
				const data = (await getEcoSearchData(cityName)).data
				let currentCity = null
				data.cities.forEach(item => {
						if (item.name === cityName) {
							id = item.id
							currentCity = item
						}
					})
				const dataCountry = (await getEcoSearchData(currentCity.country)).data
				dataCountry.countries.forEach(item => {
					if (item.name === currentCity.country) {
						idCountry = item.id
						defaultNameCountry = item.name
					}
				})
				bridge.send('VKWebAppStorageSet',
					{
						key: STATE_KEYS.DEFAULT_COUNTRY_NAME,
						value: defaultNameCountry
					})
				setState(prev=>{
					return{
						...prev,
						defaultCountryId: defaultNameCountry
					}
				})

				bridge.send('VKWebAppStorageSet',
					{
						key: STATE_KEYS.DEFAULT_COUNTRY_ID,
						value: idCountry
					})
				setState(prev=>{
					return{
						...prev,
						defaultCountryId: idCountry
					}
				})

				bridge.send('VKWebAppStorageSet',
					{
						key: STATE_KEYS.DEFAULT_CITY_ID,
						value: id
					})
				setState(prev=>{
					return{
						...prev,
						defaultCityId: id
					}
				})

				setState(prev=>{
					return{
						...prev,
						nativeCity: currentCity
					}
				})
				setInit(false)
			} catch (e) {
				bridge.send('VKWebAppStorageSet',
					{
						key: STATE_KEYS.DEFAULT_CITY_ID,
						value: state.defaultCityId
					})
				setInit(false)
			}
		}
	}, [state.isAllowedPlace])
	useEffect(async ()=>{
		
		setInit(true)
		const data = (await getEcologyCity(state.defaultCityId)).data
		if(data){
			setState(prev=>{
				return{
					...prev,
					ecoCity: data
				}
			})
			if(!state.nativeCity){
				setState(prev=>{
					return{
						...prev,
						nativeCity: data
					}
				})
			}
		}
		setInit(false)
	}, [state.defaultCityId,window.location.hash])
	useEffect(async()=>{
		if(window.location.hash.slice(1,)){
			setInit(true)
			const data = (await getEcologyCity(window.location.hash.slice(1,))).data
			if(data){
				setState(prev=>{
					return{
						...prev,
						ecoCity: data
					}
				})
			}
			setInit(false)
		}
	},[window.location.hash])
	useEffect(async()=>{
		const res = await getSubscribes()
		setState(prev=>{
			return{
				...prev,
				subscribedCities: [...res]
			}
		})
	}, [])

	const requestPermissionLocation = async () => {
		await bridge.send('VKWebAppGetGeodata', { key: 'location' })
			.then(res => {
				bridge.send('VKWebAppStorageSet',
					{
						key: STATE_KEYS.IS_ALLOWED_PLACE,
						value: JSON.stringify(true)
					}).then(res => {
						setState(prev => {
							return {
								...prev,
								isAllowedPlace: true
							}
						})
					})
			}).catch(e => {
				setState(prev => {
					return {
						...prev,
						isAllowedPlace: true
					}
				})
			})
		checkInfo()
	}



	const handleCloseForMyCities = () =>{
		setActiveModal(ROUTES.POLLUTION_CITIES)
	}
	const handleOpenMyCities =()=>{
		setActiveModal(ROUTES.MY_CITIES)
	}

	const ref = useRef(null)
	const refBg = useRef(null)
	
	const doStory=React.useCallback(async ()=>{
		

		try{
			let data = {}
			if(platform==='pc'){
				data = {
					background_type:'image',
					blob:refBg.current.toDataURL()
				}
			}else{
				data = {
					background_type: 'none'
				}
			}
			await bridge.send('VKWebAppShowStoryBox',{
				...data,
				"stickers": [
				  {
					"sticker_type": "renderable",
					"sticker": {
					  "can_delete": false,
					  "content_type": "image",
					  "blob": ref.current.toDataURL(),
					  "clickable_zones": [
						{
						  "action_type": "link",
						  "action": {
							"link": `https://vk.com/app7991717#${state.ecoCity.id}`,
							"tooltip_text_key": "tooltip_open_default"
						  }
						}
					  ],
					  "transform": {
						  "gravity": "center",
						  "relation_width": 1
					  }
					}
				  }
				]
			  }).catch(e=>{
				  setSnackbar(<MySnackbar 
					closeHandler={closeSnackbarHandler}
					resultOperation={true} text={'Опубликовать историю не удалось'}/>)
			  }).then(res=>{
				if(res.result){
					setSnackbar(<MySnackbar 
						closeHandler={closeSnackbarHandler}
						resultOperation={true} text={'История опубликована'}/>)
				}else{
					setSnackbar(<MySnackbar 
						closeHandler={closeSnackbarHandler}
						resultOperation={false} text={'Опубликовать историю не удалось'}/>)
				}
			})
		}catch(e){
			setSnackbar(<MySnackbar 
				closeHandler={closeSnackbarHandler}
				resultOperation={false} text={'Опубликовать историю не удалось'} />)
		}
	},[ref, state.ecoCity, refBg])
	const closeSnackbarHandler = () =>{
		setSnackbar(null)
	}
	
	const subscribeNoticificationForButton=async ()=>{
		
		try{
		const res = await bridge.send('VKWebAppAllowNotifications')
		
		if(res.result && state.ecoCity){
			await subscribeNoticification(state.ecoCity.id)				
		}

		setState(prev=>{
			return{
				...prev,
				subscribedCities:[...prev.subscribedCities,{cityId:state.ecoCity.id}]
			}
		})
		setSnackbar(<MySnackbar
			closeHandler={closeSnackbarHandler} 
			resultOperation={true}
			text={'Уведомления включены'}/>)
		
		}catch(e){
			setSnackbar(<MySnackbar 
				closeHandler={closeSnackbarHandler}
				resultOperation={false}
				text={'Включить уведомления не удалось'}/>)
		}

	}
	const unsubsubscribeNoticificationForButton = async ()=>{
		
		try{
		const res = await bridge.send('VKWebAppDenyNotifications')

		if(res.result && state.ecoCity){
			await unsubscribeNoticification(state.ecoCity.id)
		}

		setState(prev=>{
			return{
				...prev,
				subscribedCities:[...prev.subscribedCities.filter(s=>s.cityId!==state.ecoCity.id)]
			}
		})
		
		setSnackbar(<MySnackbar 
			resultOperation={true}
			closeHandler={closeSnackbarHandler}
			text={'Уведомления выключены'}/>)
		
		}catch(e){
			setSnackbar(<MySnackbar 
				closeHandler={closeSnackbarHandler}
				resultOperation={false}
				text={'Выключить уведомления не удалось'}/>)
		}
	}


	const modal = (
		<ModalRoot onClose={handlerCloseModal} activeModal={activeModal}>
			{<MyCities
			toHome={handlerCloseModal}
			cityFromSearch={state.ecoCity}
			cityOfUser={state.nativeCity}
			setCitySearch={(cityId)=>setState(prev=>{
				return{
					...prev,
					defaultCityId:cityId
				}
			})}
			handleClose={handleCloseForMyCities}
			id={ROUTES.MY_CITIES}
			/>}
			<Intro
			bgApp={bgApp}
				checkInfo={checkInfo}
				requestPermissionLocation={requestPermissionLocation}
				id={ROUTES.INFO} handlerClose={handlerCloseModal} />
			<ForecastPollutionForDay
				id={ROUTES.FORECAST_POLLUTION_FOR_THE_DAY}
				handlerClose={handlerCloseModal}
				day={3} month={'Ноябрь'} city={'Санкт-Петербург'}
			/>
			<TurnNoticifications
			bgApp={bgApp}
			id={ROUTES.TURN_NOTICIFICATIONS}
			closeHandler={handlerCloseModal}
			subscribeNoticification={subscribeNoticificationForButton}
			/>
			<PollutionCities
				requestPermissionLocation={requestPermissionLocation}
				isAllowedPlace={state.isAllowedPlace}
				bgApp={bgApp}
				myCityId={state.nativeCity ? state.nativeCity.id : DEFAULT_CITY_ID}
				myCity={state.nativeCity ? state.nativeCity.name : 'Санкт-Петербург' }
				onClickMyCities = {handleOpenMyCities}
				setDefaultCity={(cityId)=>setState(prev=>{
					return{
						...prev,
						defaultCityId:cityId
					}
				})}
				countryName={state.defaultCountryName}
				countryId={state.defaultCountryId}
				handlerClose={handlerCloseModal}
				id={ROUTES.POLLUTION_CITIES} />
		</ModalRoot>
	)

	return (
		<AdaptivityProvider>
			<AppRoot activePanel={activePanel} popout={popout}>
				<View activePanel={ROUTES.HOME} modal={modal}>
					<Home
					snackbar={snackbar}
					subscribeNoticification={()=>setActiveModal(ROUTES.TURN_NOTICIFICATIONS)}
					unsubsubscribeNoticification={unsubsubscribeNoticificationForButton}
					isCitySubscribed={state.ecoCity ? state.subscribedCities.some(s=>s.cityId===state.ecoCity.id) : false}
					bgApp={bgApp}
					doStory={doStory}
					nativeCityId={state.nativeCity ? state.nativeCity.id : DEFAULT_CITY_ID}
					isInit={isInit}
						go={go}
						city={state.ecoCity ? state.ecoCity : null}
						id={ROUTES.HOME} isGoodWind={
							(state.ecoCity && state.ecoCity.current) ? (state.ecoCity.current.aqi<=50) : true  
						} />
					
				</View>
			</AppRoot>
			<div id='canvas' style={{width:0,height:0,opacity:0}}>
			<Stage
			width={253}
			height={250}
			ref={refBg}
			>
				<Layer>
						<Rect 
						fillLinearGradientStartPoint={{ x: 0, y: -100 }}
						width={253}
						height={250}
						fillLinearGradientEndPoint={{ x: 120, y: 220 }}
						fillLinearGradientColorStops={[0,'#EBEBEB',1,'#E0E0E0']}			
						/>
				</Layer>
			</Stage>
			<Stage
    ref={ref}
        style={{ width: 253, height: 250, borderRadius: 20 }}
        width={253} height={250}
    >

        <Layer>
			<Rect
			fillLinearGradientStartPoint={{ x: 0, y: -100 }}
			fillLinearGradientEndPoint={{ x: 120, y: 220 }}
			fillLinearGradientColorStops={(state.ecoCity && state.ecoCity.current.aqi>100) ?
				[0,'rgba(255,153,182,1)',1,'rgba(204,183,254,1)'] 
				: (state.ecoCity && state.ecoCity.current.aqi>50) ? [0,'#FDCFB2',1,'#BF8FF5']
				: [0,'#B3FF86',1,'#EEFFC8']}
			width={253}
			height={250}
			cornerRadius={20}
			/>
            <Text
                fontFamily={'SF-Pro-Rounded-Heavy'}
                text="Качество воздуха:"
                x={55}
                fontSize={15}
                y={52}
                fill='rgba(0, 0, 0, 0.5)'
                width={150}
                height={30}
            />
            <Text
                fontFamily={'SF-Pro-Rounded-Heavy'}
                text={(state.ecoCity && state.ecoCity.current.aqi) > 100 ? "Плохое" : (state.ecoCity && state.ecoCity.current.aqi > 50) ? 'Неплохое' : "Хорошее"}
                x={(state.ecoCity && state.ecoCity.current.aqi)>100 ? 66 : 53.5 } //53.5
                fontSize={32}
                y={76}
                fill='rgba(0, 0, 0, 0.5)'
                width={(state.ecoCity && state.ecoCity.current.aqi)>100 ? 161 : 176}//146
                height={38}
            />
            <Text
                fontFamily={'SF-Pro-Rounded-Regular'}
                text={(state.ecoCity ? state.ecoCity.name : 'SPb')}
                x={(253-(state.ecoCity ? state.ecoCity.name.length*8 : 10))/2}
                fontSize={17}
                y={130}
                fill='rgba(0, 0, 0, 0.5)'
                width={200}
                height={100}
            />
			<Rect
			x={42}
			y={191}
			width={169}
			fill={'rgba(255,255,255,0.5)'}
			height={39}
			cornerRadius={28}
			/>
			<Text
			text={'Узнать больше'}
			width={200}
			height={39}
			x={56}
			fontSize={18}
			fontFamily={'SF-Pro-Rounded-Regular'}
			fill='rgba(0, 0, 0, 0.5)'
			y={201}
			/>
            <PlaceImage x={(253-(state.ecoCity ? state.ecoCity.name.length*8 : 10)-30)/2}/>
			<ChevronRight />
		</Layer>

    </Stage>
			</div>
		</AdaptivityProvider>
	);
}

const PlaceImage = ({x}) => {
    const [image] = useImage(placePNG);
    return <Image
        x={x}
        y={130}
        image={image} />;
};

const ChevronRight = () =>{
    const [image] = useImage(chevron_right);
    return <Image
        x={188.6}
        y={205.6}
        image={image} />;
}

const BgImage = ({aqi}) =>{
	const [image] = useImage(aqi>100 ? bg_bad : aqi>50 ? bg_okay : bg_good)
	return <Image
		image={image}
	/>
}

export default App;
