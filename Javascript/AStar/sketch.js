function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
}

function heuristic(curr, end) {
	var d = dist(curr.i, curr.j, end.i, end.j);
	// var d = abs(curr.i - end.i) + abs(curr.j - end.j);
	return d;
}

var cols = 100;
var rows = 100;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;
var w, h;
var path = [];

function setup() {
	createCanvas(800, 800);
	console.log('A*');

	w = width / cols;
	h = height / rows;

	// Create Array for each col
	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	// Create all Spots
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}

	//Add all neighbors for each spot
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	// set up start point and end point
	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.wall = false;
	end.wall = false;

	openSet.push(start);
}

function draw() {
	if (openSet.length > 0) {
		// Find the Spot with the lowest cost. This Spot is the current Spot.
		var winner = 0;
		for (var i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}
		console.log(winner);

		var current = openSet[winner];

		// We find a solution
		if (current == end) {
			noLoop(); // Stop the p5 looping
			console.log('DONE');
		}

		// There is no function in js that removes from array
		removeFromArray(openSet, current);
		closedSet.push(current);

		var neighbors = current.neighbors;

		// Add new neighbors in openSet
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i];

			// Check if the neighbor had already checked .
			if (!closedSet.includes(neighbor) && !neighbor.wall) {
				// each spot has a distance of one
				// This is the 'new' g value of a neighbor
				var tempG = current.g + 1;

				var newPath = false;
				// If this neighbor is already in open set.
				if (openSet.includes(neighbor)) {
					// And if it has bigger g. Refresh with new g.
					if (neighbor.g > tempG) {
						neighbor.g = tempG;
						newPath = true;
					}
				} else {
					// Set the g on neighbor.
					neighbor.g = tempG;
					openSet.push(neighbor);
					newPath = true;
				}

				if (newPath) {
					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}
			}
		}
		// we can keep going
	} else {
		// no solution
		console.log('no solution');
		noLoop(); // Stop the p5 looping
		return;
	}

	background(75, 0, 100);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (!grid[i][j].wall) {
				grid[i][j].show(color(75, 0, 100));
			} else {
				grid[i][j].show(color(0));
			}
		}
	}

	for (var i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(220, 20, 60));
	}

	for (var i = 0; i < openSet.length; i++) {
		openSet[i].show(color(30, 144, 255));
	}

	// Find the path
	path = [];

	var temp = current;
	path.push(temp);
	while (temp.previous !== undefined) {
		path.push(temp.previous);
		temp = temp.previous;
	}

	noFill();
	stroke(255, 255, 0);
	strokeWeight(w / 2);
	beginShape();
	for (var i = 0; i < path.length; i++) {
		vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
	}
	endShape();
}
