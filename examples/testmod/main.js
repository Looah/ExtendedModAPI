var _G = {};
_G["Path"]=GDT.getRelativePath(); //globally accessible value

var nofunc = function() {}; //replaces (function(){})

var success = function() {
GDT.loadJs([_G.Path+"/code/code.js"], nofunc, nofunc); //if EMAPI loaded successfully, load the mod
};

GDT.loadJs([_G.Path+"/lib/emapi.js"], success, nofunc); //do it
