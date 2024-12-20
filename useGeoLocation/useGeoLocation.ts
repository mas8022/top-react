import { useState, useEffect, useCallback } from "react";

interface Location {
  lat: number | null;
  lon: number | null;
}

interface GeoLocationError {
  message: string;
}

function useGeoLocation() {
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
    setLoading(false);
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
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
