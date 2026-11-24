/* Headless checks for the v1 sim. Run: node test/v1.js */
var fs = require("fs");
var vm = require("vm");
var sandbox = { console: console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("js/engine.js", "utf8"), sandbox);
var C = sandbox.Cleatpin;

var failed = 0;
function assert(cond, msg) {
  if (!cond) {
    failed++;
    console.error("FAIL:", msg);
  }
}

assert(C.starsFor(10) === 3 && C.starsFor(9) === 3, "3 stars");
assert(C.starsFor(8) === 2 && C.starsFor(5) === 2, "2 stars");
assert(C.starsFor(4) === 1 && C.starsFor(1) === 1, "1 star");
assert(Math.round(C.MAPS["pilot-cove"].paths.inlet.len) === 1080, "pilot length " + C.MAPS["pilot-cove"].paths.inlet.len);

function distPointSeg(px, py, a, b) {
  var dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy || 1;
  var t = ((px - a.x) * dx + (py - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  var x = a.x + dx * t, y = a.y + dy * t;
  return Math.hypot(px - x, py - y);
}
function nearPath(map, x, y) {
  var best = 1e9;
  Object.keys(map.paths).forEach(function (id) {
    var pts = map.paths[id].points;
    for (var i = 1; i < pts.length; i++) best = Math.min(best, distPointSeg(x, y, pts[i - 1], pts[i]));
  });
  return best;
}
C.MAP_ORDER.forEach(function (id) {
  var map = C.MAPS[id];
  map.sockets.forEach(function (s) {
    var d = nearPath(map, s.x, s.y);
    var limit = s.kind === "edge" ? 48 : 120;
    assert(d <= limit, id + " socket " + s.id + " is " + Math.round(d) + "px off the channel");
  });
});

function click(m, x, y) {
  C.pointer(m, "down", x, y, 0);
  C.pointer(m, "up", x, y, 0);
}
function slotCenter(i) { return { x: 16 + i * 80 + 36, y: 632 + 36 }; }

var save = C.defaultSave();
var m = C.createMatch("pilot-cove", save);
var sk = C.dev.spawn(m, "skiff", "inlet", 400);
var pin = m.sockets[1];
pin.head = "pin1";
var guard = 0;
while (sk.alive && guard < 600) { C.step(m, 1 / 60); guard++; }
assert(!sk.alive && m.hull === 10, "pin stops a skiff");
var intact = m.pouch.some(function (p) { return p && p.family === "pin" && p.intact; }) || m.pickups.some(function (p) { return p.family === "pin" && p.intact; });
assert(intact, "clean pin drop is intact");

save = C.defaultSave();
m = C.createMatch("pilot-cove", save);
var leaky = C.dev.spawn(m, "skiff", "inlet", C.MAPS["pilot-cove"].paths.inlet.len - 1);
C.step(m, 1 / 30);
assert(!leaky.alive && m.hull === 9 && m.pickups.length === 0, "a leak drops nothing");

save = C.defaultSave();
m = C.createMatch("split-channel", save);
m.sockets[0].head = "pin3";
m.pouch[0] = { family: "pin", intact: true };
m.selected = 0;
C.pointer(m, "down", m.sockets[0].x, m.sockets[0].y, 0);
C.pointer(m, "up", m.sockets[0].x, m.sockets[0].y, 0);
assert(m.modal === "fork", "grade III opens a fork");
C.pointer(m, "down", 308 + 10, 250 + 10, 0);
C.pointer(m, "up", 308 + 10, 250 + 10, 0);
assert(m.sockets[0].head === "harpoon", "fork confirms Harpoon Pin");

save = C.defaultSave();
m = C.createMatch("pilot-cove", save);
m.sockets[0].head = "pin2";
m.pouch[0] = { family: "pin", intact: true };
m.selected = 0;
click(m, m.sockets[0].x, m.sockets[0].y);
assert(m.sockets[0].head === "pin2", "pilot cove caps at grade II");
assert(m.toasts.some(function (t) { return t.text.indexOf("Grade II") >= 0; }), "grade cap toast");

save = C.defaultSave();
m = C.createMatch("pilot-cove", save);
m.pegs = 4;
click(m, 360 + 10, 632 + 10);
assert(m.modal === "craft", "locker opens craft");
click(m, 450 + 10, 380 + 10);
assert(m.pegs === 0, "craft spends 4 pegs");
var crafted = m.pouch.filter(function (p) { return p && p.family === "pin" && !p.intact; }).length;
assert(crafted >= 1, "craft makes a Pin, not another family");

function closestAlong(path, x, y) {
  var best = { d: 1e9, along: 0 };
  for (var i = 1; i < path.points.length; i++) {
    var a = path.points[i - 1];
    var b = path.points[i];
    var dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy || 1;
    var t = ((x - a.x) * dx + (y - a.y) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    var px = a.x + dx * t, py = a.y + dy * t;
    var d = Math.hypot(x - px, y - py);
    if (d < best.d) best = { d: d, along: path.cum[i - 1] + Math.sqrt(l2) * t };
  }
  return best;
}

save = C.defaultSave();
m = C.createMatch("twin-mouths", save);
var cutSocket = null;
var cutPath = null;
var cutAlong = null;
m.sockets.forEach(function (s) {
  Object.keys(m.map.paths).forEach(function (pid) {
    var hit = closestAlong(m.map.paths[pid], s.x, s.y);
    if (hit.d <= 36 && !cutSocket) {
      cutSocket = s;
      cutPath = pid;
      cutAlong = hit.along;
    }
  });
});
assert(cutSocket, "a twin-mouths socket sits inside cutter shear range");
cutSocket.head = "pin1";
cutSocket.gen = 1;
var cutter = C.dev.spawn(m, "cutter", cutPath, cutAlong);
var before = cutter.timber;
C.step(m, 1 / 120);
assert(cutSocket.head == null, "cutter shears a grade I fitting");
assert(cutter.timber < before || !cutter.alive, "shear costs the cutter timber");

function playPilot() {
  var save = C.defaultSave();
  var m = C.createMatch("pilot-cove", save);
  var placed = false;
  var reedSent = false;
  var hawserUsed = false;
  var t = 0;
  var dt = 1 / 30;
  while (!m.over && t < 360) {
    if (!placed) {
      var b = m.sockets.filter(function (s) { return s.id === "B"; })[0];
      var c = m.sockets.filter(function (s) { return s.id === "C"; })[0];
      var d = m.sockets.filter(function (s) { return s.id === "D"; })[0];
      [[0, b], [1, c], [2, d]].forEach(function (pair) {
        var sc = slotCenter(pair[0]);
        click(m, sc.x, sc.y);
        click(m, pair[1].x, pair[1].y);
      });
      placed = m.sockets.filter(function (s) { return s.head; }).length >= 3;
    }
    if (!reedSent && m.reed.state === "up") {
      click(m, 480, 300);
      reedSent = true;
    }
    if (!hawserUsed && m.hawserOn && m.hawserCd <= 0) {
      var dinghies = m.enemies.filter(function (e) { return e.alive && e.kind === "dinghy"; });
      if (dinghies.length >= 2) {
        click(m, 1184 + 10, 624 + 10);
        var x = 0, y = 0;
        dinghies.forEach(function (e) { x += e.x; y += e.y; });
        click(m, x / dinghies.length, y / dinghies.length);
        hawserUsed = m.hawserCd > 0;
      }
    }
    C.step(m, dt);
    t += dt;
  }
  return { over: m.over, hull: m.hull, t: t, wave: m.waveIndex, hawserUsed: hawserUsed };
}

var run = playPilot();
console.log("pilot run", JSON.stringify(run));
assert(run.over === "win", "starter pouch wins Pilot Cove");
assert(run.hull >= 1, "hull remains");
assert(run.t < 240, "win is under 4 minutes (" + run.t.toFixed(1) + "s)");
assert(run.t > 70, "win is not instant (" + run.t.toFixed(1) + "s)");

function autoMap(id) {
  var save = C.defaultSave();
  save.tips = { place: true, pickup: true, bosun: true, hawser: true, callTide: true, fork: true };
  var m = C.createMatch(id, save);
  var t = 0;
  var dt = 1 / 30;
  function emptySockets() {
    return m.sockets.filter(function (s) { return !s.head; });
  }
  while (!m.over && t < 500) {
    for (var i = 0; i < 4; i++) {
      var part = m.pouch[i];
      if (!part) continue;
      var target = null;
      if (!part.intact) {
        emptySockets().forEach(function (s) {
          if (target) return;
          if (part.family === "bollard" && s.kind !== "edge") return;
          target = s;
        });
      } else {
        m.sockets.forEach(function (s) {
          if (target || !s.head) return;
          var h = C.HEADS[s.head];
          if (h.family === part.family && !h.spec && !(h.grade === 2 && m.map.gradeCap) && (h.grade < 3 || h.grade === 3)) target = s;
        });
        if (!target) {
          emptySockets().forEach(function (s) {
            if (target) return;
            if (part.family === "bollard" && s.kind !== "edge") return;
            target = s;
          });
        }
      }
      if (!target) continue;
      if (m.modal === "fork") {
        click(m, 308 + 20, 250 + 20);
      }
      var sc = slotCenter(i);
      click(m, sc.x, sc.y);
      click(m, target.x, target.y);
      if (m.modal === "fork") click(m, 308 + 20, 250 + 20);
    }
    if (m.hawserOn && m.hawserCd <= 0) {
      var pack = m.enemies.filter(function (e) { return e.alive && e.ground; });
      if (pack.length >= 3) {
        click(m, 1184 + 8, 624 + 8);
        click(m, pack[0].x, pack[0].y);
      }
    }
    if (m.reed.state === "up" && m.enemies.length) {
      var lead = m.enemies[0];
      click(m, lead.x, lead.y);
    }
    C.step(m, dt);
    t += dt;
  }
  return { id: id, over: m.over, hull: m.hull, t: Math.round(t), wave: m.waveIndex, leaks: m.hull };
}

console.log("split", JSON.stringify(autoMap("split-channel")));
console.log("twin", JSON.stringify(autoMap("twin-mouths")));

if (failed) {
  console.error(failed + " failed");
  process.exit(1);
}
console.log("ok");
