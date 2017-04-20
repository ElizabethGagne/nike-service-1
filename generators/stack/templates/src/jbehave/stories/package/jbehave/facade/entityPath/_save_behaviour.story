Meta:

Narrative:
A test that saves a TacoDto

Scenario: Generated story for the saving of a new Taco.
Given I have an unsaved taco dto with no id
When I save the taco dto
Then the id will be generated
