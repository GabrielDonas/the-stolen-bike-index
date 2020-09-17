import React, {useState, useEffect} from 'react'
import timeStampConverter from './timeStampConverter'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import NumberOfResults from './NumberOfResults'

const imgPlaceholder ='https://via.placeholder.com/300'

export default function ReportIndex() {
    const [results, setResults] = useState([])
    const [totalIncidents, setTotalIncidents] = useState(1000)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfResultsPerPage, setNumberOfResultsPerPage] = useState(10)
    const [query, setQuery] = useState('')
    const [queryLocation, setQueryLocation] = useState('')
    
    const bikewiseURL = `https://bikewise.org:443/api/v2/incidents?page=&per_page=${totalIncidents}&incident_type=theft&proximity=${queryLocation}&query=${query}`

    

    useEffect (() => {
        const fetchList = async () =>{
            setLoading(true)
            const data = await fetch(bikewiseURL)
            const list = await data.json()
            const incidents = await list.incidents
            setTotalIncidents(incidents.length)
            setLoading(false)
            console.log(bikewiseURL)
            const resultsPerPage = () => { 
                const initialCondition = (currentPage * numberOfResultsPerPage) - (numberOfResultsPerPage - 1)
                const stopCondition = currentPage * numberOfResultsPerPage
                let resultList = [];
                for(let i = initialCondition - 1; i < stopCondition; i++){
                  if(incidents[i]){
                    resultList.push(incidents[i])
                    }
                }
                setResults(resultList)
              }
              resultsPerPage() 
        }
        fetchList() 
         
    }, [bikewiseURL, 
        currentPage,
        numberOfResultsPerPage])

    
    
    if(loading){
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className="query-container">
                <SearchBar  setQuery={setQuery} setQueryLocation={setQueryLocation}/>
                <NumberOfResults results={results}/>
            
                {results.map(item => (
                <div key={item.id} className="query-result">
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

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalIncidents={totalIncidents}
                numberOfResultsPerPage={numberOfResultsPerPage} results={results}/>

            </div>
        </>
    )
}
