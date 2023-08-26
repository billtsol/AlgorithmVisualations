function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
}

function heuristic(curr, end) {
	// var d = dist(curr.i, curr.j, end.i, end.j);

	var d = abs(curr.i - end.i) + abs(curr.j - end.j);
	return d;
}
var cols = 25;
var rows = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;

var w, h;
var path = [];

function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;

	this.show = function (clr) {
		fill(clr);
		noStroke();
		rect(this.i * w, this.j * h, w - 1, h - 1);
	};

	/*
  cols = 3
  rows = 3
    [
      [ (0,0), (0,1), (0,2) ],
      [ (1,0), (1,1), (1,2) ],
      [ (2,0), (2,1), (2,2) ]
    ]
  */

	this.addNeighbors = function (grid) {
		if (this.i < cols - 1) {
			this.neighbors.push(grid[this.i + 1][this.j]);
		}

		if (this.i > 0) {
			this.neighbors.push(grid[this.i - 1][this.j]);
		}

		if (this.j < rows - 1) {
			this.neighbors.push(grid[this.i][this.j + 1]);
		}

		if (this.j > 0) {
			this.neighbors.push(grid[this.i][this.j - 1]);
		}
	};
}

function setup() {
	createCanvas(400, 400);
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
			if (!closedSet.includes(neighbor)) {
				// each spot has a distance of one
				// This is the 'new' g value of a neighbor
				var tempG = current.g + 1;

				// If this neighbor is already in open set.
				if (openSet.includes(neighbor)) {
					// And if it has bigger g. Refresh with new g.
					if (neighbor.g > tempG) {
						neighbor.g = tempG;
					}
				} else {
					// Set the g on neighbor.
					neighbor.g = tempG;
					openSet.push(neighbor);
				}

				neighbor.h = heuristic(neighbor, end);
				neighbor.f = neighbor.g + neighbor.h;

				neighbor.previous = current;
			}
		}
		// we can keep going
	} else {
		// no solution
	}

	background(0);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}

	for (var i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255, 0, 0));
	}

	for (var i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0));
	}

	// Find the path
	path = [];

	var temp = current;
	path.push(temp);
	while (temp.previous !== undefined) {
		path.push(temp.previous);
		temp = temp.previous;
	}

	for (var i = 0; i < path.length; i++) {
		path[i].show(color(0, 0, 255));
	}
}
