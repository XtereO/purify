




export const isKrym = (cityId:string):boolean =>{
    const krymsCity:string[] = [
        '5bc822af41fdcdf1939e6641','5bc822af41fdcdf1939e6642',
        '5bc822ae41fdcdf1939e6628','5bc822ae41fdcdf1939e660e',
        '5bc822ae41fdcdf1939e662b','5bc821bd41fdcdf1939dd63e',
        '5bc822a241fdcdf1939e6147','5bac90b524b967f0b5308d0f',
        '5bc822ae41fdcdf1939e660e','5bac90b624b967f0b5308d12',
        '5bc8229e41fdcdf1939e5f4c','5bc822a241fdcdf1939e6172',
        '5bc8229d41fdcdf1939e5ee0','5bac90ab24b967f0b5308cf4',
        '5bac90b624b967f0b5308d11','5bc8229c41fdcdf1939e5e72',
        '5bc8229c41fdcdf1939e5e5c','5bac90b724b967f0b5308d13',
        '5bc822a041fdcdf1939e5ff2','5bac90b624b967f0b5308d10',
        '5bc8229f41fdcdf1939e5f88','5bc822a341fdcdf1939e61d1',
        '5bc822af41fdcdf1939e667b'
    ]
    return krymsCity.some(k=>k===cityId)
}