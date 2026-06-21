// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme"
import RomPage from "./components/RomPage.vue"
import "./style.css"

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component("RomPage", RomPage)
		app.component("Rom", RomPage)
	},
}
