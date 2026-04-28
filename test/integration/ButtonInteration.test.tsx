// test/integration/ButtonInteraction.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

describe('Button Interaction', () => {
  it('increments count on click', () => {
    render(<Counter />)

    fireEvent.click(screen.getByText(/increment/i))

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
  })
})
