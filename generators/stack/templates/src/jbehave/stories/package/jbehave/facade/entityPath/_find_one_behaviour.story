Meta:

Narrative:
A test that finds a <%=entityClass%>Dto based on a newly created <%=entityClass%> id

Scenario: Generated story for the saving of a new <%=entityClass%>.
Given I create a new <%=entityInstance%>
When I search for that <%=entityInstance%> by its new id
Then I am returned a <%=entityInstance%> dto with the same id
