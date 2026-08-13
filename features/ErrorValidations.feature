
Feature: Error Validations

# @Validation
# Scenario: Placing the order
#     Given a login to Ecommerce2 application with "rdtest01@gmail.com" and "PassworD@2025"
#     Then Verify Error message displayed

@Validation
Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message displayed

    Examples: 
    | username            | password |
    | rodtest01@gmail.com | test1234 |
    | rodtest02@gmail.com | test4321 |