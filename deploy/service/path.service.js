var PF = require('pathfinding');
var Q = require('q');

var service = {};

service.findPath = findPath;

module.exports = service;

function findPath(data){
    var deferred = Q.defer();

    // var grid = new PF.Grid(map);
    // var finder = new PF.AStarFinder();
    // var path = finder.findPath(RA[0].x, RA[0].y, TA[0].x, TA[0].y, grid);

    // if(path.length){
    //     deferred.resolve(path);
    // }else{
    //     deferred.reject("No Path!");
    // }

    deferred.resolve("DA");
    
    return deferred.promise;
}