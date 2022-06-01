import React from 'react'

import { screen } from '@testing-library/react'

import App from '../../App'
import { render } from '../helpers/TestRenderer'

describe('App.tsx', () => {
    it('should render', () => {
        render(<App />, {})
        const app = screen.getByText('Carregando...')
        expect(app).toBeInTheDocument()
    })
})
