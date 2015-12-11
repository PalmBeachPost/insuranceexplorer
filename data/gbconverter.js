// Convert CSV to JSON. Usage: node gbconverter.js inputfilename.csv

var io = require('indian-ocean')
var data = io.readDataSync('InsuranceExplorer.csv')
// var data = io.readDataSync(process.argv[2])
data.forEach(function(e){

//	if (e["complaintpercentile"]){
//		e["complaintpercentile"] = (parseFloat(e["complaintpercentile"])*100).toFixed(1)
//	}


	for (var prop in e) {
        if (e[prop]){
            if (prop == 'complaints_per_10k'){
                e[prop] = parseFloat(e[prop]).toFixed(1)
            } else if ((prop!='complaintpercentile') && (e[prop].match('^[0-9]*[0-9]$|^[0-9]*[.][0-9]*$')) && (prop!='total_complaints_display') && (prop!='policycount_display') ){
                e[prop] = parseInt(e[prop])
            }
        }
    }
	
	if (e.complaintpercentilegroup == ''){
		e.complaintpercentilegroup = 0
	}


})

io.writeDataSync('data_0501.json',data)