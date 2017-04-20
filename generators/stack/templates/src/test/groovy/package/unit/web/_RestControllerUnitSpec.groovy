package <%=packageName%>.unit.web

import <%=packageName%>.dto.<%=entityClass%>Dto
import <%=packageName%>.facade.<%=entityClass%>Facade
import <%=packageName%>.web.<%=entityClass%>Controller
import org.springframework.http.HttpStatus
import spock.lang.Specification

class <%=entityClass%>ControllerUnitSpec extends Specification {

  <%=entityClass%>Controller <%=entityInstance%>Controller

  def setup() {
    this.<%=entityInstance%>Controller               = new <%=entityClass%>Controller()
    this.<%=entityInstance%>Controller.<%=entityInstance%>Facade    = Mock(<%=entityClass%>Facade)
  }
  <%_ if (postRestMethod) { _%>

  def "post"() {

    when:
    def result = this.<%=entityInstance%>Controller.post(new <%=entityClass%>Dto())

    then:
    1 * this.<%=entityInstance%>Controller.<%=entityInstance%>Facade.save(_) >> new <%=entityClass%>Dto(id: 1L)
    result != null
    result.body.id != null
    result.statusCode == HttpStatus.OK
  }
  <%_ } _%>
  <%_ if (putRestMethod) { _%>

  def "put possitive test"() {

    when:
    def result = this.<%=entityInstance%>Controller.put(new <%=entityClass%>Dto(id: 1L))

    then:
    1 * this.<%=entityInstance%>Controller.<%=entityInstance%>Facade.save(_) >> new <%=entityClass%>Dto(id: 1L)
    result != null
    result.body.id != null
    result.statusCode == HttpStatus.OK
  }

  def "put negative test"() {

    when:
    def result = this.<%=entityInstance%>Controller.put(new <%=entityClass%>Dto())

    then:
    0 * this.<%=entityInstance%>Controller.<%=entityInstance%>Facade.save(_)
    result != null
    result.body != null
    result.statusCode == HttpStatus.NOT_ACCEPTABLE
  }
  <%_ } _%>
  <%_ if (getRestMethod) { _%>

  def "get"() {

    when:
    def result = this.<%=entityInstance%>Controller.get(1L)

    then:
    1 * this.<%=entityInstance%>Controller.<%=entityInstance%>Facade.findOne(_) >> new <%=entityClass%>Dto(id: 1L)
    result != null
    result.body.id != null
    result.statusCode == HttpStatus.OK
  }
  <%_ } _%>

  <%_ if (deleteRestMethod) { _%>
  def "delete"() {

     when:
          this.<%=entityInstance%>Controller.delete(1L)

     then:
         1 * this.<%=entityInstance%>Controller.<%=entityInstance%>Facade.delete(1L)
  }
  <%_ } _%>
}
