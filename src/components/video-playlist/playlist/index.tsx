import React, {  useState } from 'react';

import './style.scss';

// import Filter from 'yoga1290-ui-pool/react/search-and-select-list';
// import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult';
import { Quote } from '../../../models/Quote';
import CardFeatured from 'yoga1290-ui-pool/react/card-featured-with-buttons'


// import YoutubePlayer from '../player-yt';


export type PlaylistProp = {
    name: string,
    quotes: Quote[],
    playlistId?: string,
};

export default ( playlistProp : PlaylistProp) => {

    const [_filteredPlaylists, _setFilteredPlaylists] = useState<Quote[]>([]);
    const [_queryPlaylist, _setQueryPlaylists] = useState<string>('');

    // const openLink = (videoId:string, start: number) => ( ()=>(window.open(`https://youtu.be/${videoId}?t=${start}s`, '_blank')) );

    

    const [quotes, setQuotes] = useState<Quote[]>(playlistProp.quotes);

    const moveLeft = (idx: number) => {
        setQuotes([
                ...quotes.filter((_, i) => ( i <= idx - 2 )),
                quotes[idx],
                ...quotes.filter((_, i) => ( i >= idx + 1 || i == idx-1 )),
            ]);
    };
    const moveRight = (idx: number) => {
        setQuotes([
                ...quotes.filter((_, i) => ( i <= idx - 1 || i == idx + 1 )),
                quotes[idx],
                ...quotes.filter((_, i) => ( i >= idx + 2 )),
            ]);
    };
    
    

    return (<>
    <div className='playlist-view'>
        <div className='row col-12  p-0 m-0'>
                    <input type='text' value={ `${playlistProp.name}` } placeholder="Playlist name" className='col-12 playlist-title p-0'/>
                    {/* <div className='position-relative float-right col-4'>
                        <span className='material-symbols-outlined align-middle col-6 col-md-2 position-abolute'>
                                                save</span>
                        <span className='material-symbols-outlined align-middle col-6 col-md-2 position-abolute'>
                                                delete</span>
                    </div> */}
                </div>
        <div className='playlist-container card bg-dark my-0 p-0 col-12'>
                
                <div className='playlist card-body row justify-content-center p-2 m-0'>
                    
                    {quotes.map(( {id, quote, author, video } :Quote, idx ) => <>
                    
                        <div className='playlist_quote col-12 col-md-6 d-inline'>

                            <div
                                onClick={() => (moveLeft(idx))}
                                className='position-absolute h-100'>
                                <div className='playlist_quote-buttons playlist_quote-button-left h-100 position-relative'>
                                    <span
                                        className='material-symbols-outlined align-middle'>
                                            arrow_back_ios</span>
                                </div>
                            </div>
                            <CardFeatured
                                title={author.name + ' - ' + id}
                                subtitle={new Date(video.publishedDate).toLocaleDateString()}
                                text={quote}
                                backgroundImageUrl={video.thumbnail}                    
                                // buttons={[{
                                //     text: 'play',
                                //     icon: 'play_arrow',
                                //     click: openLink(video.youtubeId, starttime)
                                // }, {
                                //     text: `${`${author.name}`
                                //             .split(' ')
                                //             .filter((_, idx) =>
                                //                         (idx == 0))}`,
                                //     icon: 'notification_add',
                                //     click: openLink(video.youtubeId, starttime)
                                // },{
                                //     text: `Copy`,
                                //     icon: 'content_copy',
                                //     click: openLink(video.youtubeId, starttime)
                                // }, {
                                //     text: `Save`,
                                //     icon: 'bookmark',
                                //     click: openLink(video.youtubeId, starttime)
                                // }]}
                                    />
                            <div 
                                onClick={() => (moveRight(idx))}
                                className='playlist_quote-buttons playlist_quote-button-right position-relative h-100'>
                                <div className=' position-absolute'>
                                    <span
                                        className='material-symbols-outlined align-middle'>
                                            arrow_forward_ios</span>
                                </div>
                            </div>

                        </div>


                    </>)}
                
                    
                </div>
        </div>
    </div>
    </>
    );
}