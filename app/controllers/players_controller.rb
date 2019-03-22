class PlayersController < ApplicationController
  # GET /players
  def index
    @players = Player.all

    render json: @players
  end

  # PUT /players
  def update
    @player = Player.find(params[:id])

    unless @player
      render json: { error: true }, status: :record_not_found and return
    end

    if @player.update(player_update_params)
      render json: @player
    else
      render json: { error: true }, status: :internal_server_error
    end
  end

  private

  def player_update_params
    params.require(:player).permit(:jersey_number, :starter)
  end
end
