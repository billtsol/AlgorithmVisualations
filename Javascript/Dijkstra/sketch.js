function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
}

function drawNodes(list, clr) {
	for (var i = 0; i < list.length; i++) {
		list[i].show(clr);
	}
}

var cols = 50;
var rows = 50;
var grid = new Array(cols);

var unvisited = [];
var visited = [];

var start;
var end;
var w, h;
var path = [];

function setup() {
	createCanvas(800, 800);
	console.log('Dijkstra');

	w = width / cols;
	h = height / rows;

	// Create Array for each col
	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	// Create all Nodes
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Node(i, j);
		}
	}

	//Add all neighbors for each node
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
	start.tentative_distance = 0;

	unvisited.push(start);
}

function draw() {
	if (unvisited.length > 0) {
		var winner = 0;
		for (var i = 0; i < unvisited.length; i++) {
			if (
				unvisited[i].tentative_distance < unvisited[winner].tentative_distance
			) {
				winner = i;
			}
		}

		var current = unvisited[winner];

		// We find a solution
		if (current == end) {
			noLoop(); // Stop the p5 looping
			console.log('DONE');

			path = [];
			curr = end;
			while (curr.previous !== undefined) {
				path.push(curr);
				curr = curr.previous;
			}
			path.push(start);
		}

		var neighbors = current.neighbors;

		// For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node. Compare the newly calculated tentative distance to the one currently assigned to the neighbor and assign it the smaller one
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i];

			if (
				!neighbor.wall &&
				neighbor.tentative_distance > current.tentative_distance + 1
			) {
				if (neighbor.tentative_distance === Infinity) {
					unvisited.push(neighbor);
					neighbor.previous = current;
				}

				// During the run of the algorithm, the tentative distance of a node v is the length of the shortest path discovered so far between the node v and the starting node
				neighbor.tentative_distance = current.tentative_distance + 1;
			}
		}

		// When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited and remove it from the unvisited set
		removeFromArray(unvisited, current);
		visited.push(current);
	} else {
		// no solution
		console.log('no solution');
		noLoop(); // Stop the p5 looping
		return;
	}

	background(75, 0, 100);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].wall) {
				grid[i][j].show(color(0, 0, 0));
			} else {
				grid[i][j].show(color(75, 0, 100));
			}
		}
	}

	drawNodes(unvisited, color(0, 255, 0));
	drawNodes(visited, color(255, 0, 0));
	drawNodes(path, color(255, 255, 0));

	start.show(color(0, 200, 255));
	end.show(color(0, 200, 255));
}
