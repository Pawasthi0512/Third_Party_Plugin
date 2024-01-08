import LocalStorageService from "../localStroage";
import { getApi } from "../config/api";
import { GUIDELINE_SERVER_URL, API } from "../constants";

const config = {
  headers : {
    tenant : `${LocalStorageService.get_Tenant_Id()}`
  }
}

/**
 * To get the list of colors, typo and logos
 */
export const getGuidelineList = () =>
  getApi(`${GUIDELINE_SERVER_URL}/${API.guidelines}` , config);

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
  getApi(`${GUIDELINE_SERVER_URL}/${sectionEntityId}/${sectionType}/${logoId}` , config);
