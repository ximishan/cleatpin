# Cleatpin art bible

Authoritative for look, silhouettes, and the drawing list. Combat numbers are in [RULES.md](RULES.md). Who appears in which version is in [DESIGN.md](DESIGN.md). Spoken lines are in [LORE.md](LORE.md).

Frame sizes below are the drawing canvas inside the 1280×720 board. The figure inside the frame is smaller, so the outline has air.

## Style

Chunky coastal-salvage cartoon. A friendly workshop on a bright dock. Thick outlines, flat fills, one shadow shape, readable silhouettes at game scale. PEGI 12. Light maritime folklore: the superstition is about pinning wrecks so they rest, told with boats and tools.

Shapes are circles, capsules, and wedges. Tools are bigger than hands. Eyes are dots. Mouths are short lines. Wood, rope, salt, tar, and brass do the work.

Water is two flat bands plus one foam stripe. The foam stripe is the only repeating motion on the background. Buildings and boats do not use gradients. The Fog Wharf lamp is a flat oval of light, not a glow shader.

Outline color is ink `#1C2430` everywhere.

| Subject | Outer outline |
| --- | --- |
| People, enemies, the tug | 4 px |
| Fittings, cleats, sockets | 3 px |
| UI panel border | 4 px |
| UI icons inside a panel | 2 px |

Round caps and round joins. One shadow shape per object: a single offset fill, 8 px down and 4 px right, black at 20% opacity, drawn before the main fill. No second outline, no sketch lines, no crosshatching.

Hit flash, used from v1: the outline swaps to paper `#F3E6C8` for 80 ms. Small enemies have no health bar. Damage is not a flying number.

## Palette

| Name | Hex | Use |
| --- | --- | --- |
| Ink | `#1C2430` | Outlines, text |
| Sea deep | `#1B4B6B` | Letterbox, deep water, Nia’s jacket |
| Sea mid | `#3E8EAB` | Upper water, glass |
| Foam / paper | `#F3E6C8` | UI panels, foam, moon, lamp |
| Teal | `#1F6F6A` | Reed’s cap, primary buttons |
| Plank | `#E6C48A` | Fresh boards, Nia’s hood |
| Wood | `#8C5A32` | Weathered planks, poles |
| Tar | `#3B2A1A` | Pitch, tar blotches, boots |
| Rope | `#C4A574` | Rope, pegs |
| Iron | `#5E666D` | Metal, Mara’s vest |
| Brass | `#D7A441` | Bells, stars, intact dot, selection |
| Signal | `#D6453D` | Reed’s neck cloth, low hull, invalid ghost |
| Seaweed | `#3E7C4A` | Mara’s scarf, patina shadows |
| Ochre | `#C47B3A` | Reed’s coat |
| Skin warm | `#E0A878` | Reed |
| Skin deep | `#8D5524` | Nia |
| Skin mid | `#C68642` | Mara |
| White | `#F7FBFC` | Salt spray, dinghy hull, flash is paper not pure white |
| Kite sail | `#F0D36A` | Kite cloth |

UI text on paper is ink. UI text on teal buttons is paper. Do not introduce a second highlight color for rarity. Intact is a brass dot, not a purple frame.

## What the pictures are

People wear work clothes and have two hands. Reed’s boathook is a tool they carry, with a wooden shaft and an iron hook at the end. It is not a hand.

Enemy boats have a painted bow mark (two dots and a short line). They have no crews. When they are stopped they pop into the fitting they drop: planks and the part, then the part lands. A leak pops into a foam ring at the gate and leaves nothing to loot. Nobody goes under the water. The Cutter’s teeth are four wooden triangles; a shear throws three wood-colored chips, `#E6C48A`, with no red.

The Wreck-tug is a crooked working tug. One porthole has a lamp on inside. Barnacles are round bumps on the waterline. A cleat on the bow is lashed with rope and does not sit in its socket. That is the broken rule, shown as carpentry. The stack leans. Phase 2 breathes three iron-gray puffs. No wounds, no teeth, no skull.

## Keep out of the art

