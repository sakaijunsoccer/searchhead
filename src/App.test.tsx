import {render, fireEvent, screen } from '@testing-library/react';
import assert from 'assert';
jest.mock('node-fetch', ()=>jest.fn())

import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('loading is displayed', async () => {
    const eventsMock = () =>
    new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: async () => ({ events: ["log1"] })
      })
    })
    global.fetch = jest.fn().mockImplementation(eventsMock)
    assert(await screen.getByText("Search"))
    const button = screen.getByRole('button')
    fireEvent.click(button);
    assert(await screen.getByText("Loading..."))
  
  });
});