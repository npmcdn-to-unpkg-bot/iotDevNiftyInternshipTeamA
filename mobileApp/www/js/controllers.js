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
    var data = {};
    data.message = message;
    if(Kim){
      console.log("to Kim");
      data.Kim = true;
    }else{
      data.Kim = false;
    }
    if(Ohashi){
      console.log("to Ohashi");
      data.Ohashi = true;
    }else{
      data.Ohashi = false;
    }
    if(Kobayashi){
      console.log("to Kobayashi");
      data.Kobayashi = true;
    }else{
      data.Kobayashi = false;
    }
    console.log("send data : ",data);
    $http.post('http://192.168.12.3:5000',data).then(handleSuccess, handleError);
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

