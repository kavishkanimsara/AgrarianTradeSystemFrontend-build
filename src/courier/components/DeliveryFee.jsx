import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

function DeliveryFee({
  originData,
  handleDeliveryFee,
  handleSelectDestination,
}) {
  const [inputValue, setInputValue] = useState("Set Location");
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState("Colombo, Sri Lanka");
  const [destination, setDestination] = useState("Kurunegala, Sri Lanka");
  const [distance, setDistance] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (originData) {
      setOrigin(originData);
    }
  }, [originData]);

  const handleOpen = () => setOpen(!open);

  const calculateDeliveryFee = (distance) => {
    let fee = 0;
    if (distance <= 10) {
      fee = distance * 35;
    } else if (distance <= 30) {
      fee = 10 * 35 + (distance - 10) * 32;
    } else if (distance <= 60) {
      fee = 10 * 35 + 20 * 32 + (distance - 30) * 28;
    } else if (distance <= 100) {
      fee = 10 * 35 + 20 * 32 + 30 * 28 + (distance - 60) * 23;
    } else if (distance <= 150) {
      fee = 10 * 35 + 20 * 32 + 30 * 28 + 40 * 23 + (distance - 100) * 20;
    } else {
      fee = 10 * 35 + 20 * 32 + 30 * 28 + 40 * 23 + 50 * 20 + (distance - 150) * 17;
    }
    return fee.toFixed(2); // Return fee as a string with two decimal places
  };

  const fetchDistance = async (destination) => {
    try {
      const matrix = new window.google.maps.DistanceMatrixService();

      matrix.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        function (response, status) {
          if (status === "OK") {
            const distanceValue = response.rows[0].elements[0].distance.value; // Distance in meters
            const distanceInKilometers = distanceValue / 1000; // Convert to kilometers
            setDistance(distanceInKilometers);
            const fee = calculateDeliveryFee(distanceInKilometers);
            setDeliveryFee(fee);
            handleDeliveryFee(fee);
            handleSelectDestination(destination);
          } else {
            console.error("Error fetching distance:", status);
            // Handle error state if needed
          }
        }
      );
    } catch (error) {
      console.error("Error fetching distance:", error);
      // Handle error state if needed
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Card className="w-full shadow-none">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-5">
            Delivery Location
          </Typography>
          <div className="flex flex-wrap justify-between">
            <div style={{ display: "flex", alignItems: "center" }}>
              <i
                className="fas fa-location-dot"
                style={{ marginRight: "1em" }}
              />
              <div>
                {open ? (
                  <ReactGoogleAutocomplete
                    style={{ zIndex: 100 }}
                    apiKey="AIzaSyBBbkahpvt5yrIf_ogz7EaEAyQ1-_HUCaM"
                    onPlaceSelected={(place) => {
                      setDestination(place.formatted_address);
                      setInputValue(place.formatted_address);
                      fetchDistance(place.formatted_address);
                    }}
                  />
                ) : (
                  <span onClick={handleOpen}>{inputValue}</span>
                )}
              </div>
            </div>
            <div
              className="text-primary font-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleOpen}
            >
              Change
            </div>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <i
              className="fa-solid fa-comment-dollar"
              style={{ marginRight: "1em" }}
            />
            <label>Delivery Charge:</label>
          </div>
          <div style={{ marginLeft: "33px" }}>LKR: {deliveryFee} </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <i
              className="fa-solid fa-handshake-simple"
              style={{ marginRight: "1em" }}
            />
            <label>Cash on delivery available</label>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <i
              className="fa-solid fa-rotate-left"
              style={{ marginRight: "1em" }}
            />
            <label>7 days return</label>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default DeliveryFee;
