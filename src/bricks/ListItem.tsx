import { ElementType, JSXElementConstructor, memo, ReactElement } from "react"



type PropsType={
    description: string | ReactElement<any, any>,
    className?: string,
    bgApp: string,
    onClick?: ()=>void
}


export const ListItem:React.FC<PropsType> = memo(({ description, onClick, className, bgApp, ...props }) => {
    return <div className=''
        onClick = {onClick ? onClick : ()=>{}} 
        style={{ display: 'flex', color: (bgApp==='bg__app__light' ? '#454545' : 'white') }}>
        <div className={className ? className :'center__y'}
        style={{paddingRight: 16, paddingLeft:8}}
        >
            {props.children}
        </div>
        <div className='center__y'> 
            {description}
        </div>
    </div>
})