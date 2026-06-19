import React from 'react';

import { Footer } from '../atoms/Footer';
import { Header } from '../atoms/Header';
import { Search } from '../organisms/SearchSection';

interface LayoutProps {
  title: string;
}

const MainLayout = ({ title }: LayoutProps) => {
  return (
    <div className="layout">
      <Header title={title} />
      <main className="container">
        <Search />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
