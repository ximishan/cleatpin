# Cleatpin rules

Authoritative for mechanics and numbers. Version gates are summarized here and specified as ship lists in [DESIGN.md](DESIGN.md). Player-facing sentences are in [LORE.md](LORE.md). Drawing is in [ART.md](ART.md).

These numbers are the first implementation target. A playtest may tune a number in a later revision of this file. A playtest may not add a currency, a shop, a fitting family, or a character.

Logical space is 1280×720. One pixel in these rules is one pixel in that space. Time is seconds. Enemy health is timber. The jetty’s lives are hull.

The sim runs at 1× speed in every version. Pause freezes enemies, spawns, countdowns, cooldowns, holds, and Reed’s recovery. Pausing when the browser tab is hidden is required. There is no mid-map checkpoint. Refreshing the page starts the current map over. localStorage is written between maps, and when settings change, and when an Endless run ends.

Target: a steady 60 fps on a 2018 laptop with integrated graphics in Chrome, with up to 24 enemies alive.

## Pitch and hook

Last-hit wreckage becomes the next fitting you pin into the jetty. Your defense is built from what you just stopped.

You start with a tiny pouch. When a boat breaks, a part drops. You pin it into a socket, or you feed an intact part into a socket you already own. Under pressure you choose whether to open a socket or to upgrade one.

A leaked boat drops nothing. Salvage comes from boats you stopped.

## Structure we use, and likenesses we keep out

Cleatpin uses the campaign feel of a chokepoint tower defense:

- Discrete maps, and a gentle first map that can be won in about 3 minutes.
- Preset sockets on a readable channel, plus 1 or 2 floating cleats on preset berths.
- An optional early call of the next wave, paid in a small bonus, at the risk of an overlap.
- One hero the player sends along the boards.
- Three grades on a fitting, then a two-way specialist choice.
- One targeted ability on a cooldown, with no resource cost, in v1 and v2. v3 adds a second specified ability.
- A hull pool and stars.
- Two post-clear challenges, Squall and Deadcalm, in the spirit of a hard clear and a one-life clear.
- Bollard as a path blocker with a cap, so the channel can be held and cannot be rebuilt into a maze.

The salvage hook wins when it conflicts with that structure. There is no gold shop and no stipend of finished specialist parts.

Keep these out of every version. They are crowded on the portal we are aiming at, or they are someone else’s game:

- Idle growth, offline rewards, daily quests, stamina, and long upgrade trees that tick while the player is away.
- A match-3 or merge board. A fork is a choice on one socket.
- A hero roster, gacha, crates, boosters, accounts, clans, or multiplayer.
- Lawn lanes of planted characters, or an energy grid you paint across open ground.
- Free placement of walls anywhere on the map.

Kingdom Rush names and kits stay out. Do not use that game’s tower quartet (archer, barracks, mage, artillery), its hero names, Rain of Fire, Call Reinforcements, its specialist names (including Holy Order and Tesla-style names), its soldier rallies, or its art. Our call pays pegs, not gold, at 1 peg per 5 seconds, not 1 per second. Our hull is 10, and our star bands are our own. Bollards do not train soldiers.

Other titles we do not trade on: Wrack, WREKPIN, Wrackline, Holdfast. The working title is Cleatpin. A trademark check happens before launch. No domain is purchased as part of this design.

## Versions in one view

Three versions. The complete design is v1 plus v2 plus v3. Features marked v2 or v3 are already specified so art and UI stay consistent. They are not a license to invent more.

| | v1 Basic Launch | v2 Full Campaign | v3 Post-launch |
| --- | --- | --- | --- |
| Maps | Pilot Cove, Split Channel, Twin Mouths | Narrow Pier, Fog Wharf, Open Bay | No new map |
| Fittings | All 5 families, Grades I–III, both forks | Same heads | Same heads |
| Enemies | Skiff, Dinghy, white and red Barrel barge, Kite, Cutter | Tarred Skiff, Outrider Dinghy, white and red Twin-stack, Night-lantern Kite, Shearwater Cutter, Wreck-tug | Same roster |
| Hero and abilities | Bosun Reed, Heave Hawser | Same | Slip Knot, and Nia Pell as an alternate to Reed |
| Modes | Campaign | Squall, Deadcalm | Endless Tide on Pilot Cove |
| Save | localStorage | Same key, extra fields | Same key, extra fields |

