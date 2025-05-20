
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  bgColor?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title,
  description,
  bgColor = 'bg-white'
}) => {
  // Update document title
  React.useEffect(() => {
    document.title = `${title} | CREC`;
  }, [title]);

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Page Banner */}
      <div className="bg-crec-darkblue py-6 px-4">

        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
          {description && (
            <p className="text-crec-gray max-w-2xl text-lg">{description}</p>
          )}
        </div>
      </div>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
