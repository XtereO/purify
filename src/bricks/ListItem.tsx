import { memo, ReactElement } from "react"

type Props={
    description: string | ReactElement<any, any>
    className?: string
    bgApp: string
    children?: ReactElement<any,any>
    onClick?: ()=>void
}

export const ListItem = memo<Props>(({ description, onClick, className, bgApp, children }) => {
    return <div 
        onClick = {onClick ? onClick : ()=>{}} 
        style={{ display: 'flex', color: (bgApp==='bg__app__light' ? '#454545' : 'white') }}>
        <div className={className ?? 'center__y'}
        style={{paddingRight: 16, paddingLeft:8}}>
            {children}
        </div>
        <div className='center__y'> 
            {description}
        </div>
    </div>
})
