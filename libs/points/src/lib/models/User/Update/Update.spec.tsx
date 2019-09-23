import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Update from './Update';

describe('Update', () => {
  afterEach(cleanup);

  const props = {} as any;

  it('should render successfully', () => {
    const { baseElement } = render(<Update {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