Forever, in every version: no gold, no gems, no shop, no database, no accounts, no ads, no cross-promo, no multiplayer, no crates, no second currency, no custom fullscreen button.

## Core loop

1. The map loads on the 1280×720 board. The player gets a 2.0 second deploy grace. No enemies, no Call Tide pay. Sockets and berths are visible. The starter pouch is full.
2. Placed fittings act on their own. Reed acts only when sent.
3. A stopped enemy drops what its row says in the enemy table. A leaked enemy drops nothing.
4. A clean last hit makes that drop **intact** when the drop is a fitting. Any other stop makes a **non-intact** Grade I fitting, or the messy peg amount for enemies that drop pegs.
5. A fitting that drops within 120 px of Reed, or within 80 px of a socket the player owns, flies into the pouch if a slot is free. Otherwise it lands on the boards as a pickup. Tap or click a pickup to pocket it.
6. The pouch has 4 slots. A 5th fitting stays on the ground. At most 8 ground pickups exist. A 9th converts the oldest pickup into 1 peg and shows nothing else.
7. The player snaps a pouch fitting into an empty legal socket, plants a floating cleat and then snaps into it, or feeds a matching intact fitting into an occupied socket.
8. A wrong feed is rejected. The fitting stays selected. The toast catalog in [LORE.md](LORE.md) covers the reasons.
9. If the pouch is the wrong mix, the player recycles one fitting for pegs and may craft one non-intact Grade I Pin. Pegs never buy Spray, Net, Bell, Bollard, or any specialist.

Each map starts from the starter pouch. Fittings, pegs, hull, and broken bollards do not carry to the next map. Stars, the starter choice, settings, tips, and Endless best do.

### Clean last hit

All of these are true:

1. The blow that sets timber to 0 is from a Pin of any grade or specialist, or from Bosun Reed’s poke.
2. In the previous 1.5 seconds that enemy took no Spray damage, no Hook Net yank, and no shove (Spring Bollard, Slip Knot, or Nia).
3. Slows from Net, Drift Net, Pitch slick, and Heave Hawser do not spoil the hit. A Bollard hold does not spoil the hit.

Needle Pin is the exception on rule 2: the spoil window is 0.6 seconds instead of 1.5. The killing blow must still be the Needle Pin or Reed.

Nia’s shove never produces an intact drop. A shove that stops the boat is messy even if the window would have been clean.

### Seating rules

- Empty legal socket plus any Grade I fitting of a family seats that family at Grade I. The intact flag is not stored on the socket.
- Grade I plus an intact fitting of the same family becomes Grade II. Grade II plus an intact fitting becomes Grade III. Grade III plus an intact fitting opens the specialist choice. Confirming consumes the fitting and sets the head. Cancelling keeps the fitting selected.
- A specialist accepts no further fitting. Toast: finished head.
- A non-intact fitting seats an empty socket. It repairs a broken Bollard of the same family, keeping the current grade or specialist. It does not upgrade a healthy socket.
- An intact Bollard fitting fed to a broken Bollard repairs it and does not also upgrade it.
- A seated fitting stays for the map. The player cannot sell or swap it. A Cutter is the only unseat.
- Lane sockets and floating cleats accept Pin, Spray, Net, and Bell.
- Edge sockets accept those four and Bollard. They are drawn with a rope stripe.
- At most 2 Bollards are placed on a map, including broken ones. The cap toast fires on the third attempt.
- Campaign Pilot Cove refuses the feed that would leave Grade II toward Grade III. Toast: grade cap. Squall, Deadcalm, and Endless on that map allow Grade III and the fork.

### Pegs

| Action | Result |
| --- | --- |
| Recycle a non-intact Grade I | +2 pegs |
| Recycle an intact Grade I | +3 pegs |
| Craft | −4 pegs, gain one non-intact Grade I Pin |
| Call Tide | +1 peg per 5 whole seconds left on the countdown, rounded down |
| Oldest pickup over the ground cap | +1 peg |
| Cutter, messy stop | +2 pegs |
| Cutter, clean stop | +3 pegs |
| Shearwater Cutter, messy / clean | +3 / +4 pegs |
| Wreck-tug stopped | +6 pegs |

