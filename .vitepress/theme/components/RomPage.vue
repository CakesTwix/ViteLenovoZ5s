<script setup lang="ts">
import { computed } from "vue"
import { withBase, useData } from 'vitepress'

const { frontmatter } = useData()

interface RomFeature {
	title?: string
	details?: string
	icon?: { src: string; alt?: string } | string
	link?: string
	linkText?: string
}

const hero = computed(() => (frontmatter.value.hero as any) || {})
const features = computed<RomFeature[]>(() => frontmatter.value.features || [])

function category(f: RomFeature): string {
	const t = (f.title || "").toLowerCase()
	if (t.includes("download")) return "download"
	if (t.includes("flash") || t.includes("guide")) return "link"
	if (
		t.includes("telegram") ||
		t.includes("updates") ||
		t.includes("screenshot") ||
		t.includes("changelog") ||
		t.includes("source") ||
		t.includes("community")
	)
		return "link"
	return "spec"
}

const specs = computed(() => features.value.filter((f) => category(f) === "spec"))
const downloads = computed(() => features.value.filter((f) => category(f) === "download"))
const links = computed(() => features.value.filter((f) => category(f) === "link"))

function isImg(icon: RomFeature["icon"]): icon is { src: string; alt?: string } {
	return typeof icon === "object" && icon !== null
}
</script>

<template>
	<div class="rom-layout">
		<!-- HERO -->
		<section class="rom-hero" v-if="hero.name || hero.image">
			<div class="rom-hero-glow"></div>
			<div class="rom-hero-inner">
				<img
					v-if="hero.image && isImg(hero.image)"
					class="rom-hero-logo"
					:src="withBase(hero.image.src)"
					:alt="hero.image.alt || hero.name || ''"
				/>
				<h1 class="rom-hero-name">{{ hero.name }}</h1>
				<p class="rom-hero-tagline" v-if="hero.tagline">{{ hero.tagline }}</p>
			</div>
		</section>

		<!-- SPECS -->
		<section class="rom-block" v-if="specs.length">
			<h2 class="rom-block-title">Specifications</h2>
			<div class="spec-grid">
				<a
					v-for="(f, i) in specs"
					:key="'spec' + i"
					class="spec-card"
					:class="{ 'is-link': f.link }"
					:href="f.link"
				>
					<div class="spec-icon">
						<img
							v-if="isImg(f.icon)"
							:src="withBase((f.icon as any).src)"
							:alt="(f.icon as any).alt || ''"
						/>
						<span v-else-if="typeof f.icon === 'string'" v-html="f.icon"></span>
					</div>
					<div class="spec-body">
						<span class="spec-label">{{ f.title }}</span>
						<span class="spec-value" v-if="f.details">{{ f.details }}</span>
						<span class="spec-value spec-action" v-else-if="f.linkText">{{ f.linkText }}</span>
					</div>
				</a>
			</div>
		</section>

		<!-- DOWNLOADS -->
		<section class="rom-block" v-if="downloads.length">
			<h2 class="rom-block-title">Downloads</h2>
			<div class="download-grid">
				<a
					v-for="(f, i) in downloads"
					:key="'dl' + i"
					class="download-btn"
					:href="f.link"
				>
					<span class="download-icon">
						<img
							v-if="isImg(f.icon)"
							:src="withBase((f.icon as any).src)"
							:alt="(f.icon as any).alt || ''"
						/>
						<span v-else-if="typeof f.icon === 'string'" v-html="f.icon"></span>
					</span>
					<span class="download-text">
						<span class="download-title">{{ f.title }}</span>
						<span class="download-sub">{{ f.linkText || f.details || "Download" }}</span>
					</span>
					<svg class="download-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
						<path fill="currentColor" d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z" />
					</svg>
				</a>
			</div>
		</section>

		<!-- LINKS / COMMUNITY -->
		<section class="rom-block" v-if="links.length">
			<h2 class="rom-block-title">Links &amp; Community</h2>
			<div class="link-grid">
				<a
					v-for="(f, i) in links"
					:key="'lnk' + i"
					class="link-card"
					:href="f.link"
				>
					<span class="link-icon">
						<img
							v-if="isImg(f.icon)"
							:src="withBase((f.icon as any).src)"
							:alt="(f.icon as any).alt || ''"
						/>
						<span v-else-if="typeof f.icon === 'string'" v-html="f.icon"></span>
					</span>
					<span class="link-body">
						<span class="link-title">{{ f.title }}</span>
						<span class="link-sub" v-if="f.linkText || f.details">
							{{ f.linkText || f.details }}
						</span>
					</span>
					<svg class="link-arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
						<path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
					</svg>
				</a>
			</div>
		</section>
	</div>
</template>

