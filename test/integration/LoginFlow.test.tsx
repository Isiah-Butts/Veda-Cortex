import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginPage } from '@/components/login-page'
import { saveUserLogin } from '@/lib/firebase-db'

// Mock app context
const mockSetIsLoggedIn = jest.fn()
const mockSetCurrentPage = jest.fn()
const mockSetCurrentUserEmail = jest.fn()

jest.mock('@/lib/app-context', () => ({
  useApp: () => ({
    setIsLoggedIn: mockSetIsLoggedIn,
    setCurrentPage: mockSetCurrentPage,
    setCurrentUserEmail: mockSetCurrentUserEmail,
    hairProfile: null,
  }),
}))

// Mock Firebase
jest.mock('@/lib/firebase-db', () => ({
  saveUserLogin: jest.fn(),
}))

describe('Login Flow (Integration)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows validation errors when empty', () => {
    render(<LoginPage />)

    fireEvent.click(
      screen.getByRole('button', { name: /sign in/i })
    )

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('calls Firebase and updates app state on success', async () => {
    ;(saveUserLogin as jest.Mock).mockResolvedValue(true)

    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /sign in/i })
    )

    await waitFor(() => {
      expect(saveUserLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
      })

      expect(mockSetCurrentUserEmail).toHaveBeenCalledWith('test@example.com')
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true)
      expect(mockSetCurrentPage).toHaveBeenCalled()
    })
  })
})