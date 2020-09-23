import React, {useState, useEffect} from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import LoadingPage from './LoadingPage'
require('dotenv').config()



const IncidentPage = ({ match }) => {
    const [incidentDetail, setincidentDetail] = useState([])
    const [incidentImage, setIncidentImage] = useState('')
    const [viewport, setViewport] = useState({});
    const [latatitudeAndLongitude, setLatatitudeAndLongitude] = useState([0, 0])
    const [loading, setLoading] = useState(false)

    const incidentURL = `https://bikewise.org/api/v1/incidents/${match.params.id}`
    
    useEffect(() =>{
        const fetchList = async () =>{
            setLoading(true)
            const response = await fetch(incidentURL)
            const data = await response.json()

            const locationData = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURI(data.incident.address)}&key=${process.env.REACT_APP_OPENCAGE_TOKEN}`)
            const convertedLocation = await locationData.json()
            const incidentLatitude = await convertedLocation.results[0].geometry.lat
            const incidentLongitude = await convertedLocation.results[0].geometry.lng
            setViewport({
                width: 400,
                height: 400,
                zoom: 15,
                latitude: incidentLatitude,
                longitude:incidentLongitude
            })
            setLatatitudeAndLongitude([incidentLatitude, incidentLongitude])
            setincidentDetail(data.incident)
            setIncidentImage(data.incident.media.image_url)
            setLoading(false)
        }
        fetchList()
    }, [incidentURL])

    if(loading){
        return <LoadingPage />
    }

    return (
        <>
            <div>
                <h1>{incidentDetail.title}</h1>
                <img src={incidentImage} alt=""/>
                <div>{incidentDetail.description}</div>
                <div>{incidentDetail.address}</div>
                <ReactMapGL {...viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/kennywallfacer/ckfdyzs0bat0319mw818mr98k">
                    
                    <Marker latitude={latatitudeAndLongitude[0]} longitude={latatitudeAndLongitude[1]} offsetTop={-50}  offsetLeft={-50/2}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="50"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="red"/></svg>
                    </Marker>
                
                </ReactMapGL>
            </div>
        </>
    )
}

export default IncidentPage
