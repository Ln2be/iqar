import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <meta name="theme-color" content="#42a5f5"></meta>

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
