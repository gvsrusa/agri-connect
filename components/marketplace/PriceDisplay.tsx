import React from 'react';
import { useTranslations, useFormatter } from 'next-intl';

interface PriceData {
  cropName: string;
  marketName: string;
  price: number;
  priceUnit: string; // e.g., "INR per quintal"
  dateRecorded: Date | string;
  source?: string;
}

interface PriceDisplayProps {
  priceData: PriceData | null;
  isLoading?: boolean; // Optional loading state
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ priceData, isLoading }) => {
  const t = useTranslations('PriceDisplay');
  const format = useFormatter();

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-white text-center">
        <p className="text-gray-600">{t('loadingMessage') || 'Loading price data...'}</p> {/* Fallback for t() */}
      </div>
    );
  }

  if (!priceData) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-white text-center">
        <p className="text-gray-600">{t('noData')}</p>
      </div>
    );
  }

  const displayDate = typeof priceData.dateRecorded === 'string'
    ? new Date(priceData.dateRecorded)
    : priceData.dateRecorded;

  return (
    <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{t('title')}</h3>
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-semibold text-gray-600">{t('cropLabel')}</span>
          <span className="text-lg font-medium text-green-700">{priceData.cropName}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-semibold text-gray-600">{t('marketLabel')}</span>
          <span className="text-lg font-medium text-blue-700">{priceData.marketName}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-semibold text-gray-600">{t('priceLabel')}</span>
          <span className="text-xl font-bold text-red-600">
            {format.number(priceData.price, { style: 'currency', currency: 'INR' })}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-semibold text-gray-600">{t('unitLabel')}</span>
          <span className="text-md text-gray-600">{priceData.priceUnit.replace('INR per ', '')}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold text-gray-600">{t('dateLabel')}</span>
          <span className="text-sm text-gray-500">
            {format.dateTime(displayDate, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        {priceData.source && (
          <p className="text-xs text-gray-400 text-center pt-3">
            {t('sourceLabel') || 'Source:'} {priceData.source} {/* Fallback for t() */}
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;