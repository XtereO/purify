
import './Tooltip.css'



type PropsType={
    tooltipDescription: string
}

export const Tooltip:React.FC<PropsType> = ({tooltipDescription,children}) =>{
    //@ts-ignore
    return<div tooltip={tooltipDescription} tooltip-position={'bottom'}
    style={{padding:0,margin:0}}>
        {children}
    </div>
}