- Grimdark docks, blood, bodies, bones, graves, drowning, and horror faces.
- Pirate-captain costume: tricorns, eye patches, hook-hands, peg legs, parrots on shoulders, skull flags, crossed cannons, rum bottles, treasure chests.
- Film-pirate lighting: moonlight shafts, soaked black coats, cursed crews.
- Pollen Pocket’s garden, bees, flowers, honey, and seed pockets.
- Idle and gacha chrome: gem counters, crate icons, rarity flames, portrait summons, lock-and-price silhouettes.
- Kingdom Rush’s medieval stone, banners, mages, and barracks troops.
- Fire, explosions, muzzle flashes, poison clouds, and magic runes. Pitch is tar. Salt is white droplets. A bell’s “aura” is a thin brass ring on the planks, the same language as a range ring.
- Guns. The Harpoon Pin is a thrown spike. Spray is a dock pump.

Allowed set dressing: rope coils, buckets, plain crates, a laundry line with one shirt, gulls, lamps, foam, barnacle bumps, a signal flag at the leak that only flutters. The flag is not a second hull meter.

## Bosun Reed (v1)

Silhouette at 48×72 inside a 96×96 frame: short, broad, coat to the knee, knit cap, boathook rising past the cap when carried on the shoulder. The hook is the long diagonal that separates Reed from Mara and Nia. At gameplay size the cap and the hook must still read.

| Piece | Color |
| --- | --- |
| Coat | Ochre `#C47B3A` |
| Cap | Teal `#1F6F6A` |
| Neck cloth | Signal `#D6453D`, a small triangle |
| Boots | Tar `#3B2A1A` |
| Boathook shaft | Wood `#8C5A32` |
| Hook | Iron `#5E666D` |
| Skin | `#E0A878` |

Personality on the face: level brows, a short mouth, calm. Celebrate adds a small smile. Downed: they sit on a rope coil, cap askew, one hand up. That pose is a rest, not an injury. No beard.

| Animation | Frames | Rate | Notes |
| --- | --- | --- | --- |
| Idle | 4 | 6 fps loop | Weight shifts, hook on shoulder |
| Walk | 6 | 10 fps loop | Coat swings |
| Hold | 2 | pose | Hook planted in a boat |
| Poke | 4 | 12 fps once | Short jab, returns to hold |
| Downed | 3, then hold | 8 fps | Sit on the coil |
| Return | 4 | 8 fps once | Climbs the home ladder |
| Celebrate | 4 | 8 fps once | Taps the hook on the boards |

## Mara Quay (v1 flavor)

Bust only, 96×96, on the victory and defeat cards. Not on the board.

Tall and narrow. Hair in a bun. A ledger held to the chest. Vest iron `#5E666D`, shirt paper, scarf seaweed `#3E7C4A` with two tails, skin `#C68642`. Expression: a small polite smile on victory, the same face with level brows on defeat. No scolding pose.

## Pip (v1 flavor)

A gull, 48×48, three frames: stand, blink, hop. White body, sea-deep wing tips, brass beak. Sits on the wordmark cleat and on the locker. Does not sit on Reed.

## Lighter-hand Nia Pell (v3)

Silhouette at 40×80 inside a 96×96 frame: taller than Reed, narrower, hood up, a hitching pole shorter than Reed’s hook and held across the body. The hood is a rounded oilskin shell, not a pointed hat and not a tricorn.

| Piece | Color |
| --- | --- |
| Hood | Plank `#E6C48A` |
| Jacket | Sea deep `#1B4B6B` |
| Sash | Brass `#D7A441` |
| Pole | Wood `#8C5A32` |
| Boots | Paper `#F3E6C8` |
| Skin | `#8D5524` |

Animations: idle (4), jog (6), shove (4), downed (sits in a tiny empty dinghy that is a prop, not an enemy), return (steps off that dinghy at the ladder). Same frame rates as Reed’s matching actions. Face: bright brows, short smile. Two hands.

The hero token on the HUD is the head-and-shoulders crop of whoever is selected.

## Fittings

Each family has a silhouette that survives without its color. Drawn in a 64×64 frame. The object fills about 40 px so a row of sockets still reads.

| Family | Silhouette |
| --- | --- |
| Pin | Vertical spike in a wooden shoe |
| Spray | Horizontal nozzle and a round pump |
| Net | Diamond mesh on a short post |
| Bell | Bell shape on a bracket |
| Bollard | Thick post, wider than a Pin, with a rope loop |

Grade changes are additive and obvious at 64 px:

