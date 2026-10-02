---
name: safety-privacy-review
description: Review a Kilos change or spec for user safety and privacy risks. Use for any change touching profiles, location/meeting points, Kilo visibility, joining, chat/messages, blocking/reporting, notifications, or RLS policies.
---

# Safety & privacy review

Kilos gets strangers to meet in person, often early in the morning or at quiet locations. Treat privacy and safety bugs as being as severe as data-loss bugs.

## Checklist

Go through each item and mark it ✅ ok, ⚠️ risk (explain + fix), or n/a.

**Access control**
- [ ] Every new or changed table has RLS enabled, with policies for select, insert, update, and delete.
- [ ] Policies are tested as: anonymous, signed in as a stranger, participant, host, blocked athlete.
- [ ] Service-role keys and secrets are never sent to the app.

**Blocking**
- [ ] A blocked athlete can't see the blocker's Kilos, profile, or messages, and the reverse holds too.
- [ ] Blocking hides content without telling the blocked person (no "you've been blocked" signal beyond things simply disappearing).

**Location**
- [ ] Meeting points are public places chosen by the host. Never default a meeting point to the athlete's current GPS position.
- [ ] We don't store or expose an athlete's live or home location.
- [ ] "Near me" search computes distance on the server and returns Kilos, not other athletes' positions.

**Personal data**
- [ ] Profiles don't expose contact details (phone, email) to other athletes.
- [ ] Only participants can read Kilo chat. Anyone who leaves or is removed loses access to new messages.
- [ ] Push notification text doesn't leak private content on a lock screen beyond what's needed.

**Abuse**
- [ ] Content created by athletes (Kilos, messages, profiles) can be reported.
- [ ] The host can remove a participant.
- [ ] Rate limits or constraints stop spam (e.g. a cap on Kilos per day, and on message length).

**Minors & consent**
- [ ] The minimum age rule is respected wherever profiles are created.

## Output

A short list of risks found, the fix for each, and any item that's knowingly accepted as a risk. That decision belongs to the user — ask them. Paste the result into the feature spec's "Safety & privacy" section.
