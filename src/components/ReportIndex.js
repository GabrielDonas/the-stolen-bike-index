import React, {useState, useEffect} from 'react'
import timeStampConverter from './timeStampConverter'
import Pagination from './Pagination'

const imgPlaceholder ='https://via.placeholder.com/300'

export default function ReportIndex() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const bikewiseURL = `https://bikewise.org:443/api/v2/incidents?page=${currentPage}&per_page=10&incident_type=theft`

    useEffect (() => {
        const fetchList = async () =>{
            setLoading(true)
            const data = await fetch(bikewiseURL)
            const list = await data.json()
            const incidents = list.incidents
            console.log(incidents)
            setReports(incidents)
            setLoading(false)
        }
        fetchList()   
    }, [bikewiseURL])

    
    
    if(loading){
        return <h2>Loading...</h2>
    }

    return (
        <div>
            {reports.map(item =>(
            <div key={item.id} id="query-result">
                <img src={item.media.image_url_thumb ? item.media.image_url_thumb : imgPlaceholder} alt=""/>
                <div id="bike-info">
                <h3>{item.title}</h3>
                    <p>{item.description}</p>
                        <div>date: {timeStampConverter(item.occurred_at)}</div>
                        <div>location: {item.address}</div>
                </div>
            </div>
            ))}
            <Pagination setCurrentPage={setCurrentPage}/>
        </div>
    )
}
