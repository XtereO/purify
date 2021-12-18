import React, { useState, useEffect, useRef, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, ScreenSpinner, AdaptivityProvider, AppRoot, ModalRoot, ConfigProvider, usePlatform, Snackbar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Intro } from './panels/Intro';
import { Home } from './panels/Home';
import './App.css'
import { ForecastPollutionForDay } from './panels/ForecastPollutionForDay';
import { PollutionCities } from './panels/PollutionCities';
import {
	getCityByCoordinate, getEcologyCity, getEcologyCountry,
	getEcoSearchData, getSubscribes, subscribeNoticification, unsubscribeNoticification
} from './dal/api';
import { MyCities } from './panels/MyCities';
import { MySnackbar } from './bricks/MySnackbar';
import { Layer, Stage, Image, Text, Rect, FastLayer } from "react-konva";
import placePNG from "./media/place.svg";
import useImage from 'use-image';
import chevron_right from "./media/chevron_right.svg";
import { TurnNoticifications } from './panels/TurnNoticifications';
import { useDispatch, useSelector } from 'react-redux';
import { activeModalSelector, activePanelSelector, bgAppSelector, platformSelector } from './bll/Selectors/initialSelector';
import { NotConnection } from './panels/NotConnection';
import { setActiveModalState, setActivePanelState } from './bll/Reducers/initialReducer';
import wifiImage from './media/wifi_outline_56.svg'
import failed_img from './media/score_high.svg'
import { ROUTES } from './consts/ROUTES';
import { STATE_KEYS } from './consts/STATE_KEYS';
import { DEFAULT_CITY_ID, DEFAULT_COUNTRY_NAME, DEFAULT_COUNTRY_ID } from './consts/DEFAULT_VALUES';


