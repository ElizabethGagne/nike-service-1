package <%=packageName%>.it.resource

import <%=packageName%>.entity.<%=entityClass%>Entity
import <%=packageName%>.it.AbstractItTest
import <%=packageName%>.resource.<%=entityClass%>Repository

import org.springframework.beans.factory.annotation.Autowired
/* kar-boot-add-page-packages */

/**
 * <%=entityClass%> entity/repository IT specification.
 */
class <%=entityClass%>RepoItSpec extends AbstractItTest {

  @Autowired <%=entityClass%>Repository <%=entityInstance%>Repository

  def "super simple test to make sure that the entity <%=entityClass%> is savable "() {

    when:
    def r<%=entityInstance%> = this.<%=entityInstance%>Repository.save(new <%=entityClass%>Entity())

    then:
    r<%=entityInstance%>.id != null

    cleanup:
    this.<%=entityInstance%>Repository.deleteAll()

  }

  /* kar-boot-find-by-needle */
}
