import { memo, useCallback, useEffect, useState } from "react";
import { Div, PromoBanner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

export const Banner = memo(() => {
  const [bannerData, setBannerData] = useState(null);
  const handleClose = useCallback(() => {
    setBannerData(null);
  }, []);
  const tryRequestAds = useCallback(() => {
    //@ts-ignore
    bridge.send("VKWebAppGetAds").then((bannerInfo: any) => {
      if (
        bannerInfo &&
        bannerInfo.hasOwnProperty("data") &&
        !bannerInfo.hasOwnProperty("error_type")
      ) {
        setBannerData(bannerInfo.data);
      }
    });
  }, [bannerData]);
  const requestAds = useCallback(() => {
    try {
      tryRequestAds();
    } catch (e) {
      console.log("Without ads =(");
    }
  }, [tryRequestAds]);

  useEffect(() => {
    requestAds();
  }, []);

  if (!bannerData) {
    return null;
  }

  return (
    <Div>
      <PromoBanner onClose={handleClose} bannerData={bannerData} />
    </Div>
  );
});
