class GameController < ApplicationController
  before_action :set_grid

  def index
    @@game = Game.new(@cols, @rows)
  end

  def start
    cells = []
    if params[:auto_start] == 'false'
      @@game.load params[:cells].values
    end
    @grid = @@game.start
  end

  def clear
    @@game = Game.new(@cols, @rows)
  end

  private

  def set_grid
    @rows = 12
    @cols = 12
  end
end