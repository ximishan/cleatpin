/* Cleatpin v1 boot. Open index.html. No build step. */
(function () {
  "use strict";
  var C = window.Cleatpin;
  var canvas = document.getElementById("board");
  var ctx = canvas.getContext("2d");
  var SAVE_KEY = "cleatpin.save";

  function loadSave() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return C.defaultSave();
      return C.normalizeSave(JSON.parse(raw));
    } catch (err) {
      return C.defaultSave();
    }
  }

  function writeSave(save) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (err) { /* private mode can refuse storage */ }
  }

  var view = {
    screen: "title",
    save: loadSave(),
    match: null,
    portrait: false
  };

  function startMap(id) {
    view.match = C.createMatch(id, view.save);
    view.screen = "play";
  }

  function logical(ev) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (ev.clientX - rect.left) * (canvas.width / rect.width),
      y: (ev.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function onPoint(ev, phase, button) {
    if (view.portrait) return;
    var p = logical(ev);
    if (view.screen !== "play" || !view.match) {
      var hit = C.uiHit(view, p.x, p.y);
      if (view.screen === "settings" && hit && hit.id === "slider" && (phase === "down" || phase === "move")) {
        view.save.settings[hit.key] = hit.value;
        writeSave(view.save);
        return;
      }
      if (phase !== "up") return;
      if (!hit) return;
      if (hit.id === "play") {
        view.screen = view.save.seenIntro ? "select" : "intro";
      } else if (hit.id === "settings") {
        view.screen = "settings";
      } else if (hit.id === "boards") {
        view.save.seenIntro = true;
        writeSave(view.save);
        view.screen = "select";
      } else if (hit.id === "title") {
        view.screen = "title";
      } else if (hit.id === "map") {
        startMap(hit.map);
      } else if (hit.id === "starter") {
        view.save.starter = hit.value;
        writeSave(view.save);
      }
      return;
    }
    C.pointer(view.match, phase, p.x, p.y, button || 0);
    afterInput();
  }

  function afterInput() {
    var m = view.match;
    if (!m) return;
    if (m.needsSave) {
      m.needsSave = false;
      writeSave(view.save);
    }
    if (m.restart) {
      startMap(m.map.id);
      return;
    }
    if (m.leave === "select") {
      view.match = null;
      view.screen = "select";
      return;
    }
    if (m.leave && C.MAPS[m.leave]) startMap(m.leave);
  }

  canvas.addEventListener("mousedown", function (ev) {
    ev.preventDefault();
    onPoint(ev, "down", ev.button);
  });
  canvas.addEventListener("mouseup", function (ev) {
    onPoint(ev, "up", ev.button);
  });
  canvas.addEventListener("mousemove", function (ev) {
    onPoint(ev, "move", 0);
  });
  canvas.addEventListener("contextmenu", function (ev) { ev.preventDefault(); });
  canvas.addEventListener("touchstart", function (ev) {
    ev.preventDefault();
    onPoint(ev.changedTouches[0], "down", 0);
  }, { passive: false });
  canvas.addEventListener("touchend", function (ev) {
    ev.preventDefault();
    onPoint(ev.changedTouches[0], "up", 0);
  }, { passive: false });
  canvas.addEventListener("touchmove", function (ev) {
    ev.preventDefault();
    onPoint(ev.changedTouches[0], "move", 0);
  }, { passive: false });

  window.addEventListener("keydown", function (ev) {
    if (ev.repeat) return;
    if (view.portrait) return;
    if (ev.key === " " || ev.key === "Escape") ev.preventDefault();
    if (view.screen === "title" && (ev.key === "Enter" || ev.key === " ")) {
      view.screen = view.save.seenIntro ? "select" : "intro";
      return;
    }
    if (view.screen === "intro" && (ev.key === "Enter" || ev.key === " ")) {
      view.save.seenIntro = true;
      writeSave(view.save);
      view.screen = "select";
      return;
    }
    if (!view.match) return;
    view.match.keyboard = true;
    C.key(view.match, ev.key === " " ? " " : ev.key);
    afterInput();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden && view.match && !view.match.over && view.match.modal !== "pause") {
      C.key(view.match, "Escape");
    }
  });

  function fit() {
    view.portrait = window.innerHeight > window.innerWidth;
    var scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    canvas.style.width = Math.floor(1280 * scale) + "px";
    canvas.style.height = Math.floor(720 * scale) + "px";
  }
  window.addEventListener("resize", fit);
  fit();

  var last = performance.now();
  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!view.portrait && view.match && !view.match.modal && !view.match.over) C.step(view.match, dt);
    if (view.match && view.match.needsSave) {
      view.match.needsSave = false;
      writeSave(view.save);
    }
    C.draw(ctx, view);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
