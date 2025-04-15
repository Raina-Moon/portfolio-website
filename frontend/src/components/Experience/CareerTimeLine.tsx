'use client';

import React from 'react';
import { useLanguageStore } from '@/libs/languageStore';
import { timelineItems } from '@/libs/texts/timeline';

const CareerTimeline = () => {
  const { lang } = useLanguageStore();
  const data = timelineItems[lang];

  return (
    <section id="work" className="py-16 px-4 max-w-full overflow-x-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        {lang === 'en' ? 'Career Timeline' : '커리어 타임라인'}
      </h2>

      <div className="relative">
        {/* Horizon line */}
        <div className="absolute top-[44px] left-0 right-0 h-1 bg-gray-800 z-0" />

        <div className="flex gap-12 overflow-x-auto pb-6 pl-6 pr-6">
          {data.map((item, index) => (
            <div key={index} className="relative flex-shrink-0 w-64">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-10 w-4 h-4 bg-gray-800 rounded-full z-10" />
              <div className="bg-white p-4 mt-16 shadow-md rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 text-center">{item.date}</p>
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
