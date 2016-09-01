var PF = require('pathfinding');
var Q = require('q');
var _ = require('underscore');

var service = {};

service.findPath = findPath;

module.exports = service;

function findPath(map,RA,TA){
    var deferred = Q.defer();

    var grid = new PF.Grid(map);
    var finder = new PF.AStarFinder();
    var path = finder.findPath(RA[0].x, RA[0].y, TA[0].x, TA[0].y, grid);

    if(path.length){
        deferred.resolve(path);
    }else{
        deferred.reject("No Path!");
    }

    return deferred.promise;
}

//param
// var i,j;
// var width = 10;
// var height = 10;

// var map =  [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
//             [0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
//             [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

//path find
// var grid = new PF.Grid(map);
// var finder = new PF.AStarFinder();
// var path = finder.findPath(0, 0, 0, 9, grid);

// if(path.length){
//  console.log("path length : ",path.length);
// }

//insert path
// for(i=0;i<path.length;i++){
//     //console.log(path[i]);
//     map[path[i][1]][path[i][0]] = 2;
// }
//console.dir(map);

//なんか反対だね grid と arrayのrow,column
//console.dir(grid.nodes[1][0].walkable);