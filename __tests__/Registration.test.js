import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Registration from '../src/pages/modules/registration';

describe('Registration component tests', () => {
  it('renders form without crashing', () => {
    render(<Registration />);
  });

  it('should update form data on input change', () => {
    render(<Registration />);
    const nameInput = screen.getByLabelText('Логин');
    const emailInput = screen.getByLabelText('Адрес электронной почты');
    const passwordInput = screen.getByLabelText('Пароль');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    expect(nameInput.value).toEqual('John');
    expect(emailInput.value).toEqual('test@test.com');
    expect(passwordInput.value).toEqual('1234');
  });

  it('should display warning if form fields are empty on submit', () => {
    render(<Registration />);
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    const warningMessage = screen.getByText('Пожалуйста, заполните все обязательные поля!');
    expect(warningMessage).toBeInTheDocument();
  });

  it('should call registerUser function on form submit', () => {
    const registerUserMock = jest.fn();
    render(<Registration registerUser={registerUserMock} />);
    const form = screen.getByRole('form');
    const nameInput = screen.getByLabelText('Логин');
    const emailInput = screen.getByLabelText('Адрес электронной почты');
    const passwordInput = screen.getByLabelText('Пароль');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.submit(form);

    expect(registerUserMock).toHaveBeenCalledWith({
      name: 'John',
      email: 'test@test.com',
      password: '1234'
    });
  });
});
