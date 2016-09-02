angular.module('mobileApp.controllers', [])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MessageCtrl', function($scope,$http) {
  $scope.message = "1時間ほど前から、○○の近くに避難してます。身動きが取れず、救助が必要です。";
  //引数
  $scope.Kim = 0;
  $scope.Ohashi = 0;
  $scope.Kobayashi = 0;


  $scope.send = function(message,Kim,Ohashi,Kobayashi){
    console.log("send message : ",message);
    var target = [];
    if(Kim){
      console.log("to Kim");
      target.push("Kim");
    }
    if(Ohashi){
      console.log("to Ohashi");
      target.push("Ohashi");
    }
    if(Kobayashi){
      console.log("to Kobayashi");
      target.push("Kobayashi");
    }

    $http.post('http://192.168.12.3:5000',{message : message, target : target}).then(handleSuccess, handleError);
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

