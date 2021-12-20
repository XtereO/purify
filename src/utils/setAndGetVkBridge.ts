import bridge from "@vkontakte/vk-bridge"


type Result = {
    result: boolean
}
export const setValueByKeyStorageVKBridge = async (value:string, key:string):Promise<Result>=>{
    return (await bridge.send('VKWebAppStorageSet',{key,value}))
}

type ValuesAndKeys = {
    key: string
    value: string    
}[]
export const getValuesByKeysStorageVKBridge = async (keys: string[]):Promise<ValuesAndKeys>=>{
    return (await bridge.send('VKWebAppStorageGet', { keys })).keys
}