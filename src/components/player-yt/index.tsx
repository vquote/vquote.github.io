import React, { useEffect } from 'react';


export type PlayerInstanceProp = {
    seekTo?: Function,
    playVideo?: Function,
    getCurrentTime?: Function,
}

export type PlayerProp = {
    videoId: string,
    onReady: Function, // onRead({ seekTo, playVideo, getCurrentTime } : PlayerInstanceProp)
    onStateChange: Function, // onStateChange( isPlaying: boolean, )
};

export default ( { videoId, onReady, onStateChange } : PlayerProp) => {    

    let player :any = null;


    function _onReady() {
        onReady(player as PlayerInstanceProp);
    }



    // var done = false;
    function _onStateChange(event:any) {
        const hasPlayerPlayingState = event.data == (window as any)['YT'].PlayerState.PLAYING;
        onStateChange(hasPlayerPlayingState);
    }

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
            onReady:_onReady,
            onStateChange: _onStateChange
          }
        });
        (window as any)['player'] = player;
    }

    
    useEffect(() => {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api?origin=http://localhost:8081";
        tag.async = true;
        document.body.appendChild(tag);
    }, [videoId]);    

    return (
        <div className="youtube-video-player justify-content-between col-12">

                <iframe id="player"
                                height="100%"
                                
                                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                                frameBorder={"0"}
                        ></iframe>
        </div>);
}