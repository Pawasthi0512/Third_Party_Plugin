figma.showUI(__html__);
figma.ui.resize(428, 620);

/**
 *
 * @param msg
 * Fires when any data sent from plugin to figma app
 */
figma.ui.onmessage = async (msg) => {
  await figma.loadFontAsync({ family: "Rubik", style: "Regular" });

  /**
   *
   * @param jwt_token store and pop in command
   */
  const setToken = (jwt_token: string) => {
    return figma.clientStorage.setAsync("jwt-token", jwt_token);
  };

  /**
   * To set the id token in local storage
   */
  const setIdToken = (id_token: string) => {
    return figma.clientStorage.setAsync("id-token", id_token);
  };

  /**
   * To set user object in local storage
   */

  const setUser = (user: any) => {
    return figma.clientStorage.setAsync("user", user);
  };

  const get_JW_Token = () => {
    return figma.clientStorage.getAsync("jwt-token");
  };

  const clearToken = async () => {
    await figma.clientStorage.deleteAsync("jwt-token");
    await figma.clientStorage.deleteAsync("user");
    await figma.clientStorage.deleteAsync("id-token");
  };

  function sendToUi(msg) {
    figma.ui.postMessage({ type: "token", data: msg.jwt_token });
  }

  /**
   * Working with colors TAB
   */

  const selectedNode = figma.currentPage.selection;

  /**
   * Fill color for selected node
   */
  const getFillColor = async (msg) => {
    if (selectedNode.length === 1 && selectedNode[0].type === "RECTANGLE") {
      const node = selectedNode[0];
      return (node.fills = [
        {
          type: "SOLID",
          color: {
            r: msg.colorRGBCode.r / 255,
            g: msg.colorRGBCode.g / 255,
            b: msg.colorRGBCode.b / 255,
          },
        },
      ]);
    }
  };

  /**
   * Fill the border color of a selected node
   */
  const getBorderColor = async (msg) => {
    if (selectedNode.length === 1) {
      const node = selectedNode[0];
      if (
        node.type === "VECTOR" ||
        node.type === "FRAME" ||
        node.type === "RECTANGLE"
      ) {
        node.strokes = [
          {
            type: "SOLID",
            color: {
              r: msg.colorRGBCode.r / 255,
              g: msg.colorRGBCode.g / 255,
              b: msg.colorRGBCode.b / 255,
            },
          },
        ];
      }
    }
  };

  /**
   * To get inner shadow color and apply to selected node
   */

  const getInnerShadow = async (msg) => {
    if (selectedNode.length === 1) {
      const node = selectedNode[0];
      if (
        node.type === "VECTOR" ||
        node.type === "FRAME" ||
        node.type === "RECTANGLE"
      ) {
        node.effects = [
          {
            type: "INNER_SHADOW",
            color: {
              r: msg.colorRGBCode.r / 255,
              g: msg.colorRGBCode.g / 255,
              b: msg.colorRGBCode.b / 255,
              a: msg.colorRGBCode.a / 255,
            },
            offset: { x: msg.offsetX, y: msg.offsetY },
            radius: msg.radius,
            visible: true,
            blendMode: "NORMAL",
          },
        ];
      }
    }
  };

  /**
   * To get drop shadow color and apply to selected node
   */

  const getDropShadow = async (msg) => {
    if (selectedNode.length === 1) {
      const node = selectedNode[0];
      if (
        node.type === "VECTOR" ||
        node.type === "FRAME" ||
        node.type === "RECTANGLE"
      ) {
        if (node.effects) {
          node.effects = node.effects.filter(
            (effect) => effect.type !== "DROP_SHADOW"
          );
        }
        node.effects = [
          {
            type: "DROP_SHADOW",
            color: {
              r: msg.colorRGBCode.r / 255,
              g: msg.colorRGBCode.g / 255,
              b: msg.colorRGBCode.b / 255,
              a: msg.colorRGBCode.a / 255,
            },
            offset: { x: msg.offsetX, y: msg.offsetY },
            radius: msg.radius,
            visible: true,
            blendMode: "NORMAL",
          },
        ];
      }
    }
  };

  /**
   * Drag and drop images from plugin to figma app
   */

  const onDragAdnDrop = async (msg) => {
    const imageURL = await msg.convertedBase64;
    try {
      const image = figma.createImage(imageURL);
      const rect = figma.createRectangle();
      rect.resize(420, 380);
      rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash: image.hash }];
      const pointer = figma.viewport.center;
      const lastPosition = await figma.clientStorage.getAsync("lastPosition");
      const { x = pointer.x, y = pointer.y } = JSON.parse(lastPosition || "{}");
      rect.x = x;
      rect.y = y;
      await figma.clientStorage.setAsync(
        "lastPosition",
        JSON.stringify({ x: rect.x, y: rect.y })
      );
      figma.currentPage.appendChild(rect);
      figma.currentPage.selection = [rect];
      figma.viewport.scrollAndZoomIntoView([rect]);
    } catch (err) {
      figma.notify(`${err}`);
    }
  };

  /**
   * Receive message from plugin to iframe
   */
  const onImportColors = async (msg) => {
    const colorList = await msg.mergeListColors;
    const localStyles = figma.getLocalPaintStyles();

    colorList.forEach((colorObject) => {
      const {  name, rgb } = colorObject;
  
      const existingStyle = localStyles.find((style) => style.name === name);
  
      if (existingStyle) {
        existingStyle.paints = [{
          type: "SOLID",
          color: {
            r: rgb.r / 255,
            g: rgb.g / 255,
            b: rgb.b / 255,
            // a: rgb.a || 1
          }
        }];
      } else {
        const style = figma.createPaintStyle();
        style.name = name;
        style.paints = [{
          type: "SOLID",
          color: {
            r: rgb.r / 255,
            g: rgb.g / 255,
            b: rgb.b / 255,
            // a: rgb.a || 1
          }
        }];
  
        localStyles.push(style);
      }
    });
  
    figma.currentPage.setRelaunchData({ name: 'refreshStyles', command: 'refreshStyles' });
  };

  /**
   *
   * To close plugin on click
   */
  const closePlugigInOnAction = () => figma.closePlugin();

  /**
   * Switch fired when message with suitable type fired from the app side
   */
  switch (msg.type) {
    case "set-token":
      setToken(msg.jwt_token);
      break;
    case "set-idToken":
      setIdToken(msg.id_token);
      break;
    case "user":
      setUser(msg.user);
      break;
    case "get-token":
      return get_JW_Token();
    case "clear-token":
      clearToken();
      break;
    case "token":
      sendToUi(msg);
      break;
    case "fillColor":
      getFillColor(msg);
      break;
    case "borderColor":
      getBorderColor(msg);
      break;
    case "innerShadow":
      getInnerShadow(msg);
      break;
    case "dropShadow":
      getDropShadow(msg);
      break;
    case "onDragAssets":
      onDragAdnDrop(msg);
      break;
    case "importColors":
      onImportColors(msg);
      break;
    case "closePlugin":
      closePlugigInOnAction();
  }
};