<style scoped>
.rom-layout {
	max-width: 960px;
	margin: 1rem auto 0;
	padding-bottom: 3rem;
}

/* ---------- HERO ---------- */
.rom-hero {
	position: relative;
	overflow: hidden;
	border: 1px solid var(--vp-c-divider);
	border-radius: 20px;
	padding: 3rem 2rem;
	margin-bottom: 2.5rem;
	text-align: center;
	background: var(--vp-c-bg-soft);
}
.rom-hero-glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(60% 80% at 50% 0%, var(--vp-c-brand-soft), transparent 70%);
	pointer-events: none;
}
.rom-hero-inner {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
}
.rom-hero-logo {
	width: 96px;
	height: 96px;
	border-radius: 22px;
	object-fit: contain;
}
.rom-hero-name {
	margin: 0.75rem 0 0;
	font-size: 2.5rem;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1.1;
	background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}
.rom-hero-tagline {
	margin: 0.25rem auto 0;
	max-width: 540px;
	color: var(--vp-c-text-2);
	font-size: 1.05rem;
	line-height: 1.5;
}

/* ---------- BLOCKS ---------- */
.rom-block {
	margin-top: 2.5rem;
}
.rom-block-title {
	font-size: 1.15rem;
	font-weight: 700;
	margin: 0 0 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 2px solid var(--vp-c-brand-soft);
	display: inline-block;
}

/* ---------- SPECS ---------- */
.spec-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
	gap: 0.85rem;
}
.spec-card {
	display: flex;
	gap: 0.85rem;
	align-items: flex-start;
	padding: 1.1rem 1.2rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 14px;
	background: var(--vp-c-bg);
	transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
	text-decoration: none;
	color: inherit;
}
.spec-card.is-link {
	cursor: pointer;
}
.spec-card:hover {
	border-color: var(--vp-c-brand-2);
	transform: translateY(-2px);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
.spec-icon {
	flex-shrink: 0;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.spec-icon :deep(img) {
	width: 32px;
	height: 32px;
	border-radius: 8px;
	object-fit: contain;
}
.spec-body {
	display: flex;
	flex-direction: column;
	gap: 0.15rem;
	min-width: 0;
}
.spec-label {
	font-size: 0.78rem;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: var(--vp-c-text-2);
	font-weight: 600;
}
.spec-value {
	font-size: 1rem;
	font-weight: 600;
	color: var(--vp-c-text-1);
}
.spec-action {
	color: var(--vp-c-brand-1);
}

/* ---------- DOWNLOADS ---------- */
.download-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1rem;
}
.download-btn {
	display: flex;
	align-items: center;
	gap: 0.85rem;
	padding: 1.1rem 1.3rem;
	border-radius: 14px;
	background: var(--vp-c-brand-1);
	color: #052e15;
	text-decoration: none;
	font-weight: 600;
	transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.download-btn:hover {
	background: #45e08c;
	transform: translateY(-2px);
	box-shadow: 0 10px 28px var(--vp-c-brand-soft);
}
.download-icon {
	flex-shrink: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.download-icon :deep(img) {
	width: 28px;
	height: 28px;
	border-radius: 7px;
	object-fit: contain;
	background: rgba(255, 255, 255, 0.85);
	padding: 2px;
}
.download-text {
	display: flex;
	flex-direction: column;
	line-height: 1.2;
}
.download-title {
	font-size: 0.95rem;
	font-weight: 700;
}
.download-sub {
	font-size: 0.78rem;
	opacity: 0.8;
}
.download-arrow {
	margin-left: auto;
	flex-shrink: 0;
}

/* ---------- LINKS ---------- */
.link-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 0.85rem;
}
.link-card {
	display: flex;
	align-items: center;
	gap: 0.85rem;
	padding: 0.95rem 1.15rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	background: var(--vp-c-bg-soft);
	text-decoration: none;
	color: inherit;
	transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.link-card:hover {
	border-color: var(--vp-c-brand-2);
	transform: translateX(3px);
}
.link-icon {
	flex-shrink: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.link-icon :deep(img) {
	width: 28px;
	height: 28px;
	border-radius: 7px;
	object-fit: contain;
}
.link-body {
	display: flex;
	flex-direction: column;
	line-height: 1.25;
	min-width: 0;
}
.link-title {
	font-size: 0.95rem;
	font-weight: 600;
}
.link-sub {
	font-size: 0.8rem;
	color: var(--vp-c-text-2);
}
.link-arrow {
	margin-left: auto;
	flex-shrink: 0;
	color: var(--vp-c-text-3);
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 640px) {
	.rom-hero {
		padding: 2rem 1rem;
	}
	.rom-hero-name {
		font-size: 1.85rem;
	}
	.spec-grid,
	.download-grid,
	.link-grid {
		grid-template-columns: 1fr;
	}
}
</style>
