angular.module('mobileApp.controllers', [])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MessageCtrl', function($scope,$http) {
  $scope.message = "メッセージを入力してください。";
  $scope.send = function(){
    $http.post('192.168.12.1:4000',message).then(handleSuccess, handleError);
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