/**
 * Sending data from figma app to plugin UI.
 */

const authToken = figma.clientStorage.getAsync("jwt-token");

/**
 *
 * To check if the token is present and return
 */
async function get_JW_Token() {
  const token = await figma.clientStorage.getAsync("jwt-token");
  const id_token = await figma.clientStorage.getAsync("id-token");
  const user = await figma.clientStorage.getAsync("user");
  return sendTokentoUI(token, id_token, user);
}
get_JW_Token();
/**
 * To send token to plugin
 */
async function sendTokentoUI(token, id_token, user) {
  return figma.ui.postMessage({
    type: "authToken",
    data: { token, id_token, user },
  });
}

/**
 * Getting selected node from the frame
 */
let exportNode = null;

/**
 *
 * @param imagedata will be sent to ui
 *
 */
async function sendToUi(imagedata) {
  return figma.ui.postMessage({ type: "exportImage", data: imagedata });
}

/**
 * Async get selected node data
 */
async function updateSelectedNode() {
  exportNode = figma.currentPage.selection[0];
  if (exportNode !== null && authToken) {
    await exportNode
      .exportAsync({
        format: "PNG",
        constraint: {
          type: "SCALE",
          value: 2,
        },
      })
      .then(
        (resolved) => {
          sendToUi(resolved);
        },
        (rejected) => {
          console.error(rejected);
          figma.notify("Promise was rejected");
        }
      );
  }
}

updateSelectedNode();

figma.on("selectionchange", updateSelectedNode);
