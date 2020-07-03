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
      mode: -1, /* <!-- -1 = User Facing, 1 = Rear Camera --> */
    },
    FN = {},
    SYNC = {
      throttle: 150,
      sample: 3,
      current: 0,
    },
    WORKER = {
      throttle: 100,
      sample: 4,
      current: 0,
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
  var _setupAudio = () => {
    if (window.ion) ion.sound({
      sounds: [
          {
              name: "location_set"
          },
          {
              name: "presence_true"
          },
          {
              name: "presence_false"
          }
      ],
      volume: 0.4,
      path: "/sounds/",
      preload: true
    });
    return true;
  };
  
  var _render = () => Promise.resolve(ರ‿ರ.display = factory.Display.template.show({
          template: "reader",
          id: options.id,
          location: ರ‿ರ.location,
          target: factory.container,
          clear: true,
        }));
  
  var _location = (location, notify) => {
    if (location && location.length === 2) {
      ರ‿ರ.location = {
        raw: s.base64.decode(location[0]),
        key: location[1]
      };
      ರ‿ರ.location.parsed = /^(.+)\s+<=\s+(\d{4}-\d{2}-\d{2}$)/gi.exec(ರ‿ರ.location.raw);
      ರ‿ರ.location.valid = new Date().toISOString().split("T")[0] <= ರ‿ರ.location.parsed[2] ? true : false;
      ರ‿ರ.location.value = ರ‿ರ.location.parsed[1];
      factory.Flags.log("READER LOCATION SET:", ರ‿ರ.location);
      if (notify && window.ion && ರ‿ರ.sound !== false) _.defer(() => ion.sound.play("location_set"));
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
  
  var _showPresence = value => {
    _decay(ರ‿ರ.display.find(`.presence-${value}`), "show");
    if (window.ion && ರ‿ರ.sound !== false) 
      value === true ? 
        _.defer(() => ion.sound.play("presence_true")) : value === false ? 
        _.defer(() => ion.sound.play("presence_false")) : null;
  };
  
  var _sounds = () => {
    var _action = factory.Display.template.show({
              template: "actions",
              id: `${options.id}_sound`,
              left: true,
              colour: "success",
              icon: "volume_up",
              target: factory.container,
            });
    _action.find(".btn").on("click.sound", e => {
      e.preventDefault();
      ರ‿ರ.sound = ರ‿ರ.sound === undefined ? false : !ರ‿ರ.sound;
      var _btn = $(e.currentTarget || e.target), _icon = _btn.children("i");
      if (ರ‿ರ.sound) {
        _btn.removeClass("btn-danger").addClass("btn-success");
        _icon.text("volume_up");
      } else {
        _btn.removeClass("btn-success").addClass("btn-danger");
        _icon.text("volume_off");
      }
    });
  };
  
  var _code = (code, restart, prefix) => {
    if (code.data) {
      _drawBox(code.location, code.data ? options.success : options.failure);
      ರ‿ರ.video.classList.add("d-none");
      ರ‿ರ.element.classList.remove("d-none");
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
            var _result = _location(_data.splice(1, 2), true);
            _highlightReader(_result && _result.valid === true ? "bg-success" : "bg-danger");
          } else if (_data[0] == "DEMO" && _data.length === 3) {
            var _user = s.base64.decode(_data[1]);
            if (_user) {
              _highlightReader("bg-success");
              ರ‿ರ.demos = ರ‿ರ.demos ? ರ‿ರ.demos : {};
              ರ‿ರ.demos[_user] = (ರ‿ರ.demos[_user] === undefined ? true : !ರ‿ರ.demos[_user]);
              _showPresence(ರ‿ರ.demos[_user]);
            }
          }
        }
      }
      
      _.delay(() => {
          if (factory.Flags.debug()) ರ‿ರ.output.addClass("d-none");
          ರ‿ರ.element.classList.add("d-none");
          ರ‿ರ.video.classList.remove("d-none");
          restart();
        }, options.highlight);
      
      return true;
    }
  };
  
  var _refresh = sample => {
    if (ರ‿ರ.video.readyState === ರ‿ರ.video.HAVE_ENOUGH_DATA) {
      ರ‿ರ.element.height = ರ‿ರ.video.videoHeight;
      ರ‿ರ.element.width = ರ‿ರ.video.videoWidth;
      ರ‿ರ.canvas.drawImage(ರ‿ರ.video, 0, 0, ರ‿ರ.element.width, ರ‿ರ.element.height);
      return sample ? ರ‿ರ.canvas.getImageData(0, 0, ರ‿ರ.element.width, ರ‿ರ.element.height) : false;
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
    var _handled, _image = _refresh(++SYNC.current === SYNC.sample ? (SYNC.current = 0, true) : null);
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
    var _image = _refresh(++WORKER.current === WORKER.sample ? (WORKER.current = 0, true) : null);
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
      ರ‿ರ.canvas = ರ‿ರ.element.getContext("2d", { alpha: false });
      ರ‿ರ.canvas.imageSmoothingEnabled = false;
      ರ‿ರ.video = reader.find("video")[0];
      ರ‿ರ.output = reader.find(".output");
      ರ‿ರ.audio = ರ‿ರ.audio || _setupAudio();
      return reader;
    }).then(reader => navigator.mediaDevices.getUserMedia({
      video: id ? {
        deviceId: {
          exact : id
        }
      } : {
        facingMode: "user"
      }
    }).then(stream => {
      _finaliser(reader[0].parentNode, stream);
      ರ‿ರ.current = stream.getVideoTracks()[0].getSettings().deviceId;
      ರ‿ರ.video.srcObject = stream;
      ರ‿ರ.video.setAttribute("playsinline", true);
      ರ‿ರ.video.setAttribute("muted", true);
      ರ‿ರ.video.style.transform = `scaleX(${options.mode})`;
      ರ‿ರ.element.style.transform = `scaleX(${options.mode})`;
      ರ‿ರ.video.play();
      options.worker ? WORKER.run(WORKER.scan) : SYNC.run(SYNC.scan);
      if (window.ion) _sounds();
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) navigator.mediaDevices.enumerateDevices()
        .then(devices => _.filter(devices, device => device.kind == "videoinput"))
        .then(cameras => {
          ರ‿ರ.cameras = cameras;
          if (cameras.length > 1) factory.Display.template.show({
              template: "actions",
              id: `${options.id}_actions`,
              right: true,
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
  
  /* <!-- External Visibility --> */
  return FN;
  /* <!-- External Visibility --> */

};