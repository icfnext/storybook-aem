package org.icfnext.storybookaem.servlets;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Arrays;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.client.ClientProtocolException;
import java.util.List;

@Component(service = Servlet.class,
    property = {
            "service.description=Storybook AEM Proxy Servlet",
            "sling.servlet.paths=/bin/aemstorybook-proxy",
            "sling.servlet.extensions=proxy",
            "sling.servlet.methods=GET",
            "sling.servlet.methods=HEAD"
    })
@Designate(ocd=StorybookProxyServlet.Config.class)
public class StorybookProxyServlet extends SlingSafeMethodsServlet {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Reference
    private HttpClientBuilderFactory httpFactory;

    private PoolingHttpClientConnectionManager conMgr;
    private int maxConnections;
    private int maxHostConnections;
    private List<String> headerConfigs;

    @Activate
    protected void activate(Config cfg) {
        if (cfg != null) {
            maxConnections = cfg.maxConnections();
            maxHostConnections = cfg.maxHostConnections();
            headerConfigs = Arrays.asList(cfg.headers());
        }
    }

    @Deactivate
    protected void deactivate() {
    }

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        final String proxyTargetUrl = request.getRequestPathInfo().getSuffix().substring(1);
        final String proxyContentType = request.getHeader(HttpHeaders.CONTENT_TYPE);

        HttpGet httpGet = null;
        HttpResponse proxyResponse = null;

        try {
            final HttpClient client = httpFactory.newBuilder().setConnectionManager(getMultiThreadedConf()).build();
            final URI uri = new URIBuilder(proxyTargetUrl).build();
            httpGet = new HttpGet(uri);

            if (proxyContentType != null) {
                httpGet.setHeader(HttpHeaders.CONTENT_TYPE, proxyContentType);
            }

            for (String headerConfig : headerConfigs) {
                final String[] headerInfo = headerConfig.split("\\|\\|");

                if (uri.getAuthority().equals(headerInfo[0])) {
                    httpGet.setHeader(headerInfo[1], headerInfo[2]);
                }
            }

            proxyResponse = client.execute(httpGet);

        } catch (URISyntaxException e) {
            logger.error("URISyntaxException during storybook-aem proxy.", e);
        } catch (ClientProtocolException e) {
            logger.error("ClientProtocolException during storybook-aem proxy.", e);
        } catch (IOException e) {
            logger.error("IOException during storybook-aem proxy.", e);
        } finally {
            if (httpGet != null) {
                httpGet.releaseConnection();
            }
        }

        response.getWriter().write(EntityUtils.toString(proxyResponse.getEntity()));
    }

    private PoolingHttpClientConnectionManager getMultiThreadedConf() {
        if (conMgr == null) {
            conMgr = new PoolingHttpClientConnectionManager();
            conMgr.setMaxTotal(maxConnections);
            conMgr.setDefaultMaxPerRoute(maxHostConnections);
        }
        return conMgr;
    }

    @ObjectClassDefinition(name="Storybook AEM Proxy")
    public @interface Config {

        @AttributeDefinition(name = "Headers", description="Here you can add headers to different requests. Format: <domain of proxied urls this config applies to>||<header name>||<header value>")
        String[] headers();

        @AttributeDefinition(name = "Max Connections")
        int maxConnections() default 1;

        @AttributeDefinition(name = "Max Host Connections")
        int maxHostConnections() default 1;
    }
}
