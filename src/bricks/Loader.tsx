//@ts-ignore
import loader from "../media/loader.gif";

type PropsType={}

export const Loader:React.FC<PropsType>=(props)=>{
    return<img className='w-100' src={loader} />
}