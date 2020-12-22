import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ArtistDetails(props) {
    const [loading, setLoading] = useState(true);
    const [artistInfo, setArtistInfo] = useState();

    useEffect(() => {
        axios.get(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${props.match.params.artistname}`)
            .then((res) => {
                res.data.artists == null
                    ? setArtistInfo(null)
                    : setArtistInfo(res.data.artists[0])
                setLoading(false);
            });
    }, [props.match.params.artistname]);

    if (loading) {
        return (
            <div className="spinner-grow m-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    } else {
        return (
            <div className="container mt-5">
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-9'>
                        <h2>{artistInfo.strArtist}</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'><img src={artistInfo.strArtistThumb + '/preview'} />
                    <Link className='badge badge-success mx-2 text-decoration-none' to={'/discography/' + props.match.params.artistname}>Discography</Link> </div>
                    <div className='col-9'>
                        <span className="badge badge-success mx-2">Formed year: {artistInfo.intFormedYear && artistInfo.intFormedYear}</span>
                        <span className="badge badge-success mx-2">Genre: {artistInfo.strGenre && artistInfo.strGenre}</span>
                        {artistInfo.strWebsite && <span className="badge badge-success mx-2">Website:  <Link to={{pathname: '//' + artistInfo.strWebsite}} target="_blank" className='text-decoration-none text-reset'>{artistInfo.strWebsite}</Link></span>}
                        <span className="badge badge-success mx-2">Country: {artistInfo.strCountry && artistInfo.strCountry}</span>
                        <p className='text-justify'>{artistInfo && artistInfo.strBiographyEN}</p>
                        <br></br>
                    </div>                    
                </div>
            </div>
        )
    }
}

export default ArtistDetails;