Pegs cap at 20. Overflow shows “Pegs full.” and is lost. Craft is the only spend. The crafted Pin is non-intact, so it seats a socket and cannot be the feed for a grade or a fork.

Recycle: drag a part to the locker, or select it and activate the locker. Craft: activate the locker with nothing selected, then confirm. Confirm text is in [LORE.md](LORE.md).

### Starter pouch

Default, every map: two non-intact Grade I Pins and one non-intact Grade I Spray.

After 3 distinct campaign maps have been cleared once, the map select may offer the Bell starter: one Pin, one Spray, one Bell, all non-intact Grade I. The choice is stored. It is not a purchase. Replays of one map do not add clears.

## Win, lose, hull, stars

The jetty has 10 hull in Campaign and in Endless. Squall starts at 3. Deadcalm starts at 1.

A leak removes the boat and costs hull:

| Leak | Enemies |
| --- | --- |
| 1 | Skiff, Tarred Skiff, Dinghy, Outrider Dinghy, Kite, Night-lantern Kite |
| 2 | Barrel barge (either band), Cutter, Shearwater Cutter |
| 3 | Twin-stack Barge (either band), Wreck-tug |

Hull at 0 is a loss. The map restarts from the deploy grace if the player retries. Stars are not awarded.

Clearing every spawned enemy of every wave, with hull at least 1, wins Campaign, Squall, and Deadcalm.

Campaign stars from hull remaining at the win:

| Hull left | Stars |
| --- | --- |
| 9–10 | 3 |
| 5–8 | 2 |
| 1–4 | 1 |

A replay keeps the best campaign star count. It never lowers it.

Squall and Deadcalm each store a single pip. Winning that mode sets the pip. The pip does not clear campaign stars, and campaign stars do not clear the pip.

The next campaign map unlocks when the previous one is cleared at least once. Stars do not gate the next campaign map.

Squall unlocks on a map when that map’s campaign has been cleared once. Deadcalm unlocks when that map’s campaign stars are 3.

The Bell starter counts campaign clears, not stars.

There is no star-upgrade room.

## Call Tide

After wave 1’s last enemy has spawned, a countdown to the next wave is visible. Calling it starts the next wave now. Enemies already on the channel stay, so the packs can overlap. When the timer reaches 0 the next wave starts on its own and pays nothing.

Pay uses the whole seconds still showing: `pegs = floor(seconds / 5)`, and Heave Hawser’s remaining cooldown loses that many **seconds** (the seconds on the timer, not the peg count). A 14 second call pays 2 pegs and shaves 14 seconds. A call with 0–4 seconds left pays 0 and still overlaps. Shave cannot reduce a cooldown below 0. Shave applies only when Heave Hawser is already unlocked. Slip Knot is never shaved.

Calling wave 1 is impossible. The deploy grace is not Call Tide.

Campaign Pilot Cove, including replays: the countdown into wave 2 shows `+0 pegs` and does not shave. The countdown into wave 3 is the first paid Call Tide. Heave Hawser appears when wave 3 actually starts, so the call that starts wave 3 pays pegs and does not shave.

Every other map and mode: the first countdown is already paid, and Heave Hawser is available during the deploy grace, except where Deadcalm says Reed stays ashore. Hawser still exists in that Deadcalm.

Countdown lengths are in the map table. The button label is Call Tide.

## Hero: Bosun Reed

One hero in v1 and v2. Reed walks the boards polyline, not the water. The player sends Reed by activating a point on the boards. Reed is mid-strength: useful for a clean last hit on a barge, not enough to clear a wave alone.

| Stat | Value |
| --- | --- |
| Move speed | 140 px/s |
| Hold | 1 ground enemy within 36 px, while Reed is within 40 px of the channel |
| Poke | 7 timber every 0.7 s while holding |
| Reed’s timber | 80 |
| Contact | The held enemy deals 4 timber per second to Reed |
| Downed | 8 s, then Reed returns at the home mark with 80 timber |
| Kites | Reed cannot hold or poke them |

Campaign Pilot Cove: Reed enters at the home mark when wave 2 starts. Tips fire once. On every other campaign map Reed is present in the deploy grace.

