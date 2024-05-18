// src/layouts/BaseLayout.tsx
import React from 'react';
import { ReactNode } from 'react';

type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto max-w-screen-lg pt-10"> {/* Adicionando mx-auto e my-4 */}
      <div className="grid grid-cols-4 auto-rows-auto gap-4 max-h-screen overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
