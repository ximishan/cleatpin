# Cleatpin production design

Authoritative for the version split, the screen layouts, and the wave scripts. Numbers for combat are in [RULES.md](RULES.md). Strings are in [LORE.md](LORE.md). Drawing is in [ART.md](ART.md).

## Why three versions

Cleatpin has three versions. v1 is the CrazyGames Basic Launch: a finished first session and a short campaign that already contains the salvage hook. v2 finishes the six-map campaign and the two post-clear modes. v3 is one post-launch update: Endless Tide, one extra ability, one alternate hero, and the audio and juice pass.

A fourth version is not planned. Anything beyond v3 needs a new design pass. There is no season, no battle pass, and no live-ops calendar. v2 and v3 are free updates on the same game page and the same `cleatpin.save` key.

The fork ships in v1. Campaign map 2 is part of the Basic Launch, and the locked rule opens the specialist choice from map 2 onward. Delaying the ten heads would change that rule. v2 adds maps, variants, the boss, and modes. It does not add a new fitting family.

## v1 — Basic Launch

Ships when a new player can pin on wave 1 and win Pilot Cove in about 3 minutes with the starter pouch, a few drops, Reed, and one Hawser.

### Maps

| Order | Map | Topology | Sockets |
| --- | --- | --- | --- |
| 1 | Pilot Cove | One inlet, left entrance, one choke, leak on the right. | 4 lane, 0 edge, 1 berth, 1 cleat token. Campaign seats cap at Grade II. |
| 2 | Split Channel | One entrance, a north fork and a south fork, merge, one leak. | 5 lane, 2 edge, 1 berth, 1 cleat token. Forks allowed. |
| 3 | Twin Mouths | West mouth and east mouth into one basin, one leak. | 5 lane, 2 edge, 2 berths, 2 cleat tokens. Forks allowed. |

Pilot Cove socket centers, in the 1280×720 space. No socket center sits in the top 80 px or the bottom 120 px.

| Mark | x | y | Role |
| --- | --- | --- | --- |
| Lane A | 280 | 400 | Entrance |
| Lane B | 480 | 320 | Choke, north board |
| Lane C | 640 | 460 | Choke, south board |
| Lane D | 880 | 360 | Late, before the leak |
| Berth | 600 | 520 | The one floating cleat |
| Home | 1080 | 240 | Reed’s ladder |
| Leak | 1100 | 400 | Hull gate |

Split Channel roles: one lane socket on the trunk, two lane sockets on the north fork, two on the south fork, one edge socket at each fork mouth. The berth sits in the basin where the forks merge.

Twin Mouths roles: two lane sockets on the west mouth, two on the east mouth, one lane socket on the basin, one edge socket on each mouth. One berth on each mouth.

### Enemies

Skiff, Dinghy, Barrel barge (white band and red band), Kite, Cutter.

Pilot Cove campaign uses Skiff and Dinghy only. White barges enter on Split Channel wave 4. Red barges enter on Split Channel wave 5. Kites enter on Twin Mouths wave 4. Cutters enter on Twin Mouths wave 5.

### Upgrades

All five families: Pin, Spray, Net, Bell, Bollard.

Grades I, II, and III, then the ten heads:

| Family | Fork A | Fork B |
| --- | --- | --- |
| Pin | Harpoon Pin | Needle Pin |
| Spray | Salt Burst | Pitch Flask |
| Net | Drift Net | Hook Net |
| Bell | Harbor Bell | Fog Bell |
| Bollard | Chain Bollard | Spring Bollard |

Campaign Pilot Cove refuses Grade III. Squall and Deadcalm are not in this build, so the cap is simply “this map.”

Bell parts and Bollard parts have no source on Pilot Cove. That is intentional.

### Hero, ability, economy

Bosun Reed. Heave Hawser. Call Tide. Hull, campaign stars, 4-slot pocket, pegs, locker craft of a Grade I Pin. localStorage only. After all three maps are cleared, the Bell starter unlocks.

Mara Quay and Pip are on cards and the title. They have no combat.

### UI screens in v1

1. Title
2. Dock-rule card
3. Map select
4. HUD, including pocket, locker, pegs, cleat tokens, hull, tide label, Call Tide, Hawser, Reed token, inspect
5. Craft confirm
6. Specialist choice
7. Pause
8. Victory
9. Defeat
10. Rotate prompt
11. Range rings, placement ghosts, and hit flash (feedback layer, not a route)

### Explicitly absent from the v1 build

