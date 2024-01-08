import React, { useState, useContext, createContext } from "react";
import { getGuidelineList } from "../../controllers/guidelines";
import { useAuth } from "../auth/useAuth";
import LocalStorageService from "../../../Utiles/localStroage";


interface GuideLinesI {
  children: React.ReactNode;
}

const guidelines = createContext<any>(null);

export const useGuidelines = () => useContext(guidelines);

function useProvideGuideline() {
  const { user } = useAuth();
  const [allTypes, setAllTypes] = useState([]);
  const [isGuidelineLoading, setIsGuidelineLoading] = useState(false);

  /**
   * To get all the color, font and logo list from the api
   */
  const getGuideline = async () => {
    setIsGuidelineLoading(true);
    try {
      const response = await getGuidelineList();
      if(response?.status === 200){
        const allData = response.data.data.map(({ sections }) => {
          return sections;
        });
        setAllTypes(allData.flat());
      }else if(response?.status === 401){
        LocalStorageService.clearToken()
      }
    } catch (err) {
      console.log(err);
    }
    setIsGuidelineLoading(false);
  };

  /**
   * To call the api initially
   */
  React.useEffect(() => {
    if (user) {
      getGuideline();
    }
  }, [user]);


  return {
    isGuidelineLoading,
    allTypes,
  };
}

export function ProvideGuideline({ children }: GuideLinesI) {
  const auth = useProvideGuideline();
  return <guidelines.Provider value={auth}>{children}</guidelines.Provider>;
}
