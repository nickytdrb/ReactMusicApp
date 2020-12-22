import React from 'react';

function Album({ vaggelhs }) {
    return (
        <div>
            <div className="container mt-5">
                {vaggelhs.strAlbum}
            </div>
            <div className="container mt-5">
                <img src={vaggelhs.strAlbumThumb + '/preview'} />
            </div>
        </div>
    )
}

export default Album;
