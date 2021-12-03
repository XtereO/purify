import { Button, Card, ModalCard } from "@vkontakte/vkui"
import { BackgroundColor } from "chalk";
import React from "react"
import { Icon56NotificationOutline } from '@vkontakte/icons';




type PropsType={
    bgApp: string,
    id: string,
    closeHandler: ()=>void,
    subscribeNoticification: ()=>void
}
const LIGHT_BLUE = '#4475F1'

export const TurnNoticifications:React.FC<PropsType>=({id, subscribeNoticification, bgApp, closeHandler})=>{
    return<ModalCard      
    id={id}      

          onClose={closeHandler}
          icon={<Icon56NotificationOutline fill={LIGHT_BLUE} />}
          header={<div className='text__Inter-Bold'>Включить уведомления?</div>}
          subheader={<div className='text__Inter-Regular'>
              Мы будем уведомлять вас об актуальном качестве воздуха
              раз в неделю, а также:
              <div style={{marginTop:10}}>
                 - Если качество воздуха станет неприемлимым
              </div>
              <div style={{marginTop:5}}>
                 - О резких скачках колличества загрязнителей
              </div>
            </div>}
          actions={
            <Button size="l" mode="primary" onClick={()=>{
                subscribeNoticification()
                closeHandler()
            }} className='text__Inter-Medium'>
              Включить
            </Button>
          }
        />
}