/* Cleatpin v1 simulation. No v2/v3 content. Numbers follow RULES.md. */
(function (root) {
  "use strict";

  var C = root.Cleatpin = root.Cleatpin || {};

  C.PAL = {
    ink: "#1C2430",
    seaDeep: "#1B4B6B",
    seaMid: "#3E8EAB",
    paper: "#F3E6C8",
    teal: "#1F6F6A",
    plank: "#E6C48A",
    wood: "#8C5A32",
    tar: "#3B2A1A",
    rope: "#C4A574",
    iron: "#5E666D",
    brass: "#D7A441",
    signal: "#D6453D",
    seaweed: "#3E7C4A",
    ochre: "#C47B3A",
    skin: "#E0A878",
    skinMara: "#C68642",
    white: "#F7FBFC",
    kite: "#F0D36A",
    bronze: "#A56B2A",
    flask: "#6B3E1E"
  };

  var COPY = {
    place: "Pin a fitting into a socket before the tide.",
    pickup: "It broke. Pick up the part and pin it.",
    bosun: "Bosun Reed is on the boards. Tap the path to send them.",
    hawser: "Heave Hawser is ready.",
    callTide: "Call Tide early for pegs. The waves will overlap.",
    fork: "Choose a head. This socket keeps it.",
    wrongFitting: "Wrong fitting.",
    gradeCap: "This cove seats Grade II at most.",
    finishedHead: "This head is finished.",
    edgeOnly: "Bollards seat on the rope-stripe edge.",
    bollardCap: "Two bollards on this dock.",
    pegsFull: "Pegs full.",
    pocketPath: "Socket or locker.",
    chooseBerth: "Choose a berth.",
    repairHint: "Feed any Bollard part to repair. It keeps this head.",
    cleatEmpty: "No floating cleat left.",
    berth: "A berth. Plant your floating cleat here.",
    seated: "Seated.",
    intact: "Intact.",
    messy: "It'll still pin.",
    downed: "I'll take the ladder.",
    intro: "The dock\u2019s old rule was simple: wreckage brought ashore must be pinned into the cleats, so the wrecks can come to rest. Someone hauled up a tug that should have stayed down and broke it wrong; the bargain broke, and the tide keeps sending those ships back. You are Bosun Reed, and you pin what you stop.",
    logline: "Pin what you stop. The wall is built from what you just halted."
  };
  C.COPY = COPY;

  function head(id, family, grade, spec, o) {
    o.id = id;
    o.family = family;
    o.grade = grade;
    o.spec = spec;
    o.kind = o.kind || family;
    return o;
  }

  var HEADS = {};
  function add(h) { HEADS[h.id] = h; }
  add(head("pin1", "pin", 1, null, { damage: 8, range: 150, interval: 0.55, proj: 640 }));
  add(head("pin2", "pin", 2, null, { damage: 11, range: 165, interval: 0.5, proj: 640 }));
  add(head("pin3", "pin", 3, null, { damage: 14, range: 175, interval: 0.48, proj: 640 }));
  add(head("harpoon", "pin", 4, "harpoon", { damage: 22, range: 250, interval: 0.85, proj: 480, fat: true, name: "Harpoon Pin", blurb: "A long spike. Slower, and it bites fat barges." }));
  add(head("needle", "pin", 4, "needle", { damage: 6, range: 140, interval: 0.28, proj: 720, needle: true, name: "Needle Pin", blurb: "A fan of thin spikes. Very fast, and kinder to an intact drop." }));
  add(head("spray1", "spray", 1, null, { damage: 5, range: 110, interval: 1.1, proj: 520, splash: 36 }));
  add(head("spray2", "spray", 2, null, { damage: 7, range: 120, interval: 1.05, proj: 520, splash: 42 }));
  add(head("spray3", "spray", 3, null, { damage: 9, range: 125, interval: 1.0, proj: 520, splash: 46 }));
  add(head("salt", "spray", 4, "salt", { damage: 6, range: 120, interval: 1.15, proj: 520, splash: 70, name: "Salt Burst", blurb: "A wide fan of salt. Weaker, and it covers a pack." }));
  add(head("pitch", "spray", 4, "pitch", { damage: 8, range: 115, interval: 1.2, proj: 520, splash: 32, slick: true, name: "Pitch Flask", blurb: "A narrow splash that leaves a tar slick on the water." }));
  add(head("net1", "net", 1, null, { damage: 0, range: 130, interval: 1.4, proj: 420, slow: 0.6, slowDur: 2, shots: 1 }));
  add(head("net2", "net", 2, null, { damage: 0, range: 130, interval: 1.3, proj: 420, slow: 0.5, slowDur: 2.4, shots: 1 }));
  add(head("net3", "net", 3, null, { damage: 0, range: 140, interval: 1.2, proj: 420, slow: 0.45, slowDur: 2.8, shots: 2 }));
  add(head("drift", "net", 4, "drift", { damage: 0, range: 80, interval: 1.6, slow: 0.65, slowDur: 2, aura: true, name: "Drift Net", blurb: "A wide net. It slows a patch of channel." }));
  add(head("hook", "net", 4, "hook", { damage: 0, range: 140, interval: 2.2, proj: 420, yank: 90, slow: 0.7, slowDur: 1, shots: 1, name: "Hook Net", blurb: "A short net with one hook. It yanks one boat back." }));
  add(head("bell1", "bell", 1, null, { range: 100, bell: 1.15, kind: "bell" }));
  add(head("bell2", "bell", 2, null, { range: 110, bell: 1.25, kind: "bell" }));
  add(head("bell3", "bell", 3, null, { range: 120, bell: 1.35, kind: "bell" }));
  add(head("harbor", "bell", 4, "harbor", { range: 120, bell: 1.55, kind: "bell", name: "Harbor Bell", blurb: "A thick bronze bell. The neighbors hit much harder." }));
  add(head("fog", "bell", 4, "fog", { range: 140, bell: 1.15, kind: "bell", fog: true, name: "Fog Bell", blurb: "A green bell and a small lamp. Better against kites, and the neighbors reach a little farther." }));
  add(head("boll1", "bollard", 1, null, { kind: "bollard", holdCap: 2, holdTime: 4 }));
  add(head("boll2", "bollard", 2, null, { kind: "bollard", holdCap: 2, holdTime: 6 }));
  add(head("boll3", "bollard", 3, null, { kind: "bollard", holdCap: 3, holdTime: 6 }));
  add(head("chain", "bollard", 4, "chain", { kind: "bollard", holdCap: 4, holdTime: 8, name: "Chain Bollard", blurb: "More chain, a longer hold, room for one more boat." }));
  add(head("spring", "bollard", 4, "spring", { kind: "bollard", holdCap: 2, holdTime: 5, spring: 80, name: "Spring Bollard", blurb: "When the post gives, it shoves the pack a short step back." }));

  var NEXT = {
    pin1: "pin2", pin2: "pin3",
    spray1: "spray2", spray2: "spray3",
    net1: "net2", net2: "net3",
    bell1: "bell2", bell2: "bell3",
    boll1: "boll2", boll2: "boll3"
  };
  var FORKS = {
    pin: ["harpoon", "needle"],
    spray: ["salt", "pitch"],
    net: ["drift", "hook"],
    bell: ["harbor", "fog"],
    bollard: ["chain", "spring"]
  };
  var GRADE1 = { pin: "pin1", spray: "spray1", net: "net1", bell: "bell1", bollard: "boll1" };
  var FAMILY_BLURB = {
    pin: "A spike for one boat at a time, and the surest way to take a part intact.",
    spray: "A short salty fan for a pack that bunches.",
    net: "Rope that asks the tide to wait.",
    bell: "A ring that makes the neighboring fittings hit harder.",
    bollard: "A post at the edge that holds a few boats, then needs a part to stand again."
  };
  var FAMILY_NAME = { pin: "Pin", spray: "Spray", net: "Net", bell: "Bell", bollard: "Bollard" };

  C.HEADS = HEADS;
  C.FORKS = FORKS;

  function headName(id) {
    var h = HEADS[id];
    if (!h) return "";
    if (h.name) return h.name;
    return FAMILY_NAME[h.family];
  }
  function headBlurb(id) {
    var h = HEADS[id];
    if (!h) return "";
    return h.blurb || FAMILY_BLURB[h.family];
  }
  C.headName = headName;
  C.headBlurb = headBlurb;

  var ENEMIES = {
    skiff: { timber: 24, speed: 60, leak: 1, splash: 1, drop: "pin", ground: true, one: "skiff", many: "skiffs", suggest: "A Pin there would have held." },
    dinghy: { timber: 18, speed: 110, leak: 1, splash: 1, drop: "net", ground: true, one: "dinghy", many: "dinghies", suggest: "A Net or a Hawser there would have held." },
    bargeWhite: { timber: 90, speed: 40, leak: 2, splash: 0.5, drop: "spray", ground: true, one: "barrel barge", many: "barrel barges", suggest: "A Bollard or a Hawser there would have held.", band: "white" },
    bargeRed: { timber: 90, speed: 40, leak: 2, splash: 0.5, drop: "bollard", ground: true, one: "barrel barge", many: "barrel barges", suggest: "A Bollard or a Hawser there would have held.", band: "red" },
    kite: { timber: 30, speed: 70, leak: 1, splash: 1, drop: "bell", ground: false, one: "kite", many: "kites", suggest: "A Pin under a Bell there would have held." },
    cutter: { timber: 46, speed: 75, leak: 2, splash: 1, drop: "pegs", pegsMessy: 2, pegsClean: 3, ground: true, one: "cutter", many: "cutters", suggest: "A Grade II fitting, seated before it arrives, would have held.", shear: true }
  };
  C.ENEMIES = ENEMIES;

  var RANK = ["cutter", "bargeRed", "bargeWhite", "kite", "dinghy", "skiff"];
  var PATH_NAME = {
    inlet: "the inlet",
    north: "the north fork",
    south: "the south fork",
    west: "the west mouth",
    east: "the east mouth"
  };
  var PATH_TIE = { inlet: 0, south: 0, north: 1, east: 0, west: 1 };

  function hypot(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function poly(points) {
    var cum = [0];
    var len = 0;
    for (var i = 1; i < points.length; i++) {
      len += hypot(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
      cum.push(len);
    }
    return { points: points, cum: cum, len: len };
  }

  function pointAt(path, dist) {
    if (dist <= 0) return { x: path.points[0].x, y: path.points[0].y };
    if (dist >= path.len) {
      var last = path.points[path.points.length - 1];
      return { x: last.x, y: last.y };
    }
    var i = 1;
    while (i < path.cum.length && path.cum[i] < dist) i++;
    var a = path.points[i - 1];
    var b = path.points[i];
    var span = path.cum[i] - path.cum[i - 1] || 1;
    var t = (dist - path.cum[i - 1]) / span;
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }

  function normalAt(path, dist) {
    var ahead = pointAt(path, Math.min(path.len, dist + 8));
    var behind = pointAt(path, Math.max(0, dist - 8));
    var dx = ahead.x - behind.x;
    var dy = ahead.y - behind.y;
    var L = Math.sqrt(dx * dx + dy * dy) || 1;
    return { x: -dy / L, y: dx / L };
  }

  function beside(path, dist, side) {
    var p = pointAt(path, dist);
    var n = normalAt(path, dist);
    return { x: p.x + n.x * side, y: p.y + n.y * side };
  }

  function project(path, x, y, maxDist) {
    var best = null;
    for (var i = 1; i < path.points.length; i++) {
      var a = path.points[i - 1];
      var b = path.points[i];
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var l2 = dx * dx + dy * dy || 1;
      var t = ((x - a.x) * dx + (y - a.y) * dy) / l2;
      if (t < 0) t = 0;
      if (t > 1) t = 1;
      var px = a.x + dx * t;
      var py = a.y + dy * t;
      var d = hypot(x, y, px, py);
      if (!best || d < best.dist) {
        best = { dist: d, x: px, y: py, along: path.cum[i - 1] + Math.sqrt(l2) * t };
      }
    }
    if (maxDist != null && best && best.dist > maxDist) return null;
    return best;
  }

  function distToPath(path, x, y) {
    var hit = project(path, x, y, null);
    return hit ? hit.dist : 1e9;
  }

  function seq(kind, path, count, interval, start) {
    var out = [];
    for (var i = 0; i < count; i++) out.push({ t: start + i * interval, kind: kind, path: path });
    return out;
  }
  function splitAlt(kind, count, interval, paths, start) {
    var out = [];
    for (var i = 0; i < count; i++) {
      out.push({ t: start + i * interval, kind: kind, path: paths[i % paths.length] });
    }
    return out;
  }

  function pilotWaves() {
    var p = "inlet";
    var w6 = seq("skiff", p, 4, 0.4, 0);
    var dinghyStart = 0.4 * 3 + 1.0;
    w6 = w6.concat(seq("dinghy", p, 4, 1.0, dinghyStart));
    var skiff2 = dinghyStart + 1.0 * 3 + 1.2;
    w6 = w6.concat(seq("skiff", p, 2, 1.2, skiff2));
    var w5 = seq("skiff", p, 3, 1.2, 0).concat(seq("dinghy", p, 6, 1.2, 2.4 + 1.2));
    return [
      seq("skiff", p, 5, 1.6, 0),
      seq("skiff", p, 6, 1.5, 0),
      [
        ["skiff", 0], ["skiff", 1], ["dinghy", 2], ["skiff", 3], ["skiff", 4], ["dinghy", 5], ["skiff", 6]
      ].map(function (row) { return { t: row[1] * 1.4, kind: row[0], path: p }; }),
      ["skiff", "dinghy", "skiff", "dinghy", "skiff", "dinghy", "skiff", "dinghy"].map(function (k, i) {
        return { t: i * 1.3, kind: k, path: p };
      }),
      w5,
      w6
    ];
  }

  function splitWaves() {
    var N = "north";
    var S = "south";
    var w4 = seq("skiff", N, 4, 1.2, 0).concat([
      { t: 2.4, kind: "bargeWhite", path: N },
      { t: 6.4, kind: "bargeWhite", path: N }
    ]);
    var w5 = seq("skiff", N, 4, 1.2, 0)
      .concat(seq("dinghy", S, 3, 1.0, 0))
      .concat(seq("bargeRed", S, 2, 4, 2 + 4));
    var w7 = [
      { t: 0, kind: "bargeRed", path: N },
      { t: 5, kind: "bargeRed", path: S },
      { t: 10, kind: "bargeRed", path: N },
      { t: 15, kind: "bargeRed", path: S }
    ].concat(splitAlt("skiff", 4, 1.2, [N, S], 0));
    return [
      seq("skiff", N, 6, 1.5, 0),
      splitAlt("skiff", 8, 1.4, [N, S], 0),
      seq("dinghy", N, 5, 1.3, 0).concat(seq("skiff", S, 3, 1.3, 0)),
      w4,
      w5,
      splitAlt("dinghy", 6, 1.0, [N, S], 0).concat(seq("bargeWhite", N, 2, 5, 0)),
      w7,
      splitAlt("dinghy", 8, 0.9, [N, S], 0)
        .concat(seq("bargeWhite", N, 3, 4, 0))
        .concat(seq("bargeRed", S, 2, 5, 0))
    ];
  }

  function twinWaves() {
    var W = "west";
    var E = "east";
    return [
      seq("skiff", W, 5, 1.4, 0).concat(seq("skiff", E, 5, 1.4, 0)),
      seq("dinghy", W, 4, 1.0, 0).concat(seq("skiff", E, 4, 1.3, 0)),
      seq("bargeWhite", W, 3, 4, 0).concat(seq("dinghy", E, 4, 1.0, 0)),
      seq("kite", W, 4, 1.6, 0).concat(seq("skiff", E, 4, 1.2, 0)),
      seq("cutter", E, 3, 2.5, 0).concat(seq("skiff", W, 4, 1.2, 0)),
      seq("kite", W, 4, 1.4, 0).concat(seq("bargeRed", W, 2, 5, 0)).concat(seq("dinghy", E, 3, 1.0, 0)),
      seq("cutter", E, 4, 2.2, 0).concat(seq("dinghy", W, 4, 1.0, 0)).concat(seq("bargeWhite", W, 2, 5, 0)),
      seq("kite", W, 6, 1.2, 0).concat(seq("cutter", E, 4, 2.0, 0)).concat(seq("dinghy", E, 4, 0.9, 0)).concat(seq("bargeRed", W, 2, 5, 0))
    ];
  }

  function offsetPolyline(points, d) {
    var out = [];
    for (var i = 0; i < points.length; i++) {
      var a = points[Math.max(0, i - 1)];
      var b = points[Math.min(points.length - 1, i + 1)];
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var L = Math.sqrt(dx * dx + dy * dy) || 1;
      out.push({ x: points[i].x + (-dy / L) * d, y: points[i].y + (dx / L) * d });
    }
    return out;
  }

  var PILOT_CH = [
    { x: 140, y: 430 }, { x: 240, y: 430 }, { x: 240, y: 360 }, { x: 480, y: 340 },
    { x: 640, y: 450 }, { x: 880, y: 370 }, { x: 1100, y: 400 }
  ];
  var NORTH_CH = [
    { x: 50, y: 370 }, { x: 160, y: 370 }, { x: 250, y: 280 }, { x: 340, y: 180 },
    { x: 450, y: 140 }, { x: 560, y: 190 }, { x: 650, y: 140 }, { x: 750, y: 200 },
    { x: 840, y: 140 }, { x: 930, y: 230 }, { x: 1020, y: 320 }, { x: 1100, y: 370 }, { x: 1160, y: 400 }
  ];
  var SOUTH_CH = [
    { x: 50, y: 370 }, { x: 150, y: 370 }, { x: 220, y: 480 }, { x: 290, y: 560 },
    { x: 370, y: 590 }, { x: 450, y: 500 }, { x: 510, y: 590 }, { x: 590, y: 500 },
    { x: 650, y: 590 }, { x: 730, y: 510 }, { x: 800, y: 580 }, { x: 880, y: 500 },
    { x: 980, y: 430 }, { x: 1080, y: 400 }, { x: 1160, y: 400 }
  ];
  var WEST_CH = [
    { x: 30, y: 230 }, { x: 150, y: 200 }, { x: 280, y: 260 }, { x: 420, y: 320 },
    { x: 560, y: 370 }, { x: 740, y: 430 }, { x: 920, y: 480 }, { x: 1160, y: 520 }
  ];
  var EAST_CH = [
    { x: 30, y: 580 }, { x: 120, y: 590 }, { x: 220, y: 540 }, { x: 340, y: 500 },
    { x: 470, y: 450 }, { x: 600, y: 410 }, { x: 760, y: 450 }, { x: 940, y: 500 }, { x: 1160, y: 520 }
  ];

  function socketAt(path, dist, side, id, kind) {
    var p = beside(path, dist, side);
    return { id: id, kind: kind, x: p.x, y: p.y };
  }

  function buildMaps() {
    var pilotPath = poly(PILOT_CH);
    var north = poly(NORTH_CH);
    var south = poly(SOUTH_CH);
    var west = poly(WEST_CH);
    var east = poly(EAST_CH);

    function clampWalk(points, home) {
      var out = points.map(function (p) {
        return {
          x: Math.max(70, Math.min(1180, p.x)),
          y: Math.max(120, Math.min(550, p.y))
        };
      });
      out.push(home);
      return out;
    }

    var pilotBoards = clampWalk(offsetPolyline(PILOT_CH, -36), { x: 1080, y: 240 });
    var splitBoards = clampWalk(
      offsetPolyline(NORTH_CH, -34).concat(offsetPolyline(SOUTH_CH, 34).slice(2)),
      { x: 1080, y: 220 }
    );
    var twinBoards = clampWalk(
      offsetPolyline(WEST_CH, 34).concat(offsetPolyline(EAST_CH, -34).slice(2)),
      { x: 1080, y: 240 }
    );

    return {
      "pilot-cove": {
        id: "pilot-cove",
        name: "Pilot Cove",
        countdown: 12,
        gradeCap: true,
        tutorial: true,
        waves: pilotWaves(),
        paths: { inlet: pilotPath },
        boards: poly(pilotBoards),
        home: { x: 1080, y: 240 },
        sockets: [
          { id: "A", kind: "lane", x: 280, y: 400 },
          { id: "B", kind: "lane", x: 480, y: 320 },
          { id: "C", kind: "lane", x: 640, y: 460 },
          { id: "D", kind: "lane", x: 880, y: 360 }
        ],
        berths: [{ id: "b1", x: 600, y: 520 }],
        cleats: 1
      },
      "split-channel": {
        id: "split-channel",
        name: "Split Channel",
        countdown: 15,
        gradeCap: false,
        tutorial: false,
        waves: splitWaves(),
        paths: { north: north, south: south },
        boards: poly(splitBoards),
        home: { x: 1080, y: 220 },
        sockets: [
          { id: "trunk", kind: "lane", x: 178, y: 300 },
          { id: "n1", kind: "lane", x: 498, y: 210 },
          { id: "n2", kind: "lane", x: 735, y: 250 },
          { id: "s1", kind: "lane", x: 484, y: 500 },
          { id: "s2", kind: "lane", x: 776, y: 500 },
          { id: "en", kind: "edge", x: 300, y: 230 },
          { id: "es", kind: "edge", x: 400, y: 530 }
        ],
        berths: [{ id: "b1", x: 1000, y: 400 }],
        cleats: 1
      },
      "twin-mouths": {
        id: "twin-mouths",
        name: "Twin Mouths",
        countdown: 15,
        gradeCap: false,
        tutorial: false,
        waves: twinWaves(),
        paths: { west: west, east: east },
        boards: poly(twinBoards),
        home: { x: 1080, y: 240 },
        sockets: [
          { id: "w1", kind: "lane", x: 300, y: 260 },
          { id: "w2", kind: "lane", x: 585, y: 330 },
          { id: "e1", kind: "lane", x: 251, y: 480 },
          { id: "e2", kind: "lane", x: 640, y: 450 },
          { id: "basin", kind: "lane", x: 860, y: 430 },
          { id: "ew", kind: "edge", x: 380, y: 330 },
          { id: "ee", kind: "edge", x: 380, y: 460 }
        ],
        berths: [
          { id: "bw", x: 450, y: 420 },
          { id: "be", x: 560, y: 500 }
        ],
        cleats: 2
      }
    };
  }

  C.MAPS = buildMaps();
  C.MAP_ORDER = ["pilot-cove", "split-channel", "twin-mouths"];

  function defaultSave() {
    return {
      schema: 1,
      seenIntro: false,
      starter: "pins",
      hero: "reed",
      settings: { music: 0.8, sfx: 1 },
      tips: { place: false, pickup: false, bosun: false, hawser: false, callTide: false, fork: false },
      maps: {
        "pilot-cove": { campaignStars: 0, cleared: false, squall: false, deadcalm: false },
        "split-channel": { campaignStars: 0, cleared: false, squall: false, deadcalm: false },
        "twin-mouths": { campaignStars: 0, cleared: false, squall: false, deadcalm: false }
      },
      endlessBest: 0
    };
  }
  C.defaultSave = defaultSave;

  function normalizeSave(raw) {
    var save = defaultSave();
    if (!raw || typeof raw !== "object") return save;
    if (typeof raw.schema === "number") save.schema = raw.schema;
    if (typeof raw.seenIntro === "boolean") save.seenIntro = raw.seenIntro;
    if (raw.starter === "pins" || raw.starter === "bell") save.starter = raw.starter;
    if (raw.hero === "reed" || raw.hero === "nia") save.hero = raw.hero;
    if (raw.settings && typeof raw.settings === "object") {
      if (typeof raw.settings.music === "number") save.settings.music = clamp(raw.settings.music, 0, 1);
      if (typeof raw.settings.sfx === "number") save.settings.sfx = clamp(raw.settings.sfx, 0, 1);
    }
    if (raw.tips && typeof raw.tips === "object") {
      Object.keys(save.tips).forEach(function (k) {
        if (raw.tips[k] === true) save.tips[k] = true;
      });
    }
    if (raw.maps && typeof raw.maps === "object") {
      Object.keys(save.maps).forEach(function (id) {
        var src = raw.maps[id];
        if (!src || typeof src !== "object") return;
        if (!save.maps[id]) save.maps[id] = { campaignStars: 0, cleared: false, squall: false, deadcalm: false };
        var dst = save.maps[id];
        if (typeof src.campaignStars === "number") dst.campaignStars = src.campaignStars;
        if (src.cleared === true) dst.cleared = true;
        if (src.squall === true) dst.squall = true;
        if (src.deadcalm === true) dst.deadcalm = true;
      });
    }
    if (typeof raw.endlessBest === "number") save.endlessBest = raw.endlessBest;
    return save;
  }
  C.normalizeSave = normalizeSave;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function starsFor(hull) {
    if (hull >= 9) return 3;
    if (hull >= 5) return 2;
    if (hull >= 1) return 1;
    return 0;
  }
  C.starsFor = starsFor;

  function clearedCount(save) {
    var n = 0;
    C.MAP_ORDER.forEach(function (id) {
      if (save.maps[id] && save.maps[id].cleared) n++;
    });
    return n;
  }
  C.clearedCount = clearedCount;

  function starterParts(save) {
    if (save.starter === "bell" && clearedCount(save) >= 3) {
      return [
        { family: "pin", intact: false },
        { family: "spray", intact: false },
        { family: "bell", intact: false }
      ];
    }
    return [
      { family: "pin", intact: false },
      { family: "pin", intact: false },
      { family: "spray", intact: false }
    ];
  }

  function freshSocket(def) {
    return {
      id: def.id,
      kind: def.kind,
      x: def.x,
      y: def.y,
      head: null,
      broken: false,
      gen: 0,
      cd: 0,
      holding: [],
      holdLeft: null
    };
  }

  function createMatch(mapId, save) {
    var map = C.MAPS[mapId];
    if (!map) throw new Error("Unknown map " + mapId);
    var pouch = [null, null, null, null];
    starterParts(save).forEach(function (part, i) { pouch[i] = part; });
    var homeHit = project(map.boards, map.home.x, map.home.y, null);
    var m = {
      map: map,
      save: save,
      time: 0,
      hull: 10,
      pegs: 0,
      pouch: pouch,
      selected: null,
      heldGround: null,
      arm: null,
      sockets: map.sockets.map(freshSocket),
      berths: map.berths.map(function (b) { return { id: b.id, x: b.x, y: b.y, used: false }; }),
      cleatsLeft: map.cleats,
      enemies: [],
      shots: [],
      slicks: [],
      coils: [],
      pickups: [],
      chips: [],
      reed: {
        state: map.tutorial ? "absent" : "up",
        along: homeHit ? homeHit.along : 0,
        target: homeHit ? homeHit.along : 0,
        timber: 80,
        poke: 0.7,
        hold: null,
        downT: 0
      },
      homeAlong: homeHit ? homeHit.along : 0,
      hawserOn: !map.tutorial,
      hawserCd: 0,
      waveIndex: -1,
      queue: [],
      qIndex: 0,
      spawnClock: 0,
      countedDown: false,
      countdown: null,
      countdownTarget: null,
      grace: 2,
      leaks: {},
      seq: 1,
      modal: null,
      pausedFrom: null,
      fork: null,
      over: null,
      result: null,
      toasts: [],
      tip: null,
      bark: null,
      inspect: null,
      needsSave: false,
      mouse: { x: 0, y: 0 },
      ptr: null,
      keyboard: false,
      bellUnlock: false
    };
    if (!save.tips.place) showTip(m, "place");
    placeReedXY(m);
    return m;
  }
  C.createMatch = createMatch;

  function toast(m, text) {
    m.toasts.push({ text: text, t: 2 });
    if (m.toasts.length > 3) m.toasts.shift();
  }
  function showTip(m, id) {
    if (m.save.tips[id]) return;
    m.save.tips[id] = true;
    m.needsSave = true;
    m.tip = { text: COPY[id], t: 3 };
  }
  function bark(m, text) {
    if (m.bark && m.bark.t > 1.2) return;
    m.bark = { text: text, t: 2 };
  }

  function addPegs(m, n) {
    if (n <= 0) return;
    var room = 20 - m.pegs;
    if (n > room) {
      m.pegs = 20;
      toast(m, COPY.pegsFull);
    } else {
      m.pegs += n;
    }
  }

  function freeSlot(m) {
    for (var i = 0; i < 4; i++) if (!m.pouch[i]) return i;
    return -1;
  }

  function selectedPart(m) {
    if (m.heldGround) return m.heldGround;
    if (m.selected == null) return null;
    return m.pouch[m.selected] || null;
  }

  function consumeSelected(m) {
    if (m.heldGround) {
      m.pickups = m.pickups.filter(function (p) { return p.id !== m.heldGround.pickupId; });
      m.heldGround = null;
      return;
    }
    if (m.selected != null) m.pouch[m.selected] = null;
  }

  function nearMagnet(m, x, y) {
    if (m.reed.state !== "absent" && hypot(m.reed.x || 0, m.reed.y || 0, x, y) <= 120) return true;
    for (var i = 0; i < m.sockets.length; i++) {
      if (hypot(m.sockets[i].x, m.sockets[i].y, x, y) <= 80) return true;
    }
    return false;
  }

  function placeReedXY(m) {
    var p = pointAt(m.map.boards, m.reed.along);
    m.reed.x = p.x;
    m.reed.y = p.y;
  }

  function giveKillPart(m, part, x, y) {
    if (nearMagnet(m, x, y)) {
      var slot = freeSlot(m);
      if (slot >= 0) {
        m.pouch[slot] = part;
        return;
      }
    }
    dropGround(m, part, x, y);
  }

  function dropGround(m, part, x, y) {
    if (m.pickups.length >= 8) {
      m.pickups.shift();
      addPegs(m, 1);
    }
    m.pickups.push({ id: ++m.seq, x: x, y: y, family: part.family, intact: part.intact });
  }

  function aliveEnemies(m) {
    return m.enemies.filter(function (e) { return e.alive; });
  }

  function spawnEnemy(m, kind, pathId, progress) {
    var def = ENEMIES[kind];
    var path = m.map.paths[pathId];
    var e = {
      id: ++m.seq,
      kind: kind,
      path: pathId,
      pathLen: path.len,
      progress: progress || 0,
      timber: def.timber,
      maxTimber: def.timber,
      alive: true,
      ground: def.ground,
      splash: def.splash,
      slowUntil: -1,
      slowFactor: 1,
      lastSpray: -99,
      lastYank: -99,
      lastShove: -99,
      flash: 0,
      heldBy: null,
      rooted: false,
      sheared: {},
      x: 0,
      y: 0
    };
    syncEnemy(m, e);
    m.enemies.push(e);
    return e;
  }

  function syncEnemy(m, e) {
    var p = pointAt(m.map.paths[e.path], e.progress);
    e.x = p.x;
    e.y = p.y;
  }

  function startWave(m, index) {
    m.waveIndex = index;
    m.queue = m.map.waves[index].slice().sort(function (a, b) { return a.t - b.t; });
    m.qIndex = 0;
    m.spawnClock = 0;
    m.countedDown = false;
    m.countdown = null;
    m.countdownTarget = null;
    if (m.map.tutorial && index >= 1 && m.reed.state === "absent") {
      m.reed.state = "up";
      m.reed.timber = 80;
      m.reed.along = m.homeAlong;
      m.reed.target = m.homeAlong;
      placeReedXY(m);
      showTip(m, "bosun");
    }
    if (m.map.tutorial && index >= 2) {
      var was = m.hawserOn;
      m.hawserOn = true;
      if (!was) showTip(m, "hawser");
    }
  }

  function payPreview(m) {
    if (m.countdown == null) return null;
    var shown = Math.max(0, Math.floor(m.countdown + 1e-4));
    var pays = countdownPays(m);
    return { shown: shown, pegs: pays ? Math.floor(shown / 5) : 0, pays: pays };
  }
  C.payPreview = payPreview;

  function countdownPays(m) {
    if (!m.map.tutorial) return true;
    return m.countdownTarget >= 2;
  }

  function callTide(m) {
    if (m.countdown == null || m.over) return;
    var shown = Math.max(0, Math.floor(m.countdown + 1e-4));
    var pays = countdownPays(m);
    if (pays) addPegs(m, Math.floor(shown / 5));
    if (m.hawserOn) m.hawserCd = Math.max(0, m.hawserCd - shown);
    var target = m.countdownTarget;
    m.countdown = null;
    startWave(m, target);
  }

  function channelSnap(m, x, y) {
    var best = null;
    Object.keys(m.map.paths).forEach(function (id) {
      var hit = project(m.map.paths[id], x, y, 48);
      if (hit && (!best || hit.dist < best.dist)) best = hit;
    });
    return best;
  }

  function distToChannel(m, x, y) {
    var best = 1e9;
    Object.keys(m.map.paths).forEach(function (id) {
      best = Math.min(best, distToPath(m.map.paths[id], x, y));
    });
    return best;
  }

  function dropHawser(m, x, y) {
    if (!m.hawserOn || m.hawserCd > 0) return;
    var snap = channelSnap(m, x, y);
    if (!snap) return;
    var coil = { id: ++m.seq, x: snap.x, y: snap.y, left: 3.5, holds: [] };
    var near = aliveEnemies(m).filter(function (e) {
      return e.ground && hypot(e.x, e.y, coil.x, coil.y) <= 56;
    });
    near.sort(function (a, b) { return (b.progress / b.pathLen) - (a.progress / a.pathLen); });
    near.slice(0, 4).forEach(function (e) { coil.holds.push(e.id); });
    m.coils.push(coil);
    m.hawserCd = 18;
    m.arm = null;
  }

  function plantCleat(m, x, y) {
    if (m.cleatsLeft <= 0) {
      toast(m, COPY.cleatEmpty);
      m.arm = null;
      return;
    }
    var berth = null;
    var best = 36;
    m.berths.forEach(function (b) {
      if (b.used) return;
      var d = hypot(b.x, b.y, x, y);
      if (d <= best) { best = d; berth = b; }
    });
    if (!berth) {
      toast(m, COPY.chooseBerth);
      return;
    }
    berth.used = true;
    m.cleatsLeft--;
    m.sockets.push(freshSocket({ id: "cleat-" + berth.id, kind: "lane", x: berth.x, y: berth.y }));
    m.arm = null;
    bark(m, COPY.seated);
  }

  function bollardCount(m) {
    var n = 0;
    m.sockets.forEach(function (s) {
      if (s.head && HEADS[s.head].family === "bollard") n++;
    });
    return n;
  }

  function trySeat(m, socket) {
    var part = selectedPart(m);
    if (!part) return;
    if (!socket.head) {
      if (part.family === "bollard" && socket.kind !== "edge") {
        toast(m, COPY.edgeOnly);
        return;
      }
      if (part.family === "bollard" && bollardCount(m) >= 2) {
        toast(m, COPY.bollardCap);
        return;
      }
      socket.head = GRADE1[part.family];
      socket.broken = false;
      socket.gen++;
      socket.holding = [];
      socket.holdLeft = null;
      consumeSelected(m);
      bark(m, COPY.seated);
      return;
    }
    var h = HEADS[socket.head];
    if (socket.broken && h.family === "bollard" && part.family === "bollard") {
      socket.broken = false;
      socket.holding = [];
      socket.holdLeft = null;
      consumeSelected(m);
      bark(m, COPY.seated);
      return;
    }
    if (part.family !== h.family || !part.intact) {
      toast(m, COPY.wrongFitting);
      return;
    }
    if (h.spec) {
      toast(m, COPY.finishedHead);
      return;
    }
    if (h.grade === 2 && m.map.gradeCap) {
      toast(m, COPY.gradeCap);
      return;
    }
    if (h.grade < 3) {
      socket.head = NEXT[socket.head];
      consumeSelected(m);
      bark(m, COPY.seated);
      return;
    }
    m.fork = { socketId: socket.id, slot: m.selected, ground: m.heldGround };
    m.modal = "fork";
    showTip(m, "fork");
  }

  function chooseFork(m, index) {
    if (!m.fork) return;
    var socket = socketById(m, m.fork.socketId);
    if (!socket || !socket.head) {
      m.modal = null;
      m.fork = null;
      return;
    }
    var family = HEADS[socket.head].family;
    socket.head = FORKS[family][index];
    if (m.fork.ground) {
      m.heldGround = m.fork.ground;
      m.selected = null;
    } else {
      m.selected = m.fork.slot;
      m.heldGround = null;
    }
    consumeSelected(m);
    m.fork = null;
    m.modal = null;
    bark(m, COPY.seated);
  }

  function socketById(m, id) {
    for (var i = 0; i < m.sockets.length; i++) if (m.sockets[i].id === id) return m.sockets[i];
    return null;
  }

  function recyclePart(m, part, slotIndex, groundId) {
    if (!part) return;
    addPegs(m, part.intact ? 3 : 2);
    if (groundId != null) {
      m.pickups = m.pickups.filter(function (p) { return p.id !== groundId; });
      if (m.heldGround && m.heldGround.pickupId === groundId) m.heldGround = null;
    } else if (slotIndex != null) {
      m.pouch[slotIndex] = null;
      if (m.selected === slotIndex) m.selected = null;
    }
  }

  function openCraft(m) {
    if (m.pegs < 4 || m.over) return;
    m.modal = "craft";
  }

  function confirmCraft(m, yes) {
    if (m.modal !== "craft") return;
    m.modal = null;
    if (!yes || m.pegs < 4) return;
    m.pegs -= 4;
    var slot = freeSlot(m);
    var part = { family: "pin", intact: false };
    if (slot >= 0) m.pouch[slot] = part;
    else dropGround(m, part, 400, 580);
  }

  function isClean(e, source, m) {
    if (!source || (source.type !== "pin" && source.type !== "reed")) return false;
    var w = source.needle ? 0.6 : 1.5;
    if (m.time - e.lastSpray < w) return false;
    if (m.time - e.lastYank < w) return false;
    if (m.time - e.lastShove < w) return false;
    return true;
  }

  function killEnemy(m, e, source) {
    if (!e.alive) return;
    e.alive = false;
    if (e.heldBy) {
      var s = socketById(m, e.heldBy);
      if (s) s.holding = s.holding.filter(function (id) { return id !== e.id; });
      e.heldBy = null;
    }
    var def = ENEMIES[e.kind];
    var clean = isClean(e, source, m);
    if (def.drop === "pegs") {
      addPegs(m, clean ? def.pegsClean : def.pegsMessy);
    } else {
      giveKillPart(m, { family: def.drop, intact: !!clean }, e.x, e.y);
      bark(m, clean ? COPY.intact : COPY.messy);
    }
    showTip(m, "pickup");
  }

  function leakEnemy(m, e) {
    if (!e.alive) return;
    e.alive = false;
    var def = ENEMIES[e.kind];
    m.hull -= def.leak;
    if (!m.leaks[e.path]) m.leaks[e.path] = {};
    m.leaks[e.path][e.kind] = (m.leaks[e.path][e.kind] || 0) + 1;
    toast(m, "A " + def.one + " leaked on " + PATH_NAME[e.path] + ".");
    if (m.hull <= 0) {
      m.hull = 0;
      m.over = "lose";
      m.modal = "defeat";
      m.result = { hint: defeatHint(m) };
    }
  }

  function defeatHint(m) {
    var bestPath = null;
    var bestN = -1;
    var bestTie = 99;
    Object.keys(m.leaks).forEach(function (path) {
      var total = 0;
      Object.keys(m.leaks[path]).forEach(function (k) { total += m.leaks[path][k]; });
      var tie = PATH_TIE[path];
      if (total > bestN || (total === bestN && tie < bestTie)) {
        bestN = total;
        bestPath = path;
        bestTie = tie;
      }
    });
    if (!bestPath) return "The jetty leaked.";
    var bag = m.leaks[bestPath];
    var kind = null;
    var n = -1;
    var rank = 99;
    Object.keys(bag).forEach(function (k) {
      var r = RANK.indexOf(k);
      if (r < 0) r = 50;
      if (bag[k] > n || (bag[k] === n && r < rank)) {
        n = bag[k];
        kind = k;
        rank = r;
      }
    });
    var def = ENEMIES[kind];
    var name = n === 1 ? def.one : def.many;
    return n + " " + name + " leaked on " + PATH_NAME[bestPath] + ". " + def.suggest;
  }

  function finalizeDamage(raw, base) {
    var d = Math.round(raw);
    if (base >= 1 && d < 1) d = 1;
    if (base <= 0) return 0;
    return d;
  }

  function bellMul(m, socket) {
    var best = 1;
    m.sockets.forEach(function (s) {
      if (!s.head || s.broken) return;
      var h = HEADS[s.head];
      if (h.kind !== "bell") return;
      if (hypot(s.x, s.y, socket.x, socket.y) <= h.range) best = Math.max(best, h.bell);
    });
    return best;
  }

  function fogRange(m, socket) {
    var bonus = 0;
    m.sockets.forEach(function (s) {
      if (!s.head || s.broken) return;
      var h = HEADS[s.head];
      if (!h.fog) return;
      if (hypot(s.x, s.y, socket.x, socket.y) <= h.range) bonus = 20;
    });
    return bonus;
  }

  function fogHitsKite(m, enemy) {
    var yes = false;
    m.sockets.forEach(function (s) {
      if (!s.head || s.broken) return;
      var h = HEADS[s.head];
      if (!h.fog) return;
      if (hypot(s.x, s.y, enemy.x, enemy.y) <= h.range) yes = true;
    });
    return yes;
  }

  function shotDamage(m, socket, head, enemy) {
    var raw = head.damage;
    if (head.fat && enemy.maxTimber >= 80) raw *= 1.5;
    raw *= bellMul(m, socket);
    if (head.family === "pin" && !enemy.ground && fogHitsKite(m, enemy)) raw *= 1.25;
    if (head.family === "spray") raw *= enemy.splash;
    return finalizeDamage(raw, head.damage);
  }

  function applySlow(e, factor, dur, m) {
    if (e.slowUntil > m.time && e.slowFactor < factor) return;
    e.slowFactor = factor;
    e.slowUntil = m.time + dur;
  }

  function inSlick(m, e) {
    if (!e.ground) return false;
    for (var i = 0; i < m.slicks.length; i++) {
      var s = m.slicks[i];
      if (m.time <= s.until && hypot(e.x, e.y, s.x, s.y) <= s.r) return true;
    }
    return false;
  }

  function rooted(m, e) {
    for (var i = 0; i < m.coils.length; i++) {
      if (m.coils[i].holds.indexOf(e.id) >= 0) return true;
    }
    return false;
  }

  function step(m, dt) {
    if (!m || m.over || m.modal) return;
    if (dt > 0.05) dt = 0.05;
    m.time += dt;
    placeReedXY(m);

    if (m.grace > 0) {
      m.grace -= dt;
      if (m.grace <= 0) startWave(m, 0);
    } else {
      if (m.countdown != null) {
        m.countdown -= dt;
        if (m.countdown <= 0) {
          var target = m.countdownTarget;
          m.countdown = null;
          startWave(m, target);
        }
      }
      if (aliveEnemies(m).length < 24 && m.waveIndex >= 0) {
        m.spawnClock += dt;
        while (m.qIndex < m.queue.length && m.queue[m.qIndex].t <= m.spawnClock) {
          if (aliveEnemies(m).length >= 24) break;
          var item = m.queue[m.qIndex++];
          spawnEnemy(m, item.kind, item.path, 0);
        }
        if (m.qIndex >= m.queue.length && !m.countedDown && m.waveIndex < m.map.waves.length - 1 && m.countdown == null) {
          m.countedDown = true;
          m.countdown = m.map.countdown;
          m.countdownTarget = m.waveIndex + 1;
          if (countdownPays(m)) showTip(m, "callTide");
        }
      }
    }

    if (m.hawserCd > 0) m.hawserCd = Math.max(0, m.hawserCd - dt);

    m.coils.forEach(function (c) { c.left -= dt; });
    m.coils = m.coils.filter(function (c) { return c.left > 0; });

    aliveEnemies(m).forEach(function (e) {
      var def = ENEMIES[e.kind];
      var speed = def.speed;
      if (inSlick(m, e)) speed *= 0.55;
      if (e.slowUntil > m.time) speed *= e.slowFactor;
      if (e.heldBy || rooted(m, e)) speed = 0;
      e.progress += speed * dt;
      syncEnemy(m, e);
      if (e.flash > 0) e.flash -= dt;
      if (e.progress >= e.pathLen) leakEnemy(m, e);
    });
    if (m.over) return;

    aliveEnemies(m).forEach(function (e) {
      if (!ENEMIES[e.kind].shear) return;
      m.sockets.forEach(function (s) {
        if (!s.head) return;
        if (HEADS[s.head].grade !== 1) return;
        if (hypot(e.x, e.y, s.x, s.y) > 36) return;
        if (e.sheared[s.id] === s.gen) return;
        var family = HEADS[s.head].family;
        s.holding.forEach(function (id) {
          var held = enemyById(m, id);
          if (held) held.heldBy = null;
        });
        s.head = null;
        s.broken = false;
        s.holding = [];
        s.holdLeft = null;
        s.gen++;
        e.sheared[s.id] = s.gen;
        dropGround(m, { family: family, intact: false }, s.x + 18, s.y + 8);
        e.timber -= 8;
        e.flash = 0.08;
        for (var n = 0; n < 3; n++) {
          m.chips.push({ x: s.x, y: s.y, vx: (n - 1) * 40, vy: -30 - n * 10, t: 0.35 });
        }
      });
      if (e.alive && e.timber <= 0) killEnemy(m, e, { type: "shear" });
    });

    m.sockets.forEach(function (s) {
      if (!s.head || s.broken) return;
      var h = HEADS[s.head];
      if (h.kind !== "bollard") return;
      s.holding = s.holding.filter(function (id) {
        var e = enemyById(m, id);
        return e && e.alive;
      });
      if (s.holding.length < h.holdCap) {
        var near = aliveEnemies(m).filter(function (e) {
          return e.ground && !e.heldBy && hypot(e.x, e.y, s.x, s.y) <= 48;
        });
        near.sort(function (a, b) { return (b.progress / b.pathLen) - (a.progress / a.pathLen); });
        while (s.holding.length < h.holdCap && near.length) {
          var e = near.shift();
          if (e.heldBy) continue;
          e.heldBy = s.id;
          s.holding.push(e.id);
          if (s.holdLeft == null) s.holdLeft = h.holdTime;
        }
      }
      if (s.holdLeft != null) {
        s.holdLeft -= dt;
        if (s.holdLeft <= 0) {
          s.holding.forEach(function (id) {
            var e = enemyById(m, id);
            if (!e) return;
            e.heldBy = null;
            if (h.spring) {
              e.progress = Math.max(0, e.progress - h.spring);
              e.lastShove = m.time;
              syncEnemy(m, e);
            }
          });
          s.holding = [];
          s.holdLeft = null;
          s.broken = true;
        }
      }
    });

    if (m.reed.state === "up") {
      if (Math.abs(m.reed.along - m.reed.target) > 0.5) {
        var dir = m.reed.target > m.reed.along ? 1 : -1;
        m.reed.along += dir * 140 * dt;
        if ((m.reed.target - m.reed.along) * dir < 0) m.reed.along = m.reed.target;
      }
      placeReedXY(m);
      var hold = null;
      if (distToChannel(m, m.reed.x, m.reed.y) <= 40) {
        var bestScore = -1;
        aliveEnemies(m).forEach(function (e) {
          if (!e.ground) return;
          if (hypot(e.x, e.y, m.reed.x, m.reed.y) > 36) return;
          var score = e.progress / e.pathLen;
          if (score > bestScore) { bestScore = score; hold = e; }
        });
      }
      if (hold) {
        if (m.reed.hold !== hold.id) {
          m.reed.hold = hold.id;
          m.reed.poke = 0;
        }
        m.reed.poke -= dt;
        if (m.reed.poke <= 0) {
          hurt(m, hold, 7, { type: "reed" });
          m.reed.poke = 0.7;
        }
        m.reed.timber -= 4 * dt;
        if (m.reed.timber <= 0) {
          m.reed.state = "down";
          m.reed.downT = 8;
          m.reed.hold = null;
          bark(m, COPY.downed);
        }
      } else {
        m.reed.hold = null;
      }
    } else if (m.reed.state === "down") {
      m.reed.downT -= dt;
      if (m.reed.downT <= 0) {
        m.reed.state = "up";
        m.reed.timber = 80;
        m.reed.along = m.homeAlong;
        m.reed.target = m.homeAlong;
        placeReedXY(m);
      }
    }

    m.sockets.forEach(function (s) { tickSocket(m, s, dt); });

    var impacts = [];
    m.shots.forEach(function (shot) {
      var e = enemyById(m, shot.target);
      if (!e || !e.alive) { shot.dead = true; return; }
      var d = hypot(shot.x, shot.y, e.x, e.y);
      var stepD = shot.speed * dt;
      if (d <= stepD + 6) {
        shot.dead = true;
        impacts.push(shot);
      } else {
        shot.x += ((e.x - shot.x) / d) * stepD;
        shot.y += ((e.y - shot.y) / d) * stepD;
      }
    });
    impacts.forEach(function (shot) {
      var headDef = HEADS[shot.head];
      var socket = socketById(m, shot.socketId);
      var target = enemyById(m, shot.target);
      if (headDef.family === "pin") {
        if (target && target.alive) hurt(m, target, shotDamage(m, socket || { x: shot.x, y: shot.y }, headDef, target), { type: "pin", needle: !!headDef.needle });
      } else if (headDef.family === "spray") {
        var hx = target ? target.x : shot.x;
        var hy = target ? target.y : shot.y;
        aliveEnemies(m).forEach(function (o) {
          if (hypot(o.x, o.y, hx, hy) <= headDef.splash) {
            hurt(m, o, shotDamage(m, socket || { x: shot.x, y: shot.y }, headDef, o), { type: "spray" });
          }
        });
        if (headDef.slick) {
          m.slicks = m.slicks.filter(function (sl) { return sl.socketId !== shot.socketId; });
          m.slicks.push({ x: hx, y: hy, r: 32, until: m.time + 3, socketId: shot.socketId });
        }
      } else if (headDef.family === "net") {
        if (target && target.alive && target.ground) {
          if (headDef.yank) {
            target.progress = Math.max(0, target.progress - headDef.yank);
            target.lastYank = m.time;
            syncEnemy(m, target);
          }
          applySlow(target, headDef.slow, headDef.slowDur, m);
        }
      }
    });
    m.shots = m.shots.filter(function (s) { return !s.dead; });

    aliveEnemies(m).forEach(function (e) {
      if (e.timber <= 0) killEnemy(m, e, e.pending || { type: "pin" });
    });

    m.slicks = m.slicks.filter(function (s) { return s.until > m.time; });
    m.chips.forEach(function (c) {
      c.t -= dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;
    });
    m.chips = m.chips.filter(function (c) { return c.t > 0; });
    m.enemies = m.enemies.filter(function (e) { return e.alive; });

    if (m.tip) { m.tip.t -= dt; if (m.tip.t <= 0) m.tip = null; }
    if (m.bark) { m.bark.t -= dt; if (m.bark.t <= 0) m.bark = null; }
    if (m.toasts.length) {
      m.toasts[0].t -= dt;
      if (m.toasts[0].t <= 0) m.toasts.shift();
    }

    if (!m.over && m.grace <= 0 && m.waveIndex === m.map.waves.length - 1 && m.qIndex >= m.queue.length && m.countdown == null && aliveEnemies(m).length === 0 && m.hull > 0) {
      win(m);
    }
  }
  C.step = step;

  function hurt(m, e, amount, source) {
    if (!e.alive || amount <= 0) return;
    e.timber -= amount;
    e.flash = 0.08;
    if (source.type === "spray") e.lastSpray = m.time;
    e.pending = source;
  }

  function enemyById(m, id) {
    for (var i = 0; i < m.enemies.length; i++) if (m.enemies[i].id === id) return m.enemies[i];
    return null;
  }

  function tickSocket(m, s, dt) {
    if (!s.head || s.broken) return;
    var h = HEADS[s.head];
    if (h.kind === "bell" || h.kind === "bollard") return;
    if (s.cd > 0) {
      s.cd -= dt;
      return;
    }
    var range = h.range + fogRange(m, s);
    if (h.aura) {
      aliveEnemies(m).forEach(function (e) {
        if (!e.ground) return;
        if (hypot(e.x, e.y, s.x, s.y) <= range) applySlow(e, h.slow, h.slowDur, m);
      });
      s.cd = h.interval;
      return;
    }
    var list = aliveEnemies(m).filter(function (e) {
      if (h.family === "net" && !e.ground) return false;
      return hypot(e.x, e.y, s.x, s.y) <= range;
    });
    list.sort(function (a, b) {
      var d = (b.progress / b.pathLen) - (a.progress / a.pathLen);
      if (Math.abs(d) > 1e-6) return d;
      return a.id - b.id;
    });
    var n = h.shots || 1;
    if (!list.length) return;
    for (var i = 0; i < n && i < list.length; i++) {
      m.shots.push({
        kind: h.family,
        x: s.x,
        y: s.y,
        target: list[i].id,
        speed: h.proj || 520,
        head: s.head,
        socketId: s.id,
        dead: false
      });
    }
    s.cd = h.interval;
  }

  function win(m) {
    var rec = m.save.maps[m.map.id];
    var before = clearedCount(m.save);
    var stars = starsFor(m.hull);
    rec.campaignStars = Math.max(rec.campaignStars || 0, stars);
    var was = rec.cleared;
    rec.cleared = true;
    var after = before + (was ? 0 : 1);
    m.bellUnlock = after >= 3 && before < 3;
    m.over = "win";
    m.modal = "victory";
    m.needsSave = true;
    var idx = C.MAP_ORDER.indexOf(m.map.id);
    m.result = {
      stars: stars,
      hull: m.hull,
      next: idx >= 0 && idx < C.MAP_ORDER.length - 1 ? C.MAP_ORDER[idx + 1] : null,
      bellUnlock: m.bellUnlock
    };
  }

  function hudRects(m) {
    var rects = [
      { id: "pause", x: 1200, y: 4, w: 64, h: 64 }
    ];
    for (var i = 0; i < 4; i++) rects.push({ id: "slot" + i, x: 16 + i * 80, y: 632, w: 72, h: 72, slot: i });
    rects.push({ id: "locker", x: 360, y: 632, w: 72, h: 72 });
    if (m.cleatsLeft > 0) rects.push({ id: "cleat", x: 560, y: 632, w: 36 * m.cleatsLeft + 8, h: 48 });
    if (m.hawserOn) rects.push({ id: "hawser", x: 1184, y: 624, w: 80, h: 80 });
    if (m.countdown != null) rects.push({ id: "call", x: 530, y: 28, w: 220, h: 40 });
    return rects;
  }
  C.hudRects = hudRects;

  function modalRects(m) {
    if (m.modal === "pause") {
      var x = 400;
      var y = 150;
      return [
        { id: "resume", x: x + 40, y: y + 70, w: 400, h: 56 },
        { id: "restart", x: x + 40, y: y + 136, w: 400, h: 56 },
        { id: "dock", x: x + 40, y: y + 202, w: 400, h: 56 },
        { id: "map", x: x + 40, y: y + 268, w: 400, h: 56 },
        { id: "music", x: x + 40, y: y + 350, w: 400, h: 28 },
        { id: "sfx", x: x + 40, y: y + 398, w: 400, h: 28 }
      ];
    }
    if (m.modal === "craft") {
      return [
        { id: "make", x: 450, y: 380, w: 180, h: 56 },
        { id: "keep", x: 650, y: 380, w: 180, h: 56 }
      ];
    }
    if (m.modal === "fork") {
      return [
        { id: "fork0", x: 308, y: 250, w: 320, h: 240 },
        { id: "fork1", x: 652, y: 250, w: 320, h: 240 }
      ];
    }
    if (m.modal === "victory") {
      var rects = [
        { id: "replay", x: 420, y: 470, w: 200, h: 56 },
        { id: "tomap", x: 640, y: 470, w: 200, h: 56 }
      ];
      if (m.result && m.result.next) rects.unshift({ id: "next", x: 420, y: 400, w: 420, h: 56 });
      return rects;
    }
    if (m.modal === "defeat") {
      return [
        { id: "retry", x: 420, y: 450, w: 200, h: 56 },
        { id: "tomap", x: 640, y: 450, w: 200, h: 56 }
      ];
    }
    if (m.modal === "dockrule") {
      return [{ id: "boards", x: 500, y: 460, w: 280, h: 64 }];
    }
    return [];
  }
  C.modalRects = modalRects;

  function hitRect(list, x, y) {
    for (var i = list.length - 1; i >= 0; i--) {
      var r = list[i];
      if (x >= r.x && y >= r.y && x <= r.x + r.w && y <= r.y + r.h) return r;
    }
    return null;
  }

  function inHudBand(y) { return y < 80 || y > 600; }

  function openPause(m) {
    if (m.over) return;
    if (m.modal === "pause") return;
    m.pausedFrom = m.modal;
    m.modal = "pause";
  }

  function resume(m) {
    m.modal = m.pausedFrom || null;
    m.pausedFrom = null;
  }

  function pointer(m, phase, x, y, button) {
    m.mouse.x = x;
    m.mouse.y = y;
    if (phase === "move") {
      if (!m.modal && !selectedPart(m) && !m.arm) updateInspect(m, x, y);
      return;
    }
    if (phase === "down") {
      var slot = null;
      var hud = hitRect(hudRects(m), x, y);
      if (hud && hud.slot != null) slot = hud.slot;
      m.ptr = { x: x, y: y, slot: slot, button: button || 0 };
      return;
    }
    if (phase !== "up") return;
    var start = m.ptr;
    m.ptr = null;
    if (button === 2) {
      if (m.modal === "fork") {
        m.modal = null;
        m.fork = null;
        return;
      }
      if (m.modal) return;
      m.arm = null;
      m.selected = null;
      m.heldGround = null;
      return;
    }
    if (start && start.slot != null && hypot(x, y, start.x, start.y) > 12 && hitRect(hudRects(m), x, y) && hitRect(hudRects(m), x, y).id === "locker") {
      if (m.pouch[start.slot]) recyclePart(m, m.pouch[start.slot], start.slot, null);
      return;
    }
    click(m, x, y, button || 0);
  }
  C.pointer = pointer;

  function click(m, x, y, button) {
    if (m.modal) {
      var mr = hitRect(modalRects(m), x, y);
      if (!mr) return;
      onModal(m, mr.id, x, mr);
      return;
    }
    var hud = hitRect(hudRects(m), x, y);
    if (hud) {
      onHud(m, hud);
      return;
    }
    if (inHudBand(y)) return;
    if (m.arm === "hawser") {
      dropHawser(m, x, y);
      return;
    }
    if (m.arm === "cleat") {
      plantCleat(m, x, y);
      return;
    }
    if (selectedPart(m)) {
      var socket = nearestSocket(m, x, y, 32);
      if (socket) trySeat(m, socket);
      else toast(m, COPY.pocketPath);
      return;
    }
    var pickup = nearestPickup(m, x, y, 24);
    if (pickup) {
      var slot = freeSlot(m);
      if (slot >= 0) {
        m.pouch[slot] = { family: pickup.family, intact: pickup.intact };
        m.pickups = m.pickups.filter(function (p) { return p.id !== pickup.id; });
      } else {
        m.heldGround = { family: pickup.family, intact: pickup.intact, pickupId: pickup.id };
        m.selected = null;
      }
      return;
    }
    var tapped = nearestSocket(m, x, y, 22);
    if (tapped && tapped.head) {
      m.inspect = { kind: "socket", id: tapped.id };
      if (tapped.broken) toast(m, COPY.repairHint);
      return;
    }
    if (m.reed.state === "up") {
      var walk = project(m.map.boards, x, y, 48);
      if (walk) {
        m.reed.target = walk.along;
        return;
      }
    }
    var look = nearestSocket(m, x, y, 32);
    if (look && look.head) {
      m.inspect = { kind: "socket", id: look.id };
      if (look.broken) toast(m, COPY.repairHint);
      return;
    }
    var berth = nearestBerth(m, x, y, 32);
    if (berth && !berth.used) {
      m.inspect = { kind: "berth", id: berth.id };
      return;
    }
    m.inspect = null;
  }

  function updateInspect(m, x, y) {
    var look = nearestSocket(m, x, y, 32);
    if (look && look.head) {
      m.inspect = { kind: "socket", id: look.id };
      return;
    }
    var berth = nearestBerth(m, x, y, 28);
    if (berth && !berth.used) {
      m.inspect = { kind: "berth", id: berth.id };
      return;
    }
    if (m.inspect && m.inspect.kind !== "socket") m.inspect = null;
  }

  function nearestSocket(m, x, y, r) {
    var best = null;
    var bd = r;
    m.sockets.forEach(function (s) {
      var d = hypot(s.x, s.y, x, y);
      if (d <= bd) { bd = d; best = s; }
    });
    return best;
  }
  function nearestBerth(m, x, y, r) {
    var best = null;
    var bd = r;
    m.berths.forEach(function (b) {
      var d = hypot(b.x, b.y, x, y);
      if (d <= bd) { bd = d; best = b; }
    });
    return best;
  }
  function nearestPickup(m, x, y, r) {
    var best = null;
    var bd = r;
    m.pickups.forEach(function (p) {
      var d = hypot(p.x, p.y, x, y);
      if (d <= bd) { bd = d; best = p; }
    });
    return best;
  }

  function onHud(m, hud) {
    if (hud.id === "pause") { openPause(m); return; }
    if (hud.id === "call") { callTide(m); return; }
    if (hud.id === "hawser") {
      if (m.hawserCd > 0) return;
      m.arm = m.arm === "hawser" ? null : "hawser";
      if (m.arm) { m.selected = null; m.heldGround = null; }
      return;
    }
    if (hud.id === "cleat") {
      if (m.cleatsLeft <= 0) { toast(m, COPY.cleatEmpty); return; }
      m.arm = m.arm === "cleat" ? null : "cleat";
      if (m.arm) { m.selected = null; m.heldGround = null; }
      return;
    }
    if (hud.id === "locker") {
      if (selectedPart(m)) {
        if (m.heldGround) recyclePart(m, m.heldGround, null, m.heldGround.pickupId);
        else recyclePart(m, m.pouch[m.selected], m.selected, null);
      } else openCraft(m);
      return;
    }
    if (hud.slot != null) {
      if (!m.pouch[hud.slot]) {
        if (m.selected === hud.slot) m.selected = null;
        return;
      }
      if (m.selected === hud.slot && !m.heldGround) {
        m.selected = null;
        return;
      }
      m.selected = hud.slot;
      m.heldGround = null;
      m.arm = null;
    }
  }

  function sliderValue(rect, x) {
    return clamp((x - rect.x) / rect.w, 0, 1);
  }

  function onModal(m, id, x, rect) {
    if (id === "resume") resume(m);
    else if (id === "restart") m.restart = true;
    else if (id === "dock") m.modal = "dockrule";
    else if (id === "map" || id === "tomap") m.leave = "select";
    else if (id === "retry" || id === "replay") m.restart = true;
    else if (id === "next" && m.result && m.result.next) m.leave = m.result.next;
    else if (id === "boards") resume(m);
    else if (id === "make") confirmCraft(m, true);
    else if (id === "keep") confirmCraft(m, false);
    else if (id === "fork0") chooseFork(m, 0);
    else if (id === "fork1") chooseFork(m, 1);
    else if (id === "music") {
      m.save.settings.music = sliderValue(rect, x);
      m.needsSave = true;
    } else if (id === "sfx") {
      m.save.settings.sfx = sliderValue(rect, x);
      m.needsSave = true;
    }
  }

  function key(m, name) {
    m.keyboard = true;
    if (!m || m.over && name !== "Escape") {
      /* still allow nothing */
    }
    if (name === "Escape") {
      if (m.modal === "pause") resume(m);
      else if (!m.over) openPause(m);
      return;
    }
    if (m.modal || m.over) return;
    if (name === "1" || name === "2" || name === "3" || name === "4") {
      onHud(m, { id: "slot", slot: Number(name) - 1 });
      return;
    }
    if (name === "h" || name === "H") {
      if (m.hawserOn) onHud(m, { id: "hawser" });
      return;
    }
    if (name === "c" || name === "C") {
      onHud(m, { id: "cleat" });
      return;
    }
    if (name === " " || name === "Space") callTide(m);
  }
  C.key = key;

  C.menu = {
    titlePlay: { x: 500, y: 500, w: 280, h: 72 },
    introButton: { x: 500, y: 470, w: 280, h: 64 },
    introPanel: { x: 280, y: 160, w: 720, h: 400 },
    back: { x: 24, y: 24, w: 64, h: 64 }
  };

  function cardRect(i) {
    return { x: 110 + i * 360, y: 120, w: 340, h: 300 };
  }
  C.cardRect = cardRect;

  function cardPlayRect(i) {
    var c = cardRect(i);
    return { x: c.x + 24, y: c.y + 228, w: 292, h: 52 };
  }
  C.cardPlayRect = cardPlayRect;

  C.dev = {
    spawn: spawnEnemy,
    poly: poly,
    HEADS: HEADS
  };

  C.PATH_NAME = PATH_NAME;
})(typeof globalThis !== "undefined" ? globalThis : this);
