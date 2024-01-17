---
layout: home

hero:
  name: "crDroid"
  tagline: "Unofficial build | OTA"
  text: "\nFeatures:"
  image: 
      alt: Android 14
      src: /roms-icons/crdroid.png

features:
  - title: Android 14
    link: /roms/a14/
    icon: 
      src: /14.svg
    linkText: Based on Android 14

  - title: Maintainer
    icon: '<img src="https://www.github.com/CakesTwix.png" style="border-radius: 10%;"/>'
    details: CakesTwix

  - title: Version
    icon: 
        src: /version.png
    details: '10.0'
  
  - title: Security Patch
    icon: 
        src: /securitypatch.png
    details: January 2024
  
  - title: OTA
    icon: 
        src: /ota.webp
    details: Over-the-air update

  - title: GApps
    icon: 
        src: /gapps.png
    details: Not Integrated
    linkText: Click to download
    link: "https://nikgapps.com/crdroid-official"

  - title: How to Flash
    icon: 
        src: /info.png
    linkText: Click for open
    link: "/guides/flash14.md"

  - title: Screenshots
    link: https://t.me/z5sromscreenshots/679
    icon: 
        src: /screenshots.png
    linkText: Click to open

  - title: Changelogs
    link: https://nextcloud.cakestwix.com/s/XcdnzAWr52o9WD5
    icon: 
        src: /changelog.png
    linkText: Click to open

  - title: Telegram post
    icon: 
        src: /telegram.png
    linkText: Click for open
    link: "https://t.me/z5supdates/842"

  - title: Download from Telegram
    icon: 
        src: /telegram.png
    linkText: Click to download
    link: "https://t.me/lenovoZ5Sru/964"

  - title: Download from NextCloud
    icon: 
        src: /nextcloud.png
    linkText: Click to dowload
    link: "https://nextcloud.cakestwix.com/s/Myp42zobCa9ioBL?path=%2FcrDroid"

---

<div class="centeredDiv">
<h3 style="font-size: 56px;">Screenshots</h3>
</div>

<DCarouselIndicator>
  <template #default="page">
  <div class="box_images">
    <div :class="['panel', page.pageIndex === 1 ? 'active' : '']" @click="page.setPageIndex(1)">
      <h3>Status bar</h3>
    </div>
    <div :class="['panel', page.pageIndex === 2 ? 'active' : '']" @click="page.setPageIndex(2)">
      <h3>Quick settings</h3>
    </div>
    <div :class="['panel', page.pageIndex === 3 ? 'active' : '']" @click="page.setPageIndex(3)">
      <h3>Lock Screen</h3>
    </div>
    <div :class="['panel', page.pageIndex === 4 ? 'active' : '']" @click="page.setPageIndex(4)">
      <h3>Navigation</h3>
    </div>
    <div :class="['panel', page.pageIndex === 5 ? 'active' : '']" @click="page.setPageIndex(5)">
      <h3>Buttons</h3>
    </div>
    <div :class="['panel', page.pageIndex === 6 ? 'active' : '']" @click="page.setPageIndex(6)">
      <h3>User Interface</h3>
    </div>
    <div :class="['panel', page.pageIndex === 7 ? 'active' : '']" @click="page.setPageIndex(7)">
      <h3>Notification</h3>
    </div>
    <div :class="['panel', page.pageIndex === 8 ? 'active' : '']" @click="page.setPageIndex(8)">
      <h3>Sound</h3>
    </div>
    <div :class="['panel', page.pageIndex === 9 ? 'active' : '']" @click="page.setPageIndex(9)">
      <h3>Miscellaneous</h3>
    </div>
  </div>
  </template>
</DCarouselIndicator>


<style>
.centeredDiv {
  position:absolute;
  top: 10%;
  left: 40%;
}

.box_images {
  margin-top: 130px;
  display: flex;
  width: 60%;
}

.panel {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 60vh;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  -webkit-transition: all 700ms ease-in;
  transition: all 700ms ease-in;
}
.panel:nth-child(1){
  background-image: url("https://crdroid.net/img/gallery/gallery-1.webp");
}
.panel:nth-child(2){
  background-image: url("https://crdroid.net/img/gallery/gallery-2.webp");
}
.panel:nth-child(3){
  background-image: url("https://crdroid.net/img/gallery/gallery-3.webp");
}
.panel:nth-child(4){
  background-image: url("https://crdroid.net/img/gallery/gallery-4.webp");
}
.panel:nth-child(5){
  background-image: url("https://crdroid.net/img/gallery/gallery-5.webp");
}
.panel:nth-child(6){
  background-image: url("https://crdroid.net/img/gallery/gallery-6.webp");
}
.panel:nth-child(7){
  background-image: url("https://crdroid.net/img/gallery/gallery-7.webp");
}
.panel:nth-child(8){
  background-image: url("https://crdroid.net/img/gallery/gallery-8.webp");
}
.panel:nth-child(9){
  background-image: url("https://crdroid.net/img/gallery/gallery-9.webp");
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: -50px;
  left: 20px;
  margin: 0;
  opacity: 0;
}

.panel.active {
  flex: 2;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
}
</style>



