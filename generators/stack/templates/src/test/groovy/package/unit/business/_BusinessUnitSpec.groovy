package <%=packageName%>.unit.business

import <%=packageName%>.business.<%=entityClass%>Business
import <%=packageName%>.business.impl.<%=entityClass%>BusinessImpl
import <%=packageName%>.entity.<%=entityClass%>Entity
import <%=packageName%>.resource.<%=entityClass%>Repository
import spock.lang.Specification
/* kar-boot-add-page-packages */

class <%=entityClass%>BusinessUnitSpec extends Specification {

  <%=entityClass%>Business <%=entityInstance%>Business

  <%=entityClass%>Repository <%=entityInstance%>Repository

  def setup() {
    this.<%=entityInstance%>Business = new <%=entityClass%>BusinessImpl()
    this.<%=entityInstance%>Repository = Mock(<%=entityClass%>Repository)
    this.<%=entityInstance%>Business.<%=entityInstance%>Repo = this.<%=entityInstance%>Repository
  }

  <%_ if (saveBusinessMethod) { _%>
  def "save"() {

    when:
    def r<%=entityInstance%> = this.<%=entityInstance%>Business.save(new <%=entityClass%>Entity())

    then:
    1 * this.<%=entityInstance%>Repository.save(_) >> new <%=entityClass%>Entity(id: 1L)
    r<%=entityInstance%> != null
    r<%=entityInstance%>.id == 1L
  }
  <%_ } _%>
  <%_ if (readBusinessMethod ) { _%>

  def "read"() {

    when:
    def r<%=entityInstance%> = this.<%=entityInstance%>Business.findOne(1L)

    then:
    1 * this.<%=entityInstance%>Repository.findOne(_) >> new <%=entityClass%>Entity(id: 1L)
    r<%=entityInstance%> != null
    r<%=entityInstance%>.id == 1L
  }
  <%_ } _%>
  <%_ if (deleteBusinessMethod ) { _%>
  <%_ } _%>

  /* kar-boot-find-by-needle */
}