const App = () => {

	const dispatch = useDispatch()
	const [isInit, setInit] = useState(false)
	const activePanel = useSelector(activePanelSelector)
	const activeModal = useSelector(activeModalSelector)
	const [snackbar, setSnackbar] = useState(null)

	const setActivePanel = (panel) => {
		dispatch(setActivePanelState(panel ? panel : ''))
	}
	const setActiveModal = (modal) => {
		dispatch(setActiveModalState(modal ? modal : ''))
	}
	const [state, setState] = useState({
		isCheckInfo: false,
		isAllowedPlace: false,
		defaultCityId: null,
		defaultCountryId: DEFAULT_COUNTRY_ID,
		ecoCity: null,
		nativeCity: null,
		subscribedCities: [],
		defaultCountryName: DEFAULT_COUNTRY_NAME
	})


	const handlerCloseModal = () => {
		setActiveModal(null)
	}
	const platform = useSelector(platformSelector)
	const bgApp = useSelector(bgAppSelector)
	useEffect(async () => {
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
						if (value) {
							setState(prev => {
								return {
									...prev,
									defaultCountryId: s.value
								}
							})
						}
					case STATE_KEYS.DEFAULT_CITY_ID:
						if (value && (!state.defaultCityId)) {
							setState(prev => {
								return {
									...prev,
									defaultCityId: s.value
								}
							})
						} else if ((!value) && (!state.defaultCityId)) {
							setState(prev => {
								return {
									...prev,
									defaultCityId: s.value
								}
							})
						}
						break
					case STATE_KEYS.DEFAULT_COUNTRY_NAME:
						if (value) {
							setState(prev => {
								return {
									...prev,
									defaultCountryName: s.value
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
	useEffect(()=>{
		window.addEventListener('hashchange',(e)=>{
			if(!window.location.hash.slice(1,)){
				setActiveModal(window.location.hash.slice(1,))
			}
		})
	},[])
	const go = (modal) => {
		setActiveModal(modal)
		window.location.assign('#'+(modal ? modal : ''))
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
				const { city } = await getCityByCoordinate(lat, long)

				let id = DEFAULT_CITY_ID
				let idCountry = DEFAULT_COUNTRY_ID
				let defaultNameCountry = DEFAULT_COUNTRY_NAME
				let cityName = city
				const data = (await getEcoSearchData(cityName)).data
				let currentCity = null
				data.cities.forEach(item => {
					if (item.name === cityName && (!currentCity)) {
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
				setState(prev => {
					return {
						...prev,
						defaultCountryId: idCountry
					}
				})

				bridge.send('VKWebAppStorageSet',
					{
						key: STATE_KEYS.DEFAULT_COUNTRY_ID,
						value: idCountry
					})
				setState(prev => {
					return {
						...prev,
						defaultCountryId: idCountry
					}
				})

				bridge.send('VKWebAppStorageSet',
					{
						key: STATE_KEYS.DEFAULT_CITY_ID,
						value: id
					})
				if (!state.defaultCityId) {
					setState(prev => {
						return {
							...prev,
							defaultCityId: id
						}
					})
				}
				setState(prev => {
					return {
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
	useEffect(async () => {

		setInit(true)
		const data = (await getEcologyCity(state.defaultCityId)).data
		if (data) {
			setState(prev => {
				return {
					...prev,
					ecoCity: data
				}
			})
			if (!state.nativeCity) {
				setState(prev => {
					return {
						...prev,
						nativeCity: data
					}
				})
			}
		}else{
			setState(prev=>{
				return{
					...prev,
					defaultCityId: DEFAULT_CITY_ID
				}
			})
		}
		setInit(false)
	}, [state.defaultCityId, activePanel])

	const handlerLocationHashChange = async () => {
		const routes = [ROUTES.POLLUTION_CITIES,ROUTES.TURN_NOTICIFICATIONS]
		if (window.location.hash.slice(1,) &&  (!routes.some(r=>r===window.location.hash.slice(1,))) ) {
			setInit(true)
			setState(prev => {
				return {
					...prev,
					defaultCityId: window.location.hash.slice(1,)
				}
			})
			setInit(false)
		}
	}
	useEffect(async () => {
		handlerLocationHashChange()
	}, [window.location.hash])

	useEffect(async () => {
		const res = await getSubscribes()
		setState(prev => {
			return {
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



	const handleCloseForMyCities = () => {
		setActiveModal(ROUTES.POLLUTION_CITIES)
	}
	const handleOpenMyCities = () => {
		setActiveModal(ROUTES.MY_CITIES)
	}

	const ref = useRef(null)
	const refBg = useRef(null)

	const doStory = React.useCallback(async () => {


		try {
			let data = {}
			if (platform === 'pc') {
				data = {
					background_type: 'image',
					blob: ref.current.toDataURL()
				}
			} else {
				data = {
					background_type: 'none'
				}
			}
			await bridge.send('VKWebAppShowStoryBox', {
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
			}).catch(e => {
				setSnackbar(<MySnackbar
					closeHandler={closeSnackbarHandler}
					resultOperation={true} text={'Опубликовать историю не удалось'} />)
			}).then(res => {
				if (res.result) {
					setSnackbar(<MySnackbar
						closeHandler={closeSnackbarHandler}
						resultOperation={true} text={'История опубликована'} />)
				} else {
					setSnackbar(<MySnackbar
						closeHandler={closeSnackbarHandler}
						resultOperation={false} text={'Опубликовать историю не удалось'} />)
				}
			})
		} catch (e) {
			setSnackbar(<MySnackbar
				closeHandler={closeSnackbarHandler}
				resultOperation={false} text={'Опубликовать историю не удалось'} />)
		}
	}, [ref, state.ecoCity, refBg])
	const closeSnackbarHandler = () => {
		setSnackbar(null)
	}

	const subscribeNoticificationForButton = async () => {

		try {
			const res = await bridge.send('VKWebAppAllowNotifications')

			if (res.result && state.ecoCity) {
				await subscribeNoticification(state.ecoCity.id)
			}

			setState(prev => {
				return {
					...prev,
					subscribedCities: [...prev.subscribedCities, { cityId: state.ecoCity.id }]
				}
			})
			setSnackbar(<MySnackbar
				closeHandler={closeSnackbarHandler}
				resultOperation={true}
				text={'Уведомления включены'} />)

		} catch (e) {
			setSnackbar(<MySnackbar
				closeHandler={closeSnackbarHandler}
				resultOperation={false}
				text={'Включить уведомления не удалось'} />)
		}

	}
	const unsubsubscribeNoticificationForButton = async () => {

		try {
			const res = await bridge.send('VKWebAppDenyNotifications')

			if (res.result && state.ecoCity) {
				await unsubscribeNoticification(state.ecoCity.id)
			}

			setState(prev => {
				return {
					...prev,
					subscribedCities: [...prev.subscribedCities.filter(s => s.cityId !== state.ecoCity.id)]
				}
			})

			setSnackbar(<MySnackbar
				resultOperation={true}
				closeHandler={closeSnackbarHandler}
				text={'Уведомления выключены'} />)

		} catch (e) {
			setSnackbar(<MySnackbar
				closeHandler={closeSnackbarHandler}
				resultOperation={false}
				text={'Выключить уведомления не удалось'} />)
		}
	}


	const modal = (
		<ModalRoot onClose={handlerCloseModal} activeModal={activeModal}>
			{<MyCities
				toHome={handlerCloseModal}
				cityFromSearch={state.ecoCity}
				cityOfUser={state.nativeCity}
				setCitySearch={(cityId) => setState(prev => {
					return {
						...prev,
						defaultCityId: cityId
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
				myCity={state.nativeCity ? state.nativeCity.name : 'Санкт-Петербург'}
				onClickMyCities={handleOpenMyCities}
				setDefaultCity={(cityId) => setState(prev => {
					return {
						...prev,
						defaultCityId: cityId
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
			<AppRoot>
				<View activePanel={activePanel} modal={modal}>
					<NotConnection
						image={wifiImage}
						id={ROUTES.OFFLINE} />
					<Home
						snackbar={snackbar}
						subscribeNoticification={() => go(ROUTES.TURN_NOTICIFICATIONS)}
						unsubsubscribeNoticification={unsubsubscribeNoticificationForButton}
						isCitySubscribed={state.ecoCity ? state.subscribedCities.some(s => s.cityId === state.ecoCity.id) : false}
						bgApp={bgApp}
						doStory={doStory}
						nativeCityId={state.nativeCity ? state.nativeCity.id : DEFAULT_CITY_ID}
						isInit={isInit}
						go={go}
						city={state.ecoCity ? state.ecoCity : null}
						id={ROUTES.HOME} isGoodWind={
							(state.ecoCity && state.ecoCity.current) ? (state.ecoCity.current.aqi <= 50) : true
						} />
				</View>
			</AppRoot>
			<div id='canvas' style={{ width: 0, height: 0, opacity: 0, overflow: 'hidden' }}>
				<img src={wifiImage} />
				<img src={failed_img} />
				<div className='text__Inter-SemiBold'>
					Inter-Semibold
				</div>
				<div className='text__Inter-Regular'>
					Inter-Regular
				</div>
				<div className='text__SF-Pro-Rounded-Regular'>
				</div>
				<Stage
					width={253}
					height={250}
					ref={refBg}
				>
					<Layer>
						<Rect
							fill={'white'}
							width={253}
							height={250}
						/>
					</Layer>
				</Stage>
				<Stage
					ref={ref}
					width={1362} height={1427}
				>

					<Layer>
						<Rect
							fillLinearGradientStartPoint={{ x: 0, y: -100 }}
							fillLinearGradientEndPoint={{ x: 670, y: 1200 }}
							fillLinearGradientColorStops={(state.ecoCity && state.ecoCity.current.aqi >= 100) ?
								[0, 'rgba(255,153,182,1)', 1, 'rgba(204,183,254,1)']
								: (state.ecoCity && state.ecoCity.current.aqi >= 50) ? [0, '#FDCFB2', 1, '#BF8FF5']
									: [0, '#B3FF86', 1, '#EEFFC8']}
							width={1362}
							height={1427}
							cornerRadius={118.56}
						/>
					</Layer>
					<Layer>
						<Text
							fontFamily={'SF-Pro-Rounded-Heavy'}
							text="Качество воздуха:"
							x={254.58}
							fontSize={96}
							y={286.71}
							fill='rgba(0, 0, 0, 0.5)'
							width={860}
							height={115}
						/>
						<Text
							fontFamily={'SF-Pro-Rounded-Heavy'}
							text={(state.ecoCity && state.ecoCity.current.aqi >= 100) ? "Плохое" : (state.ecoCity && state.ecoCity.current.aqi >= 50) ? 'Неплохое' : "Хорошее"}
							x={(state.ecoCity && state.ecoCity.current.aqi >= 100) ? 340 : (state.ecoCity && state.ecoCity.current.aqi >= 50) ? 240 : 269.58} //53.5
							fontSize={188}
							y={421.71}
							fill='rgba(0, 0, 0, 0.5)'
							width={1000}//146
							height={224}
						/>
						<Text
							fontFamily={'SF-Pro-Rounded-Regular'}
							text={(state.ecoCity ? state.ecoCity.name : 'SPb')}
							x={(1362 - (state.ecoCity ? (state.ecoCity.name.length * 45) : 10)) / 2}
							fontSize={99}
							y={755}
							fill='rgba(0, 0, 0, 0.5)'
							width={1000}
							height={100}
						/>
						<Rect
							x={231}
							y={1084}
							width={901}
							fill={'rgba(255,255,255,0.45)'}
							height={220}
							cornerRadius={165.98}
						/>
						<Text
							text={'Узнать больше'}
							width={631}
							height={102}
							x={311}
							fontSize={84}
							fontFamily={'SF-Pro-Rounded-Regular'}
							fill='rgba(0, 0, 0, 0.5)'
							y={1153}
						/>
						<PlaceImage x={(1362 - (state.ecoCity ? state.ecoCity.name.length * 45 : 10) - 140) / 2} />
						<ChevronRight />
					</Layer>

				</Stage>
			</div>
		</AdaptivityProvider>
	);
}

const BgGood = () => {
	const [image] = useImage(bg_good_svg);
	return <Image
		width={253}
		height={250}
		image={image} />;
}

const PlaceImage = ({ x }) => {
	const [image] = useImage(placePNG);
	return <Image
		x={x}
		y={762.15}
		image={image} />;
};

const ChevronRight = () => {
	const [image] = useImage(chevron_right);
	return <Image
		x={1005.8}
		y={1167.05}
		image={image} />;
}

const BgImage = ({ aqi }) => {
	const [image] = useImage(aqi > 100 ? bg_bad : aqi > 50 ? bg_okay : bg_good)
	return <Image
		image={image}
	/>
}

export default App;
