import pygame
from settings import *
import sys
from AStar import AStar

class Main:

  def __init__(self):
    pygame.init()
    self.screen = pygame.display.set_mode((WIDTH,HEIGHT))
    pygame.display.set_caption('A*')
    self.clock = pygame.time.Clock()

    self.a_star = AStar()


  def run(self):
    while True:

      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          pygame.quit()
          sys.exit()
        if event.type == pygame.KEYDOWN:
          if event.key == pygame.K_r:
            self.a_star = AStar()


      self.screen.fill(BACKGROUND_COLOR)

      self.a_star.run()
      pygame.display.update()

      self.clock.tick(FPS)


if __name__ == '__main__':
  main = Main()
  main.run()