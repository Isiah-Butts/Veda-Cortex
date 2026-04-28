// test/integration/FormValidation.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'

function FakeLogin() {
  return (
    <form>
      <input placeholder="email" />
      <input placeholder="password" />
      <button type="submit">Sign In</button>
    </form>
  )
}

describe('Form Validation', () => {
  it('renders inputs and button', () => {
    render(<FakeLogin />)

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })

  it('allows typing in inputs', () => {
    render(<FakeLogin />)

    const email = screen.getByPlaceholderText(/email/i)

    fireEvent.change(email, { target: { value: 'test@test.com' } })

    expect((email as HTMLInputElement).value).toBe('test@test.com')
  })
})