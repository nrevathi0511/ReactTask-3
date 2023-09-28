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
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
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
      const editButton = screen.getByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
    });

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });
});
