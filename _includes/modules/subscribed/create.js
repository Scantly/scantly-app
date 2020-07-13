Create = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    property : {
      name: "SCANTLY",
      value: "ENDPOINT"
    }
  }, FN = {};
  /* <!-- Internal Constants --> */

  const SCHEMAS = [{
    key: "ENDPOINT_SCHEMA_VERSION",
    value: 1,
  }];

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

  /* <!-- Sheet Functions --> */
  FN.sheet = {

    create: (name, tab, colour) => factory.Google.sheets.create(name, tab, colour, [_.pick(_.last(SCHEMAS), "key", "value")])
      .then(sheet => ({
        sheet: sheet,
        helpers: FN.helpers(sheet.sheets[0].properties.sheetId),
      })),

    add: (id, tab, sheet, colour) => factory.Google.sheets.tab(id, sheet, tab, colour).then(sheet => ({
      sheet: sheet,
      helpers: FN.helpers(sheet.sheetId),
    })),

    update: (value, grid, values, input) => factory.Google.sheets.update(value.sheet.spreadsheetId, grid, values, input)
      .then(response => {
        factory.Flags.log(`Updating Values for Sheet: ${value.sheet.spreadsheetId}`, response);
        value.response = response;
        return value;
      }),

    batch: (value, values, reply) => values && values.length > 0 ? factory.Google.sheets.batch(value.sheet.spreadsheetId, values, reply, reply)
      .then(response => {
        factory.Flags.log(`Batch Update for Sheet: ${value.sheet.spreadsheetId}`, response);
        value.response = response;
        return value;
      }) : Promise.resolve(value),

    values: (value, range, all) => factory.Google.sheets.get(value.sheet.spreadsheetId, all, range)
      .then(response => {
        factory.Flags.log(`Values for Sheet: ${value.sheet.spreadsheetId}`, response);
        value.response = response;
        return value;
      })
  };
  /* <!-- Sheet Functions --> */
  /* <!-- Internal Functions --> */

  /* <!-- Public Functions --> */
  FN.app = script => factory.Google.scripts.versions(script).create(1, "Deployment Version")
    .then(script => factory.Google.scripts.deployments(script).create(1))
    .then(script => script.entryPoints[0].webApp.url);

  FN.log = name => {
    var _colours = factory.Google_Sheets_Format({}, factory);
    return FN.sheet.create(name, "USERS", _colours.colour("MAGENTA"))
      .then(value => _.tap(value, value => factory.Google.files.update(
          value.sheet.spreadsheetId, factory.Google.files.tag(options.property.name, options.property.value))))
      .then(value => Promise.each([
        Promise.resolve(value),
        FN.sheet.add(value.sheet.spreadsheetId, "NAMES", null, _colours.colour("LIME")),
        FN.sheet.add(value.sheet.spreadsheetId, "LOG", null, _colours.colour("BLACK")),
      ]))
      .then(values => Promise.all([

        Promise.resolve(values[0].sheet.spreadsheetId),
      
        /* <!-- Format First Tab (USERS) --> */
        FN.sheet.update(values[0], values[0].helpers.notation.grid(0, 3, 0, 10, true, "USERS"), [
          ["=\"ONSITE ⬇ \"&COUNTIF(A3:A, \"<>\")", null, null, null, null, null, null, "ACTIONS ➡", null, null],
          ["SIGN-IN", null, "USER", "NAME", "CURRENTLY", "LAST LOCATION", null, "SCAN", "SIGN-IN", "SIGN-OUT"],
          [
            "=IFNA(QUERY(UNIQUE(D3:E), \"select Col1 where Col1 is not null and Col2='\"&A2&\"'\",0),)", null,
            "=IFNA(QUERY(UNIQUE(LOG!D2:D), \"select Col1 where Col1 is not null order by Col1\", 0),)",
            "=IF(LEN(C3)>0,IFNA(VLOOKUP(C3,NAMES!A:B,2,FALSE),C3),)",
            "=IF(LEN($C3)>0,IFNA(QUERY({TRANSPOSE(H$2:$2),TRANSPOSE(H3:3)}, \"select Col1 order by Col2 desc limit 1\", 0),),)",
            "=IF(LEN($C3)>0,IFNA(QUERY(LOG!$A:$D, \"select B where D='\"&$C3&\"' order by A desc limit 1\", 0),),)", null,
            "=IF(AND(LEN($C3)>0,LEN(H$2)>0),IFNA(TEXT(QUERY(LOG!$A:$D, \"select A where D='\"&$C3&\"' and C='\"&H$2&\"' order by A desc limit 1\", 0), \"yy-MM-dd HH:mm:ss\"),),)",
            "=IF(AND(LEN($C3)>0,LEN(I$2)>0),IFNA(TEXT(QUERY(LOG!$A:$D, \"select A where D='\"&$C3&\"' and C='\"&I$2&\"' order by A desc limit 1\", 0), \"yy-MM-dd HH:mm:ss\"),),)",
            "=IF(AND(LEN($C3)>0,LEN(J$2)>0),IFNA(TEXT(QUERY(LOG!$A:$D, \"select A where D='\"&$C3&\"' and C='\"&J$2&\"' order by A desc limit 1\", 0), \"yy-MM-dd HH:mm:ss\"),),)"
          ]
        ], "USER_ENTERED")
        .then(() => FN.sheet.batch(values[0], [

          /* <!-- Set Second Column to Black --> */
          values[0].helpers.format.cells(values[0].helpers.grid.columns(1, 2).range(), [
            values[0].helpers.format.background("black"),
          ]),

          /* <!-- Set Seventh Column to Black --> */
          values[0].helpers.format.cells(values[0].helpers.grid.columns(6, 7).range(), [
            values[0].helpers.format.background("black"),
          ]),

          /* <!-- Freeze Heading Rows --> */
          values[0].helpers.properties.update([
            values[0].helpers.properties.grid.frozen.rows(2),
          ]),

          /* <!-- Resize the Columns --> */
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(0, 1).dimension(200)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(1, 2).dimension(10)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(6, 7).dimension(10)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(2, 6).dimension(190)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(7, 10).dimension(120)),

          /* <!-- Set Top 2 Rows as Headers --> */
          values[0].helpers.format.cells(values[0].helpers.grid.rows(0, 1).range(), [
            values[0].helpers.format.background("black"),
            values[0].helpers.format.align.horizontal("CENTER"),
            values[0].helpers.format.align.vertical("MIDDLE"),
            values[0].helpers.format.text("white", 12, true)
          ]),

          /* <!-- Set Top 2 Rows as Headers --> */
          values[0].helpers.format.cells(values[0].helpers.grid.rows(1, 2).range(), [
            values[0].helpers.format.background("black"),
            values[0].helpers.format.align.horizontal("CENTER"),
            values[0].helpers.format.align.vertical("MIDDLE"),
            values[0].helpers.format.text("white", 11, true)
          ]),
          
          /* <!-- AutoFill Formulas --> */
          values[0].helpers.format.autofill(values[0].helpers.grid.range(2, 1000, 3, 6)),
          values[0].helpers.format.autofill(values[0].helpers.grid.range(2, 1000, 7, 10)),

          /* <!-- Conditional Formats --> */
          values[0].helpers.format.conditional(values[0].helpers.grid.range(2, 1000, 0, 1))
            .boolean("NOT_BLANK", null, values[0].helpers.format.background("yellow")),
          values[0].helpers.format.conditional(values[0].helpers.grid.range(2, 1000, 4, 5))
            .boolean("TEXT_EQ", values[0].helpers.format.value("SIGN-IN"), values[0].helpers.format.background("yellow"))
          
        ]))
        .then(() => factory.Flags.log("SHEET 1 | USERS:", values[0])),

        /* <!-- Create & Format Second Tab (NAMES) --> */
        FN.sheet.update(values[1], values[1].helpers.notation.grid(0, 1, 0, 2, true, "NAMES"), [
            ["USER ⬇", "NAME ⬇"]
          ], "USER_ENTERED")
          .then(() => FN.sheet.batch(values[1], [

            /* <!-- Set Top Row as Headers --> */
            values[1].helpers.format.cells(values[1].helpers.grid.rows(0, 1).range(), [
              values[1].helpers.format.background("black"),
              values[1].helpers.format.align.horizontal("CENTER"),
              values[1].helpers.format.align.vertical("MIDDLE"),
              values[1].helpers.format.text("white", 11, true)
            ]),

            /* <!-- Freeze Heading Rows --> */
            values[1].helpers.properties.update([
              values[1].helpers.properties.grid.frozen.rows(1),
            ]),
            
            /* <!-- Resize the Columns --> */
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(0, 2).dimension(200)),
            
            /* <!-- Delete Extra Columns --> */
            values[1].helpers.format.delete(values[1].helpers.grid.columns(2, 26).dimension()),

          ])
          .then(() => factory.Flags.log("SHEET 2 | NAMES:", values[1]))),

        /* <!-- Create & Format Third Tab (LOG) --> */
        FN.sheet.update(values[2], values[2].helpers.notation.grid(0, 1, 0, 4, true, "LOG"), [
            ["TIME ⬇", "LOCATION ⬇", "ACTION ⬇", "USER ⬇"]
          ], "USER_ENTERED")
          .then(() => FN.sheet.batch(values[2], [

            /* <!-- Set Top Row as Headers --> */
            values[2].helpers.format.cells(values[2].helpers.grid.rows(0, 1).range(), [
              values[2].helpers.format.background("black"),
              values[2].helpers.format.align.horizontal("CENTER"),
              values[2].helpers.format.align.vertical("MIDDLE"),
              values[2].helpers.format.text("white", 11, true)
            ]),

            /* <!-- Freeze Heading Rows --> */
            values[2].helpers.properties.update([
              values[2].helpers.properties.grid.frozen.rows(1),
            ]),

            /* <!-- Resize the Columns --> */
            values[2].helpers.format.dimension(values[2].helpers.grid.columns(0, 4).dimension(200)),
            
            /* <!-- Delete Extra Columns --> */
            values[2].helpers.format.delete(values[2].helpers.grid.columns(4, 26).dimension()),
            
          ])
          .then(() => factory.Flags.log("SHEET 3 | LOG:", values[2]))),

      ]).then(values => values[0]));
  };

  FN.script = (script, key) => factory.Google.scripts.content(script).update([{
      "name": "Server",
      "type": "SERVER_JS",
      "source": "function doGet(e){\n  return handleResponse(e);\n}\n\nfunction doPost(e){\n  return handleResponse(e);\n}\n\nfunction handleResponse(e) {\n  \n  // -- Get Parameters from Query String -- //\n  var _user = e.parameter ? e.parameter.u : null,\n      _user_key = e.parameter ? e.parameter.u_k : null,\n      _location = e.parameter ? e.parameter.l : null,\n      _location_key = e.parameter ? e.parameter.l_k : null,\n      _callback = e.parameter ? e.parameter.callback : null;\n      \n  // -- Base64 Decode as required -- //\n  if (_user) _user = Utilities.newBlob(Utilities.base64Decode(_user)).getDataAsString();\n  if (_location) _location = Utilities.newBlob(Utilities.base64Decode(_location)).getDataAsString();\n  \n  // -- Log Action -- //\n  var _result = log(_user, _user_key, _location, _location_key);\n  \n  // -- Return to JSONP callback function, if required -- //\n  if (_callback) return ContentService\n      .createTextOutput(_callback + \"(\" + JSON.stringify(_result) + \")\")   \n      .setMimeType(ContentService.MimeType.JAVASCRIPT); \n\n}",
      "functionSet": {
        "values": [{
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
        "values": [{
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
        "values": [{
          "name": "_verify"
        }]
      }
    },
    {
      "name": "Entry",
      "type": "SERVER_JS",
      "source": "function onInstall(e) {\n  onOpen();\n}\n\nfunction onOpen() {\n  var ui = SpreadsheetApp.getUi();\n  ui.createMenu(\"Tasks\")\n      .addItem(\"Authorise\", \"authoriseServer\")\n      .addToUi();\n};\n\nfunction authoriseServer() {\n  ScriptApp.getOAuthToken();\n}",
      "functionSet": {
        "values": [
          {
            "name": "onInstall"
          },
          {
            "name": "onOpen"
          },
          {
            "name": "authoriseServer"
          }
        ]
      }
    }
  ]);
  /* <!-- Public Functions --> */

  return FN;

};