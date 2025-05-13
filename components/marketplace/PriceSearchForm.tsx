import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Crop {
  id: string;
  name: string; // Assuming this is already localized or will be handled by a prop
}

interface Market {
  id: string;
  name: string; // Assuming this is already localized or will be handled by a prop
}

interface PriceSearchFormProps {
  onSubmit: (data: { cropId: string; marketId: string }) => void;
  crops: Crop[];
  markets: Market[];
  isLoadingCrops: boolean;
  isLoadingMarkets: boolean;
  language: string; // To potentially help with localized names if not pre-localized
}

const PriceSearchForm: React.FC<PriceSearchFormProps> = ({
  onSubmit,
  crops = [],
  markets = [],
  isLoadingCrops,
  isLoadingMarkets,
  language,
}) => {
  const t = useTranslations('PriceSearchForm');
  const [selectedCropId, setSelectedCropId] = useState('');
  const [selectedMarketId, setSelectedMarketId] = useState('');

  // Function to get localized name (if props aren't already localized)
  // For simplicity, this example assumes 'name' prop is already localized
  // or that localization is handled by how 'crops' and 'markets' are fetched/passed.
  // If you need to localize within this component based on 'language' prop:
  // const getLocalizedName = (item: Crop | Market) => {
  //   const langKey = `name_${language}` as keyof (Crop | Market);
  //   return item[langKey] || item.name; // Fallback to default name
  // };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCropId && selectedMarketId) {
      onSubmit({ cropId: selectedCropId, marketId: selectedMarketId });
    } else {
      // Basic validation feedback, could be more sophisticated
      alert('Please select both a crop and a market.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('title')}</h2>

      <div>
        <label htmlFor="cropId" className="block text-sm font-medium text-gray-700">
          {t('cropLabel')}
        </label>
        <select
          id="cropId"
          name="cropId"
          value={selectedCropId}
          onChange={(e) => setSelectedCropId(e.target.value)}
          disabled={isLoadingCrops || crops.length === 0}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {isLoadingCrops ? (
            <option value="" disabled>{t('loadingCrops')}</option>
          ) : crops.length === 0 ? (
            <option value="" disabled>{t('noCrops')}</option>
          ) : (
            <>
              <option value="">{t('selectCropPlaceholder')}</option>
              {crops.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name} {/* Assuming crop.name is already localized */}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="marketId" className="block text-sm font-medium text-gray-700">
          {t('marketLabel')}
        </label>
        <select
          id="marketId"
          name="marketId"
          value={selectedMarketId}
          onChange={(e) => setSelectedMarketId(e.target.value)}
          disabled={isLoadingMarkets || markets.length === 0}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {isLoadingMarkets ? (
            <option value="" disabled>{t('loadingMarkets')}</option>
          ) : markets.length === 0 ? (
            <option value="" disabled>{t('noMarkets')}</option>
          ) : (
            <>
              <option value="">{t('selectMarketPlaceholder')}</option>
              {markets.map((market) => (
                <option key={market.id} value={market.id}>
                  {market.name} {/* Assuming market.name is already localized */}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={!selectedCropId || !selectedMarketId || isLoadingCrops || isLoadingMarkets}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {t('submitButton')}
        </button>
      </div>
    </form>
  );
};

export default PriceSearchForm;