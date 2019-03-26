# frozen_string_literal: true

FactoryBot.define do
  factory :conference do
    name { Faker::Team.name }
    short_name { Faker::Team.state }
  end
end