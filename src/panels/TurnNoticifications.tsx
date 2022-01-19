import React from "react"
import { Button, ModalCard } from "@vkontakte/vkui"
import { Icon56NotificationOutline } from '@vkontakte/icons';
import { LIGHT_BLUE } from "../consts/COLORS";




type PropsType={
    bgApp: string,
    id: string,
    closeHandler: ()=>void,
    subscribeNoticification: ()=>void
}

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
                 - Если качество воздуха станет неприемлемым
              </div>
              <div style={{marginTop:5}}>
                 - О резких скачках количества загрязнителей
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