Deadcalm: Reed is absent on Pilot Cove and Split Channel, and present on Twin Mouths, Narrow Pier, Fog Wharf, and Open Bay.

Reed has no second form and no inventory.

### Lighter-hand Nia Pell (v3)

Unlocked when all 6 campaign maps are cleared. Until then the game is Reed-only and the hero control is hidden. After unlock, map select chooses Reed or Nia before a map. One of them is on the boards. They do not appear together.

| Stat | Value |
| --- | --- |
| Move speed | 160 px/s |
| Shove | Closest ground enemy within 40 px, 10 timber, push 100 px back along the channel, every 1.4 s |
| Clean drops | Never. A shove stop is messy |
| Nia’s timber | 60 |
| Contact | 4 timber per second while an enemy is within 40 px |
| Downed | 8 s, then the home mark, timber refilled |
| Kites | No shove, no contact |
| Wreck-tug | 10 timber, no push |

A push that would pass the entrance parks the enemy at progress 0.

On maps where Reed would be absent (Deadcalm on the first two maps), Nia is absent too. The “stays ashore” rule is about the hero slot, not about Reed’s name.

## Heave Hawser

The v1 ability. Cost 0. Button, or the H key. The next channel click drops a coil if the point is within 8 px of the channel polyline; otherwise the point snaps to the nearest channel point within 48 px, and farther clicks toast nothing and keep the arm. Activating the button again, or a right click, cancels the arm. Esc pauses instead of cancelling.

| Stat | Value |
| --- | --- |
| Radius | 56 px |
| Hold | Up to 4 ground enemies, speed 0, for 3.5 s |
| Cooldown | 18 s, starting when the coil drops |
| Kites | Unaffected |
| Wreck-tug | Not rooted and does not take a slot. Speed ×0.85 while the coil overlaps it |

Campaign Pilot Cove: the button appears when wave 3 starts. Elsewhere: available in the deploy grace.

Holding a pack does not spoil clean Pin last hits. That is deliberate.

### Slip Knot (v3)

Cost 0. Button, or the J key. Cooldown 24 s from the moment it fires. Call Tide does not shave it.

The player targets an active Hawser coil or a Bollard that is currently holding at least one enemy. The hold ends at once. Each enemy that was in it is pushed 100 px back, with the same entrance rule as Nia’s shove. The Wreck-tug is not pushed. The ability does no damage and drops nothing.

Slip Knot stays hidden on campaign Pilot Cove until that map has been cleared at least once. After that, it is available during the deploy grace on every map. The first three minutes of a new save stay on pin, Reed, and Hawser.

## Fittings

Range is the center of the socket to the enemy origin. Projectiles that are still in flight when the target is gone splash or miss as the row says. Priority for Pin, Spray, and Net: the enemy in range with the greatest channel progress. Ties go to the earliest spawn. Fittings do not spread targets. Kites share the progress scale with boats.

Listed damage is the base. Harpoon’s ×1.5, when max timber is 80 or more, applies first. Then multiply by the winning bell damage bonus, or by 1 when no bell reaches the fitting. If Fog Bell’s kite bonus applies to this hit, multiply by 1.25 as well. Spray-family hits then multiply by the target’s splash taken. Round half up to an integer. A hit whose base was at least 1 deals at least 1 after resistance. A base of 0 stays 0.

Bell picks no target. Two damage auras do not add; the higher damage bonus applies. Fog Bell’s range bonus and kite bonus still apply alongside another bell’s damage bonus. Two Fog Bells do not stack those extras. Bell does not change Net duration, Hawser, or Bollard holds.

