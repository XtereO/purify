import { Icon12ErrorCircle, Icon24Dismiss, Icon32PlaceOutline } from "@vkontakte/icons"
import { Card, Cell, Div, Group, Header, Input, ModalPage, ModalPageHeader, PanelHeaderButton, Search, Spacing } from "@vkontakte/vkui"
import React, { ChangeEvent, Fragment, useEffect, useState } from "react"
import { Icon20Search } from '@vkontakte/icons';
import { ListItem } from "../bricks/ListItem";
import { Icon20PlaceOutline } from '@vkontakte/icons';
import { PlaceItem } from "../bricks/PlaceItem";
import { getEcologyCity, getEcoRankCity, getEcoSearchData } from "../dal/api";
import { EcoCity, EcoStation } from "../types/EcoTypes";
import { Formik } from "formik";
import { hidden } from "chalk";





type PropsType = {
    id: string,
    countryId: string,
    countryName: string,
    handlerClose: () => void,
    setDefaultCity: (cityId: string) => void,
    onClickMyCities: () => void,
    myCity: string,
    myCityId: string,
    bgApp: string,
    isAllowedPlace: boolean,
    requestPermissionLocation: () => void
}

export const PollutionCities: React.FC<PropsType> = ({ id, bgApp, countryId, handlerClose, setDefaultCity, countryName, myCity, myCityId, isAllowedPlace, requestPermissionLocation }) => {

    type CityType = {
        id: string,
        name: string,
        country: string,
        aqi?: number
    }
    const [title, setTitle] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const [cities, setCities] = useState<CityType[]>([])
    const [clearestCities, setClearestCitites] = useState<CityType[]>([])
    const [isFetching, setFetching] = useState(true)

    useEffect(() => {
        setFetching(true)
        getEcoSearchData(title.length > 2 ? title : countryName)
            .then(res => {
                const data = res.data
                setCities(data.cities)
                setFetching(false)
            }).catch(e => {
                setFetching(false)
            })
    }, [title])

    useEffect(() => {
        setFetching(true)
        getEcoSearchData(countryName)
            .then(res => {
                const data = res.data
                setCities(data.cities)

                getEcoRankCity(countryId)
                    .then(res => {
                        const data = res.data
                        setClearestCitites(data)
                        setFetching(false)
                    })
            }).catch(e => {
                setFetching(false)
            })
    }, [])



    const citiesJSX = cities.length > 0 ? cities.map((c, index) => <><div
        key={c.id} className=''>
        <PlaceItem
            onClick={() => {
                setDefaultCity(c.id)
                handlerClose()
            }}
            city={c.name} {...c} />
    </div>{(index + 1) !== cities.length && <Spacing separator className="spacing" size={8} />}</>) : <div style={{ display: 'flex', justifyContent: 'center' }}>
    Ничего не найдено</div>
    const clearestCitiesJSX = clearestCities.length > 0 ? clearestCities.map((c, index) => <><div key={c.id} className=''>
        <PlaceItem
            value={c.aqi ? c.aqi : 10}
            onClick={() => {
                setDefaultCity(c.id)
                handlerClose()
            }}
            city={c.name} {...c} country={countryName} />
    </div>{(index + 1) !== cities.length && <Spacing className="spacing" separator size={8} />}</>) : <div style={{ display: 'flex', justifyContent: 'center' }}>
        Ничего не найдено</div>



    return <ModalPage
        settlingHeight={100}
        header={<ModalPageHeader
            className={bgApp === 'bg__app__light' ? 'modal__app__light' : 'modal__app__dark'}
            right={
                <PanelHeaderButton onClick={handlerClose}><Icon24Dismiss />
                </PanelHeaderButton>} />}
        id={id}
    >
        <Group className={bgApp}>
            <div>
                <Search
                    value={title} onChange={handleChange}
                    className={bgApp}
                />
            </div>
            <Div>
                <Card
                    mode='shadow'
                    className='card__app'
                    style={{ padding: 0, overflow: 'hidden' }}>
                    <Cell
                        onClick={() => {
                            if (isAllowedPlace) {
                                setDefaultCity(myCityId)
                                handlerClose()
                            } else {
                                requestPermissionLocation()
                            }
                        }}
                    >
                        <div className='card__app'>
                            {(!isFetching) && <ListItem bgApp={bgApp} description={<div>
                                {isAllowedPlace ? <> <div style={{ fontSize: 16 }}>
                                    {myCity}
                                </div>
                                    <div style={{ fontSize: 15 }} className='text__gray'>
                                        <div>Текущее местоположение</div>
                                        <div className="text__gray">

                                            <div className='d-flex'>
                                                <div style={{ height: 18, marginRight: 5 }} className='center__y'>
                                                    <Icon12ErrorCircle fill='C1C1C1' />
                                                </div>
                                                    <div
                                                    style={{ fontSize: 15 }}>
                                                        Может быть неточным
                                                    </div>
                                                </div>
                                        </div>
                                    </div> </> : <div
                                        style={{ color: '#4475F1', fontSize: 16 }}>
                                    <div>Разрешить доступ</div>
                                    <div>к местоположению</div>
                                </div>}
                            </div>}>
                                <Icon32PlaceOutline className='' fill='#4475F1' />
                            </ListItem>}
                            {isFetching && <ListItem
                                bgApp={bgApp}
                                description={<div>
                                    <div
                                        style={{ width: 122, height: 16 }}
                                        className='bg__init'>
                                    </div>
                                    <div
                                        style={{ width: 88, height: 12 }}
                                        className='bg__init mt-1'>
                                    </div>
                                </div>}
                            >
                                <div
                                    style={{ height: 24, width: 24, borderRadius: 20000 }}
                                    className='bg__init'></div>
                            </ListItem>}
                        </div>
                    </Cell>
                </Card>
            </Div>
            <Div>
                <Header className='text__SF-Pro-Rounded-Semibold'>
                    {(!isFetching) ? <span className='text__gray'>
                        {title.length > 0 ? "ВСЕ" : "С НИЗКИМ AQI ЗА ДЕНЬ"}
                    </span> : <div
                        className='bg__init' style={{ width: 85, height: 12 }}
                    ></div>}
                </Header>
                <Card
                    mode='shadow'
                    className='card__app'>
                    <Group>
                        {(isFetching) ? (title.length > 0 ? <BgInitCities /> : <BgInitClearestCities />) : <></>}
                        {(!isFetching) ? ((title.length > 0) ? citiesJSX : clearestCitiesJSX) : <></>}
                    </Group>
                </Card>
            </Div>
            <Div>
                <Header className='text__SF-Pro-Rounded-Semibold'>
                    {(!isFetching) ? <span className='text__gray'>
                        {title.length > 0 ? "С НИЗКИМ AQI ЗА ДЕНЬ" : "ВСЕ"}
                    </span> : <div
                        className='bg__init' style={{ width: 85, height: 12 }}>
                    </div>}
                </Header>
                <Card
                    mode='shadow'
                    className='card__app'>
                    <Group>
                        <Group className=''>
                            {(isFetching) ? (title.length > 0 ? <BgInitClearestCities /> : <BgInitCities />) : <></>}
                            {(!isFetching) ? ((title.length > 0) ? clearestCitiesJSX : citiesJSX) : <></>}
                        </Group>
                    </Group>
                </Card>
            </Div>
            <Spacing size={70} />
        </Group>
    </ModalPage>
}


