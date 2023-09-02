import { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from './lib/utils'
import SearchBar from './components/search-bar'
import CarCard, { type CarItem } from './components/car-card'
import Modal from './components/modal'
import { getCarList, getDiscount } from './lib/api'
import logo from './logo.svg'
import './App.css'

type Cart = {
	id: string
	title: string
	price: number
	photo: string
	amount: number
}

function App() {
	const [cart, setCart] = useLocalStorage<Cart[]>('cart', [])
	const [isNewItem, setIsNewItem] = useState(false)
	const total = useMemo(() => cart?.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.amount), 0), [cart])
	const [discount, setDiscount] = useState(0)
	const grandTotal = useMemo(() => total - discount, [total, discount])

	const discountCodeRef = useRef<HTMLInputElement>(null)
	const queryParameters = new URLSearchParams(window.location.search)
	const search = queryParameters.get('search') ?? ''
	const sort = queryParameters.get('sort') ?? ''

	const addToCard = useCallback(
		(e: FormEvent<any>) => {
			e.preventDefault()

			const newItem = {
				id: e.currentTarget.id.value,
				title: e.currentTarget.title.value,
				price: e.currentTarget.price.value,
				photo: e.currentTarget.photo.value,
			}
			const cartIndex = cart.findIndex((item) => item.id === newItem.id)

			// existing in cart
			if (cartIndex !== -1) {
				const updatedCart = [...cart]
				updatedCart[cartIndex].amount += 1
				setCart(updatedCart)
			} else {
				setCart((prev) => [
					...prev,
					{
						...newItem,
						amount: 1,
					},
				])
				setIsNewItem(true)
			}
		},
		[cart, setCart]
	)

	async function applyDiscount(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()

		const code = discountCodeRef?.current?.value
		if (!code?.length) return

		const data = await getDiscount(code)
		if (data.items.at(0) === undefined) {
			console.error(data.message ?? 'Discount code invalid')
			toast.error(data.message ?? 'Discount code invalid')
			setDiscount(0)
			return
		}

		const discount = data.items.at(0).fields.amount as number
		setDiscount(discount > total ? total : discount)
		toast.success('Discount code applied')
	}

	function incrementAmount(e: MouseEvent<HTMLButtonElement>) {
		const newItemId = e.currentTarget.value
		const cartIndex = cart.findIndex((item) => item.id === newItemId)
		if (cartIndex === -1) return

		const updatedCart = [...cart]
		updatedCart[cartIndex].amount += 1
		setCart(updatedCart)
	}

	function decrementAmount(e: MouseEvent<HTMLButtonElement>) {
		const newItemId = e.currentTarget.value
		const cartIndex = cart.findIndex((item) => item.id === newItemId)
		if (cartIndex === -1) return

		const updatedCart = [...cart]
		if (updatedCart[cartIndex].amount <= 1) {
			updatedCart.splice(cartIndex, 1)
		} else {
			updatedCart[cartIndex].amount -= 1
		}
		setCart(updatedCart)
	}

	const { isLoading, error, data } = useQuery({
		queryKey: ['items'],
		queryFn: () => getCarList({ search, sort }),
	})

	if (isLoading) return <span className="loading loading-dots loading-md"></span>
	if (error) return <>{JSON.stringify(error)}</>

	const carList: CarItem[] = data.items

	return (
		<div>
			<div className="app-header">
				<img src={logo} alt="logo" /> <span>Drivehub</span>
				<button
					className="btn absolute right-4"
					onClick={() => {
						window.my_modal_3.showModal()
						setIsNewItem(false)
					}}
				>
					<div className={cn({ indicator: isNewItem })}>
						<span className={cn({ 'indicator-item badge badge-error': isNewItem })}></span>
						<Icon icon="mdi:cart-outline" width="24" height="24" />
					</div>
					<p className="max-sm:hidden">Cart</p> ({cart.reduce((acc, cur) => acc + cur.amount, 0)})
				</button>
			</div>

			<div className="lg:px-16 mb-20">
				<div className="flex max-md:flex-col justify-between p-4">
					<h1 data-testid="header" className="text-4xl p-2 font-bold">
						Bulk Renting
					</h1>

					<SearchBar search={search} sort={sort} />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 p-8 w-full">
					{carList?.map((carItem, index) => (
						<CarCard key={index} carItem={carItem} addToCart={addToCard} />
					))}
				</div>
			</div>

			<Modal
				header="Cart"
				results={[
					{
						label: 'Total',
						value: total,
					},
					{
						label: 'Discount',
						value: discount,
					},
					{
						label: 'Grand Total',
						value: grandTotal,
					},
				]}
			>
				{cart?.map(({ photo, title, price, id, amount }, index) => (
					<Fragment key={index}>
						<div className="flex justify-between">
							<div className="flex justify-start items-center gap-2">
								<img src={photo} className="h-16 w-24 object-cover max-sm:hidden" alt="Preview" />
								<div>
									<h3>{title}</h3>
									<p>
										{price} {'THB/Day'}
									</p>
								</div>
							</div>
							<div className="text-xl flex items-center gap-4">
								<button type="button" onClick={decrementAmount} value={id} className="btn btn-primary btn-sm">
									{'-'}
								</button>
								<p>{amount}</p>
								<button type="button" onClick={incrementAmount} value={id} className="btn btn-primary btn-sm">
									{'+'}
								</button>
							</div>
						</div>
						<div className="divider"></div>
					</Fragment>
				))}
				<div className="flex gap-2">
					<input ref={discountCodeRef} className="input input-bordered w-full" placeholder="Discount code" />
					<button onClick={applyDiscount} className="btn">
						Apply
					</button>
				</div>
			</Modal>

			<div className="app-footer">FOOTER</div>
		</div>
	)
}

export default App
