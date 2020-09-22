## What's new?

- Now you can add/remove games from MyGames from GameInfo.
- Moved MyGames to an unique file `MyGames.js` and changed .map to Flatlist.
- Added Notification Bar messages when API-Key is missing and Notifications are empty.

## Fixes

- Fixed: App not reloading when logging.
- Fixed: Notifications issue when API-Key was not provided.
- Fixed: Login screen buttons.

## Performance

- Optimized notifications load.
- Removed unused packages.
- Removed unused code.
- Game search, user search and home now use hooks instead of React Components.
- Small optimizations.

## Known issues

- App not reloading when logging out.
- MyGames not reloading when adding/removing games.
- Runs with multiple runners not displaying properly.
- Japanese users not displaying.
- OS forced darkmode breaks `UserHeader.js` colors.
