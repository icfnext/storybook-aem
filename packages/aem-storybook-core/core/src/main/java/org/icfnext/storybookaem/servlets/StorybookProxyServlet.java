package org.icfnext.storybookaem.servlets;

import java.io.IOException;
import java.net.URISyntaxException;
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
import org.apache.http.cookie.SM;
import org.apache.http.entity.StringEntity;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.client.ClientProtocolException;

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

    @Activate
    protected void activate(Config cfg) {
        if (cfg != null) {
            maxConnections = cfg.maxConnections();
            maxHostConnections = cfg.maxHostConnections();
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
            httpGet = new HttpGet(new URIBuilder(proxyTargetUrl).build());

            if (proxyContentType != null) {
                httpGet.setHeader(HttpHeaders.CONTENT_TYPE, proxyContentType);
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

    @ObjectClassDefinition(name="", description="")
    public @interface Config {

        @AttributeDefinition(name = "", description="")
        String[] exampleA();

        @AttributeDefinition(name = "", description="")
        boolean exampleB() default false;

        @AttributeDefinition(name = "", description = "")
        int maxConnections() default 1;

        @AttributeDefinition(name = "", description = "")
        int maxHostConnections() default 1;
    }
}
