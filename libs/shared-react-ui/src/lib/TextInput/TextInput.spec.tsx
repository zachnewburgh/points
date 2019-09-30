import React from 'react';
import { render, cleanup } from '@testing-library/react';

import TextInput from './TextInput';

describe(' TextInput', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<TextInput />);
    expect(baseElement).toBeTruthy();
  });
});
