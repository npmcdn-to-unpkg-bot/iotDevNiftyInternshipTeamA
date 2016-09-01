var PF = require('pathfinding');
var Q = require('q');

var service = {};

service.findPath = findPath;

module.exports = service;

function findPath(data){
    console.log(data);
    var deferred = Q.defer();

    var grid = new PF.Grid(data.map);
    var finder = new PF.AStarFinder();

    //最高のルートを探すためのデータを作る

    var conditionData = [];//一応5重配列を用意する。

    for(var i = 0;i < data.TA.length;i++){

        conditionData[i] = [];

        for(var j = 0;j < data.A.length;j++){

            conditionData[i][j] = [];

            var NA = finder.findPath(data.A[j].x,data.A[j].y,data.TA[i].x,data.TA[i].y, grid);

            for(var k = 0;k < NA.length; k++){

                conditionData[i][j][k] = [];

                for(var l = 0;l < data.RA.length;l++){

                    var TAANARApath = finder.findPath(NA[k][0],NA[k][1],data.RA[l].x,data.RA[l].y,grid);
                    conditionData[i][j][k][l] = TAANARApath.length;

                }
            }

        }
        
    };

    return deferred.promise;
}