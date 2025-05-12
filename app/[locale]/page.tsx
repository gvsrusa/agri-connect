import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Index');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-green-700 mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-700">{t('description')}</p>
    </main>
  );
}