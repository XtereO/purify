



export const getFullNamePollutant=(title:string)=>{
    switch (title) {
        case 'pm25':
            return 'PM2.5'
        case 'pm10':
            return 'PM10'
        case 'o3':
            return 'O3'
        case 'no2':
            return 'NO2'
        case 'so2':
            return 'SO2'
        case 'co':
            return 'CO'
        default:
            return title.toUpperCase()
    }
}
export const getDescriptionPollutant=(title:string)=>{
    switch (title) {
        case 'pm25':
            return 'Крошечные частицы (<2.5 μm) в воздухе, которые, при вдыхании, попадают напрямую в кровь.'
        case 'pm10':
            return 'Крошечные частицы (<10 μm) в воздухе, которые, при вдыхании, попадают напрямую в кровь.'
        case 'o3':
            return 'Озон — токсичный и канцерогенный газ, влияющий на органы дыхания.'
        case 'no2':
            return 'Оксид азота — особо токсичен, раздражает дыхательные пути и уменьшает содержание гемоглобина в крови.'
        case 'so2':
            return 'Оксид серы — при длительном воздействии может нанести непоправимый вред лёгким.'
        case 'co':
            return 'Монооксид углерода — не имеет запаха и цвета. Симптомы отравления включают слабость, головную боль, тошноту и др.'
        default:
            return 'Еще нет подходящего описания для этого элемента.'
    }
}