# Page Structure

To see what makes up a page, let’s look at an example: the Reports Page.

/frontend/src/Dashboard/Pages/ReportsPage  
├── ReportsPageLayout.js  
├── Reports  
│ ├── CampaignData.js  
│ ├── Chart.js  
│ ├── ClicksPerCampaignChart.js  
│ ├── Deposits.js  
│ ├── SentimentGraph.js

The main file here is [ReportsPageLayout.js](./src/Dashboard/Pages/ReportsPage/ReportsPageLayout.js). Each page should have a layout file with a similar structure. This file contains the grid layout defining how each of the reports should be displayed. More information on the grid api can be found here: Material UI | Grid API . Furthermore, in this file the Joyride tutorial is implemented.

The reports that [ReportsPageLayout.js](./src/Dashboard/Pages/ReportsPage/ReportsPageLayout.js) uses are defined in the [Reports](./src/Dashboard/Pages/ReportsPage/Reports) folder. Let’s look at a specific report, [ClicksPerCampaignChart.js](./src/Dashboard/Pages/ReportsPage/Reports/ClicksPerCampaignChart.js). This chart, along with all the rest, is a functional component that is stateful using React Hooks. The two state variables in this file are data, and state and they are defined here:

```javascript
const [data, setData] = useState([]); //data for chart and setter function
const [state, setState] = useState('loading');
```

The setters for these variables are used by the useEffect hook which asynchronously calls the backend through an axios call. Once the axios call is completed, the data and state variables will be updated according to what happened (loaded, or error). Before, during, and after the axios call, the function `pickContentToDisplay()` renders different components depending on the state variable. If all goes well (the axios call receives a successful response from the backend), the state variable is set to ‘loaded’, the data variable is set to the data from the backend, and `pickContentToDisplay()` displays the graph as expected.

# Adding a New Report

To add a new report, you can follow the same structure as an existing report. Create a file in the [Reports](./src/Dashboard/Pages/ReportsPage/Reports) folder and have it export a React component. It can be either a function component or a class component. Then, modify [ReportsPageLayout.js](./src/Dashboard/Pages/ReportsPage/ReportsPageLayout.js) to include your new report.

# Adding a New Page

To add a new page, follow the same structure as the existing pages. Create a folder for your page in [Pages](./src/Dashboard/Pages/) and create a layout file within it. After you create the layout file, add that component along with its attributes to the `PagesWithAttributes` variable located in [Constants.js](./src/Dashboard/Utilities/Constants.js). Your page should automatically show up in the side drawer and should load when you click on it.

# Testing

The following commands related to testing can be run from within the client directory:

|       Command        |                   Purpose                   |
| :------------------: | :-----------------------------------------: |
|    `npm run test`    |        Run all tests and see results        |
|  `npm run coverage`  | Run all tests and see code coverage results |
| `npm run test -- -u` |       Update snapshots for all tests        |

Front end tests for each file are located in the same directory as each file that’s being tested. The name of each test is the name of the file it is testing with the extension .test.js instead of .js. For example, the test for [ReportsPageLayout.js](./src/Dashboard/Pages/ReportsPage/ReportsPageLayout.js) is located at [ReportsPageLayout.test.js](./src/Dashboard/Pages/ReportsPage/ReportsPageLayout.test.js).

Each test file consists of 2 major parts. First, mounting the component to be tested, and second, checking to make sure the component behaves as expected. Sometimes, this involves mocking backend api calls. For this, we use Jest to mock the return values of the axios call being made. See this documentation for more details. Mounting the component is done through Enzyme using either shallow rendering or full rendering. The `expect()` function from Jest is used to make sure components behave expectedly.
