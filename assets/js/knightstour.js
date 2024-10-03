var canvas, ctx;
var width, height;
var boardSize, size;
var knightChar;
var knightPos;
var step;
var startTime, lastTime, finishTime;
var wait, delay;
var success;
var jumps, totalJumps;
var directions;
var visited;
var tourPath;

function initKnightsTour() {
	var documentWidth = document.body.scrollWidth;
	if (documentWidth >= 768) {
		canvas = document.createElement("canvas");
		canvas.setAttribute("id", "knightstour-canvas");
		document.getElementById("knightstour").appendChild(canvas);
	} else {
		var e = document.getElementById("knightstour");
		e.remove();
		return;
	}
	width = height = 500;
	boardSize = 8;
	size = 0;
	knightChar = "\u2658";
	knightPos = {
		x: 0,
		y: 0
	};
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext("2d");
	step = Math.round(width / boardSize);
	lastTime = 0;
	jumps = totalJumps = 0;
	directions = [];
	visited = [];
	tourPath = [];
	init();
	drawBoard();
	startTour();
};

drawBoard = () => {
	let dark = false,
		xx, yy;
	for (let y = 0; y < boardSize; y++) {
		for (let x = 0; x < boardSize; x++) {
			if (dark) ctx.fillStyle = "#b58863";
			else ctx.fillStyle = "#f0d9b5";
			dark = !dark;
			xx = x * step;
			yy = y * step;
			ctx.fillRect(xx, yy, xx + step, yy + step);
		}
		if (!(boardSize & 1)) dark = !dark;
	}
	if (tourPath.length) {
		const s = step >> 1;
		ctx.lineWidth = 4;
		ctx.fillStyle = "#ffffff";
		ctx.beginPath();
		ctx.moveTo(step * knightPos.x + s, step * knightPos.y + s);
		let a, b, v = tourPath.length - 1;
		for (; v > -1; v--) {
			a = tourPath[v].pos.x * step + s;
			b = tourPath[v].pos.y * step + s;
			ctx.lineTo(a, b);
			ctx.strokeStyle = "#000000";
			ctx.stroke();
			ctx.roundRect(a - 5, b - 5, 10, 10, 5);
		}
		ctx.stroke();
		ctx.fill();
	}
};

createMoves = (pos) => {
	const possibleMoves = [];
	let x = 0,
		y = 0,
		m = 0,
		l = directions.length;
	for (; m < l; m++) {
		x = pos.x + directions[m].x;
		y = pos.y + directions[m].y;
		if (x > -1 && x < boardSize && y > -1 && y < boardSize && !visited[x + y * boardSize]) {
			possibleMoves.push({
				x,
				y
			});
		}
	}
	return possibleMoves;
};

warnsdorff = (pos) => {
	const possibleMoves = createMoves(pos);
	if (possibleMoves.length < 1) return [];
	const moves = [];
	for (let p = 0, l = possibleMoves.length; p < l; p++) {
		let ps = createMoves(possibleMoves[p]);
		moves.push({
			len: ps.length,
			pos: possibleMoves[p]
		});
	}
	moves.sort((a, b) => {
		return b.len - a.len;
	});
	return moves;
}

startTour = () => {
	size = Math.floor(width / boardSize);
	wait = delay = 300;
	step = width / boardSize;
	ctx.font = size + "px Arial";
	tourPath = [];
	jumps = totalJumps = 1;
	success = true;
	visited = [];
	const cnt = boardSize * boardSize;
	for (let a = 0; a < cnt; a++) {
		visited.push(false);
	}
	knightPos = {
		x: Math.floor(Math.random() * boardSize),
		y: Math.floor(Math.random() * boardSize)
	};
	mainLoop = (time = 0) => {
		const dif = time - lastTime;
		lastTime = time;
		wait -= dif;
		if (wait > 0) {
			requestAnimationFrame(mainLoop);
			return;
		}
		wait = delay;
		let moves;
		if (success) {
			moves = warnsdorff(knightPos);
		} else {
			if (tourPath.length > 0) {
				const curTourPath = tourPath[tourPath.length - 1];
				moves = curTourPath.m;
				if (moves.length < 1) tourPath.pop();
				knightPos = curTourPath.pos
				visited[knightPos.x + knightPos.y * boardSize] = false;
				jumps--;
				wait = delay;
			} else {
				return;
			}
		}
		drawBoard();
		const ft = step - (step >> 3);
		ctx.fillStyle = "#000000";
		ctx.fillText(knightChar, knightPos.x * step, knightPos.y * step + ft);
		if (moves.length < 1) {
			if (jumps === boardSize * boardSize) {
				finishTime = new Date();
				success = true;
				startTour();
			} else {
				success = false;
			}
		} else {
			visited[knightPos.x + knightPos.y * boardSize] = true;
			const move = moves.pop();
			tourPath.push({
				pos: knightPos,
				m: moves
			});
			knightPos = move.pos
			success = true;
			jumps++;
			totalJumps++;
		}
		requestAnimationFrame(mainLoop);
		// delay = Math.max(100, 300 - totalJumps);
	};
	mainLoop();
}

init = () => {
	directions = [{
		x: -1,
		y: -2
	}, {
		x: -2,
		y: -1
	}, {
		x: 1,
		y: -2
	}, {
		x: 2,
		y: -1
	}, {
		x: -1,
		y: 2
	}, {
		x: -2,
		y: 1
	}, {
		x: 1,
		y: 2
	}, {
		x: 2,
		y: 1
	}];
	startTime = new Date();
}