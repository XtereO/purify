import { useState } from "react"
import { FixedLayout, Group, Panel } from "@vkontakte/vkui"
import { MySnackbar } from "../bricks/MySnackbar"
import { toOnline } from "../utils/internetConnection"


type PropsType = {
    id:string,
    image:string,
}

export const NotConnection:React.FC<PropsType> = ({id,image}) =>{
    const [snackbar,setSnackbar] = useState<any>(null)
    const tryConnectHandler = ()=>{
        if(navigator.onLine){
            toOnline()
        }else{
            setSnackbar(<MySnackbar
                text={'Не удалось подключиться'}
                resultOperation={false}
                closeHandler={()=>setSnackbar(null)}
            />)
        }
    }

    return<Panel id={id}>
        <Group>
    <div 
    style={{height:window.innerHeight}}
    className='center__y'>
        <img src={image} />
        <div 
        className='text__Inter-SemiBold'
        style={{fontSize:20}}>
        Нет подключения
        </div>
        <div 
        className='text__Inter-Regular center__x'
        style={{color:'#898989',fontSize:16,marginTop:8}}
        >
            Проверьте соединение и повторите
        </div>
        <div 
        className='text__Inter-Regular center__x'
        style={{color:'#898989',fontSize:16}}
        >
            попытку
        </div>
        <div style={{marginTop:24}}>
            <button
            style={{
                borderRadius:10,
                color:'#4475F1',
                background:'rgba(68, 117, 241, 0.1)',
                height:36,
                width:176,
                border:'none',
                fontSize:15
            }}
            className='center__y text__SF-Pro-Rounded-Regular'
            onClick={tryConnectHandler}
            >
                Повторить попытку
            </button>
        </div>
    </div>
    <FixedLayout>
        {snackbar}
    </FixedLayout>
    </Group>
</Panel>
}