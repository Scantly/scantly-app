Reader = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
      id: "reader",
      success: "#00FF00",
      failure: "#FF0000",
      worker: window.Worker ? true : false,
      holdoff: 5000,
      highlight: 3000,
    },
    FN = {},
    SYNC = {
      throttle: 150,
    },
    WORKER = {
      throttle: 50,
      worker : window.Worker ? new Worker("/workers/qr-decode.js") : {},
      ready : true,
    };
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */

  /* <!-- Internal Variables --> */
  var s = factory.Strings(),
      ರ‿ರ = {};
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  var _render = () => Promise.resolve(ರ‿ರ.display = factory.Display.template.show({
          template: "reader",
          id: options.id,
          location: ರ‿ರ.location,
          target: factory.container,
          clear: true,
        }));
  
  var _location = location => {
    if (location && location.length === 2) {
      ರ‿ರ.location = {
        raw: s.base64.decode(location[0]),
        key: location[1]
      };
      ರ‿ರ.location.parsed = /^(.+)\s+<=\s+(\d{4}-\d{2}-\d{2}$)/gi.exec(ರ‿ರ.location.raw);
      ರ‿ರ.location.valid = new Date().toISOString().split("T")[0] <= ರ‿ರ.location.parsed[2] ? true : false;
      ರ‿ರ.location.value = ರ‿ರ.location.parsed[1];
      factory.Flags.log("READER LOCATION SET:", ರ‿ರ.location);
    } else {
      delete ರ‿ರ.location;
    }

    if (ರ‿ರ.display) factory.Display.template.show({
          template: "location",
          id: options.id,
          location: ರ‿ರ.location,
          target: ರ‿ರ.display.find(`#${options.id}_location`),
          replace: true,
        });
    
    return ರ‿ರ.location;
  };
  
  var _drawLine = (begin, end, colour) => {
      ರ‿ರ.canvas.beginPath();
      ರ‿ರ.canvas.moveTo(begin.x, begin.y);
      ರ‿ರ.canvas.lineTo(end.x, end.y);
      ರ‿ರ.canvas.lineWidth = 4;
      ರ‿ರ.canvas.strokeStyle = colour;
      ರ‿ರ.canvas.stroke();
    };
  
  var _drawBox = (location, colour) => {
    _drawLine(location.topLeftCorner, location.topRightCorner, colour);
    _drawLine(location.topRightCorner, location.bottomRightCorner, colour);
    _drawLine(location.bottomRightCorner, location.bottomLeftCorner, colour);
    _drawLine(location.bottomLeftCorner, location.topLeftCorner, colour);
  };
  
  var _decay = (element, value) => element.addClass(value).delay(options.highlight)
    .queue(function(next) {
      $(this).removeClass(value);
      next();
    });
  
  var _highlightReader = value => _decay($(ರ‿ರ.element.parentElement), value);
  
  var _showPresence = value => _decay(ರ‿ರ.display.find(`.presence-${value}`), "show");
  
  var _code = (code, restart, prefix) => {
    _drawBox(code.location, code.data ? options.success : options.failure);
    if (code.data) {
      if (!ರ‿ರ.last || ರ‿ರ.last.code.data != code.data || Date.now() - ರ‿ರ.last.when > options.holdoff) {
        ರ‿ರ.last = {
          when : Date.now(),
          code : code,
        };
        if (factory.Flags.debug()) {
          ರ‿ರ.output.removeClass("d-none").text(`${prefix} | ${code.data}`);
          factory.Flags.log("QR Code", code);
        }
        var _data = code.data.split("|");
        if (_data.length > 1) {
          if (_data[0] == "USR" && _data.length === 4) {
            options.functions.client.log(_data[1], _data[2], _data[3], 
                                         ರ‿ರ.location ? ರ‿ರ.location.raw : null, ರ‿ರ.location ? ರ‿ರ.location.key : null)
              .then(result => {
                if (result && result.result !== null && result.result !== undefined) {
                  _highlightReader(result.result === true ? "bg-success" : "bg-danger");
                  if (result.presence !== null && result.presence !== undefined) _showPresence(result.presence);
                }
              });
          } else if (_data[0] == "LOC" && _data.length === 3) {
            var _result = _location(_data.splice(1, 2));
            _highlightReader(_result && _result.valid === true ? "bg-success" : "bg-danger");
          }
        }
      }
      
      _.delay(() => {
          if (factory.Flags.debug()) ರ‿ರ.output.addClass("d-none");
          restart();
        }, options.highlight);
      
      return true;
    }
  };
  
  var _refresh = () => {
    if (ರ‿ರ.video.readyState === ರ‿ರ.video.HAVE_ENOUGH_DATA) {
      ರ‿ರ.element.height = ರ‿ರ.video.videoHeight;
      ರ‿ರ.element.width = ರ‿ರ.video.videoWidth;
      ರ‿ರ.canvas.drawImage(ರ‿ರ.video, 0, 0, ರ‿ರ.element.width, ರ‿ರ.element.height);
      return ರ‿ರ.canvas.getImageData(0, 0, ರ‿ರ.element.width, ರ‿ರ.element.height);
    }
  };
  
  var _finaliser = (node, stream) => new MutationObserver((list, observer) => _.find(list, 
     value => value.type === "childList" && value.removedNodes.length > 0 && _.find(value.removedNodes, removed => removed.id === options.id) ?
      (observer.disconnect(), stream.getTracks().forEach(track => track.stop()), true) : false))
      .observe(node, {childList : true});  
  /* <!-- Internal Functions --> */
  
  /* <!-- Sync Functions --> */
  SYNC.run = _.throttle(fn => _.defer(() => requestAnimationFrame(fn)), SYNC.throttle);

  SYNC.scan = () => {
    var _handled, _image = _refresh();
    if (_image) {
      var code = jsQR(_image.data, _image.width, _image.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) _handled = _code(code, () => SYNC.run(SYNC.scan), "S");
    }
    if (!_handled) SYNC.run(SYNC.scan);
  };
  /* <!-- Sync Functions --> */
  
  /* <!-- Worker Functions --> */
  WORKER.run = _.throttle(fn => _.defer(() => requestAnimationFrame(fn)), WORKER.throttle);
  
  WORKER.scan = () => {
    var _image = _refresh();
    if (_image && WORKER.ready) {
      WORKER.ready = false;
      WORKER.worker.postMessage(_image, [_image.data.buffer]);
    } else {
      WORKER.run(WORKER.scan);
    }
  };
  
  WORKER.worker.onmessage = message => {
    var _handled;
    WORKER.ready = true;
    if (message && message.data) _handled = _code(message.data, () => WORKER.run(WORKER.scan), "W");
    if (!_handled) WORKER.run(WORKER.scan);
  };
  /* <!-- Worker Functions --> */
  
  /* <!-- Public Functions --> */
  FN.scan = id => _render().then(reader => {
      ರ‿ರ.element = reader.find("canvas")[0];
      ರ‿ರ.canvas = ರ‿ರ.element.getContext("2d");
      ರ‿ರ.video = document.createElement("video");
      ರ‿ರ.output = reader.find(".output");
      return reader;
    }).then(reader => navigator.mediaDevices.getUserMedia({
      video: id ? {
        deviceId: id
      } : {
        facingMode: "user"
      }
    }).then(stream => {
      _finaliser(reader[0].parentNode, stream);
      ರ‿ರ.current = stream.getVideoTracks()[0].getSettings().deviceId;
      ರ‿ರ.video.srcObject = stream;
      ರ‿ರ.video.setAttribute("playsinline", true);
      ರ‿ರ.video.play();
      options.worker ? WORKER.run(WORKER.scan) : SYNC.run(SYNC.scan);
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) navigator.mediaDevices.enumerateDevices()
        .then(devices => _.filter(devices, device => device.kind == "videoinput"))
        .then(cameras => {
          ರ‿ರ.cameras = cameras;
          if (cameras.length > 1) factory.Display.template.show({
              template: "actions",
              id: `${options.id}_actions`,
              action: "swap.camera",
              icon: "flip_camera_ios",
              target: factory.container,
            });
        })
        .catch(e => factory.Flags.error("Camera Enumeration:", e));
    }));
  
  FN.swap = command => {
    if (command == "camera") {
      var _index = _.findIndex(ರ‿ರ.cameras, camera => camera.deviceId == ರ‿ರ.current);
      _index = _index >= ರ‿ರ.cameras.length - 1 ? 0 : _index + 1;
      FN.scan(ರ‿ರ.cameras[_index].deviceId);
    }
  };
  
  FN.read = location => {
    _location(location);
    return FN.scan();
  };
  /* <!-- Public Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return FN;
  /* <!-- External Visibility --> */

};