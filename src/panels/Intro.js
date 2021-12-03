import { Div, Spacing, FixedLayout, Group, ModalPage, PanelHeaderClose, ModalPageHeader, Panel, useAdaptivity, ViewWidth, usePlatform, Button, Cell } from "@vkontakte/vkui"
import React,{ Fragment } from "react"
import './Intro.css'
import { Icon28NarrativeOutline } from '@vkontakte/icons';
import { Icon28Notifications } from '@vkontakte/icons';
import { Icon28StoryOutline } from '@vkontakte/icons';
import { Icon24LocationOutline } from '@vkontakte/icons';


const LIGHT_BLUE = '#4475F1'

export const Intro=({id,bgApp,handlerClose,checkInfo,requestPermissionLocation})=>{
    
    

    return<ModalPage
    id={id}      
    onClose={handlerClose}
    header={
            <ModalPageHeader
            className={bgApp==='bg__app__light' ? 'modal__app__light' : 'modal__app__dark'}
            ></ModalPageHeader>
    }>
        <div className={bgApp}>
        <Fragment>
            <Group>
                <Div className='center__x text__big'>
                    Добро пожаловать в Purify
                </Div>
                <Div>
                    <InfoBlock 
                    Icon={Icon28NarrativeOutline}
                    description={'Просматривайте актуальную статистику и получайте важные советы, чтобы сберечь здоровье. '}
                    title={'Следите за качеством воздуха'} />
                    <InfoBlock 
                    Icon={Icon28Notifications}
                    description={'Получайте уведомления, чтобы заранее знать об изменениях в худшую сторону.'}
                    title={'Будьте в курсе'}
                    />
                    <InfoBlock 
                    Icon={Icon28StoryOutline}
                    description={'Информируйте их в критических ситуациях через истории ВКонтакте.'}
                    title={'Сообщайте близким'}
                    />
                </Div>
            </Group>
            <Div
            className='center__x'
            >
                <Button  
                size='l'
                onClick={requestPermissionLocation}
                className='intro__button__location'
                style={{background:LIGHT_BLUE}}
                before={<Icon24LocationOutline/>}>
                  Разрешить доступ к местоположению  
                </Button>
            </Div>
            <div
            onClick={()=>{
                checkInfo()
            }}
            style={{marginTop:15}}
            className='w-100 highlight_on_touch center__x text__gray'
            >
                Пропустить
            </div>
            <Spacing size={64}/>
        </Fragment>
        </div>
    </ModalPage>
}

export const InfoBlock=({description, title, Icon})=>{
    return<Div className='intro__info'>
    <div className='center__y'>
        <Icon fill={LIGHT_BLUE}/>
    </div>
    <Div>
        <div>
            <strong>{title}</strong>
        </div>
        <div className='text__gray'>
            {description}
        </div>
    </Div>
</Div>
}