$(document).ready( function () {

    // Column definitions for the three tables
    Coldef= [
            { data: 'name'},
            { 
                data: 'weiss',
                render : function (data, type, row){
                    if ( type === 'display' || type === 'filter' ) {
                        return data;
                    }
                    return row.weissrank; 
                }
            },
            { 
                data: 'demotech',
                render : function (data, type, row){
                    if ( type === 'display' || type === 'filter' ) {
                        return data;
                    }
                    return row.demotechrank; 
                } 
            },
            { 
                data: 'complaint_ratio',
                render : function (data, type, row){
                    if(data == "-1"){
                        if ( type === 'display' || type === 'filter' ) {
                            return 'No Complaints' ;                       
                        }
                        return 10000;
                    }
                    else if(!data){
                        if ( type === 'display' || type === 'filter' ) {
                            return 'No Data' ;                       
                        }
                        return 0;
                    }              
                    return data; 
                } 
            }
    ];

    d3.json("./data/data.json", function(data) {
        insuranceData = data;
        setUpScales();
        drawTable();       
    });
    //$(window).resize(drawTable);
});
function setUpScales(){

    colorScaleWeiss = d3.scale.linear()
                        .domain(d3.extent(insuranceData.map( function(d){ return d.weissrank;})))
                        .range(['#66ED22','#ED4729']);
    colorScaleDemoTech = d3.scale.linear()
                        .domain(d3.extent(insuranceData.map( function(d){ return d.demotechrank;})))
                        .range(['#66ED22','#ED4729']);
    colorScaleCompRatio = d3.scale.linear()
                        .domain([0,6000])
                        .range(['#ED4729','#66ED22',]);
}
function drawTable() {

    var table = $('#Table1');
    table.dataTable().fnClearTable();

    table.DataTable(
    {
        paging: false,
        info: false,
        dom: '<f>t',
        pageLength:80,
        oLanguage: {  sSearch: "Type company name to search: "},      
        data: insuranceData,
        columns: Coldef,
        destroy:true,
        aoColumnDefs: [
         { "asSorting": [ "asc", "desc"], "aTargets": [ "_all"] }
        ],
        responsive: true,
        createdRow: function ( row, data, index ) {
            $('td', row).eq(1).css('background-color',colorScaleWeiss(data['weissrank']));
            $('td', row).eq(2).css('background-color',colorScaleDemoTech(data['demotechrank']));
            

            var x = data['complaint_ratio'] == -1?6000:data['complaint_ratio'];
            $('td', row).eq(3).css('background-color',colorScaleCompRatio(x));
        }
    });
}