Narrow Pier, Fog Wharf, Open Bay, all five variants, Wreck-tug, Squall, Deadcalm, Endless Tide, Slip Knot, Nia Pell, music, juice particles, a boss timber bar, a mode picker.

## v2 — Full Campaign

Adds the rest of the locked campaign. Same economy, same ten heads, same save key.

### Maps

| Order | Map | Topology | Sockets |
| --- | --- | --- | --- |
| 4 | Narrow Pier | One long pier, two chokes, one leak. | 4 lane, 2 edge, 2 berths, 2 tokens. |
| 5 | Fog Wharf | One channel in low warm light, a lamp at each choke. | 5 lane, 2 edge, 2 berths, 2 tokens. Ends with the Wreck-tug. |
| 6 | Open Bay | Wide basin, long sightlines, one leak. | 6 lane, 2 edge, 2 berths, 2 tokens. Ends with the Wreck-tug. |

Narrow Pier roles: lane sockets at entrance, first choke, second choke, and late pier. Edge sockets at the two chokes. Berths beside each choke, off the pier on the water.

Fog Wharf roles: three lane sockets along the channel, two more on the inner bend, edge sockets at the two lamps. The tug enters from the same entrance as the boats.

Open Bay roles: six lane sockets in two rows of three along a gentle S. Edge sockets at the two bends. Berths on the outer water, one per bend. Harpoon range is meant to cover a whole leg of the S.

### Enemies

Tarred Skiff and Outrider Dinghy from Narrow Pier. Night-lantern Kite and Twin-stack Barge from Fog Wharf. Shearwater Cutter from Open Bay. Wreck-tug on Fog Wharf and Open Bay campaign only.

### Modes

Squall and Deadcalm on all six maps, with the hull, locks, and packs in [RULES.md](RULES.md).

### UI added in v2

- Mode control on each map card: Campaign, Squall, Deadcalm.
- Deadcalm confirm strip before the map loads.
- Wreck-tug timber bar on the HUD while the tug is alive.

## v3 — Post-launch

No new map, no new fitting, no new enemy species, no new currency.

- Endless Tide on Pilot Cove, formula in [RULES.md](RULES.md).
- Slip Knot, hidden until Pilot Cove campaign is cleared once.
- Lighter-hand Nia Pell, hidden until all six campaign maps are cleared. One hero on the boards.
- Music, sound effects, and the juice particles in [ART.md](ART.md).
- HUD gains the Slip Knot button. Map select gains On the boards, and Pilot Cove gains Endless Tide.

## UI

One landscape layout, 1280×720, scaled uniformly to the window. Unused margin is sea `#1B4B6B`. Portrait shows only the rotate card. No fullscreen button anywhere.

Panels are paper `#F3E6C8` with a 4 px ink outline `#1C2430`. Primary buttons are teal `#1F6F6A` with paper text. The destructive tint `#D6453D` is reserved for hull loss, the defeat title, and invalid ghosts. Buttons have a 16 px horizontal padding minimum. Type is a heavy rounded sans: Trebuchet MS, Segoe UI, sans-serif. The wordmark is a drawing, not a font.

### Title

Full-bleed cove illustration.

| Element | Place | Size |
| --- | --- | --- |
| Wordmark | Centered, top at y=120 | 560×120 |
| Logline | Centered, y=250 | one line |
| Play | Centered, y=500 | 280×72 |
| Pip | Perched on the wordmark cleat | in the illustration |

Play opens the dock-rule card when `seenIntro` is false, otherwise map select. No settings gear, no social row, no store.

### Dock-rule card

Centered panel 720×360. The three intro sentences, then To the boards (280×64). Sets `seenIntro`. Reopened from pause via Dock rule. Not a cutscene: no animation beyond the panel fade of 120 ms.

### Map select

Back control, 64×64, at (24, 24), returns to the title. The back glyph is a rope arrow, drawn, with the accessible name Map select’s parent: the control’s name is “Title”.

Heading Choose a berth at y=48, centered.

v1: three cards. v2 and v3: six cards, two rows of three. Card 340×280, gap 20, the group centered under the heading.

Each card, top to bottom:

- Map painting, 340×140
- Map name
- Three campaign star tokens
- v2 adds two smaller pips under the stars, Squall then Deadcalm, empty until won
- A Play button, or the lock sentence from [LORE.md](LORE.md)

v1 shows only the three maps in the build. It does not draw fogged future maps.

The Starter switch sits under the cards, centered, only after the Bell unlock. Two segments, Pins and Bell. On the boards sits to its right, only after Nia’s unlock, segments Bosun Reed and Nia Pell. Both are absent until then. No price, no lock icon.

