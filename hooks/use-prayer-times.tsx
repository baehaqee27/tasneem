import { useState, useEffect } from "react";

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerData {
  timings: PrayerTimes;
  date: {
    readable: string;
    hijri: {
      day: string;
      month: {
        en: string;
      };
      year: string;
    };
  };
  meta: {
    timezone: string;
  };
}

export function usePrayerTimes() {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string>("Jakarta");

  useEffect(() => {
    const fetchPrayerTimes = async (latitude: number, longitude: number) => {
      try {
        // Method 20 is Kemenag RI
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=20`
        );
        const data = await response.json();
        if (data.code === 200) {
          setPrayerData(data.data);
        } else {
          setError("Gagal mengambil data jadwal sholat");
        }
      } catch (err) {
        setError("Terjadi kesalahan koneksi");
      } finally {
        setLoading(false);
      }
    };

    const fetchLocationName = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=id`
        );
        const data = await response.json();
        if (data.locality) {
          setLocationName(data.locality);
        } else if (data.city) {
          setLocationName(data.city);
        } else if (data.principalSubdivision) {
          setLocationName(data.principalSubdivision);
        }
      } catch (error) {
        console.error("Failed to fetch location name:", error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchPrayerTimes(
              position.coords.latitude,
              position.coords.longitude
            );
            fetchLocationName(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.error("Geolocation error:", error);
            // Default to Jakarta if location access denied or error
            fetchPrayerTimes(-6.2088, 106.8456);
            setLocationName("Jakarta");
          }
        );
      } else {
        // Default to Jakarta if geolocation not supported
        fetchPrayerTimes(-6.2088, 106.8456);
        setLocationName("Jakarta");
      }
    };

    getLocation();
  }, []);

  return { prayerData, loading, error, locationName };
}
