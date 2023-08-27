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
var noSolution = false;

function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	if (random(1) < 0.4) {
		this.wall = true;
	}

	this.show = function (clr) {
		fill(clr);
		noStroke();
		ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
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

		if (i > 0 && j > 0) {
			this.neighbors.push(grid[this.i - 1][this.j - 1]);
		}

		if (i < cols - 1 && j > 0) {
			this.neighbors.push(grid[this.i + 1][this.j - 1]);
		}

		if (i < cols - 1 && j < rows - 1) {
			this.neighbors.push(grid[this.i + 1][this.j + 1]);
		}

		if (i > 0 && j < rows - 1) {
			this.neighbors.push(grid[this.i - 1][this.j + 1]);
		}
	};
}

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
