import Hero from '@/components/Hero';
import UrlInput from '@/components/UrlInput';
import ServiceInfo from '@/components/ServiceInfo';
import TryCard from '@/components/TryCard';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center px-4 gap-8 max-w-lg mx-auto w-full pt-16">
      <Hero />
      <ServiceInfo />
      <UrlInput />
      <TryCard />
      <Footer />
      <Toaster />
    </main>
  );
}
