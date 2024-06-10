import React, { ReactNode } from 'react';

type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white">
      <main className="min-h-screen mx-auto max-w-screen-2xl pt-10 lg:pt-24">
        <div
          className="
            grid auto-cols-auto auto-rows-auto gap-4 mx-6
            md:grid md:grid-cols-2 md:gap-4
            lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-hidden
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
