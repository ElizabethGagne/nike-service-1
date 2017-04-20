package <%=packageName%>.jbehave.facade.<%=entityPath%>

import <%=packageName%>.dto.<%=entityClass%>Dto
import <%=packageName%>.entity.<%=entityClass%>Entity
import <%=packageName%>.facade.<%=entityClass%>Facade
import <%=packageName%>.jbehave.AbstractSpringJBehaveStory
import <%=packageName%>.jbehave.Steps
import <%=packageName%>.resource.<%=entityClass%>Repository

import org.jbehave.core.annotations.Given
import org.jbehave.core.annotations.Then
import org.jbehave.core.annotations.When
import org.springframework.beans.factory.annotation.Autowired

@Steps
class <%=entityClass%>FindOneBehaviour extends AbstractSpringJBehaveStory{

  @Autowired
  <%=entityClass%>Facade <%=entityInstance%>Facade

  @Autowired
  <%=entityClass%>Repository <%=entityInstance%>Repository

  <%=entityClass%>Entity created<%=entityClass%>

  <%=entityClass%>Dto searchFor<%=entityClass%>

  @Given("I create a new <%=entityInstance%>")
  def "I am a <%=entityInstance%>"() {
    this.created<%=entityClass%> = this.<%=entityInstance%>Repository.save(new <%=entityClass%>Entity())
  }

  @When("I search for that <%=entityInstance%> by its new id")
  def "I search for that <%=entityInstance%> by id"() {
    this.searchFor<%=entityClass%> = this.<%=entityInstance%>Facade.findOne(this.created<%=entityClass%>.id)
  }

  @Then("I am returned a <%=entityInstance%> dto with the same id")
  def "I am returned a <%=entityInstance%>"() {
    assert created<%=entityClass%>.id == searchFor<%=entityClass%>.id
  }
}
