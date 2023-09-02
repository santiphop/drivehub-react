type CarListApi = {
	search: string
	sort: string
}

const REACT_APP_API_ROUTE = process.env.REACT_APP_API_ROUTE as string

export const getCarList = async ({ search, sort }: CarListApi) => {
	const url = new URL(REACT_APP_API_ROUTE)
	url.searchParams.set('content_type', 'car')
	url.searchParams.set('access_token', process.env.REACT_APP_ACCESS_TOKEN ?? '')
	url.searchParams.set('query', search)
	url.searchParams.set('order', sort)

	const res = await fetch(url)
	return await res.json()
}

export const getDiscount = async (code: string) => {
	const url = new URL(REACT_APP_API_ROUTE)
	url.searchParams.set('access_token', process.env.REACT_APP_ACCESS_TOKEN ?? '')
	url.searchParams.set('content_type', 'discount')
	url.searchParams.set('fields.code', code)

	const res = await fetch(url)
	return await res.json()
}
