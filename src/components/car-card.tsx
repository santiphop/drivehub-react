import type { FormEvent } from "react";
import fallback from "./placeholder.jpg";

type CarCardProps = {
  carItem: CarItem
  addToCart: (e: FormEvent<HTMLFormElement>) => void
}

export type CarItem = {
  fields: {
    title: string
    price: number
    photo: string
  }
  sys: {
    id: string
  }
}

export default function CarCard({ carItem, addToCart }: CarCardProps) {
  const { fields: { title, price, photo }, sys: { id } } = carItem

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          className="object-cover h-56 w-full"
          src={photo}
          onError={(e) => (e.currentTarget.src = fallback)}
          alt="Car" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{price.toLocaleString()} {'THB/Day'}</p>
        <div className="card-actions mt-4">
          <form onSubmit={addToCart}>
            <input readOnly name="title" className="hidden" value={title} />
            <input readOnly name="price" className="hidden" value={price} />
            <input readOnly name="photo" className="hidden" value={photo} />
            <button name="id" type="submit" value={id} className="btn btn-primary w-full">Add to cart</button>
          </form>
        </div>
      </div>
    </div>
  )
}