| Family | I | II | III |
| --- | --- | --- | --- |
| Pin | One short spike | Spike plus an iron collar | Two spikes in a V, taller |
| Spray | Copper pump, short nozzle | Bigger bulb, wider mouth | Two nozzles |
| Net | Small square net | Longer skirt | Corks and lead weights at the corners |
| Bell | Small brass bell | Larger, clapper visible | Bell plus a small sound-board behind it |
| Bollard | Plain post, one rope loop | Thicker post, two loops | Post with a cross bar |

Specialists replace the Grade III drawing. They do not add a floating “+” or a glow.

| Head | Drawing |
| --- | --- |
| Harpoon Pin | One long barbed shaft leaning toward the channel. Sea-mid wrap on the butt. |
| Needle Pin | A cluster of thin brass needles. |
| Salt Burst | Wide fan nozzle with a white salt crust. |
| Pitch Flask | Narrow nozzle and a flask in `#6B3E1E`. One tar drip `#3B2A1A`, no flame. |
| Drift Net | A wide pale net, almost horizontal. |
| Hook Net | A short net with one iron hook in the middle. |
| Harbor Bell | Thick-rimmed bell in bronze `#A56B2A`. |
| Fog Bell | Green-patina bell `#3E7C4A` and a small paper lamp beside it. |
| Chain Bollard | The post draped with a heavy iron chain. |
| Spring Bollard | The post on a visible coil. One safety-yellow band `#F0D36A` around the post. |

Projectiles, 16×16: Pin is a dark dash, Harpoon a longer dash, Needle a brass speck, Spray a fan of three white droplets, Pitch three tar droplets, Net a diamond loop. They are flat shapes, not particles, in v1.

Bell aura and range rings: 2 px paper or brass circle, no fill, no runes.

A broken Bollard drops its rope loop so it hangs. The post stays. Repair restores the loop.

## Heave Hawser and Slip Knot

Hawser icon, 80×80 button: a rope coil with one signal-red whipping. World object: a thick rope coil, about 56 px across, on the channel, gone after the hold. No magic circle.

Slip Knot icon: the same coil with the whipping undone and one loose end. World effect: the targeted coil or bollard rope goes slack, and the held boats slide back. No new creature and no projectile.

## Props

| Prop | Drawing |
| --- | --- |
| Socket | Iron ring in the plank. Empty center is sea-deep. Brass rim. 48 px. |
| Edge socket | The same ring with a rope stripe painted on the plank beside it. |
| Berth | Dashed foam circle on the water, 56 px. |
| Floating cleat | Wooden float, a rope, two iron horns. Once placed, the horns frame a socket ring. |
| Peg | Round peg with a hole, rope color, 32 px icon. |
| Intact mark | 8 px brass dot on the corner of a pocket icon. Non-intact has no dot. |
| Hull tick | A cleat-shaped tick, teal when full, broken outline when lost. |
| Star | A brass five-point star on a wood token. |
| Locker | A small crate with Pip’s perch on the lid. |
| Pocket slot | A paper square with a 2 px ink line. |

## Enemies

Painted bow mark on every boat. No people aboard. Variants keep the base silhouette and add one readable piece.

| Enemy | Frame | Body | Version |
| --- | --- | --- | --- |
| Skiff | 72×48 | 56×32 faded blue hull `#3E8EAB`, one low peak | v1 |
| Dinghy | 96×40 | 72×24 white hull, one orange stripe `#D6453D`, two spinning oars with no hands | v1 |
| Barrel barge | 112×64 | 88×48 raft, three plain barrels in a pyramid. White band or red band on the near barrel | v1 |
| Kite | 64×80 | Diamond sail `#F0D36A`, blue spars `#1B4B6B`, a string drawn down that does not collide | v1 |
| Cutter | 104×48 | 80×28 sea-green hull `#3E7C4A`, four wooden saw teeth at the bow | v1 |
| Tarred Skiff | same as Skiff | A 16 px tar blotch on the stern | v2 |
| Outrider Dinghy | 108×40 | Dinghy with a bow extended 12 px | v2 |
| Twin-stack | 128×80 | 96×64 raft, five barrels. White or red band on the top barrel | v2 |
| Night-lantern Kite | 64×88 | Kite plus a 12 px paper lamp | v2 |
| Shearwater | 116×48 | Cutter hull lengthened, six wooden teeth | v2 |
| Wreck-tug | 192×128 | 160×96, stack leaned left, lit porthole, barnacle bumps, a badly lashed bow cleat | v2 |

