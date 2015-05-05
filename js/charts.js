

// var cpsDebtData = {
//   labels: ["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"],
//   series: [
//     {
//       name: "foreign",
//       data: [1531064.03,1699999.06,1745369.82,1913883.33,2194045.49,2328285.46,2691683.75,3783097.29,4773163.30,5219892.64]
//     },
//     {
//       name: "domestic",
//       data: [3542958.43,3589212.58,3288499.82,3029740.79,2571751.20,2935076.64,2997990.79,2899717.28,2820210.14,2275735.71]
//     }
//   ]
// }

var cpsDebtData = {
  labels:[
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012"
  ],
  series:[
    [
      {
        meta:"Foreign",
        value:1531064.03
      },
      {
        meta:"Foreign",
        value:1699999.06
      },
      {
        meta:"Foreign",
        value:1745369.82
      },
      {
        meta:"Foreign",
        value:1913883.33
      },
      {
        meta:"Foreign",
        value:2194045.49
      },
      {
        meta:"Foreign",
        value:2328285.46
      },
      {
        meta:"Foreign",
        value:2691683.75
      },
      {
        meta:"Foreign",
        value:3783097.29
      },
      {
        meta:"Foreign",
        value:4773163.30
      },
      {
        meta:"Foreign",
        value:5219892.64
      }
    ],
    [
      {
        meta:"Domestic",
        value:3542958.43
      },
      {
        meta:"Domestic",
        value:3589212.58
      },
      {
        meta:"Domestic",
        value:3288499.82
      },
      {
        meta:"Domestic",
        value:3029740.79
      },
      {
        meta:"Domestic",
        value:2571751.20
      },
      {
        meta:"Domestic",
        value:2935076.64
      },
      {
        meta:"Domestic",
        value:2997990.79
      },
      {
        meta:"Domestic",
        value:2899717.28
      },
      {
        meta:"Domestic",
        value:2820210.14
      },
      {
        meta:"Domestic",
        value:2275735.71
      }
    ]
  ]
}

var cpsDebtOptions = {
  stackBars: true,
  axisY: {
    labelInterpolationFnc: function(value) {
      return (value / 1000) + 'm';
    }
  },
  plugins: [
    Chartist.plugins.tooltip({
      currency: "PHP "
    })
  ]
}

new Chartist.Bar('#cps-debt', cpsDebtData, cpsDebtOptions);

var cpsCashData = {
  labels: ["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"],
  series: [
    {
      name: "Local Government Units",
      data: [17577.00,14723.00,23783.00,26738.50,21807.00,34578.00,34695.00,34103.00,34724.00,73648.00]
    },
    {
      name: "SSS/GSIS/PHIC",
      data: [17586.00,24375.00,48934.00,59355.00,34203.00,66699.00,44500.00,40122.00,47965.70,72727.00]
    },
    {
      name: "Adjustment of net lending and equity to GOCCs",
      data: [5809.00,9168.00,1529.00,-31.00,10615.00,13753.00,-3261.00,9927.00,1019.00,27200.00]
    },
    {
      name: "Government Financial Institutions",
      data: [4925.00,5211.00,6614.00,7997.00,5939.72,7496.00,10800.00,9451.73,9760.00,9269.00]
    },
    {
      name: "Others",
      data: [ 2894.00,1093.00,3276.00,-4565.00,698.00,2280.00,-121.00,3391.00,0,-62.00]
    },
    {
      name: "Central Bank Restructuring",
      data: [-15663.00,-17478.00,-16327.00,-13225.00,-8177.00,-8759.00,-8759.00,-7689.00,-3536.00,-3506.00]
    },
    {
      name: "Government Owned and Controlled Corporations",
      data: [ -65315.00,-85413.00,-25374.00,-1056.00,57926.00,-27158.90,-19300.00,-66925.00,-19842.00,-4906.00]
    },
    {
      name: "Bangko Sentral ng Pilipinas",
      data: [ 6917.00,3270.00,3632.00,557.00,-89220.00,9427.00,-168.00,-63722.00,-47432.00,-94848.00]
    },
    { name: "National Government",
      data: [ -199868.00,-187057.00,-146778.00,-64791.00,-12441.00,-68117.00,-298532.00,-314458.00,-197754.00,-242827.00]
    }
  ]
}

var cpsCashOptions = {
  stackBars: true,
  axisY: {
    labelInterpolationFnc: function(value) {
      return (value / 1000) + 'm';
    }
  },
  plugins: [
    Chartist.plugins.tooltip()
  ]
}

new Chartist.Bar('#cps-cash', cpsCashData, cpsCashOptions);


// generalized tooltip code
//
// var $chart = $('.ct-chart');
//
// var $toolTip = $chart
//   .append('<div class="tooltip"></div>')
//   .find('.tooltip')
//   .hide();
//
// $chart.on('mouseenter', '.ct-bar', function() {
//   var $point = $(this),
//     value = $point.attr('ct:value'),
//     seriesName = $point.parent().attr('ct:series-name');
//   $toolTip.html(seriesName + '<br>' + value).show();
// });
//
// $chart.on('mouseleave', '.ct-bar', function() {
//   $toolTip.hide();
// });
//
// $chart.on('mousemove', function(event) {
//   $toolTip.css({
//     left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
//     top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
//   });
// });
