import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

export default function MainLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}