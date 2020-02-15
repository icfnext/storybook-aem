package org.icfnext.storybookaem.servlets;

import java.io.IOException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
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

    @Activate
    protected void activate(Config cfg) {
    }

    @Deactivate
    protected void deactivate() {
    }

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        response.getWriter().write("Hello, World!");
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
