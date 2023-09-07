import pygame

WIDTH = 900
HEIGHT = 900

FPS = 60

COLS = 50
ROWS = 50

SPOT_WIDTH = (WIDTH - 20) / COLS
SPOT_HEIGHT = (HEIGHT - 20) / ROWS

OFFSET = 10

BACKGROUND_COLOR = pygame.Color(75, 0, 100)
WALL_COLOR = pygame.Color(0, 0, 0)
UNVISITED_COLOR = pygame.Color(0, 255, 0)
VISITED_COLOR = pygame.Color(255, 0, 0)
END_PATH_COLOR = pygame.Color(255, 255, 0)