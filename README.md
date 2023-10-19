# InstantTwitch

A chrome extension build to replace the now broken and out dated [Twitch Now](https://github.com/Ndragomirov/twitch-now) extension. This extension tries to be minimal, while keeping all the features you expect (Dont look at the source its awful)

## Todo

- [ ] Full Twitch search
- [ ] Add a check to the github workflow for the tag and manifest versions to match
- [ ] Fix the shitty background loading which doesnt work reliable at all
- [ ] Move to Svelte 5 when it's ready
- [ ] Use Polyfill for apis
- [ ] Fix Firefox slow thumbnail loading

## Building

You can build this extension with one of the commands below, the extension is put into the `dist_chrome` / `dist_firefox` folder from where it can be imported into chrome / firefox

```
npm run build_chrome
npm run build_firefox
```
