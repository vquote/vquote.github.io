import React, { useEffect, useState } from 'react';

import './style.scss';

import { findAuthors } from '../../services/AuthorService';
import Filter from 'yoga1290-ui-pool/react/search-and-select-list';
import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult';
import { Author } from '../../models/Quote';
import { postQuote } from '../../services/QuoteService';
import {
    formatTime,
    mapSecsToTimeFormat,
    mapTimeToSecs,
} from '../../util/timeUtil';

export default () => {

    const [videoId, setVideoId] = useState('');
    const [quote, setQuote] = useState('');
    // const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [videoIntervalFixed, _setVideoIntervalFixed] = useState(false);
    const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);

    
    const hasStartTimeQuery = window.location.href.match(/\?.*start\=([^&]*)/);
    const hasEndTimeQuery = window.location.href.match(/\?.*end\=([^&]*)/);
    const hasQuoteInQueryString = window.location.href.match(/\?.*quote\=([^&]*)/);
    // const _hasEndTimeQuery = window.location.href.match(/\?.*start\=([^&]*)/);
    
    const onAuthorQuery = 
        (text: string, authorResultPageNumber:number) : Promise<PagingAndSortingResult<Author>> => {
            return findAuthors(text, authorResultPageNumber);
    };
    
    

    let player :any = null;

    const onReady = (event : any) => {
        console.log('event', event.target);

        if (!!hasStartTimeQuery) {
            // event.target.seekTo(hasStartTimeQuery[1]);
            player.seekTo(hasStartTimeQuery[1]);
            setStartTime(mapSecsToTimeFormat(parseInt(hasStartTimeQuery[1])));
        }
        player.playVideo();
        // player.loadVideoById(videoId);
    }

    // var done = false;
    let hasPlayerPreviousPausedState = true;
    let videoTimeTrackerIntv: any = null; 
    function onStateChange(event:any) {

        clearInterval(videoTimeTrackerIntv);
        
        let videoTime = player.getCurrentTime();
        let videoTimeFormat = mapSecsToTimeFormat( videoTime );
        let hasPlayerPlayingState = event.data == (window as any)['YT'].PlayerState.PLAYING;

        if (!videoIntervalFixed) {

            
            if (hasPlayerPlayingState) {
                
                console.log('PLAYING', videoTimeFormat);

                if (hasPlayerPreviousPausedState) {
                    console.log('PLAYING', 'hasPlayerPreviousPausedState', videoTimeFormat);
                    hasPlayerPreviousPausedState = false;

                    videoTimeTrackerIntv = setInterval(()=> {
                        videoTime = player.getCurrentTime();
                        videoTimeFormat = mapSecsToTimeFormat( videoTime );
                        setEndTime(videoTimeFormat);
                    }, 900);
                    
                    setStartTime(videoTimeFormat);
                }
        
            } else if (hasPlayerPlayingState && videoIntervalFixed) {

                videoTimeTrackerIntv = setInterval(()=> {
                    let startTimeInSecs = mapTimeToSecs(startTime);
                    let endTimeInSecs = mapTimeToSecs(endTime);
                    let hasValidInterval = startTimeInSecs <= videoTime && videoTime < endTimeInSecs;
                    
                    if (!hasValidInterval) {
                        player.seekTo(startTimeInSecs);
                        player.playVideo();
                    }
                }, 900); 
            } else if (!hasPlayerPlayingState) {
                hasPlayerPreviousPausedState = true;
                setEndTime(videoTimeFormat);
            }
            // setTimeout(stopVideo, 6000);
            // done = true;

            console.log('PlayerState.PLAYING', (window as any)['YT'].PlayerState);

    
        }
    }

    // function stopVideo() {
    //   player.stopVideo();
    // }

    (window as any)['onYouTubeIframeAPIReady'] = () => {
        player = new (window as any)['YT'].Player('player', {
          height: '390',
          width: '640',
          videoId: videoId,
          playerVars: {
            // 'playsinline': 1,
            'autoplay': 1,
          },
          events: {
            onReady,
            onStateChange
          }
        });
        console.log('player', player);
        (window as any)['player'] = player;
    }

    
    useEffect(() => {
        console.log('useEffect', 'youtube');
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api?origin=http://localhost:8081";
        tag.async = true;
        document.body.appendChild(tag);

        const hasVideoQuery = window.location.href.match(/\?.*v\=([^&]*)/);
        if (!!hasVideoQuery) {
            setVideoId(hasVideoQuery[1]);
        }
        if (!!hasStartTimeQuery) {
            setStartTime(mapSecsToTimeFormat(parseInt(hasStartTimeQuery[1])));
        }
        if (!!hasEndTimeQuery) {
            setEndTime(mapSecsToTimeFormat(parseInt(hasEndTimeQuery[1])));
        }
        if (!!hasQuoteInQueryString) {
            setQuote(decodeURIComponent(hasQuoteInQueryString[1]));
        }
        
    }, [videoId]);    

    return (
        <div className="video-player justify-content-between py-5 col-12 row">

            <div className='card bg-dark my-3 col-12 col-md-12 col-lg-6'>
                <div className='card-body'>
                
                    <div className="col-12 embed-responsive embed-responsive-16by9">
                        
                        <iframe id="player"
                                height="100%"
                                
                                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                                frameBorder={"0"}
                        ></iframe>

                        {/* {!hasPlayerReady && <>
                            <CardWithIcon
                                icon='video'/>
                        </>} */}
                    </div>
                </div>
            </div>

            <div className='row panel col-12 col-lg-6'>
                <div className='video-player__time-interval card bg-dark col-12'>
                    <div className='card-body row justify-content-between my-1'>
                        <div className='col-12 col-md-6 justify-content-center'>
                            <input
                                type='text'
                                value={startTime}
                                placeholder='00:00:00'
                                onChange={(e)=> {
                                    e.preventDefault();
                                    const startTime = formatTime( (e.target as any).value );
                                    const startTimeFormat = mapTimeToSecs( startTime );
                                    (window as any).player.seekTo(startTimeFormat);
                                    
                                    setStartTime(startTime);
                                }}/>
                        </div>
                        <div className='col-12 col-md-6 justify-content-center'>
                            <input 
                                type='text' 
                                value={endTime}
                                placeholder='00:00:00'
                                onChange={(e)=> {
                                    e.preventDefault();
                                    (e.target as any).value = formatTime((e.target as any).value);
                                    setEndTime(formatTime((e.target as any).value));
                                }}/>
                        </div>

                    </div>
                </div>

                <div className='video-player__quote card bg-dark my-2 p-0 col-12'>
                    <div className='card-body row justify-content-center p-1 m-0'>
                        <textarea
                            placeholder='Quote'
                            value={quote}
                            onChange={(e) => (setQuote(e.target.value))}
                            rows={3}></textarea>
                    </div>
                </div>
            </div>


            <div className='col-12'>
                <Filter
                    title="Author"
                    allowNew={true}
                    pathToItemTitle="name"
                    defaultItemIcon="person"
                    onItemsQuery={onAuthorQuery}
                    onSelectedItemsChange={(sAuthors: Author[])=> (setSelectedAuthors(sAuthors))}
                    />
            </div>


            <div className='card bg-dark my-2 p-0 col-12'>
                <div className='card-body row justify-content-center p-3 m-0'>
                    <button
                        onClick={() => {
                            postQuote(videoId, selectedAuthors[0], mapTimeToSecs(startTime), mapTimeToSecs(endTime), quote).then(()=>(alert('ok')))
                        }}
                        className='btn btn-primary btn-big col-12 col-sm-6 col-md-5 col-lg-4'
                    >Submit</button>
                </div>
            </div>

        </div>);
}