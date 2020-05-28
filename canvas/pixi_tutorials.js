let app, player, keys = {}, keysDiv;

window.onload = function(){	
	app = new PIXI.Application(
		{
			width : 800,
			height : 600,
			backgroundColor : 0xAAAAAA
		}
	);
	console.dir(app);
	document.body.appendChild(app.view);

	player = new PIXI.Sprite.from("../idim/pointer_test.png");
	player.anchor.set(0.5);	// 중심점.
	player.x = app.view.width / 2;
	player.y = app.view.height / 2;

	app.stage.addChild(player);

	// mouse interaction
	app.stage.interactive = true;
	app.stage.on("pointermove", movePlayer);

	// rotate
	app.ticker.add( delta => {
		// player.rotation -= 0.01 *delta;
		player.rotation += 0.01 *delta;
	});

	// keyboard event handlers
	window.addEventListener("keydown", keysDown);
	window.addEventListener("keyup", keysUp);

	app.ticker.add(gameLoop);
	keysDiv = document.getElementById("keys");
}

function movePlayer(e) {
	// console.log(e);
	let pos = e.data.global;

	player.x = pos.x;
	player.y = pos.y;
}

function keysDown(e){
	// console.log(e.keyCode);
	keys[e.keyCode] = true;
}
function keysUp(e){
	// console.log(e.keyCode);
	keys[e.keyCode] = false;
}

function gameLoop(){
	keysDiv.innerHTML = JSON.stringify(keys);

	if(keys["87"]){	// w
		player.y -= 5;
	}
	if(keys["65"]){	// a
		player.x -= 5;
	}
	if(keys["83"]){	// s
		player.y += 5;
	}
	if(keys["68"]){	// d
		player.x += 5;
	}
}