import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Integration from '../Content/Integration';

describe('Integration Component', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('renders the component without errors', () => {
    render(<Integration />);
    const addButton = screen.getByRole('button', { name: 'Add Details' });
    expect(addButton).toBeInTheDocument();
  });

  it('opens the dialog when "Add Details" button is clicked', async () => {
    render(<Integration />);
    const addButton = screen.getByRole('button', { name: 'Add Details' });
    userEvent.click(addButton);

    await waitFor(() => {
      // const dialog = screen.getByRole('dialog');
      const dialog = screen.getByRole('dialog', { name: 'Add New User' });
      expect(dialog).toBeVisible();
    });
  });

  it('fetches data and renders it in the table', async () => {
    const mockData = [
      { id: 1, price: 10, category: 'Category 1', title: 'Title 1' },
      { id: 2, price: 20, category: 'Category 2', title: 'Title 2' },
    ];

    mockAxios.onGet('https://fakestoreapi.com/products').reply(200, mockData);

    render(<Integration />);

    await waitFor(() => {
      const tableRows = screen.getAllByRole('row');
      expect(tableRows).toHaveLength(mockData.length + 1); // Plus one for the table header
    });
  });

  it('displays a dialog when "Edit" button is clicked', async () => {
    const mockData = [
      { id: 1, price: 10, category: 'Category 1', title: 'Title 1' },
    ];

    mockAxios.onGet('https://fakestoreapi.com/products').reply(200, mockData);

    render(<Integration />);

    await waitFor(() => {
      const editButton = screen.getByText('Edit');
      expect(editButton).toBeInTheDocument()
    });

    await waitFor(() => {
      const dialog = screen.getByText('Add New User');
      expect(dialog).toBeInTheDocument();
    });
  });
});


// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import Integration from '../Content/Integration';

// jest.mock('axios'); // Mock the axios module

// describe('Integration Component', () => {
//   it('renders without crashing', () => {
//     render(<Integration />);
//   });

//   it('displays data when fetched successfully', async () => {
//     const fakeData = [
//       { id: 1, price: 10, category: 'Category A', title: 'Item 1' },
//       { id: 2, price: 20, category: 'Category B', title: 'Item 2' },
//     ];

//     axios.get.mockResolvedValue({ data: fakeData });

//     const { getByText } = render(<Integration />);
    
//     // Wait for the data to be loaded
//     await waitFor(() => {
//       expect(getByText('Item 1')).toBeInTheDocument();
//       expect(getByText('Item 2')).toBeInTheDocument();
//     });
//   });

//   it('opens the dialog when "Add Details" button is clicked', () => {
//     const { getByText, getByRole } = render(<Integration />);
    
//     fireEvent.click(getByText('Add Details'));

//     const dialog = getByRole('dialog');
//     expect(dialog).toBeInTheDocument();
//   });

//   // Add more test cases for other functionality as needed.
// });




// import {render, screen, cleanup } from '@testing-library/react';
// import Integration from '../Content/Integration';

// test('should render the Integration Content', () => {
//   render(<IntegrationContent />);
//   const IntegrationContent = screen.getByTestId("todo");
//   expect(Integration).toHaveTextContent("")
// })