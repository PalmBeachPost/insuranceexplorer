angular.module('InsuranceExplorerApp', ['ngRoute'])
 .factory('companyList', function ($http) {
     var dataset = { data:null};
     var currentcompany ={data: null}
     var currentId = 1;
     var dataService = {};
     
     $http.get("data/data_0501.json").success(function (data, status, headers, config) {
        dataset.data = data;
        currentcompany.data = data[currentId];
     });
     dataService.getCompanies = function () {
         return dataset;
     }
     dataService.getDetails = function(id){
        currentId = id;
        if(dataset.data){            
            currentcompany.data = $.grep(dataset.data,function(a){ return a.id == id;});
            if(currentcompany.data)
            {
                currentcompany.data=currentcompany.data[0];
            }        return currentcompany;

        }
     }
    return dataService;
  })
.config(['$routeProvider', function ($routeProvider) {
     $routeProvider
       .when('/', {
            templateUrl: 'http://host.coxmediagroup.com/wpb/editorial/insuranceexplorer-test/TableView.html',
            controller: 'TableCtrl'
        })
       .when('/detail/:companyId', {
           controller: 'DetailCtrl',
           templateUrl: 'http://host.coxmediagroup.com/wpb/editorial/insuranceexplorer-test/DetailView.html'
        })
       .otherwise({
            redirectTo: 'http://host.coxmediagroup.com/wpb/editorial/insuranceexplorer-test'
       });
 }])
.controller('TableCtrl', function ($scope, $filter, companyList, $http) {  
    $scope.companies = companyList.getCompanies(); 

    var sortOrders= {
        "name":false,
        "weissrank":false,
        "demotechrank":false,
        "policycount":true,
        "total_complaints":true,
        "complaintpercentile":false
    }
    var sortedBy = {"field":null,"order":false};
    var orderBy = $filter('orderBy');
    $scope.sortTable = function(field){
        $scope.companies.data = orderBy($scope.companies.data, field, sortOrders[field]);
        sortedBy.field = field;
        sortedBy.order = sortOrders[field];
        sortOrders[field] = !sortOrders[field];
    };

    $scope.isSorted = function(field){
        return sortedBy.field == field;
    };
    $scope.isAscending = function(field){
        return sortOrders[field];
    };
})
.controller('DetailCtrl', function ($scope, companyList, $http,$routeParams) {
    $scope.hasCharts=false;
    $scope.currentcompanyid = parseInt($routeParams.companyId);  
    $scope.companyref = companyList.getDetails($scope.currentcompanyid);
    $(window).scrollTop(0);

    $scope.dataLoaded = function () {
        return companyList.getDetails($scope.currentcompanyid).data !==null;
    }

    $scope.$watch($scope.dataLoaded, function (newValue, oldValue) {
        if(newValue){
           var $chartdata ={quarters:[],policycounts:[],complaintcounts:[]};
            if($scope.companyref.data.q4_2013_policycount){
                $chartdata.quarters.push("2013 Q4");
                $chartdata.policycounts.push($scope.companyref.data.q4_2013_policycount);
            }
            if($scope.companyref.data.q1_2014_policycount){
                $chartdata.quarters.push("2014 Q1");
                $chartdata.policycounts.push($scope.companyref.data.q1_2014_policycount);
            }
            if($scope.companyref.data.q2_2014_policycount){
                $chartdata.quarters.push("2014 Q2");
                $chartdata.policycounts.push($scope.companyref.data.q2_2014_policycount);
            }
            if($scope.companyref.data.q3_2014_policycount){
                $chartdata.quarters.push("2014 Q3");
                $chartdata.policycounts.push($scope.companyref.data.q3_2014_policycount);
            }            
            if($scope.companyref.data.q4_2014_policycount){
                $chartdata.quarters.push("2014 Q4");
                $chartdata.policycounts.push($scope.companyref.data.q4_2014_policycount);
            }
			if($scope.companyref.data.q1_2015_policycount){
                $chartdata.quarters.push("2015 Q1");
                $chartdata.policycounts.push($scope.companyref.data.q1_2015_policycount);
            }
			if($scope.companyref.data.q2_2015_policycount){
                $chartdata.quarters.push("2015 Q2");
                $chartdata.policycounts.push($scope.companyref.data.q2_2015_policycount);
            }			
            if($chartdata.quarters.length > 1){
                drawChart('#policycountchart',$chartdata.quarters,'Quarters', $chartdata.policycounts, 'No. of policies', 'Policy Count');
                $scope.hasCharts=true;
            }
            if($scope.companyref.data.total_2013_complaintcount && $scope.companyref.data.total_2014_complaintcount){
                var $actual = [];
                $actual.push($scope.companyref.data.total_2013_complaintcount);
                $actual.push($scope.companyref.data.total_2014_complaintcount);

                // var $predicted =[0];
                // $predicted.push($scope.companyref.data.total_2014_complaintcount);
                drawStacks('#complaintcountchart',['2013','2014'],'No. of Complaints',
                    // $predicted,'Estimated',
                    $actual,'Actual','Complaint count');
                $scope.hasCharts=true;
            }            
            drawGauge('#weissgauge',0,13,14-parseInt($scope.companyref.data.weissrank),$scope.companyref.data.weiss,"Weiss Rating");
            drawGauge('#demotechgauge',0,6,7-parseInt($scope.companyref.data.demotechrank),$scope.companyref.data.demotech,"Demotech Rating");
            drawGauge('#complaintsper10kgauge',0,100,(100-parseFloat($scope.companyref.data.complaintpercentile)),
               $scope.companyref.data.complaints_per_10k,"Customer Satisfaction (complaints/10,000 policies)");
            $scope.isASI = $scope.companyref.data.name=="American Security Insurance Co.";
        }

    });
});