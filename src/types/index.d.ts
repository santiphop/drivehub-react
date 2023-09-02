declare global {
	interface Window {
		[key: string]: {
			showModal: VoidFunction
			close: VoidFunction
		}
	}
}

export {}
