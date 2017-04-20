package <%=packageName%>.unit.facade

import <%=packageName%>.business.<%=entityClass%>Business
import <%=packageName%>.dto.<%=entityClass%>Dto
import <%=packageName%>.entity.<%=entityClass%>Entity
import <%=packageName%>.facade.<%=entityClass%>Facade
import <%=packageName%>.facade.impl.<%=entityClass%>FacadeImpl
import org.dozer.DozerBeanMapper
import spock.lang.Specification
/* kar-boot-add-page-packages */

class <%=entityClass%>FacadeUnitSpec extends Specification {

  <%=entityClass%>Facade <%=entityInstance%>Facade

  def setup() {
    this.<%=entityInstance%>Facade = new <%=entityClass%>FacadeImpl()
    this.<%=entityInstance%>Facade.<%=entityInstance%>Business = Mock(<%=entityClass%>Business)
    this.<%=entityInstance%>Facade.mapper = new DozerBeanMapper()
  }
  <%_ if (saveFacadeMethod) { _%>

  def "save"() {

    when:
    def <%=entityInstance%>Dto = this.<%=entityInstance%>Facade.save(new <%=entityClass%>Dto())

    then:
    1 * this.<%=entityInstance%>Facade.<%=entityInstance%>Business.save(_) >> new <%=entityClass%>Entity(id:1L)
    <%=entityInstance%>Dto instanceof <%=entityClass%>Dto
    <%=entityInstance%>Dto.id == 1L
  }
  <%_ } _%>
  <%_ if (readFacadeMethod ) { _%>

  def "read"() {

    when:
    def <%=entityInstance%>Dto = this.<%=entityInstance%>Facade.findOne(1L)

    then:
    1 * this.<%=entityInstance%>Facade.<%=entityInstance%>Business.findOne(_) >> new <%=entityClass%>Entity(id:1L)
    <%=entityInstance%>Dto instanceof <%=entityClass%>Dto
    <%=entityInstance%>Dto.id == 1L
  }
  <%_ } _%>

  /* kar-boot-find-by-needle */
}
