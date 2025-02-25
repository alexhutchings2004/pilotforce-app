import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw'; // Default import
import { Navbar } from '../components/Navbar';
import '../styles/Assets.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGh1dGNoaW5nczA0IiwiYSI6ImNtN2tnMHQ3aTAwOTkya3F0bTl4YWtpNnoifQ.hnlbKPcuZiTUdRzNvjrv2Q';

const Assets = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [assetName, setAssetName] = useState('');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [draw, setDraw] = useState<any>(null);  // Fix the type issue
  const [polygons, setPolygons] = useState<any[]>([]);

  // Get user location only once when the component is mounted
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([longitude, latitude]);
          },
          (error) => {
            console.error('Error getting location:', error);
            setUserLocation([-74.5, 40]);  // Default location
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setUserLocation([-74.5, 40]);  // Default location if geolocation fails
      }
    };

    getUserLocation();
  }, []); // Empty dependency array ensures this runs only once

  // Initialize map when userLocation is available
  useEffect(() => {
    if (userLocation && !map) {  // Initialize map only if userLocation is available and map is not already initialized
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 9,
      });

      const drawInstance = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      mapInstance.addControl(drawInstance);
      setMap(mapInstance);
      setDraw(drawInstance);

      mapInstance.on('draw.create', (e: any) => {
        const newPolygon = e.features[0];
        setPolygons((prev) => [...prev, newPolygon]);
      });
    }

    return () => {
      if (map) map.remove(); // Clean up map instance on unmount
    };
  }, [userLocation, map]); // Only re-initialize the map if `userLocation` changes

  const handleStyleToggle = () => {
    if (map) {
      const currentStyle = map.getStyle()?.sprite; // Safe access with optional chaining
      const newStyle =
        currentStyle === 'mapbox://sprites/mapbox/streets-v11'
          ? 'mapbox://styles/mapbox/satellite-streets-v11'
          : 'mapbox://styles/mapbox/streets-v11';
      map.setStyle(newStyle); // Toggle map style
    }
  };

  const handleSearchLocation = () => {
    if (map && location) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            map.flyTo({ center: [lng, lat], zoom: 12 });
          } else {
            alert('Location not found');
          }
        });
    }
  };

  const handleResetMap = () => {
    if (map && userLocation) {
      map.flyTo({ center: userLocation, zoom: 9 });
    }
  };

  const handleDeletePolygon = () => {
    if (draw) {
      draw.deleteAll(); // Delete all polygons
      setPolygons([]); // Reset polygons state
    }
  };

  const handleSavePolygon = () => {
    console.log('Polygons:', polygons); // Saving polygons logic
  };

  const handleAddPolygon = () => {
    if (draw) {
      draw.changeMode('draw_polygon'); // Switch to polygon draw mode
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-1/2 p-4 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Asset Management</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assetName">
              Asset Name
            </label>
            <input
              id="assetName"
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter asset name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter location"
            />
            <button
              onClick={handleSearchLocation}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Go to Location
            </button>
          </div>
          <button
            onClick={handleResetMap}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Map
          </button>
          <div className="mt-4">
            <button
              onClick={handleStyleToggle}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Toggle Map Style (Satellite/Standard)
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleAddPolygon}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Polygon
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleDeletePolygon}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete Polygon
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSavePolygon}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Polygon
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <div id="map" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default Assets;

