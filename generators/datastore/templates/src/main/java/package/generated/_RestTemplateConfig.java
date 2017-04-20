package <%=packageName%>.generated;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author generated
 */
@Configuration
public class RestTemplateConfig {

  @Bean
  RestTemplate configRestTemplate() {
    return new RestTemplate();
  }
}
