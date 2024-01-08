/* eslint-disable func-names */
const LocalStorageService = (function () {
  let service: any;

  /**
   * Returns the service object.
   * @returns {Service} The service object.
   */
  function getService() {
    if (!service) {
      // @ts-ignore
      service = this;
      return service;
    }
    return service;
  }

  /**
   * Sets the id tokens in local storage.
   * @param {object} tokenObj - the object containing the id tokens.
   * @returns None
   */
  function setIdToken(id_token: string) {
    localStorage.setItem("id_token", id_token);
  }


  /**
   * Sets the access tokens in local storage.
   * @param {object} tokenObj - the object containing access tokens.
   * @returns None
   */
  function setAccessToken(access_token: string) {
    localStorage.setItem("access_token", access_token);
  }

  /**
   * Tenant Id in local storage
   */
  function setTanantId(tenant : string) {
    localStorage.setItem('tenant_Id' , tenant)
  }

  /**
   * Gets the id token from local storage.
   * @returns {string} The access token.
   */
  function get_Id_Token() {
    return localStorage.getItem("id_token");
  }


  /**
   * Gets the access token from local storage.
   * @returns {string} The access token.
   */
  function get_Access_Token() {
    return localStorage.getItem("access_token");
  }

  /**
   * Gets the Tenant id from local storage.
   * @returns {string} The access token.
   */
  function get_Tenant_Id() {
    return localStorage.getItem("tenant_Id");
  }


  /**
   * Clears the access and refresh tokens from local storage.
   * @returns None
   */
  function clearToken() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("tenant_Id");
    //  use access token and refresh token instead of this
    localStorage.removeItem("user");
    window.location.reload()
  }

  /**
   * Sets the user in local storage.
   * @param {any} data - the user data to set in local storage
   * @returns None
   */
  //  use access token and refresh token instead of this
  function setUser(data: any) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  /**
   * Gets the user object from local storage.
   * @returns {User | null} - the user object, or null if there is no user object in local storage.
   */
  //  use access token and refresh token instead of this
  function getUser() {
    const userObjectString = localStorage.getItem("user");
    if (userObjectString) {
      return JSON.parse(userObjectString);
    }

    return null;
  }

  return {
    getService,
    setIdToken,
    setAccessToken,
    setTanantId,
    get_Id_Token,
    get_Access_Token,
    get_Tenant_Id,
    clearToken,
    getUser,
    setUser,
  };
})();

export default LocalStorageService;
