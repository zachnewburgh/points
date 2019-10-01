import React from 'react';
import { render, cleanup } from '@testing-library/react';

import PrimaryButton from './PrimaryButton';

describe(' TextInput', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<PrimaryButton />);
    expect(baseElement).toBeTruthy();
  });
});
