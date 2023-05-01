import React, { ChangeEvent } from 'react';

export function Select({
  items = [] as string[],
  index = 0,
  onSelect = (idx: number) => {},
}) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.selectedIndex);
  };

  return (
    <select value={index} onChange={handleChange} style={{ width: '300px' }}>
      {items.map((option, idx) => (
        <option key={idx} value={idx}>
          {option}
        </option>
      ))}
    </select>
  );
}
