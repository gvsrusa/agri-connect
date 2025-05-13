/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PriceSearchForm from '@/components/marketplace/PriceSearchForm'; // Adjust path as needed
import { useTranslations } from 'next-intl';

// Mock next-intl hook
const mockMessages = {
  'PriceSearchForm.title': 'Search Market Prices',
  'PriceSearchForm.cropLabel': 'Select Crop',
  'PriceSearchForm.marketLabel': 'Select Market',
  'PriceSearchForm.submitButton': 'Get Price',
  'PriceSearchForm.loadingCrops': 'Loading crops...',
  'PriceSearchForm.loadingMarkets': 'Loading markets...',
  'PriceSearchForm.noCrops': 'No crops available.',
  'PriceSearchForm.noMarkets': 'No markets available.',
  'PriceSearchForm.selectCropPlaceholder': 'Choose a crop',
  'PriceSearchForm.selectMarketPlaceholder': 'Choose a market',
};

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockImplementation((namespace: string) => (key: string) => {
    const fullKey = `${namespace}.${key}`;
    return mockMessages[fullKey as keyof typeof mockMessages] || key;
  }),
}));

// Define interfaces for props
interface Crop {
  id: string;
  name: string; // Assuming name is already localized for simplicity in mock
}
interface Market {
  id: string;
  name: string; // Assuming name is already localized
}

describe('PriceSearchForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockCrops: Crop[] = [
    { id: 'crop_wheat', name: 'Wheat' },
    { id: 'crop_rice', name: 'Rice' },
  ];
  const mockMarkets: Market[] = [
    { id: 'market_mumbai', name: 'Mumbai APMC' },
    { id: 'market_delhi', name: 'Delhi Azadpur' },
  ];

  const defaultProps = {
    onSubmit: mockOnSubmit,
    crops: mockCrops,
    markets: mockMarkets,
    isLoadingCrops: false,
    isLoadingMarkets: false,
    language: 'en', // Assuming language prop is passed for localized names if needed
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockImplementation((namespace: string) => (key: string) => {
        const fullKey = `${namespace}.${key}`;
        return mockMessages[fullKey as keyof typeof mockMessages] || key;
    });
  });

  it('should render the form with localized labels', () => {
    render(<PriceSearchForm {...defaultProps} />);
    expect(screen.getByRole('heading', { name: mockMessages['PriceSearchForm.title'] })).toBeInTheDocument();
    expect(screen.getByLabelText(mockMessages['PriceSearchForm.cropLabel'])).toBeInTheDocument();
    expect(screen.getByLabelText(mockMessages['PriceSearchForm.marketLabel'])).toBeInTheDocument();
    expect(screen.getByRole('button', { name: mockMessages['PriceSearchForm.submitButton'] })).toBeInTheDocument();
  });

  it('should populate the crop type selector with data', () => {
    render(<PriceSearchForm {...defaultProps} />);
    const cropSelect = screen.getByLabelText(mockMessages['PriceSearchForm.cropLabel']);
    expect(cropSelect.children.length).toBe(mockCrops.length + 1); // +1 for placeholder
    mockCrops.forEach(crop => {
      expect(screen.getByRole('option', { name: crop.name })).toBeInTheDocument();
    });
  });

  it('should populate the market location selector with data', () => {
    render(<PriceSearchForm {...defaultProps} />);
    const marketSelect = screen.getByLabelText(mockMessages['PriceSearchForm.marketLabel']);
    expect(marketSelect.children.length).toBe(mockMarkets.length + 1); // +1 for placeholder
    mockMarkets.forEach(market => {
      expect(screen.getByRole('option', { name: market.name })).toBeInTheDocument();
    });
  });

  it('should call the onSubmit handler with the selected crop and market IDs', async () => {
    render(<PriceSearchForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(mockMessages['PriceSearchForm.cropLabel']), { target: { value: 'crop_wheat' } });
    fireEvent.change(screen.getByLabelText(mockMessages['PriceSearchForm.marketLabel']), { target: { value: 'market_mumbai' } });
    fireEvent.click(screen.getByRole('button', { name: mockMessages['PriceSearchForm.submitButton'] }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        cropId: 'crop_wheat',
        marketId: 'market_mumbai',
      });
    });
  });

  it('should display loading state for crops', () => {
    render(<PriceSearchForm {...defaultProps} isLoadingCrops={true} crops={[]} />);
    expect(screen.getByText(mockMessages['PriceSearchForm.loadingCrops'])).toBeInTheDocument();
  });

  it('should display loading state for markets', () => {
    render(<PriceSearchForm {...defaultProps} isLoadingMarkets={true} markets={[]} />);
    expect(screen.getByText(mockMessages['PriceSearchForm.loadingMarkets'])).toBeInTheDocument();
  });
  
  it('should display "no crops available" message when crops array is empty and not loading', () => {
    render(<PriceSearchForm {...defaultProps} crops={[]} isLoadingCrops={false} />);
    const cropSelect = screen.getByLabelText(mockMessages['PriceSearchForm.cropLabel']) as HTMLSelectElement;
    // Check if the select is disabled or shows a specific message.
    // For this example, we'll assume the placeholder changes or a message appears.
    // If the select is disabled and has only a placeholder:
    expect(cropSelect.children.length).toBe(1); // Only "No crops available."
    expect(screen.getByRole('option', { name: mockMessages['PriceSearchForm.noCrops']})).toBeInTheDocument();
    // Ensure the regular placeholder is not present
    expect(screen.queryByRole('option', { name: mockMessages['PriceSearchForm.selectCropPlaceholder']})).not.toBeInTheDocument();
  });

  it('should handle cases where selector data fails to load (e.g., empty arrays passed)', () => {
    render(<PriceSearchForm {...defaultProps} crops={[]} markets={[]} />);
    // Check that selectors are present but might be empty or show a "no data" message
    // This test assumes the component renders gracefully with empty data.
    const cropSelect = screen.getByLabelText(mockMessages['PriceSearchForm.cropLabel']);
    expect(cropSelect.children.length).toBe(1); // Only placeholder
    const marketSelect = screen.getByLabelText(mockMessages['PriceSearchForm.marketLabel']);
    expect(marketSelect.children.length).toBe(1); // Only placeholder
  });
});