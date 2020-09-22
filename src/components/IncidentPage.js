import React, {useState, useEffect} from 'react'
import ReactMapGL from 'react-map-gl';


const IncidentPage = ({ match }) => {
    const [incidentDetail, setincidentDetail] = useState([])
    const [incidentImage, setIncidentImage] = useState('')
    const [viewport, setViewport] = useState({});
    
    const incidentURL = `https://bikewise.org/api/v1/incidents/${match.params.id}`
    
    useEffect(() =>{
        const fetchList = async () =>{
            //setLoading(true)
            const data = await fetch(incidentURL)
            const item = await data.json()

            const locationData = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURI(item.incident.address)}&key=c90aaec9e1534eeaa6bd715ed0378c8b`)
            const convertedLocation = await locationData.json()
            const incidentLatitude = await convertedLocation.results[0].geometry.lat
            const incidentLongitude = await convertedLocation.results[0].geometry.lng
            //console.log(convertedLocation)
            setViewport({
                width: 400,
                height: 400,
                zoom: 13,
                latitude: incidentLatitude,
                longitude:incidentLongitude
            })
            setincidentDetail(item.incident)
            setIncidentImage(item.incident.media.image_url)
            //setLoading(false)
        }
        fetchList()
    }, [incidentURL])



    return (
        <div>
            <h1>{incidentDetail.title}</h1>
            <img src={incidentImage} alt=""/>
            <div>{incidentDetail.description}</div>
            <div>{incidentDetail.address}</div>
            <ReactMapGL {...viewport} 
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={nextViewport => setViewport(nextViewport)}></ReactMapGL>
        </div>
    )
}

export default IncidentPage
