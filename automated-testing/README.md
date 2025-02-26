This repository contains files related to automated testing.

## Files and Folders

- **test-cases-for-automation-sauce-demo-ivana-stamenkovic** – Detailed descriptions of the test cases that have been automated.
- **cypress-test-scenarios** – A folder containing automated test scripts.

  - Path: `IvanaStamenkovic_QMAA_Vega_Test/automated-testing/cypress-test-scenarios/cypress/e2e/tests`

In the automated test cases, one of the tests, **TC_RESET_001**, is currently failing. This test is related to **bug report ID: BR_006**. The issue is described in more detail in the bug report, where additional information about the bug and its impact on the system can be found.

# Running Tests

After you have downloaded the repository **IvanaStamenkovic_QMAA_Vega_Test** and opened it in **Visual Studio Code**, select **Terminal → New Terminal** from the menu.

Make sure that you are in the **cypress-test-scenarios** folder when you open the terminal. If you are not, navigate to it using the following command:

```sh
cd path/to/your/project-folder
```

Replace path/to/your/project-folder with the actual path where the project is located. The path should end with `IvanaStamenkovic_QMAA_Vega_Test/automated-testing/cypress-test-scenarios`

## Running Tests in Headless Mode

To run the automated tests in headless mode, use the following command:

```sh
npx cypress run
```

This will execute all the tests without opening the Cypress GUI. The results will be displayed directly in the terminal.

Additionaly, if you want to run the tests in a specific browser, such as Chrome, you can use the following command:

```sh
npx cypress run --browser chrome
```

## Running Cypress with GUI

To run the Cypress tests using the graphical user interface (GUI) and generate the configuration file if it is missing, follow these steps:

```sh
npx cypress open
```

This command will launch the **Cypress Test Runner** in the browser. It will also create the **cypress.json configuration file** (if it does not already exist) in the current folder.

Once the Cypress Test Runner opens, select **E2E Testing**.
Choose your **preferred browser** for E2E testing, and click on the **Start E2E Testing** button below.
After that, you will see **a list of available tests** - click on a test to run it in the browser using the GUI.

Once you are done with testing, you can **close the Cypress Test Runner window** and proceed with headless testing or any other activities.
