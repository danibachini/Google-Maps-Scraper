'use client';

export default function ClearButton() {

    const clear = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="text-center my-4">
            <button
            type='button'
            onClick={clear}
            className="btn btn-xs border-none text-white bg-teal-700 hover:bg-amber-100 hover:text-teal-800"
            >
                Clear the options
            </button>
        </div>
    )
}