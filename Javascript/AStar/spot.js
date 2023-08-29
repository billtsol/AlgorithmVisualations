function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	if (random(1) < 0.3) {
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
