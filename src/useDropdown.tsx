import React, { useState } from 'react';

const useDropdown = (
  label: string,
  defaultState: string,
  options: string[],
) => {
  const [state, setState] = useState(defaultState);

  const id = `use-dropdown-${label.replace(' ', '').toLowerCase()}`;

  const Dropdown: React.FC = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
        disabled={!options.length}
      >
        <option>All</option>
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState] as [
    string,
    React.FC,
    React.Dispatch<string>,
  ];
};

export default useDropdown;
