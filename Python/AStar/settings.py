import pygame

WIDTH = 900
HEIGHT = 900

FPS = 60

COLS = 80
ROWS = 80

SPOT_WIDTH = (WIDTH - 20) / COLS
SPOT_HEIGHT = (HEIGHT - 20) / ROWS

OFFSET = 10

BACKGROUND_COLOR = pygame.Color(75, 0, 100)
WALL_COLOR = pygame.Color(0, 0, 0)
CLOSEDSET_COLOR = pygame.Color(220, 20, 60)
OPENSET_COLOR = pygame.Color(30, 144, 255)
END_PATH_COLOR = pygame.Color(255, 255, 0)