angular.module('InsuranceExplorerApp', ['ngRoute'])
 .factory('companyList', function ($http) {
     var dataset = { data:null};
     var currentcompany ={data: null}
     var currentId = 1;
     var dataService = {};
     
     $http.get("data/data.json").success(function (data, status, headers, config) {
        dataset.data = data;
        currentcompany.data = data[currentId];
     }); 
     dataService.getCompanies = function () {
         return dataset;
     }
     dataService.getDetails = function(id){
        currentId = id;
        if(dataset.data){
            currentcompany.data = dataset.data[currentId];
        }
        return currentcompany;
     }
    return dataService;
  })
 .config(['$routeProvider', function ($routeProvider) {
     $routeProvider
       .when('/', {
            templateUrl: '/TableView.html',
            controller: 'TableCtrl'
        })
       .when('/detail/:companyId', {
           controller: 'DetailCtrl',
           templateUrl: '/DetailView.html'
        })
       .otherwise({
            redirectTo: '/'
       });
 }])
.controller('TableCtrl', function ($scope, companyList, $http) {   
    $scope.companies = companyList.getCompanies(); 
})
.controller('DetailCtrl', function ($scope, companyList, $http,$routeParams) {
    $scope.currentcompanyid = parseInt($routeParams.companyId)-1;  
    $scope.companyref = companyList.getDetails($scope.currentcompanyid);

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
            if($chartdata.quarters.length > 1){
                drawChart('#policycountchart',$chartdata.quarters,'Quarters', $chartdata.policycounts, 'No. of policies', '');
            }
            if($scope.companyref.data.q4_2013_complaintcount && $scope.companyref.data.total_2014_complaintcount){
                var $actual = [];
                $actual.push($scope.companyref.data.q4_2013_complaintcount);
                $actual.push($scope.companyref.data.total_2014_complaintcount);
                var $predicted =[0];
                $predicted.push($scope.companyref.data.total_2014_complaintcount);
                drawStacks('#complaintcountchart',['2013','2014'],'No. of Complaints',$predicted,'Estimated',$actual,'Actual','');
            }            
            drawGauge('#weissgauge',0,13,14-parseInt($scope.companyref.data.weissrank),$scope.companyref.data.weiss,"Weiss Rating");
            drawGauge('#demotechgauge',0,6,7-parseInt($scope.companyref.data.demotechrank),$scope.companyref.data.demotech,"Demotech Rating");
            drawGauge('#complaintsper10kgauge',0,100,100-parseFloat($scope.companyref.data.complaintpercentile),
               $scope.companyref.data.complaints_per_10k,"Customer Satisfaction (complaints/10,000 policies)");
        }
    });
});