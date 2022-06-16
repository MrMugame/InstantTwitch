import Settings from "./pages/settings.svelte"
import Streams from "./pages/streams.svelte"
import Help from "./pages/help.svelte"
import Games from "./pages/games.svelte"

export default {
    '/': Streams,

    '/settings': Settings,

    '/help': Help,

    '/games': Games
}