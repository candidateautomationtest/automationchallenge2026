Feature: SauceDemo UI, API and accessibility checks
  As a SauceDemo user
  I want to validate UI, API, and accessibility flows
  So that the experience is reliable and inclusive

  @ui @smoke
  Scenario: User purchase one item successfully
    Given I open the Sauce Demo website
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page
    When I add the product "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I checkout with first name "Test", last name "User", and postal code "12345"
    Then I should see the order confirmation "Thank you for your order!"

  @api
  Scenario: API - Homepage returns 200 and contains "Swag Labs" text
    Given I prepare an API client for SauceDemo
    When I GET request to "/"
    Then the API response status should be 200
    And the API response body should contain "Swag Labs"

  @accessibility
  Scenario: Accessibility scan Login page has no serious or critical violations
    Given I open the Sauce Demo website
    When I run an accessibility scan on the current page
    Then I should have no serious or critical accessibility violations

