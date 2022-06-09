import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { GA_ID } from '../helpers/gtag';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="ja">
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/notosansjp.css" />
                    <link rel="shortcut icon" href="/favicon.png" />
                    {(this.props as any).emotionStyleTags}
                    {/* Global site tag (gtag.js) - Google Analytics */}
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
                    <script dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                    
                        gtag('config', '${GA_ID}', {
                            page_path: window.location.pathname,
                            });`
                        }}
                        id="ga"
                    />
                    {/* Google Tag Manager */}
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KFVFW5B');`
                    }} />
                </Head>
                <body>
                    {/* Google Tag Manager (noscript) */}
                    <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-KFVFW5B"
                            height="0"
                            width="0"
                            style={{display: "none", visibility: "hidden"}}
                        />
                    </noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
