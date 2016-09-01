app.factory('pathService', Service);

function Service($http) {
    var service = {};

    service.findPath = findPath;
    
    return service;

    function findPath(sendData) {
      console.log("findPath 발동");
        return $http.post('/api/path/findpath',{data:sendData}).then(handleSuccess, handleError);
    }
    
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
}