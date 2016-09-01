angular.module('mobileApp.controllers', [])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MessageCtrl', function($scope,$http) {
  $scope.message = "助けて！!";

  $scope.send = function(message){
    console.log("send message : ",message);
    $http.post('http://192.168.12.3:5000',{message : message}).then(handleSuccess, handleError);
  };

  function handleSuccess(res) {
      console.log("handleSuccess")
      console.log(res.data)
      return res.data;
  }

  function handleError(res) {
      console.log("handleError")
      console.log(res.data)
      return res.data;
  }
});

