import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      {/* the next pwa head  */}
      <meta name="application-name" content="عقار نواكشوط" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="apple-mobile-web-app-title"
        content="شركة للوساطة العقارية. ايجار و بيع الشقق و المنازل"
      />
      <meta
        name="description"
        content="شركة للوساطة العقارية. ايجار و بيع الشقق و المنازل"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      {/* <meta name="theme-color" content="#000000" /> */}
      <link rel="apple-touch-icon" href="/icons/ios/icon-152.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/ios/icon-152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/ios/icon-180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/ios/icon-167.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/ios/icon-32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/icons/ios/icon-192.png"
      />{" "}
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/icons/ios/icon-512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/ios/icon-16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://iqar.store" />
      <meta name="twitter:title" content="عقار نواكشوط" />
      <meta name="twitter:description" content="عقار نواكشوط" />
      <meta
        name="twitter:image"
        content="https://yourdomain.com/icons/android-chrome-192x192.png"
      />
      {/* <meta name="twitter:creator" content="@DavidWShadow" /> */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="عقار نواكشوط شركة للوساطة العقارية. ايجار و بيع الشقق و المنازل"
      />
      <meta
        property="og:description"
        content="عقار نواكشوط شركة للوساطة العقارية. ايجار و بيع الشقق و المنازل"
      />
      <meta property="og:site_name" content="عقار نواكشوط" />
      <meta property="og:url" content="https://iqar.store" />
      <meta
        property="og:image"
        content="https://iqar.store/icons/ios/icon-152.png"
      />
      {/* The next pwa heads */}
      <meta name="theme-color" content="#ccc"></meta>
      {/*  Global site tag (gtag.js) - Google Analytics */}
      {/* <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-PNYH0CJWN6"
      ></script>
      <script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-PNYH0CJWN6');
      </script> */}
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${"G-PNYH0CJWN6"}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${"G-PNYH0CJWN6"}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <body dir="rtl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
