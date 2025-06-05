let googleMapsLoadingPromise;

export function loadGoogleMapsApi(apiKey) {
  if (googleMapsLoadingPromise) {
    return googleMapsLoadingPromise;
  }

  if (window.google && window.google.maps && window.google.maps.places) {
    return Promise.resolve(window.google);
  }

  googleMapsLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        resolve(window.google);
      } else {
        reject(new Error("Google Maps API loaded but window.google.maps.places is undefined"));
      }
    };

    script.onerror = (err) => reject(err);

    document.head.appendChild(script);
  });

  return googleMapsLoadingPromise;
}
