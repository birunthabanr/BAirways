DELIMITER $$

CREATE PROCEDURE InsertFlight(
    IN p_Route_ID INT,
    IN p_Aircraft_ID INT,
    IN p_Departure_date_time DATETIME,
    IN p_Expected_arrival_date_time DATETIME,
    IN p_Flight_price FLOAT,
    IN p_Created_By VARCHAR(30)
)
BEGIN
    DECLARE next_id INT;
    DECLARE new_flight_id VARCHAR(7);

    SELECT COALESCE(MAX(CAST(SUBSTRING(Flight_ID, 3) AS UNSIGNED)), 0) INTO next_id FROM FlightSchedule;

    SET new_flight_id = CONCAT('FL', LPAD(next_id + 1, 3, '0'));

    INSERT INTO FlightSchedule (Flight_ID, Route_ID, Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By, Created_time)
    VALUES (new_flight_id, p_Route_ID, p_Aircraft_ID, p_Departure_date_time, p_Expected_arrival_date_time, p_Flight_price, p_Created_By, CURDATE());
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE GetTotalFlightScheduleCount()
BEGIN
    SELECT COUNT(*) AS total FROM FlightSchedule;
END $$

CREATE PROCEDURE GetTotalAircraftCount()
BEGIN
    SELECT COUNT(*) AS total FROM Aircraft;
END $$

CREATE PROCEDURE GetTotalAirportCount()
BEGIN
    SELECT COUNT(*) AS total FROM Airport;
END $$

CREATE PROCEDURE GetTotalPassengerCount()
BEGIN
    SELECT COUNT(*) AS total FROM Passenger;
END $$

CREATE PROCEDURE GetAllAirports()
BEGIN
    SELECT * FROM Airport;
END $$

CREATE PROCEDURE GetAllAircraftModels()
BEGIN
    SELECT * FROM Aircraft_model;
END $$

CREATE PROCEDURE GetAdminByCredentials(
    IN p_Admin_ID VARCHAR(30),
    IN p_Password VARCHAR(255)
)
BEGIN
    SELECT * FROM Admin WHERE Admin_ID = p_Admin_ID AND Password = p_Password;
END $$

CREATE PROCEDURE GetAircraftDetails()
BEGIN
    SELECT 
        Aircraft.Aircraft_ID, 
        Aircraft_model.Model_name, 
        Aircraft_model.EconomyClassSeatCount,
        Aircraft_model.BusinessClassSeatCount,
        Aircraft_model.PlatinumClassSeatCount
    FROM 
        Aircraft 
    JOIN 
        Aircraft_model 
    ON 
        Aircraft.Model_ID = Aircraft_model.Model_ID;
END $$

DELIMITER ;