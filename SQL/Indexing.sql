-- Index on frequently queried columns
CREATE INDEX idx_passenger_email ON Passenger(Email);
CREATE INDEX idx_flight_schedule_departure ON FlightSchedule(Departure_date_time);
CREATE INDEX idx_route_departure ON Route(Departure_Airport_ID);
CREATE INDEX idx_route_arrival ON Route(Arrival_Airport_ID);

-- Composite index for combined columns
CREATE INDEX idx_ticket_flight_passenger ON Ticket(Flight_ID, Passenger_ID);

-- Unique index for columns that should remain unique
CREATE UNIQUE INDEX idx_airport_short_code ON Airport(Short_code);
