
import React, { Fragment } from 'react'
import { Card, Div, Group, Header, ModalPage, ModalPageHeader, PanelHeaderButton, Spacing } from '@vkontakte/vkui'
import { Icon24Dismiss } from '@vkontakte/icons'
import { Icon16Place } from '@vkontakte/icons';
import { Icon16ClockOutline } from '@vkontakte/icons';
import { Icon24Message } from '@vkontakte/icons';
import { PollutionItem } from '../bricks/PollutionItem';


type PropsType = {
    id: string,
    day: number,
    month: string,
    city: string,
    isGoodWind: boolean,
    handlerClose: () => void
}


export const ForecastPollutionForDay: React.FC<PropsType> = ({ day, month, city, id, handlerClose, isGoodWind }) => {
    return <ModalPage
        onClose={handlerClose}
        header={<ModalPageHeader
            right={<PanelHeaderButton onClick={handlerClose}><Icon24Dismiss /></PanelHeaderButton>}></ModalPageHeader>}
        settlingHeight={100} id={id} >
        <Fragment>
            <Group>
                <Div className='w-100 text__dark_gray'>
                    <h3 className='center__x'>
                        6 AQI
                    </h3>
                    <div className='center__x'>
                        <div className='d-flex'>
                            <Icon16Place style={{ marginTop: 3, marginRight: 3 }} />
                            {city}
                        </div>
                        <div className='d-flex ml-2'>
                            <Icon16ClockOutline style={{ marginTop: 3, marginRight: 3 }} />
                            {day} {month}
                        </div>
                    </div>
                </Div>
                <Div>
                    <Card mode='shadow'>
                        <div className='d-flex text__dark_gray p-2'>
                            <div className='center__y'>
                                <Icon24Message />
                            </div>
                            <div className='ml-2'>
                                {isGoodWind ? 
                                'Качество воздуха хорошее и соответствует требованиям ООН.'
                                : 'Качество воздуха плохое и превышает требования ООН.'
                                }
                            </div>
                        </div>
                    </Card>
                </Div>

                <Div>
                    <Header>
                        <span className="text__gray">
                            ЗАГРЯЗНИТЕЛИ
                        </span>
                    </Header>
                    <Card mode='shadow'>
                        <div className='p-2'>
                            
                        </div>
                    </Card>
                </Div>
                <Spacing size={64}/>
            </Group>
        </Fragment>

    </ModalPage>
}