Animations for the small enemies: bob (4 frames, 6 fps), hit (already the outline flash), break (4 frames, planks pop, the drop is revealed), leak (4 frames, foam ring, no wreck left behind). Oars on the Dinghy are a 4-frame spin. The kite bobs vertically. The tug uses bob, hit flash, phase-2 puffs, and the same break into pegs.

## Maps, light, and UI illustration

Day maps (everything except Fog Wharf) use sea mid on top of sea deep, plank decks, and a paper sky band at the top of the water. Shadows are the standard 20% shape. The mood is warm daylight.

Fog Wharf is the same dock at low light, not a horror night. Water bands shift to `#0E2A3A` and `#1B4B6B`. A paper moon, a flat coin, sits in the sky. A veil of `#C9D6DC` at 40% opacity covers the top third only. Sockets, fittings, and enemies keep their full daytime colors so they read. Two practical lamps use paper ovals. Fog Bell’s little lamp matches those ovals, which is the joke of the map: the tool looks like the dock.

Map card paintings and the title background are the same style, static, no text inside the painting. The wordmark is wooden block letters; the T is a cleat. Draw it. Do not set it in a commercial display face.

UI icons are the objects themselves, reduced, not a second pictogram language. Pause is two vertical planks. No hamburger, no gear made of metal teeth if a simple rope slider will do. Sliders are rope tracks with a peg for a thumb.

## Juice, split by version

v1, for readability:

- Outline hit flash
- Intact brass glint, one frame, on an intact drop
- Placement ghost and range ring
- Hull tick breaking
- Foam ring at the leak

v3, polish on top of those:

- Four brass triangles, 120 ms, when a Pin hits wood
- A foam puff, 200 ms, when a fitting seats
- The water stripe scrolls 8 px/s
- A 2 px camera hitch for 100 ms on a leak, and no other screenshake
- Original sound, below

No blood decals and no damage numbers in either pass.

## Sound (v3)

Original cues only. Ensemble: accordion, plucked gut string, woodblock, and a soft brass bell. Major key, moderate tempo, short loops per map. Fog Wharf is the same ensemble, quieter, with the bell a little more often. No choir and no low drone.

| Cue id | Picture it matches |
| --- | --- |
| ui_click | A woodblock tap |
| pin_place | A peg seating |
| pin_shot | A thin tick |
| spray | A short splash |
| net | Rope whisk |
| bell | Soft brass, short |
| bollard_break | A rope snap |
| hawser_drop | A heavy coil |
| slip_knot | A knot pulling loose |
| hull_leak | One low woodblock |
| wave_call | A single bell |
| pickup | A light tick |
| recycle | Two wood ticks |
| victory | Four-bar tag |
| defeat | Two-bar tag, same key, no sting of punishment |
| boss | The map loop plus a slow woodblock. No new theme with lyrics |

v1 and v2 ship silent. The volume sliders are already in pause. v3 fills them. Do not drop in a temporary track from another score.

## Drawing checklist

Counts are unique drawings, not animation frames. Frames are specified above.

**v1:** Reed’s seven animations. Mara bust. Pip, three frames. Skiff, Dinghy, Barrel barge, Kite, Cutter, each with bob, break, and leak. Five families × five heads (I, II, III, and two forks) = 25 fittings. Socket, edge stripe, berth, floating cleat, peg, hull tick, star, locker, pocket slot, Hawser icon, Hawser coil, wordmark, title background, three map paintings. Wood chips for the shear. Projectile shapes.

**v2:** Five variants (tar blotch, longer bow, twin-stack, kite lamp, extra teeth) and the Wreck-tug. Three map paintings. Boss timber track. Squall can reuse the map painting with a paler sky band `#C9D6DC` at the top. Deadcalm reuses it with a still water stripe (no scroll) and a flat paper horizon. Those are treatments, not new maps.

**v3:** Nia’s animations and token. Slip Knot icon. Endless has no new illustration; Pilot Cove’s painting is reused, and the tide label carries the mode.

No sprite is pulled from another game, and no sheet is a trace of a film still.
