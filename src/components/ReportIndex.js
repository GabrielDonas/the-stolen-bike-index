import React, {useState, useEffect} from 'react'
import timeStampConverter from './timeStampConverter'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import NumberOfResults from './NumberOfResults'

const imgPlaceholder ='https://via.placeholder.com/300'

export default function ReportIndex() {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState('')
    const [queryLocation, setQueryLocation] = useState('')

    const bikewiseURL = `https://bikewise.org:443/api/v2/incidents?page=${currentPage}&per_page=10&incident_type=theft&proximity=${queryLocation}&query=${query}`


    useEffect (() => {
        const fetchList = async () =>{
            setLoading(true)
            const data = await fetch(bikewiseURL)
            const list = await data.json()
            const incidents = list.incidents
            console.log(incidents)
            setResults(incidents)
            setLoading(false)
        }
        fetchList()   
    }, [bikewiseURL])

    
    
    if(loading){
        return <h2>Loading...</h2>
    }

    //if(results.length === 0) { 
    //    return <h2>Oops... No results found.</h2>
    //}

    return (
        <>
            <div className="query-container">
                <SearchBar  setQuery={setQuery} setQueryLocation={setQueryLocation}/>
                <NumberOfResults results={results}/>
            
                {results.map(item => (
                <div key={item.id} id="query-result">
                    <img src={item.media.image_url_thumb ? item.media.image_url_thumb : imgPlaceholder} alt=""/>
                    <div id="bike-info">
                        <h3>{item.title}</h3>
                        <p>{!item.description ? 'No description has been provided.' : item.description}</p>
                        <div> 
                            <div className="date-time">time: {timeStampConverter(item.occurred_at)}</div>
                            <div>location: {item.address}</div>
                        </div>
                    </div>
                </div>
                ))}

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} results={results}/>

            </div>
        </>
    )
}
