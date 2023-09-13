import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ApiService from './apiService';
import YourComponent from './YourComponent';

jest.mock('./apiService', () => ({
  getUserActivity: jest.fn().mockResolvedValue(mockedResponse),
}));

const mockedResponse = {
  data: {
    data: {
      sessions: [
        {
          kilogram: 70,
          calories: 500,
          day: '2022-01-01',
        },
        // more session objects...
      ],
    },
  },
};

test('renders component with mocked data', async () => {
  await act(async () => {
    render(<YourComponent />);
  });

  // Assert on the rendered component using the mocked data
  const weightElement = screen.getByText('70');
  expect(weightElement).toBeInTheDocument();

  const caloriesElement = screen.getByText('500');
  expect(caloriesElement).toBeInTheDocument();
});