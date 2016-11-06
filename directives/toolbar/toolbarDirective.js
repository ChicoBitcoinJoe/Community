Community.directive('toolbar', ['$mdSidenav', '$location', 'ProfileDB',
function($mdSidenav, $location, ProfileDB) {
	return {
		restrict: 'E',
		scope: {
            community:'=',
            viewType:'='
		},
		replace: true,
		templateUrl: 'directives/toolbar/toolbarDirective.html',
		controller: function($scope, $mdSidenav){
            console.log($scope.community, $scope.viewType);
            $scope.toggleSidenav = function(id) { $mdSidenav(id).toggle(); };

            $scope.showSearchbar = false;
            $scope.toggleSearch = function(id) { $scope.showSearchbar = !$scope.showSearchbar };
            $scope.search = function(){
                if($scope.searchQuery){
                    $location.path("/c/"+$scope.searchQuery.toLowerCase());
                    $scope.searchQuery = null;
                }
            }

            if($scope.viewType == 'c' && ProfileDB.communityIsSaved($scope.community))
                $scope.star = "star";
            else if($scope.viewType == 'm' && ProfileDB.multiIsSaved($scope.community))
                $scope.star = "star";
            else
                $scope.star = "star_border";
            
            $scope.quickSave = function(){
                if($scope.viewType == 'c'){
                    ProfileDB.addCommunity($scope.community,'all');
                    $scope.star = "star";
                }
            }
		},
		link : function($scope, $element, $attrs) {
            
		}
	}
}]);