v3, on the Pilot Cove card only, after that map is cleared: an Endless Tide button beside Play.

Choosing Squall or Deadcalm on a locked mode does not load the map. The lock sentence replaces Play on that segment. Choosing a playable Deadcalm opens the confirm strip first.

### Deadcalm confirm (v2)

Panel 640×280. Title Deadcalm, the mode blurb, `Hull 1`, the locked-family sentence, and either nothing or “Bosun stays ashore.” Buttons: Play and Map select.

### HUD

The playfield is the full canvas. HUD controls sit in the top 72 px and the bottom 112 px. Level layout keeps socket centers out of those bands.

Top, y=0 to 72:

| Element | Place | Size |
| --- | --- | --- |
| Hull ticks | x=16, y=20 | 10 ticks, each 18×28, gap 4 |
| Tide label | Centered, y=6 | text |
| Call Tide | Centered, y=28 | 220×40 |
| Peg preview | Inside the button, right side | `+2 pegs` style |
| Pause | x=1200, y=4 | 64×64 |

The Call Tide control is invisible during wave 1 and during the deploy grace. While a countdown runs it shows the whole seconds. A timber bar for the Wreck-tug, v2, sits in the Call Tide slot while the tug is alive: a 280×12 brass track centered at y=40. That last wave has no countdown, so the slot is free. The track uses a paper fill for remaining timber and shows no number.

Bottom, y=608 to 720:

| Element | Place | Size |
| --- | --- | --- |
| Pouch slots 1–4 | x=16, 96, 176, 256; y=632 | 72×72 |
| Locker | x=360, y=632 | 72×72 |
| Peg count | x=448, y=656 | `Pegs 3` |
| Cleat tokens | x=560, y=640 | 32×32 each, only the tokens that map gives |

While Slip Knot is hidden (every v1 and v2 session, and v3 before it unlocks):

| Element | Place | Size |
| --- | --- | --- |
| Hero token | x=1088, y=636 | 64×64, plus recovery seconds when downed |
| Heave Hawser | x=1184, y=624 | 80×80 |

While Slip Knot is on screen:

| Element | Place | Size |
| --- | --- | --- |
| Hero token | x=960, y=636 | 64×64 |
| Heave Hawser | x=1040, y=624 | 80×80 |
| Slip Knot | x=1184, y=624 | 80×80 |

Cleat tokens stay at x=560 in both layouts.

The selected pouch slot gets a 4 px brass ring `#D7A441`. A cooldown is a paper wedge sweeping clockwise over the ability button, starting full and emptying. Desktop key hints `1` `2` `3` `4` sit in the top-left corner of each slot, 12 px, and only after a keyboard event this session.

Hull ticks at 3 or fewer use the signal red fill and a 1 second pulse. A lost tick is a broken outline, not only a recolor.

### Inspect and range rings

Tap or hover a seated fitting: a paper label, max width 240, above the fitting, with the name and the lore line. A 2 px paper ring at 70% opacity shows that head’s range. No fill. Hawser’s armed ring is 56 px at the cursor, snapped to the channel. A cleat ghost is the cleat drawing at 70% on a legal berth, and the same drawing tinted `#D6453D` at 50% on an illegal point.

### Craft confirm

Panel 420×200 at center. Body from the catalog. Make the Pin, Keep the pegs. Both buttons 180×56.

### Specialist choice

Panel 760×360. Title and body from the catalog. Two cards, 320×240, side by side, gap 24. Each card: the head drawing, the name, the lore line. Choosing a card confirms. There is no third card, no reroll, and no cost. Right click or the pause key does not confirm; Esc opens pause and the choice is still waiting underneath, with the fitting still unspent.

### Pause

Dim the board at 60% ink. Panel 480×460. Stacked buttons 400×56: Resume, Restart, Dock rule, Map select. Then Music and Effects sliders, 400×28, using those catalog labels. Restart returns to the deploy grace of the same mode. Map select does not write stars. Endless quit records the wave reached.

### Victory

Panel 520×440. Title “The jetty held.” Star tokens, `Hull {n}`, Mara’s bust and bark. If a Squall or Deadcalm pip was just earned, the one-line pip sentence. Buttons: Next map, Replay, Map select. Next map appears only after a campaign win, and only when the next map exists in this build. In v1 that hides it on Twin Mouths. From v2 on, that hides it on Open Bay. Squall, Deadcalm, and Endless do not show Next map. The Bell unlock bark replaces Mara’s usual line on the clear that causes the unlock.

### Defeat

