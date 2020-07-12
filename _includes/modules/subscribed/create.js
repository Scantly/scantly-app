Create = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {}, FN = {};
  /* <!-- Internal Constants --> */
  
  const SCHEMAS = [
    {
      key: "LOG_SCHEMA_VERSION",
      value : 1,
    }
  ];

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Functions --> */
  FN.helpers = sheetId => ({
    grid: factory.Google_Sheets_Grid({
      sheet: sheetId
    }),
    meta: factory.Google_Sheets_Metadata({
      sheet: sheetId,
      visibility: "PROJECT"
    }, factory),
    format: factory.Google_Sheets_Format({
      sheet: sheetId
    }, factory),
    properties: factory.Google_Sheets_Properties({
      sheet: sheetId
    }),
    notation: factory.Google_Sheets_Notation(),
    sorts: factory.Google_Sheets_Sorts()
  });
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.app = script => factory.Google.scripts.versions(script).create(1, "Deployment Version")
                      .then(script => factory.Google.scripts.deployments(script).create(1))
                      .then(script => script.entryPoints[0].webApp.url);
  
  FN.sheet = name => {
      var _colours = factory.Google_Sheets_Format({}, factory);
      return factory.Google.sheets.create(name, "USERS", _colours.colour("MAGENTA"), [_.pick(_.last(SCHEMAS), "key", "value")])
        .then(sheet => Promise.each([
              
              /* <!-- Format First Tab (USERS) --> */
              Promise.resolve(({
                sheet: sheet,
                helpers: FN.helpers(sheet.sheets[sheet.sheets.length - 1].properties.sheetId),
              }))
              .then(sheet => factory.Flags.log("SHEET 1 | USERS:", sheet)),
              
              /* <!-- Create & Format Second Tab (NAMES) --> */
              factory.Google.sheets.tab(sheet.spreadsheetId, null, "NAMES", _colours.colour("LIME"))
                .then(sheet => ({
                  sheet: sheet,
                  helpers: FN.helpers(sheet.sheets[sheet.sheets.length - 1].properties.sheetId),
                }))
                .then(sheet => factory.Flags.log("SHEET 2 | NAMES:", sheet)),
              
              /* <!-- Create & Format Third Tab (LOG) --> */
              factory.Google.sheets.tab(sheet.spreadsheetId, null, "LOG", _colours.colour("BLACK"))
                .then(sheet => ({
                  sheet: sheet,
                  helpers: FN.helpers(sheet.sheets[sheet.sheets.length - 1].properties.sheetId),
                }))
                .then(sheet => factory.Flags.log("SHEET 3 | LOG:", sheet)),
              
            ]).then(() => sheet.spreadsheetId));
  };
  
  FN.script = (script, key) => factory.Google.scripts.content(script).update([
                {
                  "name": "Server",
                  "type": "SERVER_JS",
                  "source": "function doGet(e){\n  return handleResponse(e);\n}\n\nfunction doPost(e){\n  return handleResponse(e);\n}\n\nfunction handleResponse(e) {\n  \n  // -- Get Parameters from Query String -- //\n  var _user = e.parameter ? e.parameter.u : null,\n      _user_key = e.parameter ? e.parameter.u_k : null,\n      _location = e.parameter ? e.parameter.l : null,\n      _location_key = e.parameter ? e.parameter.l_k : null,\n      _callback = e.parameter ? e.parameter.callback : null;\n      \n  // -- Base64 Decode as required -- //\n  if (_user) _user = Utilities.newBlob(Utilities.base64Decode(_user)).getDataAsString();\n  if (_location) _location = Utilities.newBlob(Utilities.base64Decode(_location)).getDataAsString();\n  \n  // -- Log Action -- //\n  var _result = log(_user, _user_key, _location, _location_key);\n  \n  // -- Return to JSONP callback function, if required -- //\n  if (_callback) return ContentService\n      .createTextOutput(_callback + \"(\" + JSON.stringify(_result) + \")\")   \n      .setMimeType(ContentService.MimeType.JAVASCRIPT); \n\n}",
                  "functionSet": {
                    "values": [
                      {
                        "name": "doGet"
                      },
                      {
                        "name": "doPost"
                      },
                      {
                        "name": "handleResponse"
                      }
                    ]
                  }
                },
                {
                  "name": "appsscript",
                  "type": "JSON",
                  "source": "{\n  \"timeZone\": \"Europe/London\",\n  \"dependencies\": {\n    \"libraries\": [{\n      \"userSymbol\": \"JSRSASIGN\",\n      \"libraryId\": \"1Q69EWHz30dKAVH2aTFL3Yj4oD-2QRvrOwSDs2xUf0NFCvZxSavurfrR-\",\n      \"version\": \"3\"\n    }]\n  },\n  \"webapp\": {\n    \"access\": \"ANYONE_ANONYMOUS\",\n    \"executeAs\": \"USER_DEPLOYING\"\n  },\n  \"exceptionLogging\": \"STACKDRIVER\",\n  \"runtimeVersion\": \"V8\"\n}",
                  "functionSet": {}
                },
                {
                  "name": "API",
                  "type": "SERVER_JS",
                  "source": "function parse(value, key, public_key) {\n\n  if (value && key) {\n  \n    var _verified = _verify(value, key, public_key);\n    \n    if (_verified === true) {\n    \n      var _parsed = /^(.+)\\s+\u003c=\\s+(\\d{4}-\\d{2}-\\d{2}$)/gi.exec(value);\n      \n      if (_parsed && _parsed.length === 3) {\n      \n        var _until = _parsed[2], \n            _return = {\n              raw : value,\n              value : _parsed[1],\n              verified : _verified\n            };\n        \n        if (new Date().toISOString().split(\"T\")[0] \u003c= _until) {\n          \n          _return.valid = true;\n          \n        } else {\n          \n          _return.valid = false;\n          _return.text = Utilities.formatString(\"%s [EXPIRED]\", _return.value);\n            \n        }\n        \n        return _return;\n        \n      } else {\n      \n        return _verified;\n      \n      }\n      \n    } else {\n    \n      return _verified;\n      \n    }\n  \n  }\n  \n}\n\nfunction log(user, user_key, location, location_key) {\n\n  var _user = parse(user, user_key),\n      _location = parse(location, location_key),\n      _presence = null,\n      _verified = false;\n      \n  if (_user === true || (_user && _user.verified === true)) {\n  \n    var _value = _user.value || user,\n        _cache = CacheService.getScriptCache(),\n        _current = _cache.get(_value) ? false : true;\n    \n    _current ? _cache.put(_value, \"1\", 48 * 60 * 60) : _cache.remove(_value); // 48hr Cache Time\n    _presence = _current;\n    \n    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(\"LOG\").appendRow([new Date(),\n      _location ? _location === true ? location : _location.verified === true ? _location.valid === true ? _location.value : _location.text : \"\" : \"\",\n      _presence === true ? \"SIGN-IN\" : _presence === false ? \"SIGN-OUT\" : \"SCAN\",\n      _user === true ? user : _user.valid === true ? _user.value : _user.text]);\n    \n    _verified = true;\n    \n  }\n  \n  return {result : _verified, valid: _user === true || (_user && _user.valid === true), presence: _presence};\n  \n}",
                  "functionSet": {
                    "values": [
                      {
                        "name": "parse"
                      },
                      {
                        "name": "log"
                      }
                    ]
                  }
                },
                {
                  "name": "Crypto",
                  "type": "SERVER_JS",
                  "source": "var PUBLIC_KEY = \"" + _.compact(key.trim().split(/\n|\r|\f/gm)).join("\\\n") + "\"\n\nvar navigator = {}, window = {};\n\nfunction _verify(value, signature, public_key) {\n  var sig_Verify = new JSRSASIGN.KJUR.crypto.Signature({\"alg\": \"SHA256withRSA\"});\n  sig_Verify.init(public_key || PUBLIC_KEY);\n  sig_Verify.updateString(value);\n  return sig_Verify.verify(signature);\n}",
                  "functionSet": {
                    "values": [
                      {
                        "name": "_verify"
                      }
                    ]
                  }
                }
              ]);
  /* <!-- Public Functions --> */
  
  return FN;
  
};