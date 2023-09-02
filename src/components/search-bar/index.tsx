import { useMemo } from "react";
import { Icon } from "@iconify/react";

export type SortOption = {
    label: string
    value: string
    disabled?: boolean
}

type SearchBarProps = {
    search: string
    sort: string
}

export default function SearchBar({ search, sort }: SearchBarProps) {
    const sortOptions: SortOption[] = useMemo(() => [
        {
            label: 'Sorting',
            value: '',
            disabled: true,
        },
        {
            label: 'Price Low - High',
            value: 'fields.price',
        },
        {
            label: 'Price High - Low',
            value: '-fields.price',
        },
        {
            label: 'Name A - Z',
            value: 'fields.title',
        },
        {
            label: 'Name Z - A',
            value: '-fields.title',
        },
    ], [])

    return (
        <form className="flex max-md:flex-col items-center gap-2">
            <input
                name="search"
                className="input input-bordered w-full"
                placeholder="Search car"
                defaultValue={search}
                data-testid="search"
            />
            <div className="flex gap-2 w-full">
                <select data-testid="sort" defaultValue={sort} name="sort" className="select select-bordered max-md:w-full">
                    {sortOptions.map(option => (
                        <option value={option.value} disabled={option.disabled} key={option.value}>{option.label}</option>
                    ))}
                </select>
                <button className="btn max-md:self-end"><Icon icon="mdi:magnify" width="24" height="24" /></button>
            </div>
        </form>
    )
}