class Game
  attr_accessor :grid, :cols, :rows

  def initialize(cols, rows)
    @cols = cols
    @rows = rows
    @grid = build_grid
  end

  def load(cells)
    cells.each { |y, x| grid[y.to_i][x.to_i] = 1 }
  end

  def total_neighbors(y, x)
    total = (-1..1).inject [] do |values, py|
              (-1..1).each do |px|
                unless py == 0 and px == 0
                  i = y + py
                  j = x + px
                  i = 0 unless i < rows
                  j = 0 unless j < cols
                  values << grid[i][j]
                end
              end
              values
            end
    total.sum
  end

  def start
    new_grid = build_grid
    grid.each_with_index do |row, y|
      row.each_with_index do |cell, x|
        count = total_neighbors(y, x)
        new_grid[y][x] = begin
          if cell == 0
            (count == 3) ? 1 : 0
          else
            [2, 3].include?(count) ? 1 : 0
          end
        end
      end
    end
    @grid = new_grid
  end

  def build_grid
    Array.new(rows) { Array.new(cols, 0) }
  end
end