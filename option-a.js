var csv = '/uploads/live-data.csv';
var rawData;
var plainData;

var firstYear;
var lastYear;

Papa.parse(csv, {
  delimiter: ",",
  download: true,
  header: false,
  dynamicTyping: true,
  complete: function(results) {
    rawData = results.data;

    _.forEach(rawData, function(n){
      if (n[0] === parseInt(n[0], 10)) {
        n[0] = n[0].toString();
      }
    });

    plainData = rawData.slice(0);
    plainData.splice(1,3);

    firstYear = plainData[1][0];
    lastYear = plainData[plainData.length - 1][0];

    console.log("Parsing complete:", results);
    console.log("Data + desc:", rawData);
    console.log("Data only:", plainData);
    console.log("Earliest Data:", firstYear, "Latest Data:", lastYear)
  }
});

google.load('visualization', '1.1', {'packages':['corechart','bar', 'line']});

google.setOnLoadCallback(drawChart);

function drawChart() {

  var liveData = new google.visualization.arrayToDataTable(plainData);

  // UTILITIES

  // function defaultOptions (chartTitle, chartSubtitle) {
  //   return google.charts.Bar.convertOptions(
  //     {
  //       isStacked: true,
  //       // fontName: "Arial",
  //       chart: {
  //         title: chartTitle,
  //         subtitle: chartSubtitle + firstYear + " to " + lastYear,
  //       }
  //     }
  //   );
  // }

  function dataLabel (num) {
    return {
      calc: "stringify",
      sourceColumn: num,
      type: "string",
      role: "annotation"
    }
  }

  // nat gov tax rev, new style


  var ngTaxData = new google.visualization.DataView(liveData);
  ngTaxData.setColumns([0,1,2,3])

  var ngTaxChart = new google.charts.Bar(document.getElementById('ng_tax_chart'));

  ngTaxChart.draw(ngTaxData, google.charts.Bar.convertOptions(
      {
        isStacked: true,
        // fontName: "Arial",
        title: "National Government Tax Revenue",
        subtitle: firstYear + " to " + lastYear,
        // theme: "material"
      }
   )
  );

  // nat gov non-tax rev, new style


  var ngNontaxData = new google.visualization.DataView(liveData);
  ngNontaxData.setColumns([0,4,5,6,7,8])

  var ngNontaxChart = new google.charts.Bar(document.getElementById('ng_nontax_chart'));

  ngNontaxChart.draw(ngNontaxData, google.charts.Bar.convertOptions(
      {
        isStacked: true,
        // fontName: "Arial",
        title: "National Government Non-Tax Revenue",
        subtitle: firstYear + " to " + lastYear,
        animation: {
          startup: true,
          duration: 300,
          easing: "inAndOut"
        }
      }
    )
  );


  // nat gov cash ops, new style


  var ngCashData = new google.visualization.DataView(liveData);
  ngCashData.setColumns([0,9,10,11])

  var ngCashChart = new google.charts.Bar(document.getElementById('ng_cash_chart'));

  ngCashChart.draw(ngCashData, google.charts.Bar.convertOptions(
      {
        isStacked: true,
        // fontName: "Arial",
        title: "National Government Cash Operations",
        subtitle: firstYear + " to " + lastYear,
      }
    )
  );



  // national govt debt

  ngDebtDataPlus = plainData.slice(0);

  // just get relevant data (ugh GDP)

  _.forEach(ngDebtDataPlus, function(n, k){
    ngDebtDataPlus[k] = _.at(n, [0,12,13,25]);
  });

  // compute and label the GDP ratio and percent debt

  _.forEach(ngDebtDataPlus, function(n, k){
    if (k === 0) {
      ngDebtDataPlus[k].push("Debt / GDP Ratio");
      ngDebtDataPlus[k].push("% Domestic Debt");
    } else {
      var ratio = (ngDebtDataPlus[k][1] + ngDebtDataPlus[k][2]) / ngDebtDataPlus[k][3];
      ngDebtDataPlus[k].push(ratio);
      var percent = ngDebtDataPlus[k][1] / (ngDebtDataPlus[k][1] + ngDebtDataPlus[k][2]);
      ngDebtDataPlus[k].push(percent);
    }
  });

  // oh my god what a mess
  // i am so sorry

  var ngDebtDataPre = new google.visualization.arrayToDataTable(ngDebtDataPlus);
  var ngDebtData = new google.visualization.DataView(ngDebtDataPre);
  ngDebtData.setColumns([0,1,2])

  var ngDebtChart = new google.charts.Bar(document.getElementById('ng_debt_chart'));

  ngDebtChart.draw(ngDebtData, google.charts.Bar.convertOptions(
      {
        isStacked: true,
        // fontName: "Arial",
        title: "National Government Outstanding Debt",
        subtitle: firstYear + " to " + lastYear,
        // theme: "material"
      }
   )
  );

  // debt vs GDP

  var ngDebtData2 = new google.visualization.DataView(ngDebtDataPre);
  ngDebtData2.setColumns([0,4])

  var ngDebtChart2 = new google.charts.Line(document.getElementById('ng_debt_chart2'));

  ngDebtChart2.draw(ngDebtData2, google.charts.Line.convertOptions(
      {
        // fontName: "Arial",
        // title: "National Government Outstanding Debt",
        subtitle: "Debt to GDP Ratio",
        // theme: "material"
      }
   )
  );

  // percent domenstic debt

  var ngDebtData3 = new google.visualization.DataView(ngDebtDataPre);
  ngDebtData3.setColumns([0,5])

  var ngDebtChart3 = new google.charts.Line(document.getElementById('ng_debt_chart3'));

  ngDebtChart3.draw(ngDebtData3, google.charts.Line.convertOptions(
      {
        // fontName: "Arial",
        // title: "National Government Outstanding Debt",
        subtitle: "Percentage Domestic Debt"
        // theme: "material"
      }
   )
  );


  // public financial position


  var cpsFinData = new google.visualization.DataView(liveData);
  cpsFinData.setColumns([0,14,15,17,18,20,21,22])

  var cpsFinChart = new google.charts.Bar(document.getElementById('cps_fin_chart'));

  cpsFinChart.draw(cpsFinData, google.charts.Bar.convertOptions(
      {
        isStacked: true,
        // fontName: "Arial",
        title: "Consolidated Public Position Financial Position",
        subtitle: firstYear + " to " + lastYear,
        // theme: "material"
      }
   )
  );



  // public debt


  var cpsDebtData = new google.visualization.DataView(liveData);
  cpsDebtData.setColumns([0,23,24])

  var cpsDebtChart = new google.charts.Bar(document.getElementById('cps_debt_chart'));

  cpsDebtChart.draw(cpsDebtData, google.charts.Bar.convertOptions(
      {
        isStacked: true,
        // fontName: "Arial",
        title: "Consolidated Public Position Public Debt",
        subtitle: firstYear + " to " + lastYear,
        // theme: "material"
      }
   )
  );



}


var timeOut = null;

window.onresize = function(){
    if (timeOut != null)
        clearTimeout(timeOut);

    timeOut = setTimeout(function(){
        drawChart();
    }, 500);
};