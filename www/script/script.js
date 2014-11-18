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
        $.getJSON("./data/data.json", function(data) {
            insuranceData = data;
            drawTable();       
    });
    //$(window).resize(drawTable);
});
function drawTable() {

    var table = $('#Table1');
    table.dataTable().fnClearTable();
    
    var coldef = Coldef;

    table.DataTable(
    {
        paging: false,
        info: false,
        dom: '<f>t',
        pageLength:80,
        oLanguage: {  sSearch: "Type company name to search: "},      
        data: insuranceData,
        columns: coldef,
        destroy:true,
        aoColumnDefs: [
         { "asSorting": [ "asc", "desc"], "aTargets": [ "_all"] }
        ],
        responsive: true
    });
}