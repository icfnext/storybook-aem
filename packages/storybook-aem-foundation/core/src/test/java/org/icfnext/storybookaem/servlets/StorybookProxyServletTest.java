package org.icfnext.storybookaem.servlets;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import java.lang.reflect.Field;
import java.util.Map;
import javax.servlet.Servlet;
import org.junit.Test;
import org.mockito.Mockito;

public class StorybookProxyServletTest {
    @Test public void testExample() throws Exception {
        /*
        final DefaultGetServlet servlet = new StorybookProxyServlet();
        final DefaultGetServlet.Config config = Mockito.mock(StorybookProxyServlet.Config.class);
        Mockito.when(config.example()).thenReturn(true);
        servlet.activate(config);
        servlet.init();

        final Field field = DefaultGetServlet.class.getDeclaredField("somefield");
        field.setAccessible(true);

        @SuppressWarnings("unchecked")
        final Map<String, Servlet> map = (Map<String, Servlet>) field.get(servlet);
        assertEquals(4, map.size());
        */
    }
}
