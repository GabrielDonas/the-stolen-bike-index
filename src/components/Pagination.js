import React from 'react'


export default function Pagination({ setCurrentPage, currentPage, totalIncidents, numberOfResultsPerPage, results }) {
   
    const totalNumberOfPages = Math.ceil(totalIncidents / numberOfResultsPerPage)
    const numberOfPages = []
    const anchorPagination = 3
    
    const handleClick = (value) => {
        setCurrentPage(value) ; 
        scrollToTop()
    }
    
    const followingPages = () =>{
        if((currentPage + anchorPagination ) > totalNumberOfPages){
            return totalNumberOfPages
        } else {
            return currentPage + anchorPagination 
        }    
    }

    const previousPages = () =>{
     if((currentPage - anchorPagination ) <= 0){
         return 1
     } else {
         return currentPage - anchorPagination 
     }
    }

    
    for(let i = previousPages(); i <= followingPages(); i++){ 
        numberOfPages.push(i) 
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }

    //Buttons
    const pageButtons =  (numberOfPages.map(page => (
                             <button key={page} 
                             onClick={() =>{ setCurrentPage(page); scrollToTop()}} 
                             className={page === currentPage ? "current-page" : "page-button"}>
                                {page}
                            </button>)))
    
    const nextButton = (<button className="page-button" onClick={() => handleClick(currentPage + 1)}>Next</button>)
    const lastPageButton = (<button className="page-button" onClick={() => handleClick(totalNumberOfPages)}>»</button>)
    const firstPageButton = (<button className="page-button" onClick={() => handleClick(1)}>«</button>)
    const prevButton = (<button className="page-button" onClick={() => handleClick(currentPage - 1)}>Prev</button>)

    if(results.length === 0){
        return null
    } else { 
        switch(currentPage) {
            case 1: 
                return (
                    <div>
                        {pageButtons}
                        {nextButton}
                        {lastPageButton}              
                    </div>
                )

            case totalNumberOfPages:
               return (
                    <div>
                        {firstPageButton}
                        {prevButton}
                        {pageButtons}           
                    </div>
                )
            default:
                return (
                    <div>
                        {firstPageButton}
                        {prevButton}
                        {pageButtons}
                        {nextButton}
                        {lastPageButton}              
                    </div>
                )
        }
    }
}
