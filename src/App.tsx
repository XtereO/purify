import React, { useState, useEffect, useRef, useCallback } from 'react';
import bridge, { StickerContainer } from '@vkontakte/vk-bridge';
import { View, Panel, ScreenSpinner, AdaptivityProvider, AppRoot, ModalRoot, ConfigProvider, usePlatform, Snackbar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Intro } from './panels/Intro';
import { Home } from './panels/Home';
import './App.css'
import { PollutionCities } from './panels/PollutionCities';
import { MySnackbar } from './bricks/MySnackbar';
import { Layer, Stage, Image, Text, Rect, FastLayer } from "react-konva";
//@ts-ignore
import placePNG from "./media/place_for_story.png";
import useImage from 'use-image';
//@ts-ignore
import chevron_right from "./media/chevron_right_for_story.png";
import { TurnNoticifications } from './panels/TurnNoticifications';
import { useDispatch, useSelector } from 'react-redux';
import { activeModalSelector, activePanelSelector, bgAppSelector, platformSelector } from './bll/Selectors/initialSelector';
import { NotConnection } from './panels/NotConnection';
import { setActiveModalState, setActivePanelState } from './bll/Reducers/initialReducer';
//@ts-ignore
import wifiImage from './media/wifi_outline_56.svg'
//@ts-ignore
import failed_img from './media/score_high.svg'
import { ROUTES } from './consts/ROUTES';
import { DEFAULT_CITY_ID, DEFAULT_COUNTRY_NAME, DEFAULT_COUNTRY_ID } from './consts/DEFAULT_VALUES';
import { checkIntro, requestPermissionLocation, setAllowedPlace, setAllSubscribersUser, setCheckIntro, setCityFromSearchByCityId, setDefaultCityId, setCountryId, setCountryName, setFetching, setNativeCityByPermission, setSnackbar, subscribeNoticificationByCityId, unsubscribeNoticificationByCityId } from './bll/Reducers/homeReducer';
import { getAllowedPlace, getCityFromSearch, getDefaultCityId, getCountryId, getCountryName, getFetching, getNativeCity, getSnackbar, getSubscribedCities } from './bll/Selectors/homeSelector';


