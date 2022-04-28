import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      {/* <!-- Global site tag (gtag.js) - Google Analytics -->
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-PNYH0CJWN6"
      ></script>
      <script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-PNYH0CJWN6');
      </script> */}

      <body dir="rtl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
