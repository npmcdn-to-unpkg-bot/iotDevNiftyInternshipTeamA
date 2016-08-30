var PF = require('pathfinding');
//param
var i,j;
var width = 10;
var height = 10;

//create map

// var map = [];
// for(i=0;i<width;i++){
// 	var row = [];
// 	for(j=0;j<height;j++){
// 		if(grid.nodes[i][j].walkable){
// 			row.push(" ");
// 		}else{
// 			row.push("O");
// 		}
// 	}
// 	map.push(row);
// }

var map =  [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
			[0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

//path find
var grid = new PF.Grid(map);
var finder = new PF.AStarFinder();
var path = finder.findPath(0, 0, 0, 9, grid);

if(path.length){
	console.log("path length : ",path.length);
}

//insert path
for(i=0;i<path.length;i++){
	//console.log(path[i]);
	map[path[i][1]][path[i][0]] = 2;
}
console.dir(map);

//なんか反対だね grid と arrayのrow,column
//console.dir(grid.nodes[1][0].walkable);