const App = () => {

	const dispatch = useDispatch()
	const platform = useSelector(platformSelector)
	const bgApp = useSelector(bgAppSelector)
	const activePanel = useSelector(activePanelSelector)
	const activeModal = useSelector(activeModalSelector)
	const defaultCityId = useSelector(getDefaultCityId)
	const cityFromSearch = useSelector(getCityFromSearch)
	const isAllowedPlace = useSelector(getAllowedPlace)
	const nativeCity = useSelector(getNativeCity)
	const countryName = useSelector(getCountryName)
	const countryId = useSelector(getCountryId)
	const snackbar = useSelector(getSnackbar)
	const subscribedCities = useSelector(getSubscribedCities)
	const isFetching = useSelector(getFetching)

	const setActivePanel = (panel: string | null) => {
		dispatch(setActivePanelState(panel ? panel : ''))
	}
	const setActiveModal = (modal: string | null) => {
		dispatch(setActiveModalState(modal ? modal : ''))
	}

	const handlerCloseModal = () => {
		setActiveModal(null)
	}

	useEffect(() => {
		dispatch(setAllSubscribersUser())
	}, []);

	const handlerLocationHashChange = async () => {
		const routes = [ROUTES.POLLUTION_CITIES, ROUTES.TURN_NOTICIFICATIONS]
		if (window.location.hash.slice(1,) && (!routes.some(r => r === window.location.hash.slice(1,)))) {
			dispatch(setFetching(true))
			dispatch(setDefaultCityId(window.location.hash.slice(1,)))
			dispatch(setFetching(false))
		}
	}
	useEffect(() => {
		handlerLocationHashChange()
	}, [window.location.hash])

	useEffect(() => {
		window.addEventListener('hashchange', (e) => {
			if (!window.location.hash.slice(1,)) {
				setActiveModal(window.location.hash.slice(1,))
			}
		})
	}, [])
	const go = (modal: string | null) => {
		setActiveModal(modal)
		window.location.assign('#' + (modal ? modal : ''))
	}

	useEffect(() => {
		if (isAllowedPlace) {
			dispatch(setNativeCityByPermission())
		}
	}, [isAllowedPlace])
	useEffect(() => {
		if (defaultCityId) {
			dispatch(setCityFromSearchByCityId(defaultCityId))
		}
	}, [defaultCityId])

	const ref = useRef(null)
	const refBg = useRef(null)
	const doStory = React.useCallback(async () => {
		try {
			let data = {}
			if (platform === 'pc') {
				data = {
					background_type: 'image',
					//@ts-ignore
					blob: ref.current.toDataURL()
				}
			} else {
				data = {
					background_type: 'none'
				}
			}
			if (cityFromSearch) {
				//@ts-ignore
				await bridge.send('VKWebAppShowStoryBox', {
					...data,
					"stickers": [
						{
							"sticker_type": "renderable",
							"sticker": {
								"can_delete": false,
								"content_type": "image",
								//@ts-ignore
								"blob": ref.current.toDataURL(),
								"clickable_zones": [
									{
										"action_type": "link",
										"action": {
											"link": `https://vk.com/app7991717#${cityFromSearch.id}`,
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
					dispatch(setSnackbar(<MySnackbar
						closeHandler={closeSnackbarHandler}
						resultOperation={true} text={'Опубликовать историю не удалось'} />))
				}).then(res => {
					if (res) {
						dispatch(setSnackbar(<MySnackbar
							closeHandler={closeSnackbarHandler}
							resultOperation={true} text={'История опубликована'} />))
					} else {
						dispatch(setSnackbar(<MySnackbar
							closeHandler={closeSnackbarHandler}
							resultOperation={false} text={'Опубликовать историю не удалось'} />))
					}
				})
			}
		} catch (e) {
			dispatch(setSnackbar(<MySnackbar
				closeHandler={closeSnackbarHandler}
				resultOperation={false} text={'Опубликовать историю не удалось'} />))
		}
	}, [ref, cityFromSearch, refBg])
	const closeSnackbarHandler = () => {
		dispatch(setSnackbar(null))
	}

	const subscribeNoticification = useCallback(() => {
		dispatch(subscribeNoticificationByCityId(defaultCityId))
	}, [defaultCityId])
	const unsubscribeNoticification = useCallback(() => {
		dispatch(unsubscribeNoticificationByCityId(defaultCityId))
	}, [defaultCityId])

	const modal = (
		<ModalRoot onClose={handlerCloseModal} activeModal={activeModal}>
			<Intro
				bgApp={bgApp}
				checkIntro={()=>dispatch(checkIntro())}
				requestPermissionLocation={()=>dispatch(requestPermissionLocation())}
				id={ROUTES.INFO} handlerClose={handlerCloseModal} />
			<TurnNoticifications
				bgApp={bgApp}
				id={ROUTES.TURN_NOTICIFICATIONS}
				closeHandler={handlerCloseModal}
				subscribeNoticification={subscribeNoticification}
			/>
			<PollutionCities
				requestPermissionLocation={requestPermissionLocation}
				isAllowedPlace={isAllowedPlace}
				bgApp={bgApp}
				myCityId={nativeCity ? nativeCity.id : DEFAULT_CITY_ID}
				myCity={nativeCity ? nativeCity.name : 'Санкт-Петербург'}
				setDefaultCity={(cityId) => dispatch(setDefaultCityId(cityId))}
				countryName={countryName}
				countryId={countryId}
				handlerClose={handlerCloseModal}
				id={ROUTES.POLLUTION_CITIES} />
		</ModalRoot>
	)

	const openSubscribePanel = () => {
		go(ROUTES.TURN_NOTICIFICATIONS)
	}
	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel ? activePanel : ''} modal={modal}>
					<NotConnection
						image={wifiImage}
						id={ROUTES.OFFLINE} />
					<Home
						snackbar={snackbar}
						subscribeNoticification={openSubscribePanel}
						unsubsubscribeNoticification={unsubscribeNoticification}
						isCitySubscribed={cityFromSearch ? subscribedCities.some(s => s.cityId === cityFromSearch.id) : false}
						bgApp={bgApp}
						doStory={doStory}
						nativeCityId={nativeCity ? nativeCity.id : DEFAULT_CITY_ID}
						isFetching={isFetching}
						go={go}
						city={cityFromSearch ? cityFromSearch : null}
						id={ROUTES.HOME} isGoodWind={
							(cityFromSearch && cityFromSearch.current) ? (cityFromSearch.current.aqi <= 50) : true
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
							fillLinearGradientColorStops={(cityFromSearch && cityFromSearch.current.aqi >= 100) ?
								[0, 'rgba(255,153,182,1)', 1, 'rgba(204,183,254,1)']
								: (cityFromSearch && cityFromSearch.current.aqi >= 50) ? [0, '#FDCFB2', 1, '#BF8FF5']
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
							text={(cityFromSearch && cityFromSearch.current.aqi >= 100) ? "Плохое" : (cityFromSearch && cityFromSearch.current.aqi >= 50) ? 'Неплохое' : "Хорошее"}
							x={(cityFromSearch && cityFromSearch.current.aqi >= 100) ? 340 : (cityFromSearch && cityFromSearch.current.aqi >= 50) ? 240 : 269.58} //53.5
							fontSize={188}
							y={421.71}
							fill='rgba(0, 0, 0, 0.5)'
							width={1000}//146
							height={224}
						/>
						<Text
							fontFamily={'SF-Pro-Rounded-Regular'}
							text={(cityFromSearch ? cityFromSearch.name : 'SPb')}
							x={(1362 - (cityFromSearch ? (cityFromSearch.name.length * 45) : 10)) / 2}
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
						<PlaceImage x={(1362 - (cityFromSearch ? cityFromSearch.name.length * 45 : 10) - 140) / 2} />
						<ChevronRight />
					</Layer>

				</Stage>
			</div>
		</AdaptivityProvider>
	);
}

type PlaceImageType = {
	x:number
}
const PlaceImage:React.FC<PlaceImageType> = ({ x }) => {
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


export default App;
