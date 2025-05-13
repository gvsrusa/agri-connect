/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProduceListingCard from '@/components/marketplace/ProduceListingCard'; // Adjust path as needed
import { useTranslations, useFormatter } from 'next-intl';

// Mock next-intl hooks
const mockMessages = {
  'ProduceListingCard.quantityLabel': 'Quantity:',
  'ProduceListingCard.priceLabel': 'Price:',
  'ProduceListingCard.locationLabel': 'Location:',
  'ProduceListingCard.listedOnLabel': 'Listed on:',
  // Add more translations as needed by the component
};

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockImplementation((namespace: string) => (key: string) => {
    const fullKey = `${namespace}.${key}`;
    return mockMessages[fullKey as keyof typeof mockMessages] || key;
  }),
  useFormatter: jest.fn().mockImplementation(() => ({
    dateTime: (date: Date, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', options).format(date),
    number: (num: number, options: Intl.NumberFormatOptions) => new Intl.NumberFormat('en-US', options).format(num),
  })),
}));


describe('ProduceListingCard Component', () => {
  const mockListingData = {
    id: 'listing_123',
    cropName: 'Tomato', // This will be passed directly
    quantity: '50 kg',   // Assuming quantity is a string like "50 kg"
    pricePerUnit: '100 INR per kg', // Assuming price is a string
    listingDate: new Date('2024-05-10T10:00:00.000Z'),
    sellerLocation: 'Green Valley Farm', // Optional
    // Add other necessary props from your data model, e.g., sellerUserId
  };

  const mockListingDataNoLocation = {
    ...mockListingData,
    sellerLocation: undefined,
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockImplementation((namespace: string) => (key: string) => {
        const fullKey = `${namespace}.${key}`;
        return mockMessages[fullKey as keyof typeof mockMessages] || key;
    });
    (useFormatter as jest.Mock).mockImplementation(() => ({
        dateTime: (date: Date, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', options).format(date),
        number: (num: number, options: Intl.NumberFormatOptions) => new Intl.NumberFormat('en-US', options).format(num),
    }));
  });

  it('should render correctly with sample listing data', () => {
    render(<ProduceListingCard listing={mockListingData} />);
    expect(screen.getByText(mockListingData.cropName)).toBeInTheDocument();
    expect(screen.getByText(mockListingData.quantity)).toBeInTheDocument();
    expect(screen.getByText(mockListingData.pricePerUnit)).toBeInTheDocument();
    expect(screen.getByText(mockListingData.sellerLocation!)).toBeInTheDocument();
    // Date formatting check
    const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(mockListingData.listingDate);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should display the localized crop name', () => {
    render(<ProduceListingCard listing={mockListingData} />);
    // cropName is passed as a prop, assuming it's already localized or handled by parent
    expect(screen.getByText('Tomato')).toBeInTheDocument();
  });

  it('should display the quantity', () => {
    render(<ProduceListingCard listing={mockListingData} />);
    expect(screen.getByText('50 kg')).toBeInTheDocument();
    // Check for label if it exists
    // expect(screen.getByText(mockMessages['ProduceListingCard.quantityLabel'])).toBeInTheDocument();
  });

  it('should display the price', () => {
    render(<ProduceListingCard listing={mockListingData} />);
    expect(screen.getByText('100 INR per kg')).toBeInTheDocument();
    // Check for label if it exists
    // expect(screen.getByText(mockMessages['ProduceListingCard.priceLabel'])).toBeInTheDocument();
  });

  it('should display the listing date in a readable format', () => {
    render(<ProduceListingCard listing={mockListingData} />);
    const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(mockListingData.listingDate);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    // Check for label if it exists
    // expect(screen.getByText(mockMessages['ProduceListingCard.listedOnLabel'])).toBeInTheDocument();
  });

  it('should display the seller location if provided', () => {
    render(<ProduceListingCard listing={mockListingData} />);
    expect(screen.getByText('Green Valley Farm')).toBeInTheDocument();
    // Check for label if it exists
    // expect(screen.getByText(mockMessages['ProduceListingCard.locationLabel'])).toBeInTheDocument();
  });

  it('should not display the seller location if not provided', () => {
    render(<ProduceListingCard listing={mockListingDataNoLocation} />);
    expect(screen.queryByText('Green Valley Farm')).not.toBeInTheDocument();
    // Ensure label is also not present if location is conditional
    // expect(screen.queryByText(mockMessages['ProduceListingCard.locationLabel'])).not.toBeInTheDocument();
  });
});