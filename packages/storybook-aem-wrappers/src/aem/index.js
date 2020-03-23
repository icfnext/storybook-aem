export default async function fetchFromAEM(config) {
    let url = config.hasOwnProperty('contentPath') ? config.contentPath : config;
    if (url.indexOf(window.location.origin) === -1) url = `${window.location.origin}${url}`;
    if (url.indexOf('?wcmmode=disabled') === -1) {
        if (!url.endsWith('.html') || url.indexOf('.html') === -1) url += '.html';
        url += '?wcmmode=disabled';
    }

    console.log('url:', url)
    const response = await fetch(url);
    let html = await response.text();

    // if (config.hasOwnProperty('renderCallback')) {
    //     if (typeof html === 'string') {
    //         const script = [
    //             `<script>`,
    //             `var renderCallback = ${config.renderCallback.toString()}`,
    //             // `document.addEventListener("DOMContentLoaded", function(){`,
    //             `renderCallback()`,
    //             // `exec(${config.renderCallback.toString()})`,
    //             // `});`
    //         ].join('');
    //         html = `${html}${script}`;
    //     } else {
    //         // let script = document.createElement('script');
    //         // script.innerHTML = `(${config.renderCallback.toString()})();`;
    //         console.log('typeof html:', typeof html)
    //         // html = typeof html === 'string' ? `${html}${script.toString()}` : html.appendChild(script);
    //     }
    // }

    return html;
}
