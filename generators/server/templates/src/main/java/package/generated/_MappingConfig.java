package <%=packageName%>.generated;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.InputStream;

/**
 * @author generated
 */
@Configuration
public class MappingConfig {
  @Value("classpath:dozer-mappings.xml")
  private Resource mappingResource;

  @Bean
  Mapper mapper() throws IOException {
    DozerBeanMapper mapper = new DozerBeanMapper();
    try(InputStream mappingStream = mappingResource.getInputStream()) {
      mapper.addMapping(mappingStream);
    }
    return mapper;
  }
}
