

const ComponentWithFontByFontTitleCreator = (fontTitle:string) =>{
    type PropsType={}
    const TextWithFont:React.FC<PropsType> = (props)=>{
        return<span className={fontTitle}>
            {props.children}
        </span>
    }
    return TextWithFont
}
export const TextSFProRoundedSemibold = ComponentWithFontByFontTitleCreator('text__SF-Pro-Rounded-Semibold')
export const TextInterMedium = ComponentWithFontByFontTitleCreator('text__Inter-Medium')
export const TextInterSemibold = ComponentWithFontByFontTitleCreator('text__Inter-SemiBold')
export const TextInterRegular = ComponentWithFontByFontTitleCreator('text__Inter-Regular')
export const TextSFProRoundedRegular = ComponentWithFontByFontTitleCreator('text__SF-Pro-Rounded-Regular')
export const TextInterBold = ComponentWithFontByFontTitleCreator('text__Inter-Bold')