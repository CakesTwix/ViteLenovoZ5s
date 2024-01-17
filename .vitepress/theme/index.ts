// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme"
import Carousel from 'vue-devui-carousel'
import 'vue-devui-carousel/dist/style.css'

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.use(Carousel);
	  },
}