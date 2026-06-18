import React from "react";
import { Header } from "../atoms/Header";
import { Search } from "../organisms/SearchSection";
import { Footer } from "../atoms/Footer";

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
