if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,t)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}})).then(e=>{const r=t(...e);return s.default||(s.default=r),s})}))}}define("./www.sw.js",["./workbox-af3f3b30"],(function(e){"use strict";e.setCacheNameDetails({prefix:"@randy.tarampi/www"}),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/styles.css",revision:"47dbbad1a3fdedf2b834cb74cf00c398"},{url:"/styles.js",revision:"285c2759697012d89910cb9798ff631d"},{url:"/vendor.js",revision:"a8b28530236d31af99cdb11680ea6005"},{url:"/vendor.js.LICENSE.txt",revision:"39e433d8a12070c7bcc54790d263f5de"},{url:"/www.js",revision:"dff3e9d0919853b96c06ef298d2557e6"},{url:"/www.sw.installer.js",revision:"97cc529562f3543ba7c04f427b8b78ae"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/"))),e.registerRoute(/.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/,new e.StaleWhileRevalidate({cacheName:"external",plugins:[new e.ExpirationPlugin({maxEntries:100,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=www.sw.js.map
