/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PriceDisplay from '@/components/marketplace/PriceDisplay'; // Adjust path as needed
import { useTranslations, useFormatter } from 'next-intl';

// Mock next-intl hooks
const mockMessages = {
  'PriceDisplay.title': 'Market Price',
  'PriceDisplay.cropLabel': 'Crop:',
  'PriceDisplay.marketLabel': 'Market:',
  'PriceDisplay.priceLabel': 'Price:',
  'PriceDisplay.unitLabel': 'per', // For "per quintal"
  'PriceDisplay.dateLabel': 'As of:',
  'PriceDisplay.noData': 'No price data available for the selected crop and market.',
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

// Define interfaces for props
interface PriceData {
  cropName: string;    // Already localized
  marketName: string;  // Already localized
  price: number;
  priceUnit: string; // e.g., "INR per quintal", potentially localized or constructed
  dateRecorded: Date | string;
  source?: string;
}

describe('PriceDisplay Component', () => {
  const mockPriceData: PriceData = {
    cropName: 'Tomato',
    marketName: 'Nashik Market',
    price: 2500,
    priceUnit: 'INR per quintal', // This might be constructed or a direct value
    dateRecorded: new Date('2024-05-12T00:00:00.000Z'),
    source: 'Mandi Board',
  };

  beforeEach(() => {
    jest.clearAllMocks();
     (useTranslations as jest.Mock).mockImplementation((namespace: string) => (key: string) => {
        const fullKey = `${namespace}.${key}`;
        return mockMessages[fullKey as keyof typeof mockMessages] || key;
    });
    (useFormatter as jest.Mock).mockImplementation(() => ({
        dateTime: (date: Date, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', ...options }).format(date),
        number: (num: number, options: Intl.NumberFormatOptions) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', ...options }).format(num),
    }));
  });

  it('should render correctly with sample price data', () => {
    render(<PriceDisplay priceData={mockPriceData} />);
    expect(screen.getByText(mockMessages['PriceDisplay.title'])).toBeInTheDocument();
    expect(screen.getByText(mockPriceData.cropName)).toBeInTheDocument();
    expect(screen.getByText(mockPriceData.marketName)).toBeInTheDocument();
    // Price formatting check
    const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(mockPriceData.price);
    expect(screen.getByText(new RegExp(formattedPrice.replace(/\s/g, '\\s*')))).toBeInTheDocument(); // Handle potential non-breaking spaces
    expect(screen.getByText(mockPriceData.priceUnit.replace('INR per ', ''))).toBeInTheDocument(); // Check for "quintal"
    // Date formatting check
    const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(mockPriceData.dateRecorded));
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should display the localized crop name', () => {
    render(<PriceDisplay priceData={mockPriceData} />);
    expect(screen.getByText('Tomato')).toBeInTheDocument();
  });

  it('should display the localized market name', () => {
    render(<PriceDisplay priceData={mockPriceData} />);
    expect(screen.getByText('Nashik Market')).toBeInTheDocument();
  });

  it('should display the price with currency formatting', () => {
    render(<PriceDisplay priceData={mockPriceData} />);
    const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(mockPriceData.price);
    // Using regex to be flexible with potential non-breaking spaces in formatted currency
    expect(screen.getByText(new RegExp(formattedPrice.replace(/\s/g, '\\s*')))).toBeInTheDocument();
  });
  
  it('should display the price unit', () => {
    render(<PriceDisplay priceData={mockPriceData} />);
    expect(screen.getByText(mockMessages['PriceDisplay.unitLabel'])).toBeInTheDocument(); // Checks for "per"
    expect(screen.getByText(mockPriceData.priceUnit.replace('INR per ', ''))).toBeInTheDocument(); // Checks for "quintal"
  });

  it('should display the date in a readable format', () => {
    render(<PriceDisplay priceData={mockPriceData} />);
    const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(mockPriceData.dateRecorded));
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should display a "no data available" message when no price data is provided', () => {
    render(<PriceDisplay priceData={null} />);
    expect(screen.getByText(mockMessages['PriceDisplay.noData'])).toBeInTheDocument();
  });
});