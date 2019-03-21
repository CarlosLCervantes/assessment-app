class TeamsController < ApplicationController
  # GET /teams
  def index
    @teams = Team.all

    render json: @teams
  end

  # PUT /teams
  def update
    @team = Team.find(params[:id])
    render json: { error: true }, status: :record_not_found and return unless @team

    if @team.update(team_update_params)
      render json: @team
    else
      render json: { error: true }, status: :internal_server_error
    end
  end

  private

  def team_update_params
    params.require(:team).permit(:wins, :losses)
  end
end
