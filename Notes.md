# Version 1.0.9 Notes

## What's new?

- Personal Bests are now sorted by games.
- Dark/Light Themes.

## Fixes

- Fixed: Cannot remove games from `MyGames`.
- Fixed: MyGames not reloading when adding/removing games.

## Known issues

- App not reloading when logging out.
- Runs with multiple runners not displaying properly.
- Japanese users not displaying.
- OS forced darkmode breaks `UserHeader.js` colors.

---

# Version 1.0.8 Notes

## What's new?

- Now you can add/remove games from MyGames from GameInfo.
- Moved MyGames to an unique file `MyGames.js` and changed from .map to Flatlist.
- Added Notification Bar messages when API-Key is missing and Notifications are empty.

## Fixes

- Fixed: App not reloading when logging in.
- Fixed: Notifications issue when API-Key was not provided.
- Fixed: Login screen buttons.
- Fixed: Profiles with no country not displaying properly.
- Fixed: Login `SKIP` button not working.

## Performance

- Optimized notifications load.
- Removed unused packages.
- Removed unused code.
- Game search, user search and home now use hooks instead of React Components.
- Small optimizations.
- Profile

## Known issues

- App not reloading when logging out.
- MyGames not reloading when adding/removing games.
- Runs with multiple runners not displaying properly.
- Japanese users not displaying.
- OS forced darkmode breaks `UserHeader.js` colors.
