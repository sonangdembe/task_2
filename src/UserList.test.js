
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { UserList } from './components/UserList';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders user names when data is fetched successfully', async () => {
  mockedAxios.get.mockResolvedValue({
    data: [{ id: 1, name: 'Leanne Graham' }, { id: 2, name: 'Ervin Howell' }],
  });

  render(<UserList/>);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
  });
});

test('displays an error message when the API request fails', async () => {
  mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'));

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });
});
