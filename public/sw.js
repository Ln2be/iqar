if(!self.define){let e,n={};const c=(c,s)=>(c=new URL(c+".js",s).href,n[c]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=n,document.head.appendChild(e)}else e=c,importScripts(c),n()})).then((()=>{let e=n[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(n[a])return;let r={};const o=e=>c(e,a),f={module:{uri:a},exports:r,require:o};n[a]=Promise.all(s.map((e=>f[e]||o(e)))).then((e=>(i(...e),r)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts("fallback-2ZefPoWLpK9aAHtcY92dO.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Cairo.ttf",revision:"dcb85dee1c4674ba69ab76c7275b515e"},{url:"/Icon-100.png",revision:"617f6c084c490f6c0cb3fa510ca8d21a"},{url:"/Icon-1024.png",revision:"377597574094245d1e77c1ba1418f821"},{url:"/Icon-114.png",revision:"3371e1822160d55f0f41888476d8b057"},{url:"/Icon-120.png",revision:"b7b783ecd7e494fe5976f715f73bdf47"},{url:"/Icon-128.png",revision:"56f603fd46f59a4033c14345baf99413"},{url:"/Icon-144 copy.png",revision:"239ec66e108737c8bcaee7390f335d85"},{url:"/Icon-144.png",revision:"239ec66e108737c8bcaee7390f335d85"},{url:"/Icon-152.png",revision:"41e0a07f76feb9deed8b7f56317bf318"},{url:"/Icon-16.png",revision:"306794d5b2cff3c3c03f01de69c69976"},{url:"/Icon-167.png",revision:"a27e9b196fd93e65b74b560104ccddeb"},{url:"/Icon-172.png",revision:"4e1f039289ba7769f0e5b224c7b73fd7"},{url:"/Icon-180.png",revision:"280126cd6d3a9f4bfc3fd47365ab68bb"},{url:"/Icon-192.png",revision:"1b78daa9b53905c0a9b28321b4c10d5b"},{url:"/Icon-196.png",revision:"e5b6d6b6d9218dfb0937483195f77640"},{url:"/Icon-20.png",revision:"f49725666e42882a2703b81a41cea5cc"},{url:"/Icon-256.png",revision:"a471f4e63f6fe7296b1f429598c33c94"},{url:"/Icon-29.png",revision:"3303960f04a95b72f2dea5b9fe9a7b8d"},{url:"/Icon-32.png",revision:"53f2f85ff27b2d146fb54a07d9ee4018"},{url:"/Icon-36.png",revision:"03ea4c57f63df771ab218a00295a131a"},{url:"/Icon-40.png",revision:"e8eb63730fd893f6c63ca3e860564c83"},{url:"/Icon-48 copy.png",revision:"ef1abae168e421bac2db1bf8e59300a4"},{url:"/Icon-48.png",revision:"ef1abae168e421bac2db1bf8e59300a4"},{url:"/Icon-50.png",revision:"76c279ce3243cf04c64ec2b694633f99"},{url:"/Icon-512 copy.png",revision:"fde26b13fa228369da59e28acc5a9365"},{url:"/Icon-512.png",revision:"fde26b13fa228369da59e28acc5a9365"},{url:"/Icon-55.png",revision:"dabd84704e9bd02a82b729fd4a474944"},{url:"/Icon-57.png",revision:"18239dda6966198cc72eeb8c5770db42"},{url:"/Icon-58.png",revision:"b961b167d686643050c12a6f1989c481"},{url:"/Icon-60.png",revision:"813cf75fc61dc9765b6f6b4a37324642"},{url:"/Icon-64.png",revision:"494a2abbd4f225d496e918232c63a82a"},{url:"/Icon-72 copy.png",revision:"b4e44c76be533bcfff5e0ca6e87b3290"},{url:"/Icon-72.png",revision:"b4e44c76be533bcfff5e0ca6e87b3290"},{url:"/Icon-76.png",revision:"1733cb83055fe2a80925f070529635ac"},{url:"/Icon-80.png",revision:"adc2f28ec6e71e70e4a490daeca0d505"},{url:"/Icon-87.png",revision:"d9a11fae09aeed61688b14b47f3eb32e"},{url:"/Icon-88.png",revision:"436fee14c6f8da26890bfc9be3124706"},{url:"/Icon-96.png",revision:"b593a3bbf6597ebafa90bba9c72e0c56"},{url:"/Roboto.ttf",revision:"b2d307df606f23cb14e6483039e2b7fa"},{url:"/_next/static/2ZefPoWLpK9aAHtcY92dO/_buildManifest.js",revision:"cf60dc94f7baa7e21f0164b88f5fec89"},{url:"/_next/static/2ZefPoWLpK9aAHtcY92dO/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/2ZefPoWLpK9aAHtcY92dO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/112-e2b5fbe2ff924a7e.js",revision:"e2b5fbe2ff924a7e"},{url:"/_next/static/chunks/113-2192202f7b2f7e4a.js",revision:"2192202f7b2f7e4a"},{url:"/_next/static/chunks/206-8c5925eaa3a005e1.js",revision:"8c5925eaa3a005e1"},{url:"/_next/static/chunks/238-23ecaea7d10a530b.js",revision:"23ecaea7d10a530b"},{url:"/_next/static/chunks/367-d7e9a5b4ccb219a1.js",revision:"d7e9a5b4ccb219a1"},{url:"/_next/static/chunks/377-5247a61a016f566c.js",revision:"5247a61a016f566c"},{url:"/_next/static/chunks/399-b6de620a04500b6c.js",revision:"b6de620a04500b6c"},{url:"/_next/static/chunks/515-13068a09fd2266b2.js",revision:"13068a09fd2266b2"},{url:"/_next/static/chunks/517-63f15bcec44ae9d7.js",revision:"63f15bcec44ae9d7"},{url:"/_next/static/chunks/52-1124f4710350477a.js",revision:"1124f4710350477a"},{url:"/_next/static/chunks/588-302cc75c70c8afad.js",revision:"302cc75c70c8afad"},{url:"/_next/static/chunks/739-b999ff4bacefe3c6.js",revision:"b999ff4bacefe3c6"},{url:"/_next/static/chunks/852-c525fe811160218a.js",revision:"c525fe811160218a"},{url:"/_next/static/chunks/framework-fc97f3f1282ce3ed.js",revision:"fc97f3f1282ce3ed"},{url:"/_next/static/chunks/main-b5caa67eaf0d1f05.js",revision:"b5caa67eaf0d1f05"},{url:"/_next/static/chunks/pages/_app-ee7e89be0cd601e9.js",revision:"ee7e89be0cd601e9"},{url:"/_next/static/chunks/pages/_error-1995526792b513b2.js",revision:"1995526792b513b2"},{url:"/_next/static/chunks/pages/_offline-8eca6f5df8418961.js",revision:"8eca6f5df8418961"},{url:"/_next/static/chunks/pages/auth/login-04ae51fa46ff5c6a.js",revision:"04ae51fa46ff5c6a"},{url:"/_next/static/chunks/pages/auth/signup-dc1e59300cbcaaf7.js",revision:"dc1e59300cbcaaf7"},{url:"/_next/static/chunks/pages/code/admin-a03f794e0e57bd06.js",revision:"a03f794e0e57bd06"},{url:"/_next/static/chunks/pages/code/user-04876423b0ccc0b3.js",revision:"04876423b0ccc0b3"},{url:"/_next/static/chunks/pages/contactUs-3e0be3427a2c6c8d.js",revision:"3e0be3427a2c6c8d"},{url:"/_next/static/chunks/pages/feeds-2a55f4fddf7ac70b.js",revision:"2a55f4fddf7ac70b"},{url:"/_next/static/chunks/pages/index-96a70ba479a19338.js",revision:"96a70ba479a19338"},{url:"/_next/static/chunks/pages/menu-80b5130e2e50ed68.js",revision:"80b5130e2e50ed68"},{url:"/_next/static/chunks/pages/post-60d1b7742dc92bf8.js",revision:"60d1b7742dc92bf8"},{url:"/_next/static/chunks/pages/post-form-198ba61bbd7e4044.js",revision:"198ba61bbd7e4044"},{url:"/_next/static/chunks/pages/reps-184c0d4874b8cb52.js",revision:"184c0d4874b8cb52"},{url:"/_next/static/chunks/pages/rtl-86f1d0c38b633901.js",revision:"86f1d0c38b633901"},{url:"/_next/static/chunks/pages/samsar-d163dc406f7646e0.js",revision:"d163dc406f7646e0"},{url:"/_next/static/chunks/pages/search-2f68a3e86957e1fa.js",revision:"2f68a3e86957e1fa"},{url:"/_next/static/chunks/pages/sitemap.xml-12050973580219e4.js",revision:"12050973580219e4"},{url:"/_next/static/chunks/pages/test-59cb82f6df99a156.js",revision:"59cb82f6df99a156"},{url:"/_next/static/chunks/pages/tour-351f375ca481dfbb.js",revision:"351f375ca481dfbb"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-2e51481b1d484a05.js",revision:"2e51481b1d484a05"},{url:"/_next/static/css/31e8a9aa20d3dcbd.css",revision:"31e8a9aa20d3dcbd"},{url:"/_next/static/css/d34d0c0aa2d7b6b4.css",revision:"d34d0c0aa2d7b6b4"},{url:"/_offline",revision:"2ZefPoWLpK9aAHtcY92dO"},{url:"/favicon.ico",revision:"74a1911860d5097a572841f1e343d412"},{url:"/googlec3540d09c4fb94c7.html",revision:"8d5f3ddf3e5d9272d362d76bb585e530"},{url:"/icons/android/Icon-144.png",revision:"239ec66e108737c8bcaee7390f335d85"},{url:"/icons/android/Icon-192.png",revision:"1b78daa9b53905c0a9b28321b4c10d5b"},{url:"/icons/android/Icon-36.png",revision:"03ea4c57f63df771ab218a00295a131a"},{url:"/icons/android/Icon-48.png",revision:"ef1abae168e421bac2db1bf8e59300a4"},{url:"/icons/android/Icon-512.png",revision:"fde26b13fa228369da59e28acc5a9365"},{url:"/icons/android/Icon-72.png",revision:"b4e44c76be533bcfff5e0ca6e87b3290"},{url:"/icons/android/Icon-96.png",revision:"b593a3bbf6597ebafa90bba9c72e0c56"},{url:"/icons/ios/Icon-100.png",revision:"617f6c084c490f6c0cb3fa510ca8d21a"},{url:"/icons/ios/Icon-1024.png",revision:"377597574094245d1e77c1ba1418f821"},{url:"/icons/ios/Icon-114.png",revision:"3371e1822160d55f0f41888476d8b057"},{url:"/icons/ios/Icon-120.png",revision:"b7b783ecd7e494fe5976f715f73bdf47"},{url:"/icons/ios/Icon-128.png",revision:"56f603fd46f59a4033c14345baf99413"},{url:"/icons/ios/Icon-144.png",revision:"239ec66e108737c8bcaee7390f335d85"},{url:"/icons/ios/Icon-152.png",revision:"41e0a07f76feb9deed8b7f56317bf318"},{url:"/icons/ios/Icon-16.png",revision:"306794d5b2cff3c3c03f01de69c69976"},{url:"/icons/ios/Icon-167.png",revision:"a27e9b196fd93e65b74b560104ccddeb"},{url:"/icons/ios/Icon-172.png",revision:"4e1f039289ba7769f0e5b224c7b73fd7"},{url:"/icons/ios/Icon-180.png",revision:"280126cd6d3a9f4bfc3fd47365ab68bb"},{url:"/icons/ios/Icon-196.png",revision:"e5b6d6b6d9218dfb0937483195f77640"},{url:"/icons/ios/Icon-20.png",revision:"f49725666e42882a2703b81a41cea5cc"},{url:"/icons/ios/Icon-256.png",revision:"a471f4e63f6fe7296b1f429598c33c94"},{url:"/icons/ios/Icon-29.png",revision:"3303960f04a95b72f2dea5b9fe9a7b8d"},{url:"/icons/ios/Icon-32.png",revision:"53f2f85ff27b2d146fb54a07d9ee4018"},{url:"/icons/ios/Icon-40.png",revision:"e8eb63730fd893f6c63ca3e860564c83"},{url:"/icons/ios/Icon-48.png",revision:"ef1abae168e421bac2db1bf8e59300a4"},{url:"/icons/ios/Icon-50.png",revision:"76c279ce3243cf04c64ec2b694633f99"},{url:"/icons/ios/Icon-512.png",revision:"fde26b13fa228369da59e28acc5a9365"},{url:"/icons/ios/Icon-55.png",revision:"dabd84704e9bd02a82b729fd4a474944"},{url:"/icons/ios/Icon-57.png",revision:"18239dda6966198cc72eeb8c5770db42"},{url:"/icons/ios/Icon-58.png",revision:"b961b167d686643050c12a6f1989c481"},{url:"/icons/ios/Icon-60.png",revision:"813cf75fc61dc9765b6f6b4a37324642"},{url:"/icons/ios/Icon-64.png",revision:"494a2abbd4f225d496e918232c63a82a"},{url:"/icons/ios/Icon-72.png",revision:"b4e44c76be533bcfff5e0ca6e87b3290"},{url:"/icons/ios/Icon-76.png",revision:"1733cb83055fe2a80925f070529635ac"},{url:"/icons/ios/Icon-80.png",revision:"adc2f28ec6e71e70e4a490daeca0d505"},{url:"/icons/ios/Icon-87.png",revision:"d9a11fae09aeed61688b14b47f3eb32e"},{url:"/icons/ios/Icon-88.png",revision:"436fee14c6f8da26890bfc9be3124706"},{url:"/icons/watch/Icon-172.png",revision:"4e1f039289ba7769f0e5b224c7b73fd7"},{url:"/icons/watch/Icon-196.png",revision:"e5b6d6b6d9218dfb0937483195f77640"},{url:"/icons/watch/Icon-48.png",revision:"ef1abae168e421bac2db1bf8e59300a4"},{url:"/icons/watch/Icon-55.png",revision:"dabd84704e9bd02a82b729fd4a474944"},{url:"/icons/watch/Icon-80.png",revision:"adc2f28ec6e71e70e4a490daeca0d505"},{url:"/icons/watch/Icon-88.png",revision:"436fee14c6f8da26890bfc9be3124706"},{url:"/manifest.json",revision:"cc708fc2b3efee037c59aa1d7ff75a0b"},{url:"/robots.txt",revision:"2d9da10c76373b54b8253681f2778521"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:c,state:s})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
