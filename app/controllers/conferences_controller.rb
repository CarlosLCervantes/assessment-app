class ConferencesController < ApplicationController
  # Hardcoded to get just the first Conference's data
  def show
    conference = Conference.first

    render json: conference.to_json(
      only: [:id, :name, :short_name],
      include: {
        teams: {
          include: { players: {} }
        }
      }
    )
  end
end
