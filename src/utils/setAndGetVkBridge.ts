import bridge from "@vkontakte/vk-bridge";

type Result = {
  result: boolean;
};
export const setValueByKeyStorageVKBridge = async (
  value: string,
  key: string
): Promise<Result> => {
  try {
    return await bridge.send("VKWebAppStorageSet", { key, value });
  } catch (e) {
    console.log("set keys err", e);
    return { result: false };
  }
};

type ValuesAndKeys = {
  key: string;
  value: string;
}[];
export const getValuesByKeysStorageVKBridge = async (
  keys: string[]
): Promise<ValuesAndKeys> => {
  try {
    return (await bridge.send("VKWebAppStorageGet", { keys })).keys;
  } catch (e) {
    console.log("get keys err", e);
    return [];
  }
};
