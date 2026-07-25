import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationData = ({
    page = 1,
    total = 0,
    limit = 10,
    onChange,
    showSizeChanger = false,
    pageSizeOptions = [10, 20, 50, 100],
}) => {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1 && !showSizeChanger) return null;

    const getPages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        if (page <= 4) {
            return [1, 2, 3, 4, 5, "...", totalPages];
        }

        if (page >= totalPages - 3) {
            return [
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "...",
            page - 1,
            page,
            page + 1,
            "...",
            totalPages,
        ];
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            {showSizeChanger && (
                <select
                    value={limit}
                    onChange={(e) =>
                        onChange({
                            page: 1,
                            limit: Number(e.target.value),
                        })
                    }
                    className="border rounded-md px-3 py-2 outline-none"
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size} / page
                        </option>
                    ))}
                </select>
            )}

            <div className="flex items-center gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => onChange({ page: page - 1, limit })}
                    className="w-9 h-9 flex items-center justify-center rounded disabled:opacity-40"
                >
                    <FiChevronLeft />
                </button>

                {getPages().map((item, index) =>
                    item === "..." ? (
                        <span key={index} className="px-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            onClick={() =>
                                onChange({
                                    page: item,
                                    limit,
                                })
                            }
                            className={`w-9 h-9 rounded-md border transition ${
                                item === page
                                    ? "bg-primary text-white border-primary"
                                    : "border-transparent hover:border-primary text-primary"
                            }`}
                        >
                            {item}
                        </button>
                    )
                )}

                <button
                    disabled={page === totalPages}
                    onClick={() =>
                        onChange({
                            page: page + 1,
                            limit,
                        })
                    }
                    className="w-9 h-9 flex items-center justify-center rounded disabled:opacity-40"
                >
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );
};

export default PaginationData;