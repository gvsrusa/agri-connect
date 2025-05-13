/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SomeNewComponent from '@/components/marketplace/SomeNewComponent';
import { useTranslations } from 'next-intl';

// Mock next-intl hook
const mockMessages = {
  'SomeNewComponent.placeholderHeading': 'SomeNewComponent Placeholder Text', // Actual text
  'SomeNewComponent.incrementButton': 'Increment Count',
  'SomeNewComponent.currentCount': 'Current Count:',
};

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockImplementation((namespace: string) => (key: string) => {
    const fullKey = `${namespace}.${key}`;
    return mockMessages[fullKey as keyof typeof mockMessages] || key;
  }),
}));

describe('SomeNewComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockImplementation((namespace: string) => (key: string) => {
        const fullKey = `${namespace}.${key}`;
        return mockMessages[fullKey as keyof typeof mockMessages] || key;
    });
  });

  it('should render the placeholder heading using translations', () => {
    render(<SomeNewComponent initialCount={0} />);
    // The component should use t('placeholderHeading')
    const headingElement = screen.getByRole('heading', { name: mockMessages['SomeNewComponent.placeholderHeading'] });
    expect(headingElement).toBeInTheDocument();
  });

  it('should handle the initialCount prop and display it', () => {
    const initialCount = 5;
    render(<SomeNewComponent initialCount={initialCount} />);
    expect(screen.getByText(`${mockMessages['SomeNewComponent.currentCount']} ${initialCount}`)).toBeInTheDocument();
  });

  it('should interact correctly when the increment button is clicked', () => {
    const initialCount = 3;
    render(<SomeNewComponent initialCount={initialCount} />);

    const incrementButton = screen.getByRole('button', { name: mockMessages['SomeNewComponent.incrementButton'] });
    expect(screen.getByText(`${mockMessages['SomeNewComponent.currentCount']} ${initialCount}`)).toBeInTheDocument();

    fireEvent.click(incrementButton);
    expect(screen.getByText(`${mockMessages['SomeNewComponent.currentCount']} ${initialCount + 1}`)).toBeInTheDocument();

    fireEvent.click(incrementButton);
    expect(screen.getByText(`${mockMessages['SomeNewComponent.currentCount']} ${initialCount + 2}`)).toBeInTheDocument();
  });
});