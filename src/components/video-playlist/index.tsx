import React, {  useState } from 'react';

import './style.scss';

// import Filter from 'yoga1290-ui-pool/react/search-and-select-list';
// import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult';
import { Quote } from '../../models/Quote';
import Playlist from './playlist-vertical'
// import YoutubePlayer from '../player-yt';


export type PlaylistProp = {
    Quotes: Quote[],
    playlistId: string,
};

export default () => {

    const [_filteredPlaylists, _setFilteredPlaylists] = useState<Quote[]>([]);
    const [_queryPlaylist, _setQueryPlaylists] = useState<string>('');

    const mockQuote: Quote = {
        id: 1,
        author: {
            id: 54,
            name: "Slavoj Žižek"
        },
        video: {
            id: 158,
            channel: {
                name: "The Guardian",
                youtubeId: "UCHpw8xwDNhU9gdohEcJu4aA",
                thumbnail: null
            },
            youtubeId: "UpPuTaP68Dw",
            thumbnail: "https://i.ytimg.com/vi/UpPuTaP68Dw/hqdefault.jpg",
            "publishedDate": "2014-12-03T16:00:03Z"
        },
        quote: "Becoming a Nationalist, doing some ethnic cleansing, gives me this terrifying freedom",
        starttime: 144,
        endtime: 150
    };
    const mockQuote2: Quote = {
        id: 2,
        author: {
            id: 54,
            name: "Slavoj Žižek"
        },
        video: {
            id: 158,
            channel: {
                name: "The Guardian",
                youtubeId: "UCHpw8xwDNhU9gdohEcJu4aA",
                thumbnail: null
            },
            youtubeId: "UpPuTaP68Dw",
            thumbnail: "https://i.ytimg.com/vi/UpPuTaP68Dw/hqdefault.jpg",
            "publishedDate": "2014-12-03T16:00:03Z"
        },
        quote: "Becoming a Nationalist, doing some ethnic cleansing, gives me this terrifying freedom",
        starttime: 144,
        endtime: 150
    };

    const [quotes, _setQuotes] = useState<Quote[]>([mockQuote, mockQuote2, mockQuote, mockQuote2]);


    
    // const onAuthorQuery = 
    //     (text: string, authorResultPageNumber:number) : Promise<PagingAndSortingResult<Author>> => {
    //         return findAuthors(text, authorResultPageNumber, '', false);
    // };
    
    

    // let player :PlayerInstanceProp = null;

    // const onReady = (_player : PlayerInstanceProp) => {
    //     player= _player;

    //     console.log('event', event.target);

    //     if (!!hasStartTimeQuery) {
    //         // event.target.seekTo(hasStartTimeQuery[1]);
    //         player.seekTo(hasStartTimeQuery[1]);
    //         setStartTime(mapSecsToTimeFormat(parseInt(hasStartTimeQuery[1])));
    //     }
    //     player.playVideo();
    //     // player.loadVideoById(videoId);
    // }

    // var done = false;
    // let hasPlayerPreviousPausedState = true;
    // let videoTimeTrackerIntv: any = null; 
    // function onStateChange(hasPlayerPlayingState: boolean) {

    //     clearInterval(videoTimeTrackerIntv);
        
    //     let videoTime = player.getCurrentTime();
    //     let videoTimeFormat = mapSecsToTimeFormat( videoTime );
    //     // let hasPlayerPlayingState = event.data == (window as any)['YT'].PlayerState.PLAYING;

    //     if (!videoIntervalFixed) {

            
    //         if (hasPlayerPlayingState) {
                
    //             console.log('PLAYING', videoTimeFormat);

    //             if (hasPlayerPreviousPausedState) {
    //                 console.log('PLAYING', 'hasPlayerPreviousPausedState', videoTimeFormat);
    //                 hasPlayerPreviousPausedState = false;

    //                 videoTimeTrackerIntv = setInterval(()=> {
    //                     videoTime = player.getCurrentTime();
    //                     videoTimeFormat = mapSecsToTimeFormat( videoTime );
    //                     setEndTime(videoTimeFormat);
    //                 }, 900);
                    
    //                 setStartTime(videoTimeFormat);
    //             }
        
    //         } else if (hasPlayerPlayingState && videoIntervalFixed) {

    //             videoTimeTrackerIntv = setInterval(()=> {
    //                 let startTimeInSecs = mapTimeToSecs(startTime);
    //                 let endTimeInSecs = mapTimeToSecs(endTime);
    //                 let hasValidInterval = startTimeInSecs <= videoTime && videoTime < endTimeInSecs;
                    
    //                 if (!hasValidInterval) {
    //                     player.seekTo(startTimeInSecs);
    //                     player.playVideo();
    //                 }
    //             }, 900); 
    //         } else if (!hasPlayerPlayingState) {
    //             hasPlayerPreviousPausedState = true;
    //             setEndTime(videoTimeFormat);
    //         }
    //         // setTimeout(stopVideo, 6000);
    //         // done = true;

    //         console.log('PlayerState.PLAYING', (window as any)['YT'].PlayerState);

    
    //     }
    // }


    return (
        <div className="video-player justify-content-between py-5 col-12 row">

            <div className='card bg-dark my-3 col-12 col-md-12 '>
                <div className='card-body'>
                
                    <div className="col-12 embed-responsive embed-responsive-16by9">
                        
                        {/* <YoutubePlayer
                            videoId={videoId}
                            onReady={onReady}
                            onStateChange={onStateChange}
                        /> */}
                        

                        {/* {!hasPlayerReady && <>
                            <CardWithIcon
                                icon='video'/>
                        </>} */}
                    </div>
                </div>
            </div> 


            {/* <div className='col-12'>
                <Filter
                    title="Author"
                    allowNew={true}
                    pathToItemTitle="name"
                    defaultItemIcon="person"
                    onItemsQuery={onAuthorQuery}
                    onSelectedItemsChange={(sAuthors: Author[])=> (setSelectedAuthors(sAuthors))}
                    />
            </div> */}


        <div className='scroll-vertical__outer-container p-0 m-0'>
            <div className='col-12 scroll-vertical__inner-container d-flex m-0 p-0'>
                <div className='col-12 col-sm-6 col-lg-4'>
                    <Playlist
                        name='Playlist#1'
                        quotes={quotes}
                        playlistId='123'/>
                </div>
                <div className='col-12 col-sm-6 col-lg-4'>
                    <Playlist
                        name='Playlist#1'
                        quotes={quotes}
                        playlistId='123'/>
                </div>
                <div className='col-12 col-sm-6 col-lg-4'>
                    <Playlist
                        name='Playlist#1'
                        quotes={quotes}
                        playlistId='123'/>
                </div>
                <div className='col-12 col-sm-6 col-lg-4'>
                    <Playlist
                        name='Playlist#1'
                        quotes={quotes}
                        playlistId='123'/>
                </div>
                <div className='col-12 col-sm-6 col-lg-4'>
                    <Playlist
                        name='Playlist#1'
                        quotes={quotes}
                        playlistId='123'/>
                </div>
                <div className='col-12 col-sm-6 col-lg-4'>
                    <Playlist
                        name='Playlist#1'
                        quotes={quotes}
                        playlistId='123'/>
                </div>
            </div>
        </div>

            

        </div>);
}