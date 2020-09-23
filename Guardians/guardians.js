function showAbout() {
	alert("Created this small sim to assist in teaching people raids\n\n" +
		"- Special thanks to devqhp for insperation and code base, he has an amazing sotetseg helper at https://devqhp.github.io/osrs/sotetseg/.\n");
}

function showInstructions() {
	alert(
		"WIP\n"
	);
}

const tick_length  = 600;

const canva_x = 10;
const canva_y = 10;

var tile_size = 40;
const color_tilepath = "#961919";

var canvas = document.getElementById("guards");
var ctx = canvas.getContext("2d");

canvas.width = tile_size * canva_x;
canvas.height = tile_size * (canva_y);

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

function resize() {
	let viewport_height = window.innerHeight;
	let viewport_width = window.innerWidth;

	if (viewport_width / viewport_height < 0.77) {
		if (viewport_width < 620) {
			tile_size = (viewport_width - 20)/canva_x; // 30 is just buffer space
		}
	} else {
		if (viewport_height < 800) {
			tile_size = (viewport_height - 200)/canva_y; // 200 is buffer space for the buttons/text above/below the maze
		}
	}

	tile_stroke  = tile_size/25;
	solv_fontsize  = 15*(tile_size/40);
	offset_optimal = solv_fontsize/2;
	offset_user    = -offset_optimal;

	canvas.width = tile_size * canva_x;
	canvas.height = tile_size * (canva_y); // need +1 for the extra row at the top to run off the maze, if desired.

	drawState();
}

function getTileClicked(event) {
	let rect = canvas.getBoundingClientRect();
	let pixel_x = event.clientX - rect.left;
	let pixel_y = event.clientY - rect.top;
	let tile_x = Math.floor(pixel_x / tile_size);
	let tile_y = Math.floor(pixel_y / tile_size);
	return { x: tile_x, y: tile_y };
}

function randRange(a, b) {
	return Math.floor(Math.random() * (b - a + 1)) + a;
}

function gameTick() {
	if (tornado_active || player_position.y <= maze_height - tornado_row) {
		tornado_active = true;
		tornado_position = path_coordinates.shift();
	}
	if ((player_position.x == targeted_tile.x && player_position.y == targeted_tile.y)) {
		ticks_stalled += 1;
		stalled_tiles.push(new Point(player_position.x, player_position.y));
	}
	ticks += 1;
	let new_tiles = getPassedTiles(player_position, targeted_tile);
	for (let i = 0; i < new_tiles.length; i++) {
		path_taken.push(new_tiles[i]);
	}
	if (new_tiles.length > 0) {
		moves.push(new_tiles[new_tiles.length - 1]);
	}
	player_position = new Point(path_taken[path_taken.length - 1].x, path_taken[path_taken.length - 1].y);
	drawState();
	if (player_position.y <= 0 || (player_position.x == tornado_position.x && player_position.y == tornado_position.y)) {
		session_active = false;
		clearInterval(timerTick);
	}
	writeTime();
	
	// Testing time between ticks (on my PC varies from 590-610 ms, which is actually better than OSRS servers)
	// if (time_a) {
	// 	time_b = performance.now();
	// 	console.log(time_b - time_a);
	// 	time_a = performance.now();
	// } else {
	// 	time_a = performance.now();
	// }
}

function newSession() {
	resetvars();
	guardian = makeguard();
	pathWeighting();
	drawMaze(maze);
	writePar();
	writeTime();
}

newSession();
resize();