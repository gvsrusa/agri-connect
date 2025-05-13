import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface CropType {
  id: string;
  name_en: string;
  name_hi?: string;
  name_mr?: string;
  // Add other languages as needed
}

interface CreateListingFormProps {
  onSubmit: (data: any) => void;
  cropTypes: CropType[];
  isSubmitting: boolean;
  language: string;
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({
  onSubmit,
  cropTypes = [], // Default to empty array
  isSubmitting,
  language,
}) => {
  const t = useTranslations('CreateListingForm');
  const [formData, setFormData] = useState({
    cropTypeId: '',
    quantity: '',
    pricePerUnit: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    cropTypeId: '',
    quantity: '',
    pricePerUnit: '',
  });

  const getLocalizedCropName = (crop: CropType) => {
    const langKey = `name_${language}` as keyof CropType;
    return crop[langKey] || crop.name_en;
  };

  const validate = () => {
    const newErrors = { cropTypeId: '', quantity: '', pricePerUnit: '' };
    let isValid = true;
    if (!formData.cropTypeId) {
      newErrors.cropTypeId = t('errors.cropTypeRequired');
      isValid = false;
    }
    if (!formData.quantity) {
      newErrors.quantity = t('errors.quantityRequired');
      isValid = false;
    }
    if (!formData.pricePerUnit) {
      newErrors.pricePerUnit = t('errors.priceRequired');
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('title')}</h2>

      <div>
        <label htmlFor="cropTypeId" className="block text-sm font-medium text-gray-700">
          {t('cropTypeLabel')}
        </label>
        <select
          id="cropTypeId"
          name="cropTypeId"
          value={formData.cropTypeId}
          onChange={handleChange}
          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${errors.cropTypeId ? 'border-red-500' : ''}`}
        >
          <option value="">{t('selectCropPlaceholder')}</option>
          {cropTypes && cropTypes.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {getLocalizedCropName(crop)}
            </option>
          ))}
        </select>
        {errors.cropTypeId && <p className="mt-2 text-sm text-red-600">{errors.cropTypeId}</p>}
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          {t('quantityLabel')}
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 ${errors.quantity ? 'border-red-500' : ''}`}
        />
        {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>}
      </div>

      <div>
        <label htmlFor="pricePerUnit" className="block text-sm font-medium text-gray-700">
          {t('priceLabel')}
        </label>
        <input
          type="text"
          id="pricePerUnit"
          name="pricePerUnit"
          value={formData.pricePerUnit}
          onChange={handleChange}
          className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 ${errors.pricePerUnit ? 'border-red-500' : ''}`}
        />
        {errors.pricePerUnit && <p className="mt-2 text-sm text-red-600">{errors.pricePerUnit}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          {t('descriptionLabel')}
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isSubmitting ? t('submittingButton') : t('submitButton')}
        </button>
      </div>
    </form>
  );
};

export default CreateListingForm;