import React from 'react'


export default function Pagination({ setCurrentPage }) {
   
    const numberOfPages = []

    for(let i = 1; i <= 10; i++){ numberOfPages.push(i) }

    return (
        <div>
            {numberOfPages.map(page => (
            <button key={page} onClick={() => setCurrentPage(page)}>
                {page}
            </button>))}
        </div>
    )
}
