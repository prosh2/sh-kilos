# Glossary

Use these terms in code, UI copy, and docs. If you need a new term, add it here first.

| Term              | Meaning                                                                                                                                                                                               | Not                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **Athlete**       | A Kilos user.                                                                                                                                                                                         | user (fine in auth code), member   |
| **Kilo**          | An invitation to train together at a specific time and place — the core object of the app. Always capitalised in UI copy ("Post a Kilo", "Join this Kilo"). Plural: Kilos. In code: `kilo` / `kilos`. | event, meetup, session, jio        |
| **Host**          | The athlete who created a Kilo.                                                                                                                                                                       | organiser, owner, creator          |
| **Participant**   | An athlete who has joined a Kilo. The host also counts as a participant.                                                                                                                              | attendee, member                   |
| **Sport**         | The discipline of a Kilo: run, ride, swim, triathlon, duathlon, other (an enum we can extend).                                                                                                        | activity type                      |
| **Meeting point** | Where the Kilo starts: coordinates plus a human-readable label.                                                                                                                                       | location (too vague)               |
| **Pace**          | Expected speed. Its unit depends on the sport: min/km for runs, km/h for rides, min/100m for swims. Stored as a range.                                                                                | speed (except for rides in the UI) |
| **Capacity**      | Optional maximum number of participants.                                                                                                                                                              | limit, slots                       |
| **Kilo chat**     | The group conversation attached to a Kilo, open to its participants.                                                                                                                                  | group, room, channel               |
| **Status**        | The Kilo's lifecycle: `open`, `full`, `cancelled`, `completed`.                                                                                                                                       |                                    |
| **No-drop**       | A promise that the group waits for the slowest participant. A boolean on the Kilo.                                                                                                                    |                                    |

## Naming rules

- **Never write "kilo" or "kilos" to mean distance.** Distances are always shown as `km` (e.g. "10 km"), so "Kilo" only ever means the invitation.
- **Kilos** (the app) vs **Kilos** (several invitations): when a sentence could be read either way, rephrase it ("Kilos near you", "your hosted Kilos" are fine; "Kilos has Kilos" is not).

## Later (not MVP)

| Term            | Meaning                                                                              |
| --------------- | ------------------------------------------------------------------------------------ |
| **Activity**    | A recorded or imported workout.                                                      |
| **Leg**         | One sport within a multisport activity (e.g. the swim leg of a triathlon).           |
| **Transition**  | The gap between legs (T1, T2).                                                       |
| **Hidden area** | A user-defined radius around a private place (e.g. home) where route data is hidden. |
