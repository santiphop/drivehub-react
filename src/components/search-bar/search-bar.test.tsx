import { render, screen, cleanup } from '@testing-library/react'
// Importing the jest testing library
import '@testing-library/jest-dom'
import SearchBar from '.'

// afterEach function runs after each test suite is executed
afterEach(() => {
	cleanup() // Resets the DOM after each test suite
})

describe('Button Component', () => {
	render(<SearchBar search="honda" sort="" />)
	const input = screen.getByTestId('search')
	const select = screen.getByTestId('sort')

	// Test 1
	test('Input Value', () => {
		expect(input).toHaveDisplayValue('honda')
	})

	// Test 2
	test('Select Value', () => {
		expect(select).toHaveDisplayValue('Sorting')
	})
})
