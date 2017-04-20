package com.nike.service1.unit;

import com.nike.service1.Application;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Placeholder test for jacoco to pickup spock. This is a known bug in the sonar ecosystem when using Spock.
 */
public class ApplicationTests {

  @Test
  public void testApplication() {
    Application app = new Application();
    Assert.assertNotNull(app);
  }

}