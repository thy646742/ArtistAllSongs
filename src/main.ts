import { Config } from "./ui/config";

plugin.onLoad(async () => {
    console.log("ArtistAllSongs loaded complete!");
});

plugin.onConfig(() => {
    const element = document.createElement("div");
    ReactDOM.render(Config(), element);
    return element;
});