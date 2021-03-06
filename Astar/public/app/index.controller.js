app.controller("indexController", Controller);

function Controller(pathService) {
	var indexCtrl = this;

	//初期化関数
	indexCtrl.init = function (){
		console.log("indexCtrl.init();");

		//どれぐらいに詳細なマス目を作るか
		indexCtrl.detailParam = 50;

		indexCtrl.style = {
			normal : {
		        fill: 'white',
		        'stroke-opacity': 0.2 // the border							
			},
			OB : {
		        fill: 'gray',
		        'stroke-opacity': 0.2 // the border							
			},
			RA : {
		        fill: 'green',
		        'stroke-opacity': 0.2 // the border							
			},
			TA : {
		        fill: 'red',
		        'stroke-opacity': 0.2 // the border							
			},
			DA : {
		        fill: 'blue',
		        'stroke-opacity': 0.2 // the border							
			}
		}
		indexCtrl.num = {};

	};

	//モード切り替え
	indexCtrl.modeChange = function(index){
		console.log("modeChange to ",index);
		if(index == 1){
			indexCtrl.clickMode = {index : 1, name : "OB"};
		}else if(index == 2){
			indexCtrl.clickMode = {index : 2, name : "RA"};
		}else if(index == 3){
			indexCtrl.clickMode = {index : 3, name : "TA"};
		}else{
			console.log("error")
		}
	}

	//グリッド生成関数
	indexCtrl.generateGrid = function(){

		//これでPanelが消える。
		indexCtrl.settingPanel = 1;

		//Obstacle設定解除モード,TA設定解除モード,RA設定解除モード
		indexCtrl.clickMode = {index : 1, name : "OB"};

		//以下ではGrid生成領域毛亭のためにスクリーン領域を求める
		var width  = $(window).width();
		var height = $(window).height();
		width = (width > window.screen.availWidth) ? width : window.screen.availWidth;
		height = (height > window.screen.availHeight) ? height : window.screen.availHeight;
		console.log(width,height);

		//最大限拡大した画面で、横に何個、縦に何個見れるようにするか
		indexCtrl.num.cols = indexCtrl.detailParam;
		indexCtrl.num.rows = parseInt(indexCtrl.num.cols*height/width + 1);
		console.log("indexCtrl.num.cols,indexCtrl.num.rows : ",indexCtrl.num.cols,indexCtrl.num.rows);

		//マス目の配列を作成
		indexCtrl.data = [];
		for(var i=0;i<indexCtrl.num.rows;i++){
			var rects = [];
			for(var j=0;j<indexCtrl.num.cols;j++){
				rects.push({status : 0});
			}
			indexCtrl.data.push(rects);
		}

		//ここで必要なマス目のサイズを決めます。
		var nodeSize = width/indexCtrl.num.cols;
		console.log("nodeSize",nodeSize);

		//グリッド生成
		var grid = Raphael('grid');
		grid.setSize(width,height);
		//グリッドにマス目を生成していきます
		for(var y=0;y<indexCtrl.num.rows;y++){
			for(var x=0;x<indexCtrl.num.cols;x++){
				indexCtrl.data[y][x].rect = grid.rect(x*nodeSize,y*nodeSize,nodeSize,nodeSize)
				.attr({
		            fill: 'white',
		            'stroke-opacity': 0.2 // the border
		        })
		        .data("x", x)
		        .data("y", y)
				.click(function () {
					//以下の処理が各々のマス目をクリックしたとき行われる
					var x = this.data("x");
					var y = this.data("y");
					console.log("this is"+x+","+y);
					
					//clickしたとき、indexCtrl.data[y][x] == indexCtrl.clickMode.indexなら
					//それを解除
					//もしそうでないなら、前の設定を初期化し、今のモードのノードで設定
					if(indexCtrl.data[y][x].status == indexCtrl.clickMode.index){
						indexCtrl.data[y][x].status = 0;
						indexCtrl.data[y][x].rect.attr(indexCtrl.style.normal);
					}else{
						console.log("change node style to ",indexCtrl.clickMode.name)
						indexCtrl.data[y][x].status = indexCtrl.clickMode.index;
						indexCtrl.data[y][x].rect.attr(indexCtrl.style[indexCtrl.clickMode.name]);
					}

				});
			}	
		}

	};

	indexCtrl.clear = function(){
		for(var y=0;y<indexCtrl.num.rows;y++){
			for(var x=0;x<indexCtrl.num.cols;x++){
				indexCtrl.data[y][x].status = 0;
				indexCtrl.data[y][x].rect.attr(indexCtrl.style.normal);
			}
		}
	}

	indexCtrl.findPath = function(){
		//set params
		var map = [];
		for(var i=0;i<indexCtrl.num.rows;i++){
			var rects = [];
			for(var j=0;j<indexCtrl.num.cols;j++){
				rects.push(0);
			}
			map.push(rects);
		}

		var RA = [];
		var TA = [];

		//データを片付ける
		for(var y=0;y<indexCtrl.num.rows;y++){
			for(var x=0;x<indexCtrl.num.cols;x++){
				//RAなら
				if(indexCtrl.data[y][x].status == 2){
					map[y][x] = 0;
					RA.push({
						x:x,
						y:y
					});
				}else if(indexCtrl.data[y][x].status == 3){
					map[y][x] = 0;
					TA.push({
						x:x,
						y:y
					});
				}else{
					map[y][x] = indexCtrl.data[y][x].status;
				}
			}
		}

		var sendData = {
			map:map,
			RA:RA,
			TA:TA
		};

		//データを送る
		pathService.findPath(sendData)
		.then(function(path) {
			console.log("get response in pathService.findPath! data below..");
			console.log(path);
			for(i=0;i<path.length;i++){
			    indexCtrl.data[path[i][1]][path[i][0]].rect.attr(indexCtrl.style.DA);
			}
		});

	}

	//初期化開始
	indexCtrl.init();

}