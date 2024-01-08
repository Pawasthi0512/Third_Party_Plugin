const LocalStorageService = (function () {
  /**
   * Sets the access and refresh tokens in local storage.
   */
  async function setToken(jwt_token: string) {
    return parent.postMessage(
      { pluginMessage: { type: "set-token", jwt_token } },
      "*"
    );
  }

  /**
   * set Id token in figma
   */
  async function setIdToken(id_token: string) {
    return parent.postMessage(
      { pluginMessage: { type: "set-idToken", id_token } },
      "*"
    );
  }

  /**
   * To set user object
   */
  async function setUser(user: any) {
    return parent.postMessage(
      {
        pluginMessage: { type: "user", user },
      },
      "*"
    );
  }

  /**
   * Gets the access token from local storage.
   */
  async function get_JW_Token() {
    return parent.postMessage({ pluginMessage: { type: "get-token" } }, "*");
  }

  /**
   * Get id token from local storage
   */

  async function getID_token() {
    return parent.postMessage({ pluginMessage: { type: "id-token" } }, "*");
  }

  /**
   * Get user object from local storage
   */
  async function getUser(){
    return parent.postMessage({pluginMessage: {type:  'user'}}, '*')
  }

  /**
   * Clears the access and refresh tokens from local storage.
   */
  async function clearToken() {
    return parent.postMessage({ pluginMessage: { type: "clear-token" } }, "*");
  }

  return {
    setToken,
    setIdToken,
    setUser,
    getUser,
    getID_token,
    get_JW_Token,
    clearToken,
  };
})();

export default LocalStorageService;
