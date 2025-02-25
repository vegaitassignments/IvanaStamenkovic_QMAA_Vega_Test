/// <reference types='cypress'/>

export const CheckoutPage = {
  buttons: {
    continueButton: ".cart_button",
    finishButton: ".cart_button",
  },
  inputFields: {
    firstName: "[data-test='firstName']",
    lastNema: "[data-test='lastName']",
    postalCode: "[data-test='postalCode']",
  },
  confirmationMessage: ".complete-text",
};
