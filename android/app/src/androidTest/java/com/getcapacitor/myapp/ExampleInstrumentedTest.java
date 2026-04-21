package com.getcapacitor.myapp;

import static org.junit.Assert.*;

import android.content.Context;
import android.content.res.Configuration;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Instrumented test, which will execute on an Android device.
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
@RunWith(AndroidJUnit4.class)
public class ExampleInstrumentedTest {

    @Test
    public void useAppContext() throws Exception {
        // Context of the app under test.
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();

        assertEquals("com.detectiveh.app", appContext.getPackageName());
    }


    @Test
    public void appIsActuallyLandscape() {
        // Verifies the hardware orientation
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        int orientation = appContext.getResources().getConfiguration().orientation;
        
        // 2 is Configuration.ORIENTATION_LANDSCAPE
        assertEquals("The app is NOT in landscape mode!", 
                     Configuration.ORIENTATION_LANDSCAPE, orientation);
    }
}
