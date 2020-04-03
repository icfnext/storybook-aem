export default async function fetchFromAEM(config) {
    let url = config.hasOwnProperty('contentPath') ? config.contentPath : config;
    if (url.indexOf(window.location.origin) === -1) url = `${window.location.origin}${url}`;
    if (url.indexOf('?wcmmode=disabled') === -1) {
        if (!url.endsWith('.html') || url.indexOf('.html') === -1) url += '.html';
        url += '?wcmmode=disabled';
    }

    const response = await fetch(url);
    let html = await response.text();

    if (config.hasOwnProperty('renderCallback')) {
        html += `<script>${config.renderCallback.toString()}; setTimeout(renderCallback,100);</script>`;
    }

    return html;
}