| Head | Range | Damage | Interval | Extra |
| --- | --- | --- | --- | --- |
| Pin I | 150 | 8 | 0.55 s | Projectile 640 px/s. Misses if the target is gone. |
| Pin II | 165 | 11 | 0.50 s | Same projectile. |
| Pin III | 175 | 14 | 0.48 s | Same projectile. |
| Harpoon Pin | 250 | 22 | 0.85 s | Projectile 480 px/s. Damage ×1.5 if the enemy’s max timber is 80 or more. |
| Needle Pin | 140 | 6 | 0.28 s | Projectile 720 px/s. Spoil window 0.6 s. |
| Spray I | 110 | 5 | 1.10 s | Splash radius 36. Base 5 on each enemy in the splash. |
| Spray II | 120 | 7 | 1.05 s | Splash 42. |
| Spray III | 125 | 9 | 1.00 s | Splash 46. |
| Salt Burst | 120 | 6 | 1.15 s | Splash 70. |
| Pitch Flask | 115 | 8 | 1.20 s | Splash 32. Leaves a slick of radius 32 for 3 s. Ground enemies in it move at ×0.55. Kites ignore it. A new slick replaces the old one from that socket. |
| Net I | 130 | 0 | 1.40 s | Loop projectile 420 px/s. One ground enemy, speed ×0.60 for 2.0 s. Misses kites. |
| Net II | 130 | 0 | 1.30 s | Speed ×0.50 for 2.4 s. |
| Net III | 140 | 0 | 1.20 s | Speed ×0.45 for 2.8 s. Hits the priority target and the next ground enemy in range. |
| Drift Net | 80 | 0 | 1.60 s | No projectile. Every ground enemy in range, speed ×0.65 for 2.0 s. |
| Hook Net | 140 | 0 | 2.20 s | One ground enemy, yank 90 px back, then speed ×0.70 for 1 s. Kites and the Wreck-tug are immune. |
| Bell I | 100 | — | always | Fittings in range: damage ×1.15. |
| Bell II | 110 | — | always | Damage ×1.25. |
| Bell III | 120 | — | always | Damage ×1.35. |
| Harbor Bell | 120 | — | always | Damage ×1.55. |
| Fog Bell | 140 | — | always | Damage ×1.15, +20 range on fittings in the aura, and Pins deal ×1.25 to kites that are inside the aura when the hit lands. |
| Bollard I | hold 48 | 0 | — | Holds 2 ground enemies for 4 s, then breaks. |
| Bollard II | hold 48 | 0 | — | Holds 2 for 6 s, then breaks. |
| Bollard III | hold 48 | 0 | — | Holds 3 for 6 s, then breaks. |
| Chain Bollard | hold 48 | 0 | — | Holds 4 for 8 s, then breaks. |
| Spring Bollard | hold 48 | 0 | — | Holds 2 for 5 s. On break, shoves those enemies 80 px back. The Wreck-tug is not shoved. |

A broken Bollard holds nobody until a Bollard fitting repairs it. Repair is instant and keeps the head.

The Wreck-tug breaks any bollard hold after 1.5 s, whatever the head says. The bollard breaks. Other enemies in that hold are released, and a Spring still shoves those others.

Specialist stats replace the Grade III line. They are not stacked on top of it.

## Enemies

Boats move along the channel polyline at the listed speed. Progress is distance traveled. Kites use the same polyline in the air and ignore blockers.

Splash resistance multiplies Spray-family damage only.

If 24 enemies are alive, the spawner waits. The wave still owes its full count.

| Id | Version | Timber | Speed | Leak | Splash taken | Drop |
| --- | --- | --- | --- | --- | --- | --- |
| Skiff | v1 | 24 | 60 | 1 | ×1 | Pin |
| Dinghy | v1 | 18 | 110 | 1 | ×1 | Net |
| Barrel barge, white band | v1 | 90 | 40 | 2 | ×0.50 | Spray |
| Barrel barge, red band | v1 | 90 | 40 | 2 | ×0.50 | Bollard |
| Kite | v1 | 30 | 70 | 1 | ×1 | Bell |
| Cutter | v1 | 46 | 75 | 2 | ×1 | Pegs, 2 messy / 3 clean |
| Tarred Skiff | v2 | 36 | 60 | 1 | ×1 | Pin |
| Outrider Dinghy | v2 | 20 | 130 | 1 | ×1 | Net |
| Twin-stack, white band | v2 | 140 | 36 | 3 | ×0.35 | Spray |
| Twin-stack, red band | v2 | 140 | 36 | 3 | ×0.35 | Bollard |
| Night-lantern Kite | v2 | 36 | 64 | 1 | ×1 | Bell |
| Shearwater Cutter | v2 | 60 | 80 | 2 | ×1 | Pegs, 3 messy / 4 clean |
| Wreck-tug | v2 | 480 | 28 | 3 | ×0.50 | 6 pegs |

