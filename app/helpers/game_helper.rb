module GameHelper

  def active_grid?(i,j)
    (@grid and @grid[i][j] == 1) ? 'active' : ''
  end
end