Panel 520×400. Title “The jetty leaked.” The hint sentence. Mara’s bust and defeat bark. Retry, Map select.

### Endless end (v3)

Same panel as defeat, title “The tide went through.” Body: `Tide {n}` and `Best {best}`. Retry, Map select.

### Rotate prompt

Full screen, sea fill, one paper panel, the sentence “Turn the dock sideways.” No buttons. Dismissed by returning to landscape.

## Input priority

When a modal is open (dock rule, craft, specialist, pause, victory, defeat, Deadcalm confirm), only that panel receives input.

Otherwise:

1. HUD controls.
2. An armed Slip Knot, Hawser, or cleat.
3. A selected fitting: socket, pickup, locker, or cancel.
4. A ground pickup.
5. The boards, which sends the hero.
6. A seated fitting, which inspects.

Right click cancels arm and selection. It does not send the hero.

## Items and props

These are the only carryable things. Stats are in [RULES.md](RULES.md).

| Thing | What it is |
| --- | --- |
| Pocket fitting | A Grade I Pin, Spray, Net, Bell, or Bollard. Intact or not. Intact shows a brass dot on the icon. |
| Peg | A wooden peg. Cap 20. Spent only on the crafted Pin. |
| Floating cleat token | A placement charge for this map, not a pouch item. |
| Hull tick | A life, shown, not collected. |
| Campaign star | A best-score pip, not a currency. |
| Squall pip, Deadcalm pip | One each per map, not a currency. |

A repair uses a Bollard fitting. There is no repair-kit item.

These are not items in any version: gold, gems, crystals, keys, potions, scrolls, crates, skins, continues, boosters, hero shards, and any shop consumable.

Sockets, berths, the locker, and the leak gate are level pieces, not inventory.

## Campaign scripts

Intervals are between spawns. The countdown to the next wave begins when the last enemy of the current wave has spawned. Species names match [RULES.md](RULES.md). “White” and “red” are barge bands.

### Pilot Cove — 6 waves, countdown 12 s

| Wave | Spawns | Interval |
| --- | --- | --- |
| 1 | 5 Skiff | 1.6 s |
| 2 | 6 Skiff | 1.5 s |
| 3 | Skiff, Skiff, Dinghy, Skiff, Skiff, Dinghy, Skiff | 1.4 s |
| 4 | Skiff, Dinghy, Skiff, Dinghy, Skiff, Dinghy, Skiff, Dinghy | 1.3 s |
| 5 | 3 Skiff, then 6 Dinghy | 1.2 s |
| 6 | 4 Skiff at 0.4 s, then 4 Dinghy at 1.0 s, then 2 Skiff at 1.2 s | as written |

Reed enters at the start of wave 2. Hawser and the first paid Call Tide follow [RULES.md](RULES.md).

### Split Channel — 8 waves, countdown 15 s

North and south are the forks. A row that names one fork sends everyone that way. “split” alternates, starting north.

| Wave | Spawns |
| --- | --- |
| 1 | 6 Skiff, north, every 1.5 s |
| 2 | 4 Skiff north and 4 Skiff south, alternating, every 1.4 s |
| 3 | 5 Dinghy north, 3 Skiff south. The two groups start together, every 1.3 s inside a group |
| 4 | 4 Skiff north, then 2 white barge north. Skiffs every 1.2 s, barges 4 s apart, first barge with the third skiff |
| 5 | 4 Skiff north every 1.2 s. South: 3 Dinghy then 2 red barge, dinghies every 1.0 s, barges 4 s apart |
| 6 | 6 Dinghy, split, every 1.0 s, and 2 white barge north, 5 s apart |
| 7 | 2 red barge north and 2 red barge south, barges every 5 s alternating forks, plus 4 Skiff split every 1.2 s |
| 8 | 8 Dinghy split every 0.9 s, 3 white barge north every 4 s, 2 red barge south every 5 s |

### Twin Mouths — 8 waves, countdown 15 s

| Wave | Spawns |
| --- | --- |
| 1 | 5 Skiff west and 5 Skiff east, both groups at once, every 1.4 s |
| 2 | 4 Dinghy west every 1.0 s, 4 Skiff east every 1.3 s, both at once |
| 3 | 3 white barge west every 4 s, 4 Dinghy east every 1.0 s |
| 4 | 4 Kite west every 1.6 s, 4 Skiff east every 1.2 s |
| 5 | 3 Cutter east every 2.5 s, 4 Skiff west every 1.2 s |
| 6 | 4 Kite west every 1.4 s, 2 red barge west every 5 s, 3 Dinghy east every 1.0 s |
| 7 | 4 Cutter east every 2.2 s, 4 Dinghy west every 1.0 s, 2 white barge west every 5 s |
| 8 | 6 Kite west every 1.2 s, 4 Cutter east every 2.0 s, 4 Dinghy east every 0.9 s, 2 red barge west every 5 s |

