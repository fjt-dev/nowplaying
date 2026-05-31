import Hero from '@/components/Hero';
import UrlInput from '@/components/UrlInput';
import ServiceInfo from '@/components/ServiceInfo';
import TryCard from '@/components/TryCard';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-16">
      <Hero />
      <ServiceInfo />
      <TryCard />
      <UrlInput />
      <Footer />
      <Toaster />
    </main>
  );
}
