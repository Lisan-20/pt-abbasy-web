import React, { createContext, useContext, useState, useEffect } from 'react';
import dataId from '../content/data.id.json';
import dataEn from '../content/data.en.json';
import { useTranslation } from 'react-i18next';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(dataId);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentData = i18n.language === 'en' ? dataEn : dataId;
    
    // Process images dynamically for Vite
    try {
      if (currentData.siteSettings?.logoImage && currentData.siteSettings.logoImage.startsWith('/uploads')) {
        currentData.siteSettings.logoImage = currentData.siteSettings.logoImage.replace('/uploads', '/uploads');
      }
      
      currentData.projects = currentData.projects?.map(project => {
        if (project.images) {
          project.images = project.images.map(img => {
            if (img.image && img.image.startsWith('/uploads')) {
              img.image = img.image.replace('/uploads', '/uploads');
            }
            return img;
          });
        }
        return project;
      });

      setData(currentData);
    } catch (error) {
      console.error("Error processing data:", error);
      setData(currentData); // Fallback to raw data
    } finally {
      setLoading(false);
    }
  }, [i18n.language]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
