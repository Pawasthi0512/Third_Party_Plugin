var LOAD_DEBUG_JSXGETURL;
var JSXGetURL;
var loadJSXGetURL;
var SERVER_FOLDER_NAME;
if (! SERVER_FOLDER_NAME) {
    SERVER_FOLDER_NAME = "Adobe InDesign CC Server 2022";
}

if (LOAD_DEBUG_JSXGETURL || "undefined" == typeof(JSXGetURL)) {

    JSXGetURL = function() {

        var scriptFolder = File($.fileName).parent;
        Folder.current = scriptFolder;

        var lib = undefined;
        var isDebug = LOAD_DEBUG_JSXGETURL;
        var configSuffix = (isDebug ? "D" : "R");

        var isWin = (File.fs == "Windows");
        var fileNameExtension = (isWin) ? ".dll" : ".framework";
        var x64Suffix = "_x64";
        var libFileName = "JSXGetURL";
        var serverAppRoot;
        if (isWin) {
            serverAppRoot = "C:\\Program Files\\Adobe\\" + SERVER_FOLDER_NAME;
        }
        else {
            serverAppRoot = "/Applications/" + SERVER_FOLDER_NAME;
        }

        var lib64Filename = libFileName + x64Suffix + configSuffix + fileNameExtension;

        var libPath64;
        if (isDebug) {
            if (isWin) {
                libPath64 = Folder.current.parent.parent.fsName + "/project/" + libFileName + "/win/Build/Debug/x64/" + lib64Filename;
            }
            else {
                libPath64 = Folder.current.parent.parent.fsName + "/project/" + libFileName + "/mac/build" + x64Suffix + "/debug/" + lib64Filename;
            }
        }
        else {
            if (isWin) {

                var serverSideJSXGetURL = serverAppRoot + "\\Scripts\\JSXGetURL";

                libPath64 = serverSideJSXGetURL + "/win64/" + lib64Filename;
                if (! File(libPath64).exists) {
                    libPath64 = Folder.current.fsName + "/win64/" + lib64Filename;
                }
                
            }
            else {

                var serverSideJSXGetURL = serverAppRoot + "\\Scripts\\JSXGetURL";

                libPath64 = serverSideJSXGetURL + "/osx10_64/" + lib64Filename;
                if (! File(libPath64).exists) {
                    libPath64 = Folder.current.fsName + "/osx10_64/" + lib64Filename;
                }
            }
        }
             
        function tryLib(libPath) {
            var file = new File(libPath);
            var lib = undefined;
            if (file.exists) {
                try {
                    lib = new ExternalObject("lib:" + file.fsName);  
                }
                catch (err) {      
                }
            }
            return lib;
        }

        // Use previously loaded lib, if any
        lib = JSXGetURL.lib;
        if (! lib) {
            lib = tryLib(libPath64);  
            JSXGetURL.lib = lib;
        }

        // Re-enable JSXGetURL (set disable = false) in case it was disabled at the
        // end of the previous script run to protect from 
        // ESTK crashes
        if (lib) {
            lib.disable(false);
        }

        return lib;
    };

    loadJSXGetURL = JSXGetURL;
    
    JSXGetURL.sampleFtn = function() {
    };

}

JSXGetURL;