
//@include "JSXGetURL/JSXGetURLLoader.jsx"

var getURL = JSXGetURL();

 $.evalFile($.includePath + "/json2.js");

  var folder = new Folder('~/Downloads/ArtWorkFlow')
      folder.create();

      


  function fillColor(Red , Green , Blue ){

  //  var csInterface = new CSInterface();
  //  var myCurrentAdobeApp = csInterface.getHostEnvironment().appName;
  //  alert(myCurrentAdobeApp)

 

    var aDoc = app.activeDocument;
    var col = new RGBColor();
    col.red = Red;
    col.green =Green;
    col.blue = Blue;

    // a pathItem must be selected before running the script
    var FirstPath = aDoc.selection[0]; 
    if( FirstPath == undefined) {
      alert("Select item")
    } else {
      FirstPath.fillColor = col;
    }
    
    redraw();
  }

  function BorderColor(R , G , B){
    var doc = app.activeDocument;
    var borCol = new RGBColor();
    borCol.red = R;
    borCol.green = G;
    borCol.blue= B;

    var selPath = doc.selection[0];

    if(selPath == undefined){
      alert("Select item")
    } else {
      selPath.strokeColor = borCol
    }
    redraw()
  }

  function DropShadow(R , G , B){

    var borCol = new RGBColor();
    borCol.red = R;
    borCol.green = G;
    borCol.blue= B;

// Drop shadow along with fill color
   var doc = app.activeDocument;

    var style = doc.graphicStyles[1];

    var item = doc.selection[0]

    style.applyTo(item);
    item.fillColor = borCol

    redraw()

// Drop shadow with default shadow

  // var idoc = app.activeDocument;

  // var ipath = idoc.selection[0];

  // xmlstring = '<LiveEffect name="Adobe Drop Shadow"><Dict data="R vert 7 R opac 0.75 B pair 1 R dark 0 R horz 14.655 R blur 5 I blnd 1 I csrc 0 "/></LiveEffect>';
  
  // ipath.applyEffect(xmlstring);
  }

  function createSwatches (allColor) {
    alert('its getting')
    alert(allColor)
    alert(allColor.rgb)
    var parsed = JSON.parsed(allColor)

    alert(parsed)
    alert(typeof allColor)
    
    var doc = app.activeDocument
     var borCol = new RGBColor();
    borCol.red = 165;
    borCol.green = 45;
    borCol.blue= 45;
    var s = doc.swatches[2]
    s.name = "samsi"
    s.color = borCol
    alert(s)
    

  }


  // Handle Image Import and fetch

  function fillImage(imageUrl , imageName){
   
   var docRef = app.activeDocument;
      // var downloadUrl = imageUrl ; 
      // alert(downloadUrl)

      // getURL.addRequestHeader("Accept: */*");
      // var s = getURL.get(downloadUrl) + "";
      // alert(s)
      // var responseUrl = s.substr(0,1000)
      // alert(responseUrl)
      // var headers = getURL.getResponseHeaders();
      // alert(headers)
    
      var localPath = "~/Downloads/" + imageName
      
      var imageFile = new File(localPath);
      if(imageFile.exists){
      var placedImage = docRef.placedItems.add(imageFile);
        placedImage.file = imageFile;
        placedImage.position = [50 , 50]
        placedImage.embed();
      } else {
         var f = new File(localPath);
         var s = getURL.get(imageUrl, f.fsName);
        

         var placedImage = docRef.placedItems.add(imageFile);
        placedImage.file = imageFile;
        placedImage.position = [50 , 50]
        placedImage.embed();
      }
  }

  // Upload Assets

  function uploadAssets() {
  
    var doc = app.activeDocument;
    var placedItem = doc.selection[0];

    if(placedItem == undefined){
      return JSON.stringify({imageData : null , imagePath : "no item selected"})
    } else {
      // getting selected file object
      var imageFile = new File(placedItem.file);

      // selected path name
      var selectedPath = imageFile.fsName

      // Converting file to binary data
      imageFile.open("r");
      imageFile.encoding = "Binary";
      var binaryData = imageFile.read();
      imageFile.close();
      return JSON.stringify({imageData : binaryData , imagePath : selectedPath})
    }

  }

  // Upload task

  function uploadFile() {
    var doc = app.activeDocument;
    var placedItem = doc.selection[0];

     if(placedItem == undefined){
      return JSON.stringify({imageData : null , imagePath : "no frame selected"})
    } else {
      // getting selected file object
      var imageFile = new File(placedItem.file);

      // selected path name
      var selectedPath = imageFile.fsName

      // Converting file to binary data
      imageFile.open("r");
      imageFile.encoding = "Binary";
      var binaryData = imageFile.read();
      imageFile.close();
      return JSON.stringify({imageData : binaryData , imagePath : selectedPath})
    }

  }