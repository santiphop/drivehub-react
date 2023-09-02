import { render, screen, cleanup } from '@testing-library/react'
// Importing the jest testing library
import '@testing-library/jest-dom'
import CarCard from '.'

// afterEach function runs after each test suite is executed
afterEach(() => {
	cleanup() // Resets the DOM after each test suite
})

describe('Button Component', () => {
	const addToCart = jest.fn()
	const carItem = {
		fields: {
			title: 'Honda Accord',
			price: 1000,
			photo: 'photo',
		},
		sys: {
			id: 'id',
		},
	}
	render(<CarCard carItem={carItem} addToCart={addToCart} />)
	const button = screen.getByTestId('add-to-cart')
	const title = screen.getByTestId('title')
	const price = screen.getByTestId('price')

	// Test 1
	test('Button Rendering', () => {
		expect(button).toBeInTheDocument()
	})

	// Test 2
	test('Button Text', () => {
		expect(button).toHaveTextContent('Add to cart')
	})

	// Test 3
	test('Title Text', () => {
		expect(title).toHaveTextContent('Honda Accord')
	})

	// Test 4
	test('Price Text', () => {
		expect(price).toHaveTextContent('1,000 THB/Day')
	})
})
