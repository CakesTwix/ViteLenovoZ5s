import { createContentLoader } from "vitepress"

export interface News {
	title: string
	description: string
	date: string
	url: string
}

declare const data: News[]
export { data }

export default createContentLoader("news/*.md", {
	excerpt: true,
	transform(articles) {
		return articles
			.filter(({ url }) => url !== "/news/")
			.map(
				({ frontmatter, url }) =>
					<News>{
					  title: frontmatter.title,
					  description: frontmatter.description,
					  date: frontmatter.date,
					  url: "/ViteLenovoZ5s" + url,
					},
			).sort((a, b) => new Date(b.date) - new Date(a.date));
	},
})
