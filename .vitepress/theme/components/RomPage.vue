<script setup lang="ts">
import { computed } from "vue"
import { withBase, useData } from "vitepress"

const { frontmatter } = useData()
const fm = computed(() => frontmatter.value)

// ── Unified data structures ──────────────────────────────
interface SpecItem {
	label: string
	value?: string
	linkText?: string
	link?: string
	iconImg?: string
	iconHtml?: string
}

interface DownloadItem {
	title: string
	url: string
	subtitle?: string
	iconImg?: string
}

interface LinkItem {
	title: string
	url: string
	subtitle?: string
	iconImg?: string
	iconHtml?: string
}

// ── Helpers ──────────────────────────────────────────────
const androidIcons: Record<string, string> = {
	"10": "/Q_big.png",
	"11": "/R.png",
	"12": "/12.webp",
	"13": "/13.png",
	"14": "/14.svg",
	"15": "/15.svg",
	"16": "/16.png",
}

function detectIcon(url: string): string | undefined {
	const u = (url || "").toLowerCase()
	if (u.includes("sourceforge")) return "/sourceforge.png"
	if (u.includes("t.me") || u.includes("telegram")) return "/telegram.png"
	if (u.includes("nextcloud")) return "/nextcloud.png"
	return undefined
}

function avatarHtml(user: string): string {
	return `<img src="https://www.github.com/${user}.png" style="border-radius: 10%;"/>`
}

function linkWithBase(url: string | undefined): string | undefined {
	if (!url) return undefined
	if (url.startsWith("/") && !url.startsWith("//")) return withBase(url)
	return url
}

// ── Format detection ─────────────────────────────────────
// New flat format if any of these top-level fields exist
const useFlat = computed(
	() => !!(fm.value.name || fm.value.version || fm.value.patch || fm.value.android)
)

// ── New flat format ──────────────────────────────────────
const flatSpecs = computed<SpecItem[]>(() => {
	if (!useFlat.value) return []
	const f = fm.value
	const specs: SpecItem[] = []

	if (f.android) {
		const ver = String(f.android)
		specs.push({
			label: `Android ${ver}`,
			linkText: `Based on Android ${ver}`,
			link: `/roms/a${ver}/`,
			iconImg: androidIcons[ver],
		})
	}

	const maintainers = Array.isArray(f.maintainer) ? f.maintainer : f.maintainer ? [f.maintainer] : []
	maintainers.forEach((m: string) => {
		const name = typeof m === "string" ? m : m?.name || ""
		const note = typeof m === "object" && m?.note ? ` (${m.note})` : ""
		specs.push({ label: "Maintainer", value: name + note, iconHtml: avatarHtml(name) })
	})

	if (f.version) specs.push({ label: "Version", value: String(f.version), iconImg: "/version.png" })
	if (f.patch) specs.push({ label: "Security Patch", value: String(f.patch), iconImg: "/securitypatch.png" })
	if (f.gapps) specs.push({ label: "GApps", value: String(f.gapps), iconImg: "/gapps.png" })
	if (f.microg) specs.push({ label: "MicroG", value: String(f.microg), iconImg: "/microg.webp" })
	if (f.ota) specs.push({ label: "OTA", value: String(f.ota), iconImg: "/ota.webp" })

	return specs
})

const flatDownloads = computed<DownloadItem[]>(() => {
	if (!useFlat.value) return []
	const dls = fm.value.download as any[] | undefined
	if (!dls) return []
	return dls.map((d) => ({
		title: d.name || "Download",
		url: d.url || d.link || "#",
		subtitle: d.subtitle || "Click to download",
		iconImg: d.icon || detectIcon(d.url || d.link || ""),
	}))
})

const flatLinks = computed<LinkItem[]>(() => {
	if (!useFlat.value) return []
	const items: LinkItem[] = []

	if (fm.value.instruction) {
		items.push({ title: "How to Flash", url: String(fm.value.instruction), subtitle: "Click for open", iconImg: "/info.png" })
	}
	if (fm.value.screenshots) {
		items.push({ title: "Screenshots", url: String(fm.value.screenshots), subtitle: "Click to open", iconImg: "/screenshots.png" })
	}
	if (fm.value.changelog) {
		items.push({ title: "Changelogs", url: String(fm.value.changelog), subtitle: "Click to open", iconImg: "/changelog.png" })
	}

	const custom = fm.value.links as any[] | undefined
	if (custom) {
		custom.forEach((l) => {
			items.push({
				title: l.name || "Link",
				url: l.url || l.link || "#",
				subtitle: l.subtitle || "Click for open",
				iconImg: l.icon || detectIcon(l.url || l.link || "") || "/telegram.png",
			})
		})
	}
	return items
})

// ── Legacy format (hero + features) ──────────────────────
interface LegacyFeature {
	title?: string
	details?: string
	icon?: { src: string; alt?: string } | string
	link?: string
	linkText?: string
}

const hero = computed(() => (fm.value.hero as any) || {})
const features = computed<LegacyFeature[]>(() => fm.value.features || [])

