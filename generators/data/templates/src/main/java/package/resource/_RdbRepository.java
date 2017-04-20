package <%=packageName%>.resource;

import <%=packageName%>.entity.<%=entityClass%>Entity;
import org.springframework.data.jpa.repository.JpaRepository;
/* kar-boot-add-page-packages */

/**
 * Spring Data ElasticSearch repository for the <%=entityClass%> entity.
 */
public interface <%=entityClass%>Repository extends JpaRepository<<%=entityClass%>Entity, Long> {

	/* kar-boot-find-by-needle */
}
