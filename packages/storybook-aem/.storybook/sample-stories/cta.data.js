export default {
    empty: {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"uhcdotcom/components/content/cta",
        "useDefaultStyleId":"true",
        "cq:styleIds":["cta-link"]
    },
    titleAndLink: {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"uhcdotcom/components/content/cta",
        "useDefaultStyleId":"true",
        "cq:styleIds":["cta-link"],
        "linkTitle":"Title & Link",
        "linkLocation":"/content/uhcdotcom/en/home"
    },
    damLink: {
        "jcr:primaryType":"nt:unstructured",
        "linkTitle":"Mom & Child",
        "jcr:language":"en",
        "scheme":"https://",
        "ariaLabel":"Mom & Child Embracing",
        "elementId":"element-id",
        "cta":"false",
        "linkTarget":"_blank",
        "sling:resourceType":"uhcdotcom/components/content/cta",
        "assetLink":"true",
        "linkLocationAsset":"/content/dam/uhcdotcom/3pack-mom-and-child.png",
        "useDefaultStyleId":"true",
        "cq:styleIds":["cta-link"],
        "cq:responsive":{
            "jcr:primaryType":"nt:unstructured",
            "default":{
                "jcr:primaryType":"nt:unstructured",
                "width":"3"
            }
        }
    },
    home: {
        "jcr:primaryType":"nt:unstructured",
        "linkTitle":"Home",
        "linkLocation":"/content/uhcdotcom/en/home",
        "scheme":"https://",
        "ariaLabel":"Home",
        "elementId":"home-link",
        "cta":"false",
        "linkTarget":"_self",
        "sling:resourceType":"uhcdotcom/components/content/cta",
        "useDefaultStyleId":"true",
        "cq:styleIds":["cta-link"],
    }
}