function legacyCategory(f: LegacyFeature): string {
	const t = (f.title || "").toLowerCase()
	if (t.includes("download")) return "download"
	if (t.includes("flash") || t.includes("guide")) return "link"
	if (
		t.includes("telegram") ||
		t.includes("updates") ||
		t.includes("screenshot") ||
		t.includes("changelog") ||
		t.includes("source") ||
		t.includes("community") ||
		t.includes("forum")
	)
		return "link"
	return "spec"
}

const legacySpecs = computed<SpecItem[]>(() =>
	features.value
		.filter((f) => legacyCategory(f) === "spec")
		.map((f) => ({
			label: f.title || "",
			value: f.details,
			linkText: f.linkText,
			link: f.link,
			iconImg: typeof f.icon === "object" && f.icon?.src ? f.icon.src : undefined,
			iconHtml: typeof f.icon === "string" ? f.icon : undefined,
		}))
)

const legacyDownloads = computed<DownloadItem[]>(() =>
	features.value
		.filter((f) => legacyCategory(f) === "download")
		.map((f) => ({
			title: f.title || "Download",
			url: f.link || "#",
			subtitle: f.linkText || f.details || "Click to download",
			iconImg: typeof f.icon === "object" && f.icon?.src ? f.icon.src : undefined,
		}))
)

const legacyLinks = computed<LinkItem[]>(() =>
	features.value
		.filter((f) => legacyCategory(f) === "link")
		.map((f) => ({
			title: f.title || "",
			url: f.link || "#",
			subtitle: f.linkText || f.details,
			iconImg: typeof f.icon === "object" && f.icon?.src ? f.icon.src : undefined,
			iconHtml: typeof f.icon === "string" ? f.icon : undefined,
		}))
)

// ── Unified output ───────────────────────────────────────
const displayName = computed(() => (useFlat.value ? fm.value.name : hero.value.name))
const displayTagline = computed(() => (useFlat.value ? fm.value.tagline : hero.value.tagline))
const displayIcon = computed<string | undefined>(() => {
	if (useFlat.value) return fm.value.icon as string | undefined
	const img = hero.value.image
	return img?.src
})
const displayIconAlt = computed(() => {
	if (useFlat.value) return fm.value.name
	return hero.value.image?.alt
})

const specs = computed(() => (useFlat.value ? flatSpecs.value : legacySpecs.value))
const downloads = computed(() => (useFlat.value ? flatDownloads.value : legacyDownloads.value))
const links = computed(() => (useFlat.value ? flatLinks.value : legacyLinks.value))
</script>

<template>
	<div class="rom-layout">
		<!-- HERO -->
		<section class="rom-hero" v-if="displayName || displayIcon">
			<div class="rom-hero-glow"></div>
			<div class="rom-hero-inner">
				<img
					v-if="displayIcon"
					class="rom-hero-logo"
					:src="withBase(displayIcon)"
					:alt="displayIconAlt || displayName || ''"
				/>
				<h1 class="rom-hero-name">{{ displayName }}</h1>
				<p class="rom-hero-tagline" v-if="displayTagline">{{ displayTagline }}</p>
			</div>
		</section>

		<!-- SPECS -->
		<section class="rom-block" v-if="specs.length">
			<h2 class="rom-block-title">Specifications</h2>
			<div class="spec-grid">
				<a
					v-for="(s, i) in specs"
					:key="'spec' + i"
					class="spec-card"
					:class="{ 'is-link': s.link }"
					:href="linkWithBase(s.link)"
				>
					<div class="spec-icon">
						<img v-if="s.iconImg" :src="withBase(s.iconImg)" :alt="s.label" />
						<span v-else-if="s.iconHtml" v-html="s.iconHtml"></span>
					</div>
					<div class="spec-body">
						<span class="spec-label">{{ s.label }}</span>
						<span class="spec-value" v-if="s.value">{{ s.value }}</span>
						<span class="spec-value spec-action" v-else-if="s.linkText">{{ s.linkText }}</span>
					</div>
				</a>
			</div>
		</section>

		<!-- DOWNLOADS -->
		<section class="rom-block" v-if="downloads.length">
			<h2 class="rom-block-title">Downloads</h2>
			<div class="download-grid">
				<a
					v-for="(d, i) in downloads"
					:key="'dl' + i"
					class="download-btn"
					:href="linkWithBase(d.url)"
				>
					<span class="download-icon">
						<img v-if="d.iconImg" :src="withBase(d.iconImg)" :alt="d.title" />
					</span>
					<span class="download-text">
						<span class="download-title">{{ d.title }}</span>
						<span class="download-sub">{{ d.subtitle }}</span>
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
					v-for="(l, i) in links"
					:key="'lnk' + i"
					class="link-card"
					:href="linkWithBase(l.url)"
				>
					<span class="link-icon">
						<img v-if="l.iconImg" :src="withBase(l.iconImg)" :alt="l.title" />
						<span v-else-if="l.iconHtml" v-html="l.iconHtml"></span>
					</span>
					<span class="link-body">
						<span class="link-title">{{ l.title }}</span>
						<span class="link-sub" v-if="l.subtitle">{{ l.subtitle }}</span>
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
