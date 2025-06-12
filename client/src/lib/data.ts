// This file contains sample data for the Islamic studies website
// In a production environment, this would be replaced with API calls

export const sampleMosques = [
  {
    name: "Masjid Aisha Mombasa",
    location: "Mombasa",
    color: "green"
  },
  {
    name: "Masjid An-Nuur Nairobi",
    location: "Nairobi", 
    color: "orange"
  }
];

export const dayColors = {
  "Jumamosi": "islamic-green",
  "Jumapili": "islamic-green", 
  "Jumatatu": "islamic-green",
  "Jumanne": "islamic-green",
  "Alhamisi": "warm-orange",
  "Ijumaa": "warm-orange"
};

export const formatSwahiliDate = (date: Date): string => {
  return date.toLocaleDateString('sw-KE', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
