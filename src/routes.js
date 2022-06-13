import Settings from "./pages/settings.svelte"
import Streams from "./pages/streams.svelte"
import Help from "./pages/help.svelte"

export default {
    '/': Streams,

    '/settings': Settings,

    '/help': Help,
}