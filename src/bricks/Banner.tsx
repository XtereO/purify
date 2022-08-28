import { memo, useCallback, useEffect, useState } from "react";
import { Div, PromoBanner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

export const Banner = memo(() => {
  const [bannerData, setBannerData] = useState(null);
  const handleClose = useCallback(() => {
    setBannerData(null);
  }, []);

  useEffect(() => {
    //@ts-ignore
    bridge.send("VKWebAppGetAds").then((bannerInfo: any) => {
      console.log(bannerInfo);
      setBannerData(bannerInfo.data);
    });
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
