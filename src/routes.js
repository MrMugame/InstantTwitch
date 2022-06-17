import Settings from "./pages/settings.svelte"
import Favourites from "./pages/favourites.svelte"
import Help from "./pages/help.svelte"
import Games from "./pages/games.svelte"
import Streams from "./pages/streams.svelte"

export default {
    '/': Favourites,

    '/settings': Settings,

    '/help': Help,

    '/games': Games,

    '/streams': Streams
}