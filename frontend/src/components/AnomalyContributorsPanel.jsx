import React from 'react';

export default function AnomalyContributorsPanel({ contributors }) {
  if (!contributors.length) return null;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1c1f26] to-[#2a2f38] border border-yellow-800 shadow-md px-6 py-5">
      <h2 className="text-lg font-semibold text-yellow-300 mb-3">Anomaly Contributors</h2>
      <ul className="text-sm text-gray-300 space-y-2">
        {contributors.map((c, i) => (
  <div key={i}>
    {c.feature}: {c.impact?.toFixed(2)}
  </div>
))}
      </ul>
    </div>
  );
}
