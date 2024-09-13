import { useState, useEffect, useCallback } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSuccess = useCallback((position) => {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
    setLoading(false);
  }, []);

  const handleError = useCallback((error) => {
    setError(error.message);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    return () => {};
  }, [handleSuccess, handleError]);

  return { location, error, loading };
}

export { useGeoLocation };
