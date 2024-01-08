import React, { useState, useContext, createContext, useEffect } from "react";
import { getGuidelineList } from "../../controllers/guidelines";
import { useAuth } from "../auth/useAuth";

interface GuideLinesI {
  children: React.ReactNode;
}

const guidelines = createContext<any>(null);

export const useGuidelines = () => useContext(guidelines);

function useProvideGuideline() {
  const { currentTab } = useAuth();
  const [allTypes, setAllTypes] = useState([]);
  const [isGuidelineLoading, setIsGuidelineLoading] = useState(false);

  /**
   * To get all the color, font and logo list from the api
   */
  const getGuideline = async () => {
    setIsGuidelineLoading(true);
    try {
      const response = await getGuidelineList();
      const allData = response.data.data.map(({ sections }) => {
        return sections;
      });
      setAllTypes(allData.flat());
    } catch (err) {}
    setIsGuidelineLoading(false);
  };

  /**
   * To call the api initially
   */
  useEffect(() => {
    if (currentTab === "2" || currentTab === "3" || currentTab === "4") {
      getGuideline();
    }
  }, [currentTab]);

  return {
    isGuidelineLoading,
    allTypes,
  };
}

export function ProvideGuideline({ children }: GuideLinesI) {
  const auth = useProvideGuideline();
  return <guidelines.Provider value={auth}>{children}</guidelines.Provider>;
}
