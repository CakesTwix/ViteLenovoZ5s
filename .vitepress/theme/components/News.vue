<script setup lang="ts">
import { computed } from "vue"
import { withBase } from "vitepress"
import { data as newsList } from "../data/news.data"

const fullDateFormatter = new Intl.DateTimeFormat("en", {
	dateStyle: "full",
	timeZone: "UTC",
})
const monthFormatter = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" })

function parseDate(date: string) {
	const [year, month, day] = date
		.substring(0, 10)
		.split("-")
		.map((n) => Number.parseInt(n, 10))
	return { year, month, day, utc: Date.UTC(year, month - 1, day) }
}
function formatDate(date: string) {
	return fullDateFormatter.format(parseDate(date).utc)
}
function day(date: string) {
	return parseDate(date).day
}
function month(date: string) {
	return monthFormatter.format(parseDate(date).utc)
}
function year(date: string) {
	return String(parseDate(date).year)
}

const featured = computed(() => newsList[0])
const rest = computed(() => newsList.slice(1))

function linkWithBase(url: string | undefined): string | undefined {
	if (!url) return undefined
	if (url.startsWith("/") && !url.startsWith("//")) return withBase(url)
	return url
}
</script>

<template>
	<div class="news-feed">
		<!-- FEATURED (latest) -->
		<a v-if="featured" class="featured" :href="linkWithBase(featured.url)">
			<div class="featured-glow"></div>
			<div class="featured-inner">
				<div class="featured-badge">Latest</div>
				<h2 class="featured-title">{{ featured.title }}</h2>
				<p class="featured-desc">{{ featured.description }}</p>
				<div class="featured-meta">
					<time :datetime="featured.date">{{ formatDate(featured.date) }}</time>
					<span class="featured-cta">Read article →</span>
				</div>
			</div>
		</a>

		<!-- GRID -->
		<div class="news-grid" v-if="rest.length">
			<a
				v-for="news of rest"
				:key="news.url"
				class="news-card"
				:href="linkWithBase(news.url)"
			>
				<div class="date-chip">
					<span class="date-month">{{ month(news.date) }}</span>
					<span class="date-day">{{ day(news.date) }}</span>
				</div>
				<div class="news-body">
					<h3 class="news-title">{{ news.title }}</h3>
					<p class="news-desc">{{ news.description }}</p>
					<div class="news-meta">
						<time :datetime="news.date">{{ year(news.date) }}</time>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<style scoped>
.news-feed {
	margin-top: 2rem;
}

/* ── FEATURED ─────────────────────────── */
.featured {
	position: relative;
	display: block;
	overflow: hidden;
	border-radius: 20px;
	border: 1px solid var(--vp-c-divider);
	background: var(--vp-c-bg-soft);
	padding: 2.5rem;
	margin-bottom: 2rem;
	text-decoration: none;
	color: inherit;
	transition: border-color 0.2s, transform 0.2s;
}
.featured:hover {
	border-color: var(--vp-c-brand-2);
	transform: translateY(-3px);
}
.featured-glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(70% 100% at 80% 0%, var(--vp-c-brand-soft), transparent 60%);
	pointer-events: none;
}
.featured-inner {
	position: relative;
	z-index: 1;
}
.featured-badge {
	display: inline-block;
	font-size: 0.72rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--vp-c-brand-1);
	background: var(--vp-c-brand-soft);
	padding: 0.25rem 0.7rem;
	border-radius: 99px;
	margin-bottom: 1rem;
}
.featured-title {
	font-size: 1.85rem;
	font-weight: 800;
	line-height: 1.2;
	margin: 0 0 0.5rem;
	letter-spacing: -0.02em;
}
.featured-desc {
	font-size: 1.05rem;
	color: var(--vp-c-text-2);
	line-height: 1.5;
	margin: 0 0 1.25rem;
	max-width: 600px;
}
.featured-meta {
	display: flex;
	align-items: center;
	gap: 1rem;
}
.featured-meta time {
	font-size: 0.85rem;
	color: var(--vp-c-text-2);
}
.featured-cta {
	font-size: 0.9rem;
	font-weight: 600;
	color: var(--vp-c-brand-1);
}

/* ── GRID ─────────────────────────────── */
.news-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 1rem;
}

/* ── CARD ─────────────────────────────── */
.news-card {
	display: flex;
	gap: 1rem;
	padding: 1.25rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 14px;
	background: var(--vp-c-bg);
	text-decoration: none;
	color: inherit;
	transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.news-card:hover {
	border-color: var(--vp-c-brand-2);
	transform: translateY(-3px);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* Date chip */
.date-chip {
	flex-shrink: 0;
	width: 52px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 12px;
	background: var(--vp-c-brand-soft);
	padding: 0.5rem 0;
	gap: 0.1rem;
}
.date-month {
	font-size: 0.7rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: var(--vp-c-brand-1);
}
.date-day {
	font-size: 1.35rem;
	font-weight: 800;
	line-height: 1;
	color: var(--vp-c-text-1);
}

/* Card body */
.news-body {
	min-width: 0;
	flex: 1;
}
.news-title {
	font-size: 1rem;
	font-weight: 700;
	line-height: 1.35;
	margin: 0 0 0.35rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.news-desc {
	font-size: 0.85rem;
	color: var(--vp-c-text-2);
	line-height: 1.45;
	margin: 0 0 0.5rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.news-meta time {
	font-size: 0.78rem;
	color: var(--vp-c-text-3);
}

/* ── RESPONSIVE ───────────────────────── */
@media (max-width: 640px) {
	.featured {
		padding: 1.5rem;
	}
	.featured-title {
		font-size: 1.4rem;
	}
	.news-grid {
		grid-template-columns: 1fr;
	}
}
</style>