type PropsClearestCitiesType = {}
const BgInitClearestCities: React.FC<PropsClearestCitiesType> = ({ }) => {

    const items = [2, 3, 4, 5, 1].map(c => <><Div key={`clearCity${c}`} className='px-2'
        style={{ display: 'grid', gridTemplateColumns: '1fr 50px' }}>
        <div>
            <div
                style={{ width: 122, height: 16 }}
                className='bg__init'>
            </div>
            <div
                style={{ width: 88, height: 12 }}
                className='bg__init mt-1'>
            </div>
        </div>
        <div
            style={{ width: 44, height: 24, borderRadius: 20000 }}
            className='bg__init mt-1'>
        </div>
    </Div>{c !== 1 && <Spacing className="spacing" separator size={8} />}</>)

    return <>{items}</>
}

type PropsBgInitCitiesType = {}
const BgInitCities: React.FC<PropsBgInitCitiesType> = ({ }) => {
    const items = [2, 3, 4, 5, 1].map(c => <><Div key={`city${c}`} className='px-2'>
        <div>
            <div
                style={{ width: 122, height: 16 }}
                className='bg__init'>
            </div>
            <div
                style={{ width: 88, height: 12 }}
                className='bg__init mt-1'>
            </div>
        </div>
    </Div>{c !== 1 && <Spacing className="spacing" separator size={8} />}</>)

    return <>{items}</>
}