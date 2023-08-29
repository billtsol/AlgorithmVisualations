import pygame
import random
from settings import *

class Spot:
  def __init__(self, i,j):
    self.i = i
    self.j = j

    # A*
    self.f = 0
    self.g = 0
    self.h = 0

    self.neighbors = []
    self.previous = None
    self.wall = False

    if (random.random() < 0.4):
      self.wall = True


    self.display_serface = pygame.display.get_surface()

  def create_neighbors(self, grid):

      if (self.i < COLS - 1):
        self.neighbors.append(grid[self.i + 1][self.j])

      if (self.i > 0 ):
        self.neighbors.append(grid[self.i - 1][self.j])

      if (self.j < ROWS - 1):
        self.neighbors.append(grid[self.i][self.j + 1])

      if (self.j > 0 ):
        self.neighbors.append(grid[self.i][self.j - 1])

      # Corners

      if (self.i < COLS - 1 and self.j < ROWS - 1):
        self.neighbors.append(grid[self.i + 1][self.j + 1])

      if (self.i > 0 and self.j > 0):
        self.neighbors.append(grid[self.i - 1][self.j - 1])

      if (self.i < COLS - 1 and self.j > 0):
        self.neighbors.append(grid[self.i + 1][self.j - 1])

      if (self.i > 0  and self.j < ROWS - 1):
        self.neighbors.append(grid[self.i - 1][self.j + 1])

  def drawSpot(self,color):
    pygame.draw.ellipse(self.display_serface, color,
      pygame.Rect(
        self.i * SPOT_WIDTH + SPOT_WIDTH/2 + OFFSET,
        self.j * SPOT_HEIGHT + SPOT_HEIGHT/2 + OFFSET,
        SPOT_WIDTH / 2,
        SPOT_HEIGHT / 2
      )
    )
