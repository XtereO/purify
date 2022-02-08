export const getDayOfWeek=(day:number):string=>{
    const week = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
    ]
    let dayOfWeek = day
    while (dayOfWeek>7){
        dayOfWeek = dayOfWeek -7
    }
        
    return week[dayOfWeek-1]
}
