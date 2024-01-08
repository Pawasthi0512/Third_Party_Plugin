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

// import LocalStorageService from "../../../Utiles/localStroage";


const assetsContext = createContext<any>(null);

export const useAssets = () => useContext(assetsContext);

function useProviderAssets() {
  const { user, currentTab } = useAuth();
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

  const [checkFrame, setCheckFrame] = useState(false);

  const [checkFile, setCheckFile] = useState(false);

  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [listOfAssets, setListOfAssets] = useState([]);
  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [sizeOfList, setSizeOfList] = useState<number>(24);
  const [totalResult, setTotalResult] = useState("");
  const [userList, setUserList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [favourite, setFavourite] = useState({});
  const [isAdd, setIsAdd] = useState();
  const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);

  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [filterObj, setFilterObj] = useState({});
  const [assetsFile, setAssetsFile] = useState<any>([]);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [uploadedFileKey, setUploadedFileKey] = useState('');
  const [createFileUUID, setCreateFileUUID] = useState<any>();
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const [selectedAssetID, setSelectedAssetID] = useState("");
  const [isAssetByIdLoading, setIsAssetByIdLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [fileData, setFileData] = React.useState<any>([]);

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
      if(response?.status === 200){
          setListOfAssets(response?.data?.data?.files);
          setTotalResult(response?.data?.data?.itemCount);
      }else if (response?.status === 401){
          window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
    setIsAssetsLoading(false);
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
        if(response.status === 200){
          setFavourite({});
          getSelectedAsset();
          setIsFavourite(false);
        }
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
    setIsFavourite(false);
  };

  /**
   * GET the list of filter options
   */
  useEffect(() => {
    if (user && openFilterDrawer) {
      getFilterUserList();
      getFilterTagList();
    }
  }, [user, openFilterDrawer]);

  /**
   * To get assets list
   */
  useEffect(() => {
    if (user || isUploadLoading) {
      getAssetsList();
    }
  }, [user, currentTab, filterObj, sizeOfList, isUploadLoading]);

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
    if (favourite) {
      getAddRemoveFav();
    }
  }, [favourite]);

  useEffect(() => {
    if (currentTab === "1" && user) {
      getAssetsList();
    }
  }, [isUploadLoading, user, currentTab, currentTab]);
  /**
   * File assets upload
   */

  const handleChangeFileUpload = (e) => {
    console.log(e.target.files[0] , "new file")
    if (e.target.files) {
      setAssetsFile(e.target.files[0]);
      setCreateFileUUID(uuidv4());
      setIsFileAdded(true);
    }
  };

  const handleChangeFrameUpload = (file) => {
    if (file) {
      setAssetsFile(file);
      setCreateFileUUID(uuidv4());
      setIsFileAdded(true);
    }
  };

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

  /**
   * To upload file to s3 whenever any file uploaded to input
   */
  React.useEffect(() => {
    if (isFileAdded) {
      uploadAssetFile();
    }
  }, [assetsFile, isFileAdded]);

  /**
   * to submit s3 key to backend
   */
  const handleSubmitNewFile = async () => {
    if (!uploadedFileKey ) {
      setOpenFileUpload(false);
    } else {
      const fileArray = assetsFile.name.split(".")

      // file extension
      const extensionName = fileArray[fileArray.length - 1]
      // file title
      const titleName = fileArray[fileArray.length - 2]

      const fileUpload = {
        name: assetsFile.name,
        description: "",
        size: assetsFile.size,
        extension: extensionName,
        type: assetsFile.type,
        title: titleName,
        resolution: assetsFile.size,
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
          ShowSuccessSnackBar("Upload successful");
          setCheckFile(false);
          setCheckFrame(false);
          setTimeout(()=>getAssetsList(), 2000 ) ;
        }
      } catch (err) {
        ShowApiErrorSnackBar(err);
      }
    }
    setIsUploadLoading(false);
  };

  return {
    checkFrame, setCheckFrame,
    checkFile, setCheckFile,
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
    openFilterDrawer,
    setOpenFilterDrawer,
    isAdd,
    setFavourite,
    getAddRemoveFav,

    tagList,
    setTagList,

    isUploadLoading,
    openFileUpload,
    setOpenFileUpload,
    handleChangeFileUpload,
    handleSubmitNewFile,

    handleChangeFrameUpload,

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
