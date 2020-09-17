import React from 'react'


export default function Pagination({ setCurrentPage, currentPage, totalIncidents, numberOfResultsPerPage, results }) {
   
    const totalNumberOfPages = Math.ceil(totalIncidents / numberOfResultsPerPage)
    const numberOfPages = []
    for(let i = 1; i <= totalNumberOfPages; i++){ numberOfPages.push(i) }

    

    if(results.length === 0){
        return null
    } else {
        return (
            <div>
                {numberOfPages.map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={page === currentPage ? "current-page" : "page-button"}>
                    {page}
                </button>))}
            </div>
            )
        }
    }
