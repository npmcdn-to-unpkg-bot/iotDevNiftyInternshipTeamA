app.factory('pathService', Service);

function Service($http) {
    var service = {};

    service.findNetwork = findNetwork;
    
    return service;

    function findNetwork(data) {
      console.log("findNetwork 발동");
        return $http.post('/api/path/findnetwork',{data:data}).then(handleSuccess, handleError);
    }
    
    function handleSuccess(res) {
        console.log("handleSuccess")
        return res.data;
    }

    function handleError(res) {
        console.log("handleError")
        return res.data;
    }
}