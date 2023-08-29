import pygame
from settings import *
from spot import Spot
import math

class AStar():

  def __init__(self):
    self.display_surface = pygame.display.get_surface()

    self.openSet = []
    self.closedSet = []

    # Solution path array
    self.path = []
    self.running = True

    # create grid
    self.grid = []
    self.generate_grid()


    self.start = self.grid[0][0]
    self.end = self.grid[COLS - 1][ROWS - 1]


    self.start.wall = False
    self.end.wall = False

    # initialize openSet
    self.openSet.append(self.start)



  def generate_grid(self):

    # Fill grid
    for i in range(COLS):
      arr = []
      for j in range(ROWS):
        arr.append(Spot(i,j))

      self.grid.append(arr)

    # Add neighbors
    for i in range(COLS):
      for j in range(ROWS):
        self.grid[i][j].create_neighbors(self.grid)



  def run(self):
    if self.running:
      if (len( self.openSet ) > 0):

        # Find the lowest Spot in openSet
        lowest_spot_index = 0
        for i in range(len(self.openSet)):
          if self.openSet[i].f < self.openSet[lowest_spot_index].f:
            lowest_spot_index = i

        current_spot = self.openSet[lowest_spot_index]

        if (current_spot == self.end):
          print('DONE')
          self.running = False

        self.openSet.pop(lowest_spot_index)
        self.closedSet.append(current_spot)

        neighbors = current_spot.neighbors

        for i in range(len(neighbors)):

          neighbor = neighbors[i]


          if not (neighbor in self.closedSet) and neighbor.wall == False:
            temp_g = current_spot.g + 1

            newPath = False

            if neighbor in self.openSet:
              if neighbor.g > temp_g:
                neighbor.g = temp_g
                newPath = True
            else:
              neighbor.g = temp_g
              self.openSet.append(neighbor)
              newPath = True

            if newPath:
              neighbor.h = self.heuristic(neighbor,self.end)
              neighbor.f = neighbor.g + neighbor.h
              neighbor.previous = current_spot

        self.path = []

        temp = current_spot
        self.path.append(temp)
        while (temp.previous != None):
          self.path.append(temp.previous)
          temp = temp.previous

      else:
        print('No solution')
        self.running =  False

    self.draw()


  def heuristic(self,spot,end):
    d = math.dist( [spot.i, spot.j] , [end.i, end.j] )
    return d

  def draw(self):

    for i in range(COLS):
      for j in range(ROWS):
        if self.grid[i][j].wall == False:
          self.grid[i][j].drawSpot(BACKGROUND_COLOR)
        else:
          self.grid[i][j].drawSpot(WALL_COLOR)

    for i in range(len(self.closedSet)):
      self.closedSet[i].drawSpot(CLOSEDSET_COLOR)

    for i in range(len(self.openSet)):
      self.openSet[i].drawSpot(OPENSET_COLOR)

    for i in range(len(self.path)):
      self.path[i].drawSpot(END_PATH_COLOR)
