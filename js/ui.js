/* Cleatpin v1 drawing. Placeholder art: thick ink, flat dock colors. */
(function (root) {
  "use strict";
  var C = root.Cleatpin;
  var P = C.PAL;
  C.menu.settingsButton = { x: 500, y: 588, w: 280, h: 64 };
  C.menu.settingsMusic = { x: 440, y: 260, w: 400, h: 28 };
  C.menu.settingsSfx = { x: 440, y: 340, w: 400, h: 28 };
  C.menu.settingsDone = { x: 500, y: 450, w: 280, h: 56 };

  function font(px) {
    return "700 " + px + "px Trebuchet MS, Segoe UI, sans-serif";
  }

  function panel(ctx, x, y, w, h) {
    ctx.fillStyle = P.paper;
    ctx.fillRect(x, y, w, h);
    ctx.lineWidth = 4;
    ctx.strokeStyle = P.ink;
    ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
  }

  function label(ctx, text, x, y, size, color, align) {
    ctx.font = font(size);
    ctx.fillStyle = color || P.ink;
    ctx.textAlign = align || "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  function wrap(ctx, text, x, y, maxW, size, color, lineH) {
    ctx.font = font(size);
    ctx.fillStyle = color || P.ink;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    var words = text.split(" ");
    var line = "";
    var yy = y;
    words.forEach(function (word) {
      var trial = line ? line + " " + word : word;
      if (ctx.measureText(trial).width > maxW && line) {
        ctx.fillText(line, x, yy);
        yy += lineH;
        line = word;
      } else line = trial;
    });
    if (line) ctx.fillText(line, x, yy);
    return yy + lineH;
  }

  function button(ctx, r, text, primary) {
    ctx.fillStyle = primary === false ? P.paper : P.teal;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.lineWidth = 4;
    ctx.strokeStyle = P.ink;
    ctx.strokeRect(r.x + 2, r.y + 2, r.w - 4, r.h - 4);
    label(ctx, text, r.x + r.w / 2, r.y + r.h / 2, 22, primary === false ? P.ink : P.paper, "center");
  }

  function strokePath(ctx, path, width, color) {
    ctx.beginPath();
    path.points.forEach(function (p, i) {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
  }

  var GLYPH = {
    C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"]
  };

  function drawWordmark(ctx, x, y, cell) {
    var word = "CLEATPIN";
    ctx.save();
    ctx.translate(x, y);
    for (var i = 0; i < word.length; i++) {
      var rows = GLYPH[word.charAt(i)];
      for (var r = 0; r < rows.length; r++) {
        for (var c = 0; c < rows[r].length; c++) {
          if (rows[r].charAt(c) !== "1") continue;
          ctx.fillStyle = P.wood;
          ctx.fillRect(i * cell * 6 + c * cell, r * cell, cell - 1, cell - 1);
          ctx.strokeStyle = P.ink;
          ctx.lineWidth = 2;
          ctx.strokeRect(i * cell * 6 + c * cell, r * cell, cell - 1, cell - 1);
        }
      }
      if (word.charAt(i) === "T") {
        ctx.fillStyle = P.iron;
        ctx.fillRect(i * cell * 6 + cell * 1.2, cell * 2, cell * 2.6, cell * 1.3);
        ctx.strokeRect(i * cell * 6 + cell * 1.2, cell * 2, cell * 2.6, cell * 1.3);
      }
    }
    ctx.restore();
  }

  function drawPip(ctx, x, y, frame) {
    ctx.save();
    ctx.translate(x, y + (frame % 2 === 0 ? 0 : -3));
    ctx.fillStyle = P.white;
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-6, -6, 10, 6, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = P.seaDeep;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.brass;
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(20, -2);
    ctx.lineTo(12, 4);
    ctx.fill();
    ctx.restore();
  }

  function drawReed(ctx, x, y, down, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale || 1, scale || 1);
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = P.ink;
    ctx.fillStyle = P.tar;
    ctx.fillRect(-8, 16, 8, 8);
    ctx.fillRect(2, 16, 8, 8);
    ctx.strokeRect(-8, 16, 8, 8);
    ctx.strokeRect(2, 16, 8, 8);
    ctx.fillStyle = P.ochre;
    ctx.beginPath();
    ctx.moveTo(-16, -4);
    ctx.lineTo(16, -4);
    ctx.lineTo(18, 18);
    ctx.lineTo(-14, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.signal;
    ctx.fillRect(-5, -2, 10, 7);
    ctx.strokeRect(-5, -2, 10, 7);
    ctx.fillStyle = P.skin;
    ctx.beginPath();
    ctx.arc(0, -14, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.beginPath();
    ctx.arc(-4, -15, 1.6, 0, Math.PI * 2);
    ctx.arc(4, -15, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = P.teal;
    ctx.fillRect(-12, -28, 24, 12);
    ctx.strokeRect(-12, -28, 24, 12);
    ctx.strokeStyle = P.wood;
    ctx.lineWidth = 5;
    ctx.beginPath();
    if (down) {
      ctx.moveTo(-6, 4);
      ctx.lineTo(22, 8);
    } else {
      ctx.moveTo(6, -2);
      ctx.lineTo(14, -34);
    }
    ctx.stroke();
    ctx.strokeStyle = P.iron;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(14, -34);
    ctx.lineTo(24, -28);
    ctx.lineTo(18, -24);
    ctx.stroke();
    ctx.restore();
  }

  function drawMara(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = P.ink;
    ctx.fillStyle = P.iron;
    ctx.fillRect(-16, 0, 32, 36);
    ctx.strokeRect(-16, 0, 32, 36);
    ctx.fillStyle = P.skinMara;
    ctx.beginPath();
    ctx.arc(0, -12, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.wood;
    ctx.beginPath();
    ctx.arc(0, -18, 10, Math.PI, 0);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = P.seaweed;
    ctx.beginPath();
    ctx.moveTo(-8, 8);
    ctx.lineTo(-16, 28);
    ctx.moveTo(8, 8);
    ctx.lineTo(16, 28);
    ctx.stroke();
    ctx.fillStyle = P.paper;
    ctx.fillRect(8, 6, 14, 18);
    ctx.strokeRect(8, 6, 14, 18);
    ctx.restore();
  }

  function drawFitting(ctx, id, x, y) {
    if (!id) return;
    var h = C.HEADS[id];
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = P.ink;
    ctx.lineJoin = "round";
    if (h.family === "pin") {
      ctx.strokeStyle = P.iron;
      ctx.lineWidth = h.spec === "needle" ? 2 : 4;
      var spikes = h.spec === "needle" ? 3 : (h.grade >= 3 && !h.spec ? 2 : 1);
      for (var i = 0; i < spikes; i++) {
        ctx.beginPath();
        ctx.moveTo((i - (spikes - 1) / 2) * 6, 10);
        ctx.lineTo((i - (spikes - 1) / 2) * 6, h.spec === "harpoon" ? -22 : -14);
        ctx.stroke();
      }
      ctx.fillStyle = P.wood;
      ctx.fillRect(-8, 6, 16, 8);
      ctx.strokeRect(-8, 6, 16, 8);
    } else if (h.family === "spray") {
      ctx.fillStyle = h.spec === "pitch" ? P.flask : P.brass;
      ctx.beginPath();
      ctx.arc(-4, 4, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = P.iron;
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.lineTo(16, h.spec === "salt" ? -2 : -8);
      ctx.stroke();
      if (h.spec === "salt") {
        ctx.fillStyle = P.white;
        ctx.fillRect(10, -10, 10, 6);
      }
    } else if (h.family === "net") {
      ctx.strokeStyle = P.rope;
      ctx.strokeRect(-10, -12, 20, 18);
      ctx.beginPath();
      ctx.moveTo(-10, -3);
      ctx.lineTo(10, -3);
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 6);
      ctx.stroke();
      if (h.spec === "hook") {
        ctx.strokeStyle = P.iron;
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI);
        ctx.stroke();
      }
    } else if (h.family === "bell") {
      ctx.fillStyle = h.spec === "fog" ? P.seaweed : (h.spec === "harbor" ? P.bronze : P.brass);
      ctx.beginPath();
      ctx.moveTo(-10, -4);
      ctx.lineTo(-6, -14);
      ctx.lineTo(6, -14);
      ctx.lineTo(10, -4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      if (h.spec === "fog") {
        ctx.fillStyle = P.paper;
        ctx.beginPath();
        ctx.arc(12, -8, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    } else if (h.family === "bollard") {
      ctx.fillStyle = P.iron;
      ctx.fillRect(-6, -14, 12, 24);
      ctx.strokeRect(-6, -14, 12, 24);
      ctx.strokeStyle = P.rope;
      ctx.beginPath();
      ctx.arc(0, -2, 8, 0, Math.PI);
      ctx.stroke();
      if (h.spec === "spring") {
        ctx.strokeStyle = P.kite;
        ctx.strokeRect(-8, 4, 16, 4);
      }
    }
    ctx.restore();
  }

  function hullPath(ctx, w, h) {
    ctx.beginPath();
    ctx.moveTo(-w, -h * 0.2);
    ctx.lineTo(-w * 0.72, h);
    ctx.lineTo(w * 0.55, h);
    ctx.lineTo(w, -h * 0.15);
    ctx.quadraticCurveTo(w * 0.2, -h, -w * 0.2, -h * 0.85);
    ctx.closePath();
  }

  function bowFace(ctx, x) {
    ctx.fillStyle = P.ink;
    ctx.beginPath();
    ctx.arc(x - 5, -1, 1.7, 0, Math.PI * 2);
    ctx.arc(x + 3, -1, 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 4, 4);
    ctx.lineTo(x + 3, 4);
    ctx.stroke();
  }

  function drawEnemy(ctx, e, time) {
    var bob = Math.sin(time * 4 + e.id) * 2;
    ctx.save();
    ctx.translate(e.x, e.y + (e.ground ? bob : bob - 28));
    ctx.lineWidth = 4;
    ctx.strokeStyle = e.flash > 0 ? P.paper : P.ink;
    ctx.lineJoin = "round";
    if (e.kind === "skiff") {
      ctx.fillStyle = P.seaMid;
      hullPath(ctx, 24, 11);
      ctx.fill();
      ctx.stroke();
      bowFace(ctx, 6);
    } else if (e.kind === "dinghy") {
      ctx.fillStyle = P.white;
      hullPath(ctx, 32, 10);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = P.signal;
      ctx.fillRect(-6, -2, 18, 4);
      bowFace(ctx, 8);
    } else if (e.kind === "bargeWhite" || e.kind === "bargeRed") {
      ctx.fillStyle = P.wood;
      ctx.fillRect(-32, -6, 64, 18);
      ctx.strokeRect(-32, -6, 64, 18);
      var band = e.kind === "bargeRed" ? P.signal : P.white;
      for (var i = -1; i <= 1; i++) {
        ctx.fillStyle = P.rope;
        ctx.beginPath();
        ctx.arc(i * 16, -14, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = band;
      ctx.fillRect(-8, -18, 12, 5);
      bowFace(ctx, 10);
    } else if (e.kind === "kite") {
      ctx.fillStyle = P.kite;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(16, 0);
      ctx.lineTo(0, 18);
      ctx.lineTo(-16, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = P.seaDeep;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(0, 18);
      ctx.moveTo(-16, 0);
      ctx.lineTo(16, 0);
      ctx.stroke();
      ctx.strokeStyle = P.ink;
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(0, 40);
      ctx.stroke();
      bowFace(ctx, 0);
    } else if (e.kind === "cutter") {
      ctx.fillStyle = P.seaweed;
      hullPath(ctx, 30, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = P.plank;
      for (var t = 0; t < 4; t++) {
        ctx.beginPath();
        ctx.moveTo(16 + t * 5, -5);
        ctx.lineTo(26 + t * 5, 0);
        ctx.lineTo(16 + t * 5, 5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      bowFace(ctx, 2);
    }
    ctx.restore();
  }

  function drawStar(ctx, x, y, filled) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + i * Math.PI * 2 / 5;
      var r = i === 0 ? 0 : 0;
      var px = Math.cos(a) * 10;
      var py = Math.sin(a) * 10;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
      var b = a + Math.PI / 5;
      ctx.lineTo(Math.cos(b) * 4, Math.sin(b) * 4);
    }
    ctx.closePath();
    ctx.fillStyle = filled ? P.brass : P.paper;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = P.ink;
    ctx.stroke();
    ctx.restore();
  }

  function ring(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(28,36,48,0.85)";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(215,164,65,0.95)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawSkyAndWater(ctx) {
    ctx.fillStyle = "#E7F4F6";
    ctx.fillRect(0, 0, 1280, 720);
    ctx.fillStyle = P.brass;
    ctx.beginPath();
    ctx.arc(180, 110, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = P.seaweed;
    ctx.beginPath();
    ctx.moveTo(0, 210);
    ctx.lineTo(80, 150);
    ctx.lineTo(180, 190);
    ctx.lineTo(260, 140);
    ctx.lineTo(260, 230);
    ctx.lineTo(0, 230);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.wood;
    ctx.beginPath();
    ctx.moveTo(1020, 220);
    ctx.lineTo(1140, 150);
    ctx.lineTo(1280, 200);
    ctx.lineTo(1280, 240);
    ctx.lineTo(1020, 240);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.seaMid;
    ctx.fillRect(0, 220, 1280, 180);
    ctx.fillStyle = P.seaDeep;
    ctx.fillRect(0, 400, 1280, 320);
    ctx.strokeStyle = "rgba(247,251,252,0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (var i = 0; i < 16; i++) {
      ctx.moveTo(i * 80, 228);
      ctx.quadraticCurveTo(i * 80 + 20, 218, i * 80 + 40, 228);
    }
    ctx.stroke();
  }

  function drawWorld(ctx, m) {
    drawSkyAndWater(ctx);
    Object.keys(m.map.paths).forEach(function (id) {
      strokePath(ctx, m.map.paths[id], 64, P.ink);
      strokePath(ctx, m.map.paths[id], 54, "#164863");
      strokePath(ctx, m.map.paths[id], 10, "rgba(247,251,252,0.45)");
    });
    strokePath(ctx, m.map.boards, 34, P.ink);
    strokePath(ctx, m.map.boards, 26, P.plank);
    strokePath(ctx, m.map.boards, 3, P.wood);

    m.berths.forEach(function (b) {
      if (b.used) return;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 22, 0, Math.PI * 2);
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = P.paper;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    });

    m.slicks.forEach(function (s) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(59,42,26,0.45)";
      ctx.fill();
    });

    m.coils.forEach(function (c) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = P.rope;
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.strokeStyle = P.signal;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, 1.2);
      ctx.stroke();
    });

    m.sockets.forEach(function (s) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = P.seaDeep;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = P.brass;
      ctx.stroke();
      if (s.kind === "edge") {
        ctx.strokeStyle = P.rope;
        ctx.beginPath();
        ctx.moveTo(s.x - 18, s.y + 14);
        ctx.lineTo(s.x + 18, s.y + 14);
        ctx.stroke();
      }
      if (s.head) drawFitting(ctx, s.head, s.x, s.y - 6);
      if (s.broken) {
        ctx.strokeStyle = P.signal;
        ctx.beginPath();
        ctx.moveTo(s.x - 10, s.y - 16);
        ctx.lineTo(s.x + 8, s.y + 8);
        ctx.stroke();
      }
    });

    m.enemies.forEach(function (e) { if (e.alive) drawEnemy(ctx, e, m.time); });

    m.shots.forEach(function (s) {
      ctx.fillStyle = s.kind === "spray" ? P.white : (s.kind === "net" ? P.rope : P.iron);
      ctx.fillRect(s.x - 3, s.y - 3, 6, 6);
    });

    if (m.reed.state !== "absent") drawReed(ctx, m.reed.x, m.reed.y, m.reed.state === "down", 1);

    m.pickups.forEach(function (p) {
      drawFitting(ctx, p.family === "pin" ? "pin1" : p.family === "spray" ? "spray1" : p.family === "net" ? "net1" : p.family === "bell" ? "bell1" : "boll1", p.x, p.y);
      if (p.intact) {
        ctx.fillStyle = P.brass;
        ctx.beginPath();
        ctx.arc(p.x + 10, p.y - 10, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    m.chips.forEach(function (c) {
      ctx.fillStyle = P.plank;
      ctx.fillRect(c.x, c.y, 5, 4);
    });

    if (m.selected != null && m.pouch[m.selected] && !m.modal) {
      var fam = m.pouch[m.selected].family;
      var previewId = fam === "pin" ? "pin1" : fam === "spray" ? "spray1" : fam === "net" ? "net1" : fam === "bell" ? "bell1" : "boll1";
      var previewRange = C.HEADS[previewId].range;
      m.sockets.forEach(function (s) {
        if (s.head) return;
        if (fam === "bollard" && s.kind !== "edge") return;
        ctx.save();
        ctx.globalAlpha = 0.55;
        ring(ctx, s.x, s.y, previewRange);
        ctx.restore();
      });
    }
    if (m.inspect && m.inspect.kind === "socket") {
      var sock = null;
      m.sockets.forEach(function (s) { if (s.id === m.inspect.id) sock = s; });
      if (sock && sock.head) {
        var hd = C.HEADS[sock.head];
        ring(ctx, sock.x, sock.y, hd.range || 48);
        var text = C.headName(sock.head);
        var blurb = sock.broken ? C.COPY.repairHint : C.headBlurb(sock.head);
        ctx.fillStyle = P.paper;
        ctx.fillRect(sock.x - 120, sock.y - 92, 240, 70);
        ctx.lineWidth = 3;
        ctx.strokeStyle = P.ink;
        ctx.strokeRect(sock.x - 120, sock.y - 92, 240, 70);
        label(ctx, text, sock.x, sock.y - 74, 16, P.ink, "center");
        ctx.textAlign = "center";
        wrap(ctx, blurb, sock.x - 108, sock.y - 62, 216, 13, P.ink, 16);
      }
    }
    if (m.inspect && m.inspect.kind === "berth") {
      var berth = null;
      m.berths.forEach(function (b) { if (b.id === m.inspect.id) berth = b; });
      if (berth) {
        ctx.fillStyle = P.paper;
        ctx.fillRect(berth.x - 120, berth.y - 48, 240, 28);
        label(ctx, C.COPY.berth, berth.x, berth.y - 34, 13, P.ink, "center");
      }
    }
    if (m.arm === "hawser") {
      ring(ctx, m.mouse.x, m.mouse.y, 56);
    }
    if (m.arm === "cleat") {
      ctx.globalAlpha = 0.7;
      drawFitting(ctx, "boll1", m.mouse.x, m.mouse.y);
      ctx.globalAlpha = 1;
    }
  }

  function drawHud(ctx, m) {
    var i;
    ctx.fillStyle = "rgba(243,230,200,0.94)";
    ctx.fillRect(0, 0, 1280, 76);
    ctx.fillStyle = P.wood;
    ctx.fillRect(0, 72, 1280, 6);
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 1280, 76);
    label(ctx, "Hull", 16, 16, 14, P.ink, "left");
    for (i = 0; i < 10; i++) {
      var x = 62 + i * 22;
      var lost = i >= m.hull;
      ctx.fillStyle = lost ? "transparent" : (m.hull <= 3 ? P.signal : P.teal);
      ctx.strokeStyle = P.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 9, 20);
      ctx.lineTo(x + 16, 34);
      ctx.lineTo(x + 2, 34);
      ctx.closePath();
      if (!lost) ctx.fill();
      ctx.stroke();
      if (lost) {
        ctx.beginPath();
        ctx.moveTo(x + 4, 24);
        ctx.lineTo(x + 14, 36);
        ctx.stroke();
      }
    }
    var wave = m.waveIndex < 0 ? 1 : m.waveIndex + 1;
    label(ctx, "Tide " + wave + "/" + m.map.waves.length, 640, 14, 18, P.ink, "center");
    if (m.countdown != null) {
      var preview = C.payPreview(m);
      ctx.fillStyle = P.teal;
      ctx.fillRect(530, 28, 220, 40);
      ctx.lineWidth = 4;
      ctx.strokeStyle = P.ink;
      ctx.strokeRect(532, 30, 216, 36);
      label(ctx, "Call Tide", 544, 48, 16, P.paper, "left");
      label(ctx, String(preview.shown), 648, 48, 16, P.paper, "left");
      label(ctx, "+" + preview.pegs + " pegs", 678, 48, 13, P.paper, "left");
    }
    button(ctx, { x: 1200, y: 4, w: 64, h: 64 }, "", false);
    ctx.fillStyle = P.ink;
    ctx.fillRect(1222, 18, 8, 36);
    ctx.fillRect(1238, 18, 8, 36);
    ctx.fillStyle = P.plank;
    ctx.fillRect(0, 608, 1280, 112);
    ctx.fillStyle = P.wood;
    ctx.fillRect(0, 608, 1280, 8);
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 608);
    ctx.lineTo(1280, 608);
    ctx.stroke();
    label(ctx, "Pouch", 16, 620, 13, P.ink, "left");
    label(ctx, "Pegs " + m.pegs, 448, 622, 16, P.ink, "left");

    for (i = 0; i < 4; i++) {
      var sx = 16 + i * 80;
      ctx.fillStyle = P.paper;
      ctx.fillRect(sx, 632, 72, 72);
      ctx.lineWidth = m.selected === i ? 4 : 2;
      ctx.strokeStyle = m.selected === i ? P.brass : P.ink;
      ctx.strokeRect(sx + 2, 632 + 2, 68, 68);
      var part = m.pouch[i];
      if (part) {
        var icon = part.family === "pin" ? "pin1" : part.family === "spray" ? "spray1" : part.family === "net" ? "net1" : part.family === "bell" ? "bell1" : "boll1";
        drawFitting(ctx, icon, sx + 36, 668);
        if (part.intact) {
          ctx.fillStyle = P.brass;
          ctx.beginPath();
          ctx.arc(sx + 58, 644, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (m.keyboard) label(ctx, String(i + 1), sx + 8, 644, 12, P.ink, "left");
    }
    ctx.fillStyle = P.wood;
    ctx.fillRect(360, 632, 72, 72);
    ctx.strokeStyle = P.ink;
    ctx.strokeRect(362, 634, 68, 68);
    label(ctx, "Locker", 396, 700, 12, P.paper, "center");
    drawPip(ctx, 396, 648, Math.floor(m.time * 2));
    for (i = 0; i < m.cleatsLeft; i++) {
      var cx = 568 + i * 36;
      ctx.strokeStyle = P.iron;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx + 8, 644);
      ctx.lineTo(cx + 8, 670);
      ctx.moveTo(cx, 652);
      ctx.lineTo(cx + 18, 652);
      ctx.moveTo(cx, 662);
      ctx.lineTo(cx + 18, 662);
      ctx.stroke();
    }
    ctx.fillStyle = m.reed.state === "absent" ? "#C5C8CC" : P.paper;
    ctx.fillRect(1088, 636, 64, 64);
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(1090, 638, 60, 60);
    if (m.reed.state !== "absent") drawReed(ctx, 1120, 682, m.reed.state === "down", 0.55);
    else label(ctx, "Reed", 1120, 668, 14, P.ink, "center");
    if (m.reed.state === "down") label(ctx, String(Math.ceil(m.reed.downT)), 1120, 648, 16, P.signal, "center");

    if (m.hawserOn) {
      button(ctx, { x: 1184, y: 624, w: 80, h: 80 }, "", true);
      ctx.strokeStyle = P.paper;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(1224, 658, 16, 0, Math.PI * 1.4);
      ctx.stroke();
      if (m.hawserCd > 0) {
        ctx.fillStyle = "rgba(28,36,48,0.45)";
        ctx.beginPath();
        ctx.moveTo(1224, 664);
        ctx.arc(1224, 664, 36, -Math.PI / 2, -Math.PI / 2 + (m.hawserCd / 18) * Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      label(ctx, "Heave", 1224, 678, 12, P.paper, "center");
      label(ctx, "Hawser", 1224, 692, 12, P.paper, "center");
    }

    if (m.tip) {
      ctx.fillStyle = P.paper;
      ctx.fillRect(280, 78, 720, 36);
      ctx.strokeStyle = P.ink;
      ctx.strokeRect(280, 78, 720, 36);
      label(ctx, m.tip.text, 640, 96, 16, P.ink, "center");
    }
    if (m.toasts.length) {
      label(ctx, m.toasts[0].text, 640, m.tip ? 132 : 96, 16, P.ink, "center");
    } else if (m.bark) {
      label(ctx, m.bark.text, 640, m.tip ? 132 : 96, 16, P.ink, "center");
    }
  }

  function drawModal(ctx, m) {
    ctx.fillStyle = "rgba(28,36,48,0.6)";
    ctx.fillRect(0, 0, 1280, 720);
    if (m.modal === "pause") {
      panel(ctx, 400, 150, 480, 460);
      label(ctx, "Paused", 640, 190, 28, P.ink, "center");
      var rects = C.modalRects(m);
      button(ctx, rects[0], "Resume", true);
      button(ctx, rects[1], "Restart", false);
      button(ctx, rects[2], "Dock rule", false);
      button(ctx, rects[3], "Map select", false);
      label(ctx, "Music", rects[4].x, rects[4].y - 14, 16, P.ink, "left");
      slider(ctx, rects[4], m.save.settings.music);
      label(ctx, "Effects", rects[5].x, rects[5].y - 14, 16, P.ink, "left");
      slider(ctx, rects[5], m.save.settings.sfx);
    } else if (m.modal === "craft") {
      panel(ctx, 430, 260, 420, 200);
      wrap(ctx, "Spend 4 pegs for a Grade I Pin?", 460, 290, 360, 22, P.ink, 28);
      var cr = C.modalRects(m);
      button(ctx, cr[0], "Make the Pin", true);
      button(ctx, cr[1], "Keep the pegs", false);
    } else if (m.modal === "fork") {
      panel(ctx, 260, 160, 760, 360);
      label(ctx, "Choose a head.", 640, 196, 28, P.ink, "center");
      label(ctx, "This socket keeps it.", 640, 228, 18, P.ink, "center");
      var socket = null;
      m.sockets.forEach(function (s) { if (m.fork && s.id === m.fork.socketId) socket = s; });
      var family = socket && socket.head ? C.HEADS[socket.head].family : "pin";
      var forks = C.FORKS[family];
      [0, 1].forEach(function (n) {
        var r = C.modalRects(m)[n];
        ctx.fillStyle = P.white;
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = P.ink;
        ctx.strokeRect(r.x + 2, r.y + 2, r.w - 4, r.h - 4);
        drawFitting(ctx, forks[n], r.x + r.w / 2, r.y + 70);
        label(ctx, C.headName(forks[n]), r.x + r.w / 2, r.y + 130, 20, P.ink, "center");
        wrap(ctx, C.headBlurb(forks[n]), r.x + 16, r.y + 150, r.w - 32, 16, P.ink, 20);
      });
    } else if (m.modal === "victory" || m.modal === "defeat") {
      panel(ctx, 380, 140, 520, 420);
      var win = m.modal === "victory";
      label(ctx, win ? "The jetty held." : "The jetty leaked.", 640, 180, 28, win ? P.ink : P.signal, "center");
      if (win) {
        for (var s = 0; s < 3; s++) drawStar(ctx, 560 + s * 40, 230, s < m.result.stars);
        label(ctx, "Hull " + m.result.hull, 640, 270, 20, P.ink, "center");
      } else {
        wrap(ctx, m.result.hint, 410, 220, 460, 18, P.ink, 24);
      }
      drawMara(ctx, 470, 320);
      var bark = win
        ? (m.result.bellUnlock ? "Three maps held. I packed a bell in the starter locker." : "Pinned and counted.")
        : "The jetty can take another try.";
      wrap(ctx, bark, 520, 330, 340, 16, P.ink, 20);
      C.modalRects(m).forEach(function (r) {
        var name = r.id === "next" ? "Next map" : r.id === "replay" ? "Replay" : r.id === "retry" ? "Retry" : "Map select";
        button(ctx, r, name, r.id === "next" || r.id === "retry" || r.id === "replay");
      });
    } else if (m.modal === "dockrule") {
      panel(ctx, 280, 140, 720, 400);
      wrap(ctx, C.COPY.intro, 310, 170, 660, 22, P.ink, 30);
      button(ctx, C.modalRects(m)[0], "To the boards", true);
    }
  }

  function slider(ctx, r, value) {
    ctx.fillStyle = P.rope;
    ctx.fillRect(r.x, r.y + 10, r.w, 8);
    ctx.strokeStyle = P.ink;
    ctx.strokeRect(r.x, r.y + 10, r.w, 8);
    ctx.fillStyle = P.wood;
    ctx.fillRect(r.x + value * (r.w - 16), r.y, 16, 28);
    ctx.strokeRect(r.x + value * (r.w - 16), r.y, 16, 28);
  }

  function drawTitle(ctx) {
    drawSkyAndWater(ctx);
    ctx.fillStyle = P.plank;
    ctx.fillRect(0, 500, 1280, 220);
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(1280, 500);
    ctx.stroke();
    ctx.strokeStyle = P.wood;
    ctx.lineWidth = 3;
    for (var i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 80, 500);
      ctx.lineTo(i * 80, 720);
      ctx.stroke();
    }
    panel(ctx, 250, 70, 780, 200);
    drawWordmark(ctx, 310, 90, 8);
    drawPip(ctx, 900, 130, 0);
    label(ctx, C.COPY.logline, 640, 210, 20, P.ink, "center");
    button(ctx, C.menu.titlePlay, "Play", true);
    button(ctx, C.menu.settingsButton, "Settings", false);
  }

  function drawSettings(ctx, save) {
    drawSkyAndWater(ctx);
    panel(ctx, 340, 120, 600, 400);
    label(ctx, "Settings", 640, 170, 32, P.ink, "center");
    label(ctx, "Music", C.menu.settingsMusic.x, C.menu.settingsMusic.y - 16, 18, P.ink, "left");
    slider(ctx, C.menu.settingsMusic, save.settings.music);
    label(ctx, "Effects", C.menu.settingsSfx.x, C.menu.settingsSfx.y - 16, 18, P.ink, "left");
    slider(ctx, C.menu.settingsSfx, save.settings.sfx);
    label(ctx, "Saved on this dock.", 640, 430, 16, P.ink, "center");
    button(ctx, C.menu.back, "<", false);
    button(ctx, C.menu.settingsDone, "Title", true);
  }

  function drawIntro(ctx) {
    ctx.fillStyle = P.seaDeep;
    ctx.fillRect(0, 0, 1280, 720);
    ctx.fillStyle = P.seaMid;
    ctx.fillRect(0, 220, 1280, 160);
    var p = C.menu.introPanel;
    panel(ctx, p.x, p.y, p.w, p.h);
    wrap(ctx, C.COPY.intro, p.x + 36, p.y + 36, p.w - 72, 22, P.ink, 32);
    button(ctx, C.menu.introButton, "To the boards", true);
  }

  function drawMapThumb(ctx, map, x, y, w, h) {
    var minX = 1e9;
    var minY = 1e9;
    var maxX = -1e9;
    var maxY = -1e9;
    function grow(px, py) {
      if (px < minX) minX = px;
      if (py < minY) minY = py;
      if (px > maxX) maxX = px;
      if (py > maxY) maxY = py;
    }
    Object.keys(map.paths).forEach(function (id) {
      map.paths[id].points.forEach(function (p) { grow(p.x, p.y); });
    });
    map.sockets.forEach(function (s) { grow(s.x, s.y); });
    var spanX = Math.max(1, maxX - minX);
    var spanY = Math.max(1, maxY - minY);
    var scale = Math.min((w - 28) / spanX, (h - 28) / spanY);
    function tx(px) { return x + 14 + (px - minX) * scale; }
    function ty(py) { return y + 14 + (py - minY) * scale; }
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.fillStyle = P.seaMid;
    ctx.fillRect(x, y, w, h);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    Object.keys(map.paths).forEach(function (id) {
      ctx.beginPath();
      map.paths[id].points.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(tx(p.x), ty(p.y));
        else ctx.lineTo(tx(p.x), ty(p.y));
      });
      ctx.strokeStyle = P.ink;
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.strokeStyle = P.plank;
      ctx.lineWidth = 4;
      ctx.stroke();
    });
    map.sockets.forEach(function (s) {
      ctx.beginPath();
      ctx.arc(tx(s.x), ty(s.y), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = P.brass;
      ctx.fill();
      ctx.strokeStyle = P.ink;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawSelect(ctx, save) {
    ctx.fillStyle = P.seaDeep;
    ctx.fillRect(0, 0, 1280, 720);
    button(ctx, C.menu.back, "<", false);
    label(ctx, "Choose a berth", 640, 56, 32, P.paper, "center");
    C.MAP_ORDER.forEach(function (id, index) {
      var card = C.cardRect(index);
      var map = C.MAPS[id];
      var rec = save.maps[id];
      var prev = index === 0 ? null : C.MAP_ORDER[index - 1];
      var locked = prev && !save.maps[prev].cleared;
      ctx.fillStyle = P.paper;
      ctx.fillRect(card.x, card.y, card.w, card.h);
      ctx.lineWidth = 4;
      ctx.strokeStyle = P.ink;
      ctx.strokeRect(card.x + 2, card.y + 2, card.w - 4, card.h - 4);
      drawMapThumb(ctx, map, card.x + 12, card.y + 12, card.w - 24, 120);
      label(ctx, map.name, card.x + card.w / 2, card.y + 160, 24, P.ink, "center");
      for (var s = 0; s < 3; s++) drawStar(ctx, card.x + 120 + s * 36, card.y + 196, s < (rec.campaignStars || 0));
      if (locked) {
        var prevName = C.MAPS[prev].name;
        label(ctx, "Clear " + prevName + " first.", card.x + card.w / 2, card.y + 254, 16, P.ink, "center");
      } else {
        button(ctx, C.cardPlayRect(index), "Play", true);
      }
    });
    if (C.clearedCount(save) >= 3) {
      label(ctx, "Starter", 400, 470, 18, P.paper, "left");
      button(ctx, { x: 500, y: 448, w: 120, h: 48 }, "Pins", save.starter !== "bell");
      button(ctx, { x: 640, y: 448, w: 120, h: 48 }, "Bell", save.starter === "bell");
    }
  }

  C.draw = function (ctx, view) {
    if (view.portrait) {
      ctx.fillStyle = P.seaDeep;
      ctx.fillRect(0, 0, 1280, 720);
      panel(ctx, 280, 250, 720, 180);
      label(ctx, "Turn the dock sideways.", 640, 340, 28, P.ink, "center");
      return;
    }
    if (view.screen === "title") drawTitle(ctx);
    else if (view.screen === "intro") drawIntro(ctx);
    else if (view.screen === "settings") drawSettings(ctx, view.save);
    else if (view.screen === "select") drawSelect(ctx, view.save);
    else if (view.match) {
      drawWorld(ctx, view.match);
      drawHud(ctx, view.match);
      if (view.match.modal) drawModal(ctx, view.match);
    }
  };

  C.uiHit = function (view, x, y) {
    function inside(r) {
      return r && x >= r.x && y >= r.y && x <= r.x + r.w && y <= r.y + r.h;
    }
    if (view.screen === "title" && inside(C.menu.titlePlay)) return { id: "play" };
    if (view.screen === "title" && inside(C.menu.settingsButton)) return { id: "settings" };
    if (view.screen === "settings") {
      if (inside(C.menu.back) || inside(C.menu.settingsDone)) return { id: "title" };
      if (inside(C.menu.settingsMusic)) {
        return { id: "slider", key: "music", value: Math.max(0, Math.min(1, (x - C.menu.settingsMusic.x) / C.menu.settingsMusic.w)) };
      }
      if (inside(C.menu.settingsSfx)) {
        return { id: "slider", key: "sfx", value: Math.max(0, Math.min(1, (x - C.menu.settingsSfx.x) / C.menu.settingsSfx.w)) };
      }
    }
    if (view.screen === "intro" && inside(C.menu.introButton)) return { id: "boards" };
    if (view.screen === "select") {
      if (inside(C.menu.back)) return { id: "title" };
      for (var i = 0; i < 3; i++) {
        var id = C.MAP_ORDER[i];
        var prev = i === 0 ? null : C.MAP_ORDER[i - 1];
        var locked = prev && !view.save.maps[prev].cleared;
        if (!locked && inside(C.cardPlayRect(i))) return { id: "map", map: id };
      }
      if (C.clearedCount(view.save) >= 3) {
        if (inside({ x: 500, y: 448, w: 120, h: 48 })) return { id: "starter", value: "pins" };
        if (inside({ x: 640, y: 448, w: 120, h: 48 })) return { id: "starter", value: "bell" };
      }
    }
    return null;
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
