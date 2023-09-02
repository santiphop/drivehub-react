import { render, screen, cleanup } from '@testing-library/react'
// Importing the jest testing library
import '@testing-library/jest-dom'
import Modal from '.'

// afterEach function runs after each test suite is executed
afterEach(() => {
	cleanup() // Resets the DOM after each test suite
})

describe('Button Component', () => {
	const results = [
		{
			label: 'Total',
			value: 10000,
		},
		{
			label: 'Discount',
			value: 500,
		},
		{
			label: 'Grand',
			value: 9500,
		},
	]
	render(<Modal header="Cart" results={results} />)
	const header = screen.getByTestId('header')
	const label0 = screen.getByTestId('label-0')
	const label1 = screen.getByTestId('label-1')
	const label2 = screen.getByTestId('label-2')
	const value0 = screen.getByTestId('value-0')
	const value1 = screen.getByTestId('value-1')
	const value2 = screen.getByTestId('value-2')

	// Test 1
	test('Header Text', () => {
		expect(header).toHaveTextContent('Cart')
	})

	// Test 2
	test('Label Texts', () => {
		expect(label0).toHaveTextContent('Total')
		expect(label1).toHaveTextContent('Discount')
		expect(label2).toHaveTextContent('Grand')
	})

	// Test 3
	test('Value Texts', () => {
		expect(value0).toHaveTextContent('10,000 THB')
		expect(value1).toHaveTextContent('500 THB')
		expect(value2).toHaveTextContent('9,500 THB')
	})
})