Kites, including the Night-lantern, ignore Net, Bollard, Heave Hawser, Slip Knot, Hook Net, Spring shove, Nia’s shove, Pitch slick, and Reed’s hold. Pins and Sprays hit them. Fog Bell’s kite bonus applies to both kite types.

Cutter: the first time its origin comes within 36 px of a Grade I socket, that fitting is unseated. The socket empties. The fitting becomes a ground pickup of a non-intact Grade I of the same family. The Cutter loses 8 timber. Grades II and up stay seated. A socket the player refills can be sheared again.

Shearwater Cutter uses the same rule on Grade I and Grade II. A sheared Grade II pickup is a non-intact Grade I, and the toast is the sheared line. Grade III and specialists stay seated.

Wreck-tug, campaign only, Fog Wharf and Open Bay, never in Squall or Deadcalm:

- Immune to yank and to every shove.
- Phase 1, timber above 240: speed 28.
- Phase 2, timber at or below 240: speed 36. Every 12 s it sheds a normal Skiff slightly behind it, and at most 6 of those adds are alive at once.
- Adds stop spawning when the tug stops. Adds already on the channel still have to be stopped or leaked before the win.
- No unique fitting and no chest.

A locked family in Deadcalm never enters the pouch. If a spawned enemy would drop that family, the player receives 2 pegs, or 3 if the stop would have been intact. Scripts below avoid that case on purpose. The conversion is the safety net.

## Maps

The channel is water. The boards are the walkway. Sockets sit on the boards. Edge sockets sit on the rope stripe at the channel edge. Berths are dashed marks on the water. A floating cleat token becomes a lane socket when placed on a berth. Tokens that are not planted do nothing. Cleats cannot be picked up. Minimum distance between socket centers is 72 px.

Camera: the whole map is in frame. No pan and no zoom in any version. If a layout does not fit, the layout changes, not the camera.

| Map | Version | Lane | Edge | Berths | Cleat tokens | Skiff travel if untouched | Countdown | Waves |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pilot Cove | v1 | 4 | 0 | 1 | 1 | 18 s (1080 px at 60 px/s) | 12 s | 6 |
| Split Channel | v1 | 5 | 2 | 1 | 1 | 22 s north, 26 s south | 15 s | 8 |
| Twin Mouths | v1 | 5 | 2 | 2 | 2 | 20 s either mouth | 15 s | 8 |
| Narrow Pier | v2 | 4 | 2 | 2 | 2 | 26 s | 18 s | 9 |
| Fog Wharf | v2 | 5 | 2 | 2 | 2 | 24 s | 18 s | 8, then the tug |
| Open Bay | v2 | 6 | 2 | 2 | 2 | 30 s | 18 s | 10, then the tug |

Spawn scripts, Deadcalm packs, and Squall’s multiplier are in [DESIGN.md](DESIGN.md). Those scripts are authoritative for who arrives.

Path names for hints: Pilot Cove has the inlet. Split Channel has the north fork and the south fork. Twin Mouths has the west mouth and the east mouth. Narrow Pier has the pier. Fog Wharf has the fog channel. Open Bay has the bay.

Leak attribution uses the fork or mouth the enemy took. Single-path maps use their one name.

### Modes

**Campaign.** Hull 10. Unlocks in order. Pilot Cove caps seats at Grade II. Other maps allow the fork. Bosses only on the two v2 maps that list them.

**Squall (v2).** Same layout and the same enemy species as that map’s campaign, with no Wreck-tug. If the campaign’s last wave is the tug, Squall replaces it with a second copy of the previous wave. Every spawn count in the script is multiplied by 1.4 and rounded up. Countdown is 8 s on every map. Hull starts at 3. Forks are allowed, including on Pilot Cove. One pip for a win. No separate star band.

**Deadcalm (v2).** One dense wave, hull 1, forks allowed. Some families are locked: their parts cannot be seated. A starter fitting whose family is locked is removed from the pouch. If that would empty the pouch, the player receives one non-intact Grade I of the first unlocked family in this order: Pin, Spray, Net, Bell, Bollard. The Bell starter on a Bell-locked map simply arrives without the Bell. With Nia selected, Fog Wharf Deadcalm grants no intact fittings, because Pins are locked and Nia’s shove is always messy. The mode is still seated with Grade I parts. Bosun, or Nia if selected, is ashore on maps 1 and 2 and aboard from map 3. Winning sets one pip.

