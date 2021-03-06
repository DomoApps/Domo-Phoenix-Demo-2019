// STEP ONE: Updated CLI and new templates

// For more on how to use Phoenix view the documentation at:
// https://domoapps.github.io/domo-phoenix/

// Call this with your data to render a PhoenixChart
function chartIt(data) {
  // Set a chart type using the correct enum: https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties
  var chartType = DomoPhoenix.CHART_TYPE.BAR;

  // Set your "Chart Options": https://domoapps.github.io/domo-phoenix/#/domo-phoenix/api
  var options = {
    width: 650,
    height: 400
  };

  // Create the Phoenix Chart
  var chart = new DomoPhoenix.Chart(chartType, data, options);

  // Append the canvas element to your app
  document.getElementById("phoenix-chart").appendChild(chart.canvas);

  // Render the chart when you're ready for the user to see it
  chart.render();
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

chartIt(sampleData);
