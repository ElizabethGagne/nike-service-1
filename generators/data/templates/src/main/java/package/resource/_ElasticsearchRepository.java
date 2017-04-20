package <%=packageName%>.resource;

import <%=packageName%>.entity.<%=entityClass%>Entity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
/* kar-boot-add-page-packages */

/**
 * Spring Data ElasticSearch repository for the <%=entityClass%> entity.
 */
public interface <%=entityClass%>Repository extends ElasticsearchRepository<<%=entityClass%>Entity, String> {
}
