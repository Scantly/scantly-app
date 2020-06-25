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
  var _element, _canvas, _video, _output, _last, _cameras, _current, _location;
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  var _render = () => Promise.resolve(factory.Display.template.show({
          template: "reader",
          id: options.id,
          target: factory.container,
          clear: true,
        }));
  
  var _drawLine = (begin, end, colour) => {
      _canvas.beginPath();
      _canvas.moveTo(begin.x, begin.y);
      _canvas.lineTo(end.x, end.y);
      _canvas.lineWidth = 4;
      _canvas.strokeStyle = colour;
      _canvas.stroke();
    };
  
  var _drawBox = (location, colour) => {
    _drawLine(location.topLeftCorner, location.topRightCorner, colour);
    _drawLine(location.topRightCorner, location.bottomRightCorner, colour);
    _drawLine(location.bottomRightCorner, location.bottomLeftCorner, colour);
    _drawLine(location.bottomLeftCorner, location.topLeftCorner, colour);
  };
  
  var _code = (code, restart, prefix) => {
    _drawBox(code.location, code.data ? options.success : options.failure);
    if (code.data) {
      if (!_last || _last.data != code.data) {
        _last = code;
        _output.removeClass("d-none").text(`${prefix} | ${code.data}`);
        factory.Flags.log("QR Code", code);
        var _data = code.data.split("|");
        if (_data.length > 1) {
          if (_data[0] == "USR" && _data.length === 4) {
            options.functions.client.log(_data[1], _data[2], _data[3], _location ? _location.value : null, _location ? _location.key : null)
              .then(result => {
                if (result && result.result !== null && result.result !== undefined) {
                  var _result = result.result === true ? "bg-success" : "bg-danger";
                  $(_element.parentElement).addClass(_result).delay(3000).queue(function(next){
                    $(this).removeClass(_result);
                    next();
                  });
                }
              });
          } else if (_data[0] == "LOC" && _data.length === 3) {
            _location = {
              value: _data[1],
              key: _data[2]
            };
            factory.Flags.log("LOCATION SET:", _location);
          }
        }
      }
      _.delay(() => {
        _output.addClass("d-none");
        restart();
      }, 3000);
      return true;
    }
  };
  
  var _refresh = () => {
    if (_video.readyState === _video.HAVE_ENOUGH_DATA) {
      _element.height = _video.videoHeight;
      _element.width = _video.videoWidth;
      _canvas.drawImage(_video, 0, 0, _element.width, _element.height);
      return _canvas.getImageData(0, 0, _element.width, _element.height);
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
      _element = reader.find("canvas")[0],
      _canvas = _element.getContext("2d");
      _video = document.createElement("video");
      _output = reader.find(".output");
      return reader;
    }).then(reader => navigator.mediaDevices.getUserMedia({
      video: id ? {
        deviceId: id
      } : {
        facingMode: "user"
      }
    }).then(stream => {
      _finaliser(reader[0].parentNode, stream);
      _current = stream.getVideoTracks()[0].getSettings().deviceId;
      _video.srcObject = stream;
      _video.setAttribute("playsinline", true);
      _video.play();
      options.worker ? WORKER.run(WORKER.scan) : SYNC.run(SYNC.scan);
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) navigator.mediaDevices.enumerateDevices()
        .then(devices => _.filter(devices, device => device.kind == "videoinput"))
        .then(cameras => {
          _cameras = cameras;
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
      var _index = _.findIndex(_cameras, camera => camera.deviceId == _current);
      _index = _index >= _cameras.length - 1 ? 0 : _index + 1;
      FN.scan(_cameras[_index].deviceId);
    }
  };
  
  FN.read = location => {
    if (location) _location = {
      value: location[0],
      key: location[1]
    };
    return FN.scan();
  };
  /* <!-- Public Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return FN;
  /* <!-- External Visibility --> */

};