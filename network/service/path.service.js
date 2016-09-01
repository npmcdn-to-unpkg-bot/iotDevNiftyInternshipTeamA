var PF = require('pathfinding');
var Q = require('q');
var _ = require('underscore');

var service = {};

service.findNetwork = findNetwork;

module.exports = service;

function findNetwork(data){
	console.log("以下のデータが届いた。");
    console.log(Object.keys(data));
    var deferred = Q.defer();

 	//data.RAからCAを作っている。(copyする。探索前にはDAはまだない。)
 	data.CA = [];
 	for(var i = 0;i<data.RA.length;i++){
 		data.CA.push({
 			x:data.RA[i].x,
 			y:data.RA[i].y
 		});
 	}

    //さて、data.TAをCAにするためのクラスタリング問題となる。
    //クラスカル法の応用をする。山登り法の一種だと言える。
    //ここで、最小経路探索問題はAstar Algorithmで解決。
    //最適解への証明は背理法を用いる

    var DA = [];
    //TAがなくなれば良い。ネットに繋がった地域CAに全部繋がったらオッケー
    while(data.TA.length){
    	//DACsはDAにappendされうる候補たちの配列
    	/*[{
			index : number,->TAの区分のためのindex
			path : Array->route
    	}]*/
	    console.log("TA");
	    console.dir(data.TA);
	    console.log("CA");
	    console.dir(data.CA);
    	var DACs = [];
	    for(var i = 0;i < data.TA.length;i++){
			
			var checkTAhasPath = 1;
	    	for(var j = 0;j < data.CA.length;j++){
	    		var path = findPath(data.TA[i],data.CA[j],data.MAP);//TA[i]とCA[j]間のpathが帰ってくる。
	    		console.log("debug path.length:",path.length);

	    		//pathがある場合
	    		if(path.length != 0){
	    			//各i、pathを記憶して
		    		DACs.push({
		    			index : i,
		    			path : path
		    		});
		    		
	    			//一回でもpathが存在するならここが反応するはず
	    			checkTAhasPath = 0;
	    		}

	    	}

	    	if(checkTAhasPath){
	    		//ここに来たということはdata.TA[i]は解がないということ
	    		data.TA.splice(i, 1);
	    	}

	    };    	
	    //path.lengthがminとなるiを探し、
	    //TAから除外し、
		//DAC.pathをDAにappend
		//そしてそのDAC.pathをCAに入れる
		var DAC = _.min(DACs, function (DAC) { 
		    return DAC.path.length; 
		}); 
		data.TA.splice(DAC.index, 1);
		console.log("debug : ",data.TA.length);
		DA = DA.concat(DAC.path);
		data.CA = data.CA.concat(DAC.path);
    	if(data.TA.length == 0){    	
    		deferred.resolve(DA);
    	}
    }

    return deferred.promise;
}

//Sは始点、Tは終点
function findPath(S,T,MAP){
	console.log("debug S.x, S.y, T.x, T.y: ",S.x, S.y, T.x, T.y)
	var grid = new PF.Grid(MAP);
	var finder = new PF.AStarFinder();
	var path = finder.findPath(S.x, S.y, T.x, T.y, grid);
	path = _.initial(path);
	path = _.map(path, function(A){
		var DA = {
			x : A[0],
			y : A[1]
		}
		return DA;
	});
	console.log(path);
	return path;
}