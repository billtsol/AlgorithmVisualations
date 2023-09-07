import pygame
from settings import *
import sys
from dijkstra import Dijkstra

class Main:

  def __init__(self):
    pygame.init()
    self.screen = pygame.display.set_mode((WIDTH,HEIGHT))
    pygame.display.set_caption('Dijkstra')
    self.clock = pygame.time.Clock()

    self.dijkstra = Dijkstra()


  def run(self):
    while True:

      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          pygame.quit()
          sys.exit()
        if event.type == pygame.KEYDOWN:
          if event.key == pygame.K_r:
            self.dijkstra = Dijkstra()


      self.screen.fill(BACKGROUND_COLOR)

      self.dijkstra.run()
      pygame.display.update()

      self.clock.tick(FPS)


if __name__ == '__main__':
  main = Main()
  main.run()