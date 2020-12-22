import React, { useEffect, useState } from 'react';
import Album from './Album';
import axios from 'axios';

function Discography(props) {
    const [loading, setLoading] = useState(true);
    const [albumsInfo, setAlbumsInfo] = useState([]);

    useEffect(() => {
        axios.get(`https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${props.match.params.artistname}`)
            .then((res) => {
                console.log(res.data.album);
                setAlbumsInfo(res.data.album);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="spinner-grow m-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    } else {
        return (
            <div>
                {albumsInfo && albumsInfo.map((album) => (
                    <Album vaggelhs = {album} key = {album.idAlbum} />
                ))}
            </div>
        )
    }
}

    export default Discography;
