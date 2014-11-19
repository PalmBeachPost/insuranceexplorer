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
           /* var $chartdata ={quarters:[],policycounts:[],complaintcounts:[]};
            if($scope.companyref.data.q4_2013_policycount && $scope.companyref.data.q4_2013_complaintcount){
                $chartdata.quarters.push("2013 Q4");
                $chartdata.policycounts.push($scope.companyref.data.q4_2013_policycount);
                $chartdata.complaintcounts.push($scope.companyref.data.q4_2013_complaintcount);
            }
            if($scope.companyref.data.q1_2014_policycount && $scope.companyref.data.q1_2014_complaintcount){
                $chartdata.quarters.push("2014 Q1");
                $chartdata.policycounts.push($scope.companyref.data.q1_2014_policycount);
                $chartdata.complaintcounts.push($scope.companyref.data.q1_2014_complaintcount);
            }
            if($scope.companyref.data.q2_2014_policycount && $scope.companyref.data.q2_2014_complaintcount){
                $chartdata.quarters.push("2014 Q2");
                $chartdata.policycounts.push($scope.companyref.data.q2_2014_policycount);
                $chartdata.complaintcounts.push($scope.companyref.data.q2_2014_complaintcount);
            }
            if($chartdata.quarters.length > 0){
                drawChart($chartdata);
            }*/
            drawGauge('#weissgauge',0,18,19-parseInt($scope.companyref.data.weissrank),$scope.companyref.data.weiss,"Weiss Score");
            drawGauge('#demotechgauge',0,8,9-parseInt($scope.companyref.data.demotechrank),$scope.companyref.data.demotech,"Demotech Score");
            drawGauge('#complaintratiogauge',0,6000,parseInt($scope.companyref.data.complaint_ratio),$scope.companyref.data.complaint_ratio,"Complaint Ratio");
        }
    });
});