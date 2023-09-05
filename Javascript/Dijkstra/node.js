function Node(i, j) {
	this.i = i;
	this.j = j;
	this.tentative_distance = Infinity;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	if (random(1) < 0.4) {
		this.wall = true;
	}

	this.show = function (clr) {
		fill(clr);
		noStroke();
		// rect(this.i * w, this.j * h, w, h); // rect
		ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
	};

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
