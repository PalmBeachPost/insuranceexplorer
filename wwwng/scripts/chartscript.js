function drawChart (data){
	$('#chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'title goes here'
        },
        subtitle: {
            text: 'Source: maybe'
        },
        xAxis: {
            categories: data.quarters
        },
        yAxis: [
	        {
	        	title: "No. of policies"
	        },
	        {
	        	title: "No Of Complaints"
	        }
        ],
        series :[
	        {
	        	name: 'series 1',
	        	data:  data.policycounts,
	        	yAxis: 0,
	        	type : 'line'
	        },
	        {
	        	name:'series 2',
	        	data : data.complaintcounts,
	        	yAxis : 1,
	        	type : 'line'
	        }
        ]
    });
}

function drawGauge ($selector,$min,$max,$value,$text,$title){
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