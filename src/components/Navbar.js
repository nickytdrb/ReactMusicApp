import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [searchString, setSearchString] = useState("");
    const [redirectCheck, setRedirectCheck] = useState(false);
    const [searchArtistAutoComplete, setSearchArtistAutoComplete] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setRedirectCheck(true);
        setShowDropdown(false);
    }

    const toggleShowDropdown = (e) => {
        setShowDropdown(!showDropdown);
    }

    useEffect(() => {
        if (redirectCheck) {
            setRedirectCheck(false);
        }
    }, [redirectCheck]);

    useEffect(() => {
        if (searchString.length > 3) {
            axios.get(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${searchString}%`)
                .then((res) => {
                    res.data.artists == null
                        ? setSearchArtistAutoComplete([])
                        : setSearchArtistAutoComplete(res.data.artists);
                    console.log(searchArtistAutoComplete);
                })
        };
    }, [searchString]);

    const handleInputChange = (e) => {
        setSearchString(e.target.value);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <Link className="navbar-brand mr-auto text-white" to="/">Music App</Link>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search an artist" aria-label="Search" onChange={handleInputChange} value={searchString} onClick={toggleShowDropdown}></input>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{display: (showDropdown && searchArtistAutoComplete.length > 0) ? 'block' : 'none', left: 'initial'}}>
                    {searchArtistAutoComplete.length > 0 && searchArtistAutoComplete.map((efterphOnomaKallitexnhMetaThnAnazhthshMallon) => (
                    <Link className="dropdown-item" to={"/" + efterphOnomaKallitexnhMetaThnAnazhthshMallon.strArtist} onClick={() =>{setShowDropdown(false)}}>
                        {efterphOnomaKallitexnhMetaThnAnazhthshMallon.strArtist}
                    </Link>))
                    }
                </div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search
                </button> 
            </form>
            {redirectCheck
                ? <Redirect push to={'/' + searchString}></Redirect>
                : null}
        </nav>
    )
}

export default withRouter(Navbar);
