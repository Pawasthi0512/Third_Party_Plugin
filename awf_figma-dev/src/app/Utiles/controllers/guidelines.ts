import { getApi } from "../config/api";
import { GUIDELINE_SERVER_URL, API } from "../constants";

/**
 * To get the list of colors, typo and logos
 */
export const getGuidelineList = () =>
  getApi(`${GUIDELINE_SERVER_URL}/${API.guidelines}`);

/**
 * Get logos from bucket
 */
export const getLogoFromBucket = ({
  sectionEntityId,
  sectionType,
  logoId,
}: {
  sectionEntityId: string;
  sectionType: string;
  logoId: string;
}) =>
  getApi(`${GUIDELINE_SERVER_URL}/${sectionEntityId}/${sectionType}/${logoId}`);

/**
 * To download logo from the logo section
 */
export const downloadLogo = async ({
  sectionEntityId,
  sectionType,
  logoId,
  idToken,
  token,
  tenantId
}: {
  sectionEntityId: string;
  sectionType: string;
  logoId: string;
  idToken:string;
  token:string;
  tenantId:string;
}) => {
  let urlData: any;
  try {
    const response = await fetch(
      `${GUIDELINE_SERVER_URL}/section/${sectionEntityId}/${sectionType}/${logoId}/download?idToken=${idToken}&accessToken=${token}&tenant=${tenantId}`,
      { redirect: "follow" }
    );
    if (response.redirected) {
      const redirectUrl = response.url;
      urlData = await fetch(redirectUrl);
    }
  } catch (err) {
    console.log(err);
  }
  return urlData;
};
