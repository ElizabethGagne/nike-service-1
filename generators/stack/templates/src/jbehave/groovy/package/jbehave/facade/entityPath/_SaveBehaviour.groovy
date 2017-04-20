package <%=packageName%>.jbehave.facade.<%=entityPath%>

import <%=packageName%>.dto.<%=entityClass%>Dto
import <%=packageName%>.facade.<%=entityClass%>Facade
import <%=packageName%>.jbehave.AbstractSpringJBehaveStory
import <%=packageName%>.jbehave.Steps

import org.jbehave.core.annotations.Given
import org.jbehave.core.annotations.Then
import org.jbehave.core.annotations.When
import org.springframework.beans.factory.annotation.Autowired

@Steps
class <%=entityClass%>SaveBehaviour extends AbstractSpringJBehaveStory{

  @Autowired
  <%=entityClass%>Facade <%=entityInstance%>Facade

  <%=entityClass%>Dto created<%=entityClass%>Dto

  <%=entityClass%>Dto saved<%=entityClass%>Dto

  @Given("I have an unsaved <%=entityInstance%> dto with no id")
  def "I have an unsaved <%=entityInstance%> dto with no id"() {
    this.created<%=entityClass%>Dto = new <%=entityClass%>Dto()
  }

  @When("I save the <%=entityInstance%> dto")
  def "I save the <%=entityInstance%> dto"() {
    this.saved<%=entityClass%>Dto = this.<%=entityInstance%>Facade.save(this.created<%=entityClass%>Dto)
  }

  @Then("the id will be generated")
  def "the id will be generated"() {
    assert saved<%=entityClass%>Dto.id
  }
}
