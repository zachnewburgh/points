import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Select from './Select';

describe(' Select', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<Select />);
    expect(baseElement).toBeTruthy();
  });
});
