import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Artist(props) {
    const [loading, setLoading] = useState(true);
    const [artistInfo, setArtistInfo] = useState();

    useEffect(() => {
        axios.get(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${props.match.params.artistname}`)
            .then((res) => {
                res.data.artists == null 
                ? setArtistInfo(null)
                : setArtistInfo(res.data.artists[0]);
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
            <div className="container mt-4">
                {artistInfo &&
                <>
                <h2>{artistInfo.strArtist}</h2>
                <div>
                    <Link className='text-decoration-none' to={'/artistdetails/' + props.match.params.artistname}>{artistInfo && artistInfo.strArtist} Details</Link>
                    <br />
                    
                </div>
                <img src={artistInfo.strArtistThumb + '/preview'} />
                </>
                }
                
                { !artistInfo &&
                <div>Artist not found.</div>
                }
            </div>
        )
    }

}
export default Artist;
