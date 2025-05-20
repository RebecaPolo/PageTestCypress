
import './commands'

// Ignoră toate excepțiile din aplicația OrangeHRM
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});