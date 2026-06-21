<script setup lang="ts">
import { computed } from "vue"
import { withBase, useData } from "vitepress"

const { frontmatter } = useData()
const fm = computed(() => frontmatter.value)

interface ListItem {
	title?: string
	link?: string
	icon?: { src: string; alt?: string } | string
	details?: string
	linkText?: string
}

const hero = computed(() => (fm.value.hero as any) || {})
const items = computed<ListItem[]>(() => fm.value.features || [])

function iconSrc(icon: ListItem["icon"]): string | null {
	if (typeof icon === "object" && icon?.src) return icon.src
	return null
}

function linkWithBase(url: string | undefined): string | undefined {
	if (!url) return undefined
	if (url.startsWith("/") && !url.startsWith("//")) {
		const clean = url.replace(/\.md$/, ".html")
		return withBase(clean)
	}
	return url
}
</script>

<template>
	<div class="romlist-layout">
		<!-- HEADER -->
		<div class="romlist-header" v-if="hero.name">
			<img
				v-if="hero.image && iconSrc(hero.image)"
				class="romlist-header-icon"
				:src="withBase(hero.image.src)"
				:alt="hero.image.alt || hero.name"
			/>
			<div>
				<h1 class="romlist-title">{{ hero.name.trim() }}</h1>
			</div>
		</div>

		<!-- GRID -->
		<div class="romlist-grid">
			<a
				v-for="(item, i) in items"
				:key="i"
				class="romlist-card"
				:href="linkWithBase(item.link)"
			>
				<div class="romlist-card-top" v-if="iconSrc(item.icon)">
					<div class="romlist-card-iconwrap">
						<img
							class="romlist-card-icon"
							:src="withBase(iconSrc(item.icon)!)"
							:alt="item.title || ''"
						/>
					</div>
				</div>
				<div class="romlist-card-body">
					<h3 class="romlist-card-title">{{ item.title }}</h3>
					<p class="romlist-card-desc" v-if="item.details">{{ item.details }}</p>
				</div>
				<div class="romlist-card-arrow" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="20" height="20">
						<path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
					</svg>
				</div>
			</a>
		</div>
	</div>
</template>

<style scoped>
.romlist-layout {
	max-width: 960px;
	margin: 2rem auto 0;
	padding-bottom: 3rem;
}

/* ── HEADER ──────────────────────────── */
.romlist-header {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 2rem;
	border-radius: 20px;
	border: 1px solid var(--vp-c-divider);
	background: var(--vp-c-bg-soft);
	margin-bottom: 2rem;
	position: relative;
	overflow: hidden;
}
.romlist-header::before {
	content: "";
	position: absolute;
	inset: 0;
	background: radial-gradient(50% 100% at 0% 0%, var(--vp-c-brand-soft), transparent 60%);
	pointer-events: none;
}
.romlist-header-icon {
	width: 64px;
	height: 64px;
	border-radius: 16px;
	object-fit: contain;
	position: relative;
	z-index: 1;
}
.romlist-title {
	margin: 0;
	font-size: 1.75rem;
	font-weight: 800;
	letter-spacing: -0.02em;
	position: relative;
	z-index: 1;
}

/* ── GRID ────────────────────────────── */
.romlist-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 1rem;
}

/* ── CARD ────────────────────────────── */
.romlist-card {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 1.5rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 16px;
	background: var(--vp-c-bg);
	text-decoration: none;
	color: inherit;
	transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
	overflow: hidden;
}
.romlist-card::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 3px;
	background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
	opacity: 0;
	transition: opacity 0.2s;
}
.romlist-card:hover {
	border-color: var(--vp-c-brand-2);
	transform: translateY(-4px);
	box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
}

.romlist-card-top {
	margin-bottom: 1rem;
}
.romlist-card-iconwrap {
	width: 56px;
	height: 56px;
	border-radius: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--vp-c-bg-soft);
	transition: transform 0.2s;
}
.romlist-card:hover .romlist-card-iconwrap {
	transform: scale(1.08);
}
.romlist-card-icon {
	width: 40px;
	height: 40px;
	border-radius: 10px;
	object-fit: contain;
}

.romlist-card-body {
	flex: 1;
	min-width: 0;
}
.romlist-card-title {
	font-size: 1.1rem;
	font-weight: 700;
	margin: 0 0 0.4rem;
	line-height: 1.3;
}
.romlist-card-desc {
	font-size: 0.85rem;
	color: var(--vp-c-text-2);
	line-height: 1.45;
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.romlist-card-arrow {
	position: absolute;
	top: 1.5rem;
	right: 1.25rem;
	color: var(--vp-c-brand-1);
	opacity: 0;
	transform: translateX(-6px);
	transition: opacity 0.2s, transform 0.2s;
}
.romlist-card:hover .romlist-card-arrow {
	opacity: 1;
	transform: translateX(0);
}

/* ── RESPONSIVE ──────────────────────── */
@media (max-width: 640px) {
	.romlist-grid {
		grid-template-columns: 1fr;
	}
	.romlist-header {
		padding: 1.5rem;
	}
	.romlist-title {
		font-size: 1.35rem;
	}
}
</style>
