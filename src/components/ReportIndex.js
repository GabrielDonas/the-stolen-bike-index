import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import timeStampConverter from './timeStampConverter'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import NumberOfResults from './NumberOfResults'

const imgPlaceholder ='https://bikeindex.org/assets/revised/bike_photo_placeholder-ff15adbd9bf89e10bf3cd2cd6c4e85e5d1056e50463ae722822493624db72e56.svg'

export default function ReportIndex() {
    const [dataFetch, setDataFetch] = useState([])
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
            setDataFetch(incidents)
            setTotalIncidents(incidents.length)
            setLoading(false)      
        }
        fetchList() 
         
    }, [bikewiseURL])

    useEffect(() =>{ 
        const resultsPerPage = () => { 
            const initialCondition = (currentPage * numberOfResultsPerPage) - (numberOfResultsPerPage - 1)
            const stopCondition = currentPage * numberOfResultsPerPage
            let resultList = [];
            for(let i = initialCondition - 1; i < stopCondition; i++){
              if(dataFetch[i]){
                resultList.push(dataFetch[i])
                }
            }
            setResults(resultList)
          }
          resultsPerPage()
    }, [currentPage, numberOfResultsPerPage, dataFetch])
         
    
    if(loading){
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className="query-container">
                <SearchBar  setQuery={setQuery} setQueryLocation={setQueryLocation} setCurrentPage={setCurrentPage}/>
                <NumberOfResults results={results} totalIncidents={totalIncidents}/>
            
                {results.map(item => (
                <Link to={`/incidentpage/${item.id}`} key={item.id} className="link-style">
                    <div className="query-result">
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
                </Link>
                ))}

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalIncidents={totalIncidents}
                numberOfResultsPerPage={numberOfResultsPerPage} results={results}/>

            </div>
        </>
    )
}
