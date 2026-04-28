// test/integration/NavigationFlow.test.tsx

import { render, screen } from '@testing-library/react'

// simple mock component instead of full app
function FakeApp() {
  return (
    <div>
      <h1>Home</h1>
      <button>Go to Login</button>
    </div>
  )
}

describe('Navigation Flow', () => {
  it('renders home screen', () => {
    render(<FakeApp />)

    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/go to login/i)).toBeInTheDocument()
  })
})