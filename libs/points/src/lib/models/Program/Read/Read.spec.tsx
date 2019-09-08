import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Read from './Read';

describe('Read', () => {
  afterEach(cleanup);

  const props = {} as any;

  it('should render successfully', () => {
    const { baseElement } = render(<Read {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
