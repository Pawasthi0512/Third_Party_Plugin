import React, { useState} from "react";
import "../app/styles/ui.css";
import SignIn from "../app/Views/SiginIn";
import Home from "./Views/Home";
import Loader from "./Primitives/Loader";
import {
  helpers,
  useAssets,
  useTask,
  useAuth,
} from "./Utiles/hooks";

function App() {
  const {
    isUserLoading,
    isLogoutLoading,
    user,
    currentTab,
    setSelectedfigmaFrame,
    setFigmaToken,
    handleSigOut,
  } = useAuth();

  const { setAssetsFile, openFileUpload, setIsFileAdded } = useAssets();

  const {
    setFigmaTaskFile,
    openUploadFile,
    setIsImageFromFigma,
    openFileRevision,
  } = useTask();

  const [binaryData, setBinaryData] = useState<any>();

  /**
   * To logout from the application
   */
  const handleLogout = () => {
    handleSigOut()
  };

  /**
   * The message functions listen to the messages are send from figma app to UI
   */

  onmessage = async (event) => {
    let msgType = await event.data.pluginMessage.type;
    let msg = await event.data.pluginMessage;
    if (msgType === "authToken") {
      setFigmaToken(msg.data);
    }
    if (msgType === "exportImage") {
      let imageData = msg.data;
      setBinaryData(imageData);
    }
  };

  /**
   * Runs when user opens task/assets upload file
   */
  React.useEffect(() => {
    if (binaryData) {
      const createFile = helpers.convertBinanrytofile(binaryData);
      if (currentTab === "1" && openFileUpload) {
        setSelectedfigmaFrame(true);
        setIsFileAdded(true);
        setAssetsFile(createFile);
        setBinaryData("");
      }
      if (currentTab === "5" && (openUploadFile || openFileRevision)) {
        setSelectedfigmaFrame(true);
        setIsImageFromFigma(true);
        setFigmaTaskFile(createFile);
        setBinaryData("");
      }
    }
  }, [openFileUpload, openUploadFile, openFileRevision]);

  return (
    <>
      {isUserLoading || isLogoutLoading ? (
        <Loader />
      ) : (
        <div className="App">
          <div>{user ? <Home handleLogout={handleLogout} /> : <SignIn />}</div>
        </div>
      )}
    </>
  );
}

export default App;
