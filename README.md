# InstantTwitch

A chrome extension build to replace the now broken and out dated [Twitch Now](https://github.com/Ndragomirov/twitch-now) extension. This extension tries to be minimal, while keeping all the features you expect (Dont look at the source its awful)

## Todo

- [x] Basic display of the currently live streamers
- [x] Settings
- [x] Lightmode
- [x] Notifications
- [ ] Full Twitch search
- [x] Firefox support
- [ ] Add a check to the github workflow for the tag and manifest versions to match

## Building

You can build this extension with one of the commands below, the extension is put into the `dist_chrome` / `dist_firefox` folder from where it can be imported into chrome / firefox

```
npm run build_chrome
npm run build_firefox
```
