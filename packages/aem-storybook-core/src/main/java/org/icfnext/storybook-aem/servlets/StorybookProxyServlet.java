package org.apache.sling.servlets.get.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceNotFoundException;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.get.impl.helpers.HeadServletResponse;
import org.apache.sling.servlets.get.impl.helpers.HtmlRendererServlet;
import org.apache.sling.servlets.get.impl.helpers.JsonRendererServlet;
import org.apache.sling.servlets.get.impl.helpers.PlainTextRendererServlet;
import org.apache.sling.servlets.get.impl.helpers.StreamRendererServlet;
import org.apache.sling.servlets.get.impl.helpers.XMLRendererServlet;
import org.apache.sling.xss.XSSAPI;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferencePolicyOption;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = Servlet.class,
    property = {
            "service.description=Storybook AEM Proxy Servlet",
            "sling.servlet.paths=/bin/aemstorybook-proxy",
            "sling.servlet.extensions=proxy",
            "sling.servlet.methods=GET",
            "sling.servlet.methods=HEAD"
    })
@Designate(ocd=DefaultGetServlet.Config.class)
public class StorybookProxyServlet extends SlingSafeMethodsServlet {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Activate
    protected void activate(Config cfg) {
    }

    @Deactivate
    protected void deactivate() {
    }

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
    }

    @Override
    protected void doHead(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
    }

    @ObjectClassDefinition(name="", description="")
    public @interface Config {

        @AttributeDefinition(name = "", description="")
        String[] exampleA();

        @AttributeDefinition(name = "", description="")
        boolean exampleB() default false;

        @AttributeDefinition(name = "", description = "")
        int exampleC() default 200;
    }
}
