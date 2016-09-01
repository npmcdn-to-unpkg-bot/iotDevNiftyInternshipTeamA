var PF = require('pathfinding');
var Q = require('q');
var _ = require('underscore');

var service = {};

service.findPath = findPath;

module.exports = service;

function findPath(data){
    console.log(data);
    var deferred = Q.defer();

    //最高のルートを探すためのデータを作る

    

    var conditionData = [];//一応5重配列を用意する。

    //以下のfor文でconditionDataという、最適な配置を決める上での必要となるデータを作る。
    for(var i = 0;i < data.TA.length;i++){

        conditionData[i] = [];

        for(var j = 0;j < data.A.length;j++){

            conditionData[i][j] = [];

            var grid = new PF.Grid(data.map);
            var finder = new PF.AStarFinder();
            var NA = finder.findPath(data.A[j].x,data.A[j].y,data.TA[i].x,data.TA[i].y, grid);

            for(var k = 0;k < NA.length; k++){

                conditionData[i][j][k] = [];

                for(var l = 0;l < data.RA.length;l++){
                    var grid = new PF.Grid(data.map);
                    var finder = new PF.AStarFinder();
                    var TAANARApath = finder.findPath(NA[k][0],NA[k][1],data.RA[l].x,data.RA[l].y,grid);
                    conditionData[i][j][k][l] = TAANARApath.length;
                }

            }

        }

    };

    //2次元配列を用意
    var TAandAdis = [];
    for(var i = 0;i < conditionData.length;i++){
        TAandAdis[i] = [];
        for(var j = 0;j < conditionData[i].length;j++){//A
            TAandAdis[i][j] = {dis : 100000, RAlist : []};//道がなかったら10000に成る。
        }
    };

    for(var i = 0;i < conditionData.length;i++){//TA
        for(var j = 0;j < conditionData[i].length;j++){//A

            var TAandAdisCandidate = [];
            for(var k = 0;k < conditionData[i][j].length;k++){
                TAandAdisCandidate[k] = {dis : 10000, RAIndex : null};
            }

            for(var k = 0;k < conditionData[i][j].length;k++){//NA

                TAandAdisCandidate[k].dis = _.min(conditionData[i][j][k]);
                TAandAdisCandidate[k].RAIndex = _.indexOf(conditionData[i][j][k],TAandAandNAminimum);

                data.RA[TAandAdisCandidate[k].RAIndex].device--;
            }

            TAandAdis[i][j].dis = _.max(TAandAdisCandidate);
            TAandAdis[i][j].RAlist = [];
        }
    };



    deferred.resolve(conditionData);

    return deferred.promise;
}