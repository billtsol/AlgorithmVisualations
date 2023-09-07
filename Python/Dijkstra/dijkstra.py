import pygame
from settings import *
from node import Node
import math

class Dijkstra():

  def __init__(self):
    self.display_surface = pygame.display.get_surface()

    self.unvisited = []
    self.visited = []

    # Solution path array
    self.path = []
    self.running = True

    # create grid
    self.grid = []
    self.generate_grid()


    self.start = self.grid[0][0]
    self.end = self.grid[COLS - 1][ROWS - 1]


    self.start.tentative_distance = 0
    self.start.wall = False
    self.end.wall = False

    # initialize openSet
    self.unvisited.append(self.start)



  def generate_grid(self):

    # Fill grid
    for i in range(COLS):
      arr = []
      for j in range(ROWS):
        arr.append(Node(i,j))

      self.grid.append(arr)

    # Add neighbors
    for i in range(COLS):
      for j in range(ROWS):
        self.grid[i][j].create_neighbors(self.grid)



  def run(self):
    if self.running:
      if (len( self.unvisited ) > 0):

        # Find the lowest Spot in unvisited
        lowest_spot_index = 0
        for i in range(len(self.unvisited)):
          if self.unvisited[i].tentative_distance < self.unvisited[lowest_spot_index].tentative_distance:
            lowest_spot_index = i

        current_spot = self.unvisited[lowest_spot_index]

        # SOLUTION
        if (current_spot == self.end):
          self.path = []

          temp = self.end
          self.path.append(temp)
          while (temp.previous != None):
            self.path.append(temp.previous)
            temp = temp.previous

          print('DONE')
          self.running = False


        neighbors = current_spot.neighbors

        for i in range(len(neighbors)):

          neighbor = neighbors[i]

          if (not neighbor.wall and neighbor.tentative_distance > current_spot.tentative_distance + 1):

            if(neighbor.tentative_distance == math.inf):
              self.unvisited.append(neighbor)
              neighbor.previous = current_spot

            neighbor.tentative_distance = current_spot.tentative_distance + 1

        self.unvisited.pop(lowest_spot_index)
        self.visited.append(current_spot)


      else:
        print('No solution')
        self.running =  False

    self.draw()


  def draw(self):

    for i in range(COLS):
      for j in range(ROWS):
        if self.grid[i][j].wall == False:
          self.grid[i][j].drawSpot(BACKGROUND_COLOR)
        else:
          self.grid[i][j].drawSpot(WALL_COLOR)

    for i in range(len(self.visited)):
      self.visited[i].drawSpot(VISITED_COLOR)

    for i in range(len(self.unvisited)):
      self.unvisited[i].drawSpot(UNVISITED_COLOR)

    for i in range(len(self.path)):
      self.path[i].drawSpot(END_PATH_COLOR)

    self.start.drawSpot(pygame.Color(0, 200, 255))
    self.end.drawSpot(pygame.Color(0, 200, 255))