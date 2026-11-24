# Cleatpin

Cleatpin is a cartoon maritime tower defense about a small wreck-salvage dock. Boats that you stop break into fittings, and you pin those fittings into the jetty while the next tide is already in the channel. There is no shop. The wall is built from what you just halted. Campaign shape — readable chokepoints, preset sockets, one hero on the boards, a call-next-wave choice, grades that fork — keeps a round legible and tense. The economy stays salvage.

**Logline:** Pin what you stop. The wall is built from what you just halted.

**Genre:** Lane tower defense.

**Target platform:** CrazyGames, original HTML5, English UI, Basic Launch first. A later client is intended as lightweight Canvas 2D, with relative paths, for desktop Chrome and Edge, plus touch, in landscape.

**Status:** Design only. This repository is not playable. There is no game client, no engine code, and no production art. Implementation starts only after this design is committed.

**Design lock:** 24 November 2026. These files are the working copy of that lock: the Cleatpin salvage hook, Kingdom Rush structure without a reskin, the dock lore, CrazyGames constraints, and localStorage as the only save. Three versions are planned. No fourth version is scheduled.

## File map

| File | What it decides |
| --- | --- |
| [README.md](README.md) | Pitch, status, and where to read next. |
| [LORE.md](LORE.md) | Tone, in-game intro, blurbs, and every player-facing string. |
| [RULES.md](RULES.md) | Mechanics and numbers. Authoritative for anything that changes play. |
| [DESIGN.md](DESIGN.md) | Version split, UI layout, and wave scripts. Authoritative for what ships when. |
| [ART.md](ART.md) | Style bible, silhouettes, palette, and the drawing list. Authoritative for look. |

Read [LORE.md](LORE.md) for voice, [RULES.md](RULES.md) for systems, [DESIGN.md](DESIGN.md) for the version you are building, and [ART.md](ART.md) before drawing. If two files disagree about a combat stat, [RULES.md](RULES.md) wins. If they disagree about a spawn script or a version gate, [DESIGN.md](DESIGN.md) wins. If they disagree about a color or a silhouette, [ART.md](ART.md) wins. If they disagree about a sentence the player reads, [LORE.md](LORE.md) wins.

## Versions

| Version | Name | What the player gets |
| --- | --- | --- |
| v1 | Basic Launch | Pilot Cove, Split Channel, Twin Mouths. Five fittings through Grade III and both forks. Skiff, Dinghy, both Barrel barges, Kite, Cutter. Bosun Reed, Heave Hawser, Call Tide, hull, stars, pocket, pegs, localStorage. |
| v2 | Full Campaign | Narrow Pier, Fog Wharf, Open Bay. Wreck-tug. Five enemy variants. Squall and Deadcalm. |
| v3 | Post-launch | Endless Tide on Pilot Cove, the Slip Knot ability, Lighter-hand Nia Pell, and the music and juice pass. |

Detail, screen lists, and scripts: [DESIGN.md](DESIGN.md).
