import React from 'react';
import { useTranslations, useFormatter } from 'next-intl';

// Define the structure of a listing object based on your data model
// This should align with what's passed from the parent component/API
interface ProduceListing {
  id: string;
  cropName: string; // Already localized or a key for t() if needed
  quantity: string;
  pricePerUnit: string;
  listingDate: Date | string; // Can be Date object or ISO string
  sellerLocation?: string; // Optional
  // Add any other relevant fields from your ProduceListing data model
  // e.g., sellerUserId, cropTypeId, isActive, description
}

interface ProduceListingCardProps {
  listing: ProduceListing;
}

const ProduceListingCard: React.FC<ProduceListingCardProps> = ({ listing }) => {
  const t = useTranslations('ProduceListingCard');
  const format = useFormatter();

  const displayDate = typeof listing.listingDate === 'string'
    ? new Date(listing.listingDate)
    : listing.listingDate;

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <h3 className="text-xl font-semibold text-green-700 mb-2">{listing.cropName}</h3>
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">{t('quantityLabel')} </span>
          {listing.quantity}
        </p>
        <p>
          <span className="font-medium text-gray-800">{t('priceLabel')} </span>
          {listing.pricePerUnit}
        </p>
        {listing.sellerLocation && (
          <p>
            <span className="font-medium text-gray-800">{t('locationLabel')} </span>
            {listing.sellerLocation}
          </p>
        )}
        <p>
          <span className="font-medium text-gray-800">{t('listedOnLabel')} </span>
          {format.dateTime(displayDate, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      {/* You can add more details or actions here, like a "View Details" button */}
    </div>
  );
};

export default ProduceListingCard;