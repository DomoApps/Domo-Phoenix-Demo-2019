// STEP TWO: Updating a chart

// For more on how to use Phoenix view the documentation at:
// https://domoapps.github.io/domo-phoenix/

// Call this with your data to render a PhoenixChart
// CHANGED: Added two arguments to make updating/resetting chart properties simpler
function chartIt(data, customOptions, chartType) {
  // Set a chart type using the correct enum: https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties
  var chartType = chartType || DomoPhoenix.CHART_TYPE.BAR;

  // Set your "Chart Options": https://domoapps.github.io/domo-phoenix/#/domo-phoenix/api
  var options = {
    width: 650,
    height: 400
  };
  // ADDED: Merge option overrides into default options
  options = Object.assign(options, customOptions);

  // Create the Phoenix Chart
  var chart = new DomoPhoenix.Chart(chartType, data, options);

  // Append the canvas element to your app
  document.getElementById("phoenix-chart").appendChild(chart.canvas);

  // Render the chart when you're ready for the user to see it
  chart.render();

  // ADDED: Now we return the chart so we can call methods to update it with new data
  return chart;
}

// Set this to use the columns in your dataset:
var columns = [
  {
    type: DomoPhoenix.DATA_TYPE.STRING,
    name: "Order Priority",
    mapping: DomoPhoenix.MAPPING.SERIES
  },
  {
    type: DomoPhoenix.DATA_TYPE.STRING,
    name: "Customer Segment",
    mapping: DomoPhoenix.MAPPING.ITEM
  },
  {
    type: DomoPhoenix.DATA_TYPE.DOUBLE,
    name: "Sales",
    mapping: DomoPhoenix.MAPPING.VALUE
  }
];

/* Start - Delete this section when using real data  */
var sampleData = {
  columns: columns,
  rows: [
    ["Low", "Corporate", 8582.8875],
    ["High", "Home Office", 14415.941],
    ["Low", "Consumer", 1264.8215],
    ["Medium", "Small Business", 21478.799],
    ["Critical", "Consumer", 2621.97],
    ["Not Specified", "Consumer", 2211.31],
    ["Critical", "Corporate", 10087.1315],
    ["Not Specified", "Corporate", 4407.138],
    ["High", "Consumer", 11667.366],
    ["High", "Corporate", 19503.323],
    ["Low", "Small Business", 1735.3715],
    ["Low", "Home Office", 10057.42],
    ["Medium", "Home Office", 7691.02],
    ["Critical", "Small Business", 4036.064],
    ["Not Specified", "Small Business", 84.99],
    ["High", "Small Business", 689.74],
    ["Critical", "Home Office", 7416.828],
    ["Not Specified", "Home Office", 1839.26],
    ["Medium", "Consumer", 4280.034],
    ["Medium", "Corporate", 7965.238]
  ]
};

// CHANGED: Store a reference to the chart object
var theChart = chartIt(sampleData);

// ADDED: Helper function for randomizing data and variable for tracking currently selected priority
var currentPriority;
function getDataSliceForPriority(priority) {
  var newRows = sampleData.rows;
  if (priority) {
    newRows = newRows.filter(function(row) {
      var keepThisRow = row[0] === priority;
      return keepThisRow;
    });
  }

  return {
    columns: sampleData.columns,
    rows: newRows
  };
}

// ADDED: Helper function for updating chart and preserving selected properties
function updateChart(data, customOptions) {
  data = data || getDataSliceForPriority(currentPriority);
  customOptions = customOptions || {};
  theChart.update(data, customOptions);
}

// ADDED: Helper function for resetting chart if need be (and preserving selected properties)
// (Same arguments as chartIt since we'll just pass them through)
function resetChart(data, customOptions, chartType) {
  data = data || getDataSliceForPriority(currentPriority);
  customOptions = customOptions || {};
  document.getElementById("phoenix-chart").innerHTML = "";
  theChart = chartIt(data, customOptions, chartType);
}

// ADDED: Click handler for filtering charts
function filterChart(priority) {
  currentPriority = priority;
  var newData = getDataSliceForPriority(priority);
  updateChart(newData);
}
