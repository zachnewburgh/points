import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Create from './Create';

describe('Create', () => {
  afterEach(cleanup);

  const props = {} as any;

  it('should render successfully', () => {
    const { baseElement } = render(<Create {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
