package org.apache.sling.servlets.get.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import java.lang.reflect.Field;
import java.util.Map;
import javax.servlet.Servlet;
import org.junit.Test;
import org.mockito.Mockito;

public class DefaultGetServletTest {
    @Test public void testDisabledAlias() throws Exception {
        /*
        final DefaultGetServlet servlet = new DefaultGetServlet();
        final DefaultGetServlet.Config config = Mockito.mock(DefaultGetServlet.Config.class);
        Mockito.when(config.enable_html()).thenReturn(true);
        Mockito.when(config.enable_json()).thenReturn(true);
        Mockito.when(config.enable_xml()).thenReturn(false);
        Mockito.when(config.enable_txt()).thenReturn(false);
        Mockito.when(config.aliases()).thenReturn(new String[] {"xml:pdf"});
        servlet.activate(config);

        servlet.init();

        final Field field = DefaultGetServlet.class.getDeclaredField("rendererMap");
        field.setAccessible(true);

        @SuppressWarnings("unchecked")
        final Map<String, Servlet> map = (Map<String, Servlet>) field.get(servlet);
        assertEquals(4, map.size());
        assertNotNull(map.get("res"));
        assertNotNull(map.get("html"));
        assertNotNull(map.get("json"));
        assertNotNull(map.get("pdf"));
        */
    }
}
