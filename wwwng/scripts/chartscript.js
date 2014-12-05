function drawChart ($selector,$xData,$xName,$yData,$yName,$title){
	$($selector).highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: $title
        },        
        credits:{
            enabled:false
        },
        xAxis: {
            categories: $xData,
            title: $xName,
            tickLength: 0
        },
        yAxis: [
	        {
	        	title: $yName
	        }
        ],
        series :[
	        {
	        	name: $yName,
	        	data:  $yData
	        }
        ]
    });
}

function drawStacks($selector,$xData,$xName,$y1Data,$y1Name,$y2Data,$y2Name,$title){
    $($selector).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: $title
        },                
        credits:{
            enabled:false
        },
        xAxis: {
            categories: $xData,
            title:$xName,            
            tickLength: 0
        },
        yAxis: {
            min: 0,
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            },
            labels: {
                enabled: false
            },
            title:$xName
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
                }
        },
        series: [{
            name: 'Estimated for the whole year',
            data: $y1Data,
            color:'#CCC'
        },{
            name: 'Actual',
            data: $y2Data
        }]
    });
};

function drawGauge ($selector,$min,$max,$value,$text,$title){
	$($selector).highcharts({
		 chart: {
            type: 'solidgauge'
        },
        title:{ 
        	text: $title,        	
            verticalAlign: 'bottom',
            y:-60
    	},
    	tooltip:{
    		enabled:false
    	},
    	credits:{
    		enabled:false
    	},
        pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        yAxis: {
            stops: [                
                [0.0, '#DF5353'],
                [0.5, '#DDDF0D'],
                [0.9, '#55BF3B'] 
            ],
            labels: {
            	enabled:false
            },
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            min:$min,
            max:$max
        },
        series:[{
        	data:[$value],
        	dataLabels: {
        		borderWidth:0,
        		format: '<div style="text-align:center"><span style="font-size:25px;">'+$text+'</span></div>',
        		y:-20
        	}
        }]
	})
}

function drawGaugeReverse ($selector,$min,$max,$value,$text,$title){
    $($selector).highcharts({
         chart: {
            type: 'solidgauge'
        },
        title:{ 
            text: $title,           
            verticalAlign: 'bottom',
            y:-20
        },
        tooltip:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        pane: {
            center: ['50%', '70%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        yAxis: {
            stops: [                
                [0.0, '#55BF3B'],
                [0.5, '#DDDF0D'],
                [0.9, '#DF5353'] 
            ],
            labels: {
                enabled:false
            },
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            min:$min,
            max:$max
        },
        series:[{
            data:[$value],
            dataLabels: {
                borderWidth:0,
                format: '<div style="text-align:center"><span style="font-size:25px;">'+$text+'</span></div>',
                y:-20
            }
        }]
    })
}