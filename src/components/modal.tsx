import { Fragment, type PropsWithChildren } from "react"

type ModalProps = {
    header: string
    results: { label: string, value: number }[]
}

export default function Modal({ header, results, children }: PropsWithChildren<ModalProps>) {
    return (
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle" >
            <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg p-4">{header}</h3>
                <div className="flex flex-col">
                    {children}
                    <div className="flex flex-col mt-6">
                        {results?.map(({label, value}, index) => (
                            <Fragment key={index}>
                                <div className="flex justify-between">
                                    <p className="font-bold">{label}</p>
                                    <p>{value.toLocaleString()} {'THB'}</p>
                                </div>
                                <div className="divider"></div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </form>
        </dialog>
    )
}
