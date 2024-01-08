import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getListOfAssets,
  getTagList,
  getUserList,
  postAddRemoveFav,
  updateUploadedS3file,
  getSignedURLOnUpload,
  getAssetById,
} from "../../controllers/assets";
import { useAuth } from "../auth/useAuth";
import { generateRandomID } from "../../helpers";
import { useSnackBar } from "../Snackbar";
import { v4 as uuidv4 } from 'uuid';

const assetsContext = createContext<any>(null);
export const useAssets = () => useContext(assetsContext);

function useProviderAssets() {
  const { currentTab, user } = useAuth();

  
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();
  const [checkFrame, setCheckFrame] = useState(false);
  const [checkFile, setCheckFile] = useState(false);
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [listOfAssets, setListOfAssets] = useState([]);
  const [rangeFrom, setRangeFrom] = useState(0);
  const [sizeOfList, setSizeOfList] = useState(24);
  const [totalResult, setTotalResult] = useState("");
  const [userList, setUserList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [favourite, setFavourite] = useState({});
  const [isAdd, setIsAdd] = useState();
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [filterObj, setFilterObj] = useState({});
  const [assetsFile, setAssetsFile] = useState<any>([]);
  const [uploadedFileKey, setUploadedFileKey] = useState("");
  const [createFileUUID, setCreateFileUUID] = useState<any>("");
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [isFileAdded, setIsFileAdded] = useState(false);

  const [selectedAssetID, setSelectedAssetID] = useState("");
  const [isAssetByIdLoading, setIsAssetByIdLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [fileData, setFileData] = useState<any>([]);

  /**
   * To get the assets list
   */
  const getAssetsList = async () => {
    try {
      setIsAssetsLoading(true);
      const response = await getListOfAssets({
        from: rangeFrom,
        size: sizeOfList,
        filterObj,
      });
      setListOfAssets(response.data.data.files);
      setTotalResult(response.data.data.itemCount);
    } catch (err) {
      console.log(err);
    }
    setIsAssetsLoading(false);
  };

  /**
   * To get the user list for filter options
   */
  const getFilterUserList = async () => {
    try {
      const response = await getUserList();
      setUserList(response.data.data);
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
  };

  /**
   * Get Asset by id
   */

  const getSelectedAsset = async () => {
    try {
      setIsAssetByIdLoading(true);
      const response = await getAssetById({
        fileId: selectedAssetID,
      });
      setFileData(response.data.data);
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
    setIsAssetByIdLoading(false);
  };

  /**
   * To get tag list option for filter
   */

  const getFilterTagList = async () => {
    try {
      const response = await getTagList();
      setTagList(response.data.data);
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
  };

  /**
   * Import or download the asset file
   */

  const getAddRemoveFav = async () => {
    try {
      setIsFavourite(true);
      if (Object.keys(favourite).length !== 0) {
        const response = await postAddRemoveFav(favourite);
        setIsAdd(response.data);
        if (response.status === 200) {
          setFavourite({});
          getSelectedAsset();
          setIsFavourite(false);
        }
        if (!!response.data.data) {
          ShowSuccessSnackBar("Added to favourite");
        } else {
          ShowSuccessSnackBar("Removed from favourite");
        }
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
  };

  /**
   * To get the filter options
   */
  useEffect(() => {
    if (openFilterDrawer) {
      getFilterUserList();
      getFilterTagList();
    }
  }, [openFilterDrawer]);

  /**
   * To get the assets lits
   */
  useEffect(() => {
    if (currentTab === "1" && user) {
      getAssetsList();
    }
  }, [currentTab, filterObj, sizeOfList, user]);

  /**
   * To get single selected assets
   */
  useEffect(() => {
    if (selectedAssetID) {
      getSelectedAsset();
    }
  }, [selectedAssetID, favourite]);

  /**
   * To toggle favourite
   */

  useEffect(() => {
    if (Object.keys(favourite).length !== 0) {
      getAddRemoveFav();
    }
  }, [favourite]);

  /**
   * File assets upload
   */

  const handleChangeFileUpload = (e) => {
    if (e.target.files) {
      setAssetsFile(e.target.files[0]);
      setCreateFileUUID(generateRandomID(12));
      setIsFileAdded(true);
    }
  };

  /**
   * To upload file to s3 whenever any file uploaded to input
   */

  useEffect(() => {
    if (isFileAdded) {
      setCreateFileUUID(uuidv4());
      setIsFileAdded(false);
    }
  }, [isFileAdded]);

  /**
   * Upload file to s3 and get the gey
   */
  const uploadAssetFile = async () => {
    try {
      const response = await getSignedURLOnUpload({
        fileName: assetsFile?.name,
        file: assetsFile,
        fileUUID: createFileUUID,
      });
      if (response.status === 200) {
        setUploadedFileKey(response.data.key);
        setIsFileAdded(false);
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
  };

  useEffect(() => {
    if (createFileUUID) {
      uploadAssetFile();
    }
  }, [createFileUUID]);

  /**
   * to submit s3 key to backend
   */
  const handleSubmitNewFile = async () => {
    if (!uploadedFileKey) {
      setOpenFileUpload(false);
      

    } else {
      const superateFileAndExe = assetsFile.name.split(".");
      const extensionName = superateFileAndExe[superateFileAndExe.length - 1];
      const fileTitle = superateFileAndExe[superateFileAndExe.length - 2];

      const fileUpload = {
        name: assetsFile.name,
        description: "",
        size: assetsFile.size,
        extension: extensionName,
        type: assetsFile.type,
        title: fileTitle,
        resolution: "1920x1080px",
        fileUUID: createFileUUID,
        s3Key: uploadedFileKey,
        requestId: generateRandomID(12),
      };

      try {
        setIsUploadLoading(true);
        const response = await updateUploadedS3file({
          uploadData: fileUpload,
        });
        if (response.status === 200) {
          setAssetsFile([]);
          setOpenFileUpload(false);
          setCheckFrame(false);
          setCheckFile(false);
          setTimeout(() => getAssetsList(), 3000);
          ShowSuccessSnackBar("Upload successful");
          setCreateFileUUID('')
        }
      } catch (err) {
        ShowApiErrorSnackBar(err);
      }
    }
    setIsUploadLoading(false);
  };


  return {
    checkFrame,
    setCheckFrame,
    checkFile,
    setCheckFile,
    
    isAssetsLoading,
    listOfAssets,
    setListOfAssets,
    setRangeFrom,
    sizeOfList,
    setSizeOfList,
    setUserList,
    userList,
    setFilterObj,
    filterObj,
    totalResult,

    setIsFileAdded,
    setAssetsFile,
    isAdd,
    setFavourite,
    getAddRemoveFav,

    isUploadLoading,
    tagList,
    setTagList,
    openFilterDrawer,
    setOpenFilterDrawer,
    openFileUpload,
    setOpenFileUpload,
    handleChangeFileUpload,
    handleSubmitNewFile,

    isFavourite,
    isAssetByIdLoading,
    setSelectedAssetID,
    fileData,
    setFileData,
  };
}

export function ProvideAssets({ children }) {
  const assets = useProviderAssets();
  return (
    <assetsContext.Provider value={assets}>{children}</assetsContext.Provider>
  );
}
