// test/integration/BasicRender.test.tsx

import { render } from '@testing-library/react'

function SimpleComponent() {
  return <div>Hello World</div>
}

describe('Basic Render', () => {
  it('renders without crashing', () => {
    render(<SimpleComponent />)
  })
})