### Narrow Pier — 9 waves, countdown 18 s (v2)

Single path, the pier.

| Wave | Spawns |
| --- | --- |
| 1 | 8 Skiff every 1.3 s |
| 2 | 6 Tarred Skiff every 1.4 s, then 4 Skiff every 1.2 s |
| 3 | 6 Outrider Dinghy every 0.8 s |
| 4 | 4 white barge every 4 s, 4 Skiff every 1.2 s, skiffs start with the first barge |
| 5 | 4 Cutter every 2.4 s, 4 Dinghy every 1.0 s |
| 6 | 4 red barge every 4.5 s, 4 Tarred Skiff every 1.3 s |
| 7 | 6 Outrider Dinghy every 0.7 s, 3 Cutter every 2.5 s |
| 8 | 4 white barge every 4 s, 4 Cutter every 2.2 s, 4 Kite every 1.4 s |
| 9 | 6 Cutter every 2.0 s, 6 Outrider Dinghy every 0.7 s, 3 red barge every 5 s |

### Fog Wharf — 8 waves plus the tug, countdown 18 s (v2)

| Wave | Spawns |
| --- | --- |
| 1 | 6 Skiff every 1.3 s, 4 Dinghy every 1.0 s after the skiffs |
| 2 | 4 Night-lantern Kite every 1.6 s, 4 Skiff every 1.2 s |
| 3 | 3 white barge every 4 s, 4 Outrider Dinghy every 0.8 s |
| 4 | 2 white Twin-stack every 6 s, 4 Night-lantern Kite every 1.5 s |
| 5 | 4 Cutter every 2.4 s, 4 Tarred Skiff every 1.3 s |
| 6 | 4 Night-lantern Kite every 1.4 s, 2 red barge every 5 s, 2 red Twin-stack every 6 s |
| 7 | 6 Cutter every 2.0 s, 4 Night-lantern Kite every 1.4 s |
| 8 | 4 white Twin-stack every 6 s, 6 Outrider Dinghy every 0.7 s, 4 Kite every 1.3 s |
| 9 | Wreck-tug, plus 1 Skiff every 10 s while it is alive |

Wave 9 has no countdown pay before a “wave 10.” The skiff trickle is part of the tug wave. Squall replaces wave 9 with a second copy of wave 8 and does not spawn the tug.

### Open Bay — 10 waves plus the tug, countdown 18 s (v2)

| Wave | Spawns |
| --- | --- |
| 1 | 8 Skiff every 1.2 s |
| 2 | 6 Dinghy every 0.9 s, 4 Skiff every 1.2 s |
| 3 | 4 Shearwater every 2.2 s, 4 Skiff every 1.2 s |
| 4 | 3 white barge every 4 s, 4 Kite every 1.4 s |
| 5 | 4 Shearwater every 2.0 s, 4 Outrider Dinghy every 0.7 s |
| 6 | 2 white Twin-stack every 6 s, 4 Night-lantern Kite every 1.5 s |
| 7 | 6 Shearwater every 1.8 s, 4 red barge every 4.5 s |
| 8 | 8 Kite every 1.0 s, 4 Cutter every 2.2 s |
| 9 | 4 red Twin-stack every 6 s, 6 Shearwater every 1.8 s |
| 10 | 8 Outrider Dinghy every 0.6 s, 4 white Twin-stack every 5 s, 4 Night-lantern Kite every 1.3 s |
| 11 | Wreck-tug, plus 1 Dinghy every 8 s while it is alive |

Squall replaces wave 11 with a second copy of wave 10.

## Acceptance

- v1 map select offers three maps, in order, and no mode buttons.
- Pilot Cove campaign teaches place, pickup, Reed, Hawser, and paid Call Tide on the schedule in [RULES.md](RULES.md).
- A competent starter-pouch run of Pilot Cove campaign lasts about 3 minutes and ends at hull 1 or better.
- The player cannot buy Spray, Net, Bell, Bollard, or a specialist with pegs.
- A leaked boat leaves no fitting.
- Specialist cards offer only the two heads of that family.
- v2 can save Squall and Deadcalm pips without erasing v1 stars.
- v3 Endless best persists, and a new save still meets the Pilot Cove lesson before Slip Knot appears.
