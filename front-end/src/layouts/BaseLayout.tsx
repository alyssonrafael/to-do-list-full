// src/layouts/BaseLayout.tsx
import React from 'react';
import { ReactNode } from 'react';

type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      {/* adicionando configuraçoes para responsividade */}
      <main className="mx-auto max-w-screen-lg pt-10">
      <div
       className="
          grid auto-cols-auto auto-rows-auto gap-4 max-h-screen mx-6
          md:grid md:grid-cols-2 md:auto-rows md:gap-4 md:max-h-screen md:mx-6
          lg:grid lg:grid-cols-4 lg:auto-rows-auto lg:gap-4 lg:max-h-screen lg:overflow-hidden
        ">
          {children}
        </div>
      </main> 
    </>
  );
};

export default BaseLayout;
