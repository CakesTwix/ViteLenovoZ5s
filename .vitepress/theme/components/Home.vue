<script setup lang="ts">
import { computed } from "vue"
import { withBase, useData } from "vitepress"

const { frontmatter } = useData()
const fm = computed(() => frontmatter.value)

const hero = computed(() => (fm.value.hero as any) || {})
const features = computed<any[]>(() => fm.value.features || [])

function linkWithBase(url: string | undefined): string | undefined {
	if (!url) return undefined
	if (url.startsWith("/") && !url.startsWith("//")) return withBase(url)
	return url
}

const icons: Record<string, string> = {
	roms: `<path fill="currentColor" d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 19c-.83 0-1.5-.67-1.5-1.5S11.17 18 12 18s1.5.67 1.5 1.5S12.83 21 12 21zm5-4H7V5h10v12z"/>`,
	recovery: `<path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>`,
	instructions: `<path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>`,
	sources: `<path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>`,
	community: `<path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>`,
	specs: `<path fill="currentColor" d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>`,
}

function iconSvg(title: string): string {
	const t = (title || "").toLowerCase()
	if (t.includes("rom")) return icons.roms
	if (t.includes("recovery")) return icons.recovery
	if (t.includes("instruct") || t.includes("guide")) return icons.instructions
	if (t.includes("source")) return icons.sources
	if (t.includes("community") || t.includes("chat")) return icons.community
	return icons.specs
}
</script>

<template>
	<div class="home-layout">
		<!-- HERO -->
		<section class="home-hero">
			<div class="home-hero-bg"></div>
			<div class="home-hero-content">
				<div class="home-hero-badge">Lenovo sdm710</div>
				<h1 class="home-hero-title">{{ hero.name }}</h1>
				<p class="home-hero-subtitle" v-if="hero.text">{{ hero.text }}</p>
				<div class="home-hero-actions" v-if="features.length">
					<a
						v-for="(f, i) in features.slice(0, 2)"
						:key="i"
						class="home-btn"
						:class="{ primary: i === 0 }"
						:href="linkWithBase(f.link)"
					>
						{{ f.title }}
						<svg v-if="i === 0" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
					</a>
				</div>
			</div>
		</section>

		<!-- CARDS -->
		<div class="home-grid">
			<a
				v-for="(item, i) in features"
				:key="i"
				class="home-card"
				:href="linkWithBase(item.link)"
			>
				<span class="home-card-icon">
					<svg viewBox="0 0 24 24" width="26" height="26" v-html="iconSvg(item.title)" />
				</span>
				<span class="home-card-body">
					<span class="home-card-title">{{ item.title }}</span>
					<span class="home-card-desc" v-if="item.details">{{ item.details }}</span>
				</span>
				<svg class="home-card-arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
					<path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
				</svg>
			</a>
		</div>
	</div>
</template>

<style scoped>
.home-layout {
	max-width: 960px;
	margin: 0 auto;
	padding-bottom: 3rem;
}

/* ── HERO ─────────────────────────────── */
.home-hero {
	position: relative;
	overflow: hidden;
	border-radius: 24px;
	border: 1px solid var(--vp-c-divider);
	background: var(--vp-c-bg-soft);
	padding: 4rem 2.5rem;
	margin-bottom: 2rem;
}
.home-hero-bg {
	position: absolute;
	inset: 0;
	background:
		radial-gradient(70% 120% at 20% 0%, var(--vp-c-brand-soft), transparent 55%),
		radial-gradient(50% 80% at 90% 100%, var(--vp-c-brand-soft), transparent 50%);
	pointer-events: none;
}
.home-hero-content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.75rem;
}
.home-hero-badge {
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--vp-c-brand-1);
	background: var(--vp-c-brand-soft);
	padding: 0.3rem 0.85rem;
	border-radius: 99px;
}
.home-hero-title {
	margin: 0;
	font-size: 2.75rem;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1.1;
	background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}
.home-hero-subtitle {
	margin: 0;
	font-size: 1.15rem;
	color: var(--vp-c-text-2);
	line-height: 1.5;
	max-width: 520px;
}
.home-hero-actions {
	display: flex;
	gap: 0.75rem;
	margin-top: 0.5rem;
	flex-wrap: wrap;
}
.home-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.65rem 1.4rem;
	border-radius: 12px;
	font-weight: 600;
	font-size: 0.95rem;
	text-decoration: none;
	transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
}
.home-btn.primary {
	background: var(--vp-c-brand-1);
	color: #052e15;
}
.home-btn.primary:hover {
	background: #45e08c;
	transform: translateY(-2px);
	box-shadow: 0 8px 24px var(--vp-c-brand-soft);
}
.home-btn:not(.primary) {
	border: 1px solid var(--vp-c-divider);
	color: var(--vp-c-text-1);
}
.home-btn:not(.primary):hover {
	border-color: var(--vp-c-brand-2);
	color: var(--vp-c-brand-1);
}

/* ── GRID ─────────────────────────────── */
.home-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 1rem;
}

/* ── CARD ─────────────────────────────── */
.home-card {
	position: relative;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1.25rem 1.4rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 16px;
	background: var(--vp-c-bg);
	text-decoration: none;
	color: inherit;
	transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.home-card:hover {
	border-color: var(--vp-c-brand-2);
	transform: translateY(-3px);
	box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
}
.home-card-icon {
	flex-shrink: 0;
	width: 46px;
	height: 46px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--vp-c-brand-soft);
	color: var(--vp-c-brand-1);
	transition: transform 0.2s;
}
.home-card:hover .home-card-icon {
	transform: scale(1.1);
}
.home-card-body {
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	min-width: 0;
	flex: 1;
}
.home-card-title {
	font-size: 1rem;
	font-weight: 700;
}
.home-card-desc {
	font-size: 0.83rem;
	color: var(--vp-c-text-2);
	line-height: 1.4;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.home-card-arrow {
	flex-shrink: 0;
	color: var(--vp-c-text-3);
	opacity: 0;
	transform: translateX(-6px);
	transition: opacity 0.2s, transform 0.2s;
}
.home-card:hover .home-card-arrow {
	opacity: 1;
	transform: translateX(0);
	color: var(--vp-c-brand-1);
}

/* ── RESPONSIVE ───────────────────────── */
@media (max-width: 640px) {
	.home-hero {
		padding: 2.5rem 1.5rem;
		border-radius: 16px;
	}
	.home-hero-title {
		font-size: 1.85rem;
	}
	.home-hero-subtitle {
		font-size: 1rem;
	}
	.home-grid {
		grid-template-columns: 1fr;
	}
}
</style>
