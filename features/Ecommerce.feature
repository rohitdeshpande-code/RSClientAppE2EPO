
Feature: Ecommerce validations

@Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "rdtest01@gmail.com" and "PassworD@2025"
        When Add "ADIDAS ORIGINAL" to Cart 
        Then verify "ADIDAS ORIGINAL" is displayed in Cart page
        When enter valid email "rdtest01@gmail.com" and place the order
        Then verify order is present in order history page  

@Validation
Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message displayed

    Examples: 
    | username            | password |
    | rodtest01@gmail.com | test1234 |
    | rodtest02@gmail.com | test4321 |