| Map | Locked families | Hero aboard | Pack |
| --- | --- | --- | --- |
| Pilot Cove | Spray, Bell, Bollard | No | 70 s: 18 Skiff, 12 Dinghy. At 0 s, 6 Skiff. At 15 s, 6 Skiff and 4 Dinghy. At 35 s, 6 Skiff and 8 Dinghy. |
| Split Channel | Bell | No | 80 s: 10 Skiff, 8 Dinghy, 6 white barge, 4 red barge. Evenly across both forks, barges on the south fork. |
| Twin Mouths | Bollard | Yes | 80 s: 8 Skiff, 8 Dinghy, 6 Kite, 6 Cutter, 4 white barge. Kites on the west mouth. |
| Narrow Pier | Spray | Yes | 85 s: 8 Tarred Skiff, 8 Outrider Dinghy, 6 Cutter, 4 red barge. |
| Fog Wharf | Pin | Yes | 90 s: 8 Night-lantern Kite, 6 Dinghy, 4 white Twin-stack, 4 Cutter. Reed or Nia is the only clean last-hit source, because Pins cannot be seated. |
| Open Bay | Net | Yes | 90 s: 8 Shearwater, 6 Kite, 4 red Twin-stack, 6 Skiff, 4 white barge. |

**Endless Tide (v3).** Pilot Cove only. Unlocks after campaign Pilot Cove is cleared once. Does not grant campaign stars and does not count as a campaign clear. Hull 10. Forks allowed. Roster is Skiff and Dinghy only. Reed’s tutorial schedule does not apply: the selected hero and Heave Hawser are available in the grace, and Call Tide pays from the first countdown. Slip Knot follows its own unlock.

Wave `n` from 1 upward:

- Count = 4 + n.
- Dinghies = floor((n − 1) / 2). The rest are Skiffs.
- Spawn interval = max(0.45, 1.6 − 0.05 × (n − 1)) seconds.
- Timber = base timber × (1 + 0.08 × (n − 1)), rounded to the nearest integer.
- Countdown after the wave’s last spawn = max(6, 12 − floor((n − 1) / 3)) seconds.

The run ends at hull 0 or when the player quits from pause. The wave reached is the highest `n` that spawned at least one enemy. localStorage keeps the best.

## Controls

Desktop, fine pointer:

| Input | Result |
| --- | --- |
| Keys 1–4 | Select that pouch slot. |
| Click a slot, then a socket | Seat or feed. |
| Click a ground pickup, with nothing selected | Pocket it, or hold it selected if the pouch is full. |
| Drag a fitting to the locker, or click the locker while a fitting is selected | Recycle. |
| Click the locker with nothing selected | Craft confirm, if pegs are at least 4. |
| Click the boards | Send the hero, if nothing is armed and no fitting is selected. |
| H, then a channel click | Heave Hawser. |
| J, then a hold (v3) | Slip Knot. |
| C, then a berth | Plant one floating cleat. |
| Space | Call Tide, when the button is visible. |
| Esc | Pause. Esc again resumes. |
| Right click | Cancel the current arm or selection. |

A selected fitting takes the next click. A channel click, a pickup click, or a board click in that state does not move the hero and does not pocket. Toast: socket or locker. Click the selected slot again, or press its number again, to deselect. An armed Hawser, Slip Knot, or cleat takes the next click the same way. The arm wins over a selected fitting; selecting a fitting clears the arm.

Touch, coarse pointer:

- Tap a fitting, tap a socket.
- Tap the boards to send the hero.
- Tap Hawser, then the channel. Tap the button again to cancel.
- Swipe a fitting to the locker to recycle. Tap the locker to craft.
- Range rings and inspect lines appear on tap, not on hover.
- Call Tide, Hawser, Slip Knot, and pause targets use the sizes in [DESIGN.md](DESIGN.md).
- Key hints stay hidden until a keyboard key has been seen this session.
- The selection, arm, and toast rules above apply to taps the same way. A swipe to the locker is the recycle gesture.

Landscape is the play orientation. A portrait viewport shows the rotate card and does not simulate. The host page owns fullscreen. The game draws no fullscreen control.

## Feedback the player can use

On defeat, count leaks by path and enemy id. The hint uses the path with the most leaks. A tie uses the path closer to the leak gate (south before north, east before west, and the only path if there is one). On that path, the enemy with the most leaks is named. A tie uses this order: Wreck-tug, Shearwater, Cutter, Twin-stack, Barrel barge, Night-lantern Kite, Kite, Outrider, Dinghy, Tarred Skiff, Skiff. The sentence pattern is in [LORE.md](LORE.md).

During play, each leak toasts the singular form.

Inspect: tapping a seated fitting shows its lore line and its range ring. Tapping a berth shows “A berth. Plant your floating cleat here.” That berth sentence is fixed. Tapping away closes inspect.

Small enemies have no timber bar. They flash a 2 px paper-colored outline for 80 ms when hit. The Wreck-tug has the only timber bar.

## Save

One key, `cleatpin.save`. No account id and no server.

```json
{
  "schema": 1,
  "seenIntro": false,
  "starter": "pins",
  "hero": "reed",
  "settings": { "music": 0.8, "sfx": 1 },
  "tips": {
    "place": false,
    "pickup": false,
    "bosun": false,
    "hawser": false,
    "callTide": false,
    "fork": false
  },
  "maps": {
    "pilot-cove": { "campaignStars": 0, "cleared": false, "squall": false, "deadcalm": false }
  },
  "endlessBest": 0
}
```

`starter` is `pins` or `bell`. `hero` is `reed` or `nia`. Map ids: `pilot-cove`, `split-channel`, `twin-mouths`, `narrow-pier`, `fog-wharf`, `open-bay`.

v1 writes schema 1 and the three maps it ships. Missing fields read as defaults: squall and deadcalm false, hero reed, endlessBest 0, unseen tips false. v2 writes schema 2 and the six maps. v3 writes schema 3 when it saves `hero` or `endlessBest`. Readers keep unknown fields. The live game is one forward build. There is no cloud merge.

Settings volumes are 0 to 1. v1 may ship silent. The sliders still exist and persist, so v3 does not invent a new settings model.

## What the first session has to prove

On campaign Pilot Cove, a player who seats the starter Pins and Spray at the choke, sends Reed from wave 2, and drops one Hawser into the dinghy clump, wins in about 3 minutes with at least 1 star. If a playtest misses that, timber, intervals, or the 12 second countdown change in a revision of this file. The pouch does not grow a shop.

## Out of scope

**v1 does not include:** maps 4–6, enemy variants, the Wreck-tug, Squall, Deadcalm, Endless Tide, Slip Knot, Nia Pell, music, and the juice particles listed as v3 in [ART.md](ART.md).

**v2 does not include:** Endless Tide, Slip Knot, Nia Pell, and the v3 audio pass.

**No version includes:** multiplayer; accounts and clans; ads and cross-promo; crates or gacha; a hero roster; Kingdom Rush hero or spell names; a gold or gem shop; a star-upgrade room; daily quests; idle rewards; a database; 3D; story cutscenes; user-made maps; a portrait play layout; a custom fullscreen button; free maze placement; match-3 or merge; Bloons-style bloon properties; a Plants vs. Zombies lawn; a Defense Grid energy lattice; fire, explosions, gore, drowning, or gambling. Lantern Cordon and Lampwright are not scheduled.

The Cutter’s shear is a wooden splinter gag. It is specified in [ART.md](ART.md).

## Originality and rating

The hook other games have used is “defeated enemies become defense.” Cleatpin’s version is manual: the player pins a dropped fitting into a socket during the wave. Parts are modules. Nothing becomes a cloned crew, and nothing auto-seats itself on death.

PEGI 12, aimed at a 13+ portal rating. Cartoon boats and tools. No blood, no drowning horror, no realistic crime, no gambling chests. Adult workers only. No child characters.

Art, UI, and sound are original. UI text is English.

Cleatpin had no game-name collision in a search on 24 November 2026. That search is not a trademark clearance. Do the trademark pass before launch, and do not buy a domain until the title is locked.
