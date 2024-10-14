import React, { useEffect, useState } from 'react';

// import CardFeatured from 'yoga1290-ui-pool/react/card-featured-with-buttons'
import BigButton from 'yoga1290-ui-pool/react/card-with-icon'
import Carousal from 'yoga1290-ui-pool/react/card-featured-with-buttons-carousal'


import { findQuotes } from '../../../services/QuoteService';
import AuthService from '../../../services/AuthService';

import { Quote } from '../../../models/Quote';

import './style.scss';

// const openLink = (videoId:string, start: number) => ( ()=>(window.open(`https://youtu.be/${videoId}?t=${start}s`, '_blank')) );

let quotesResponse = await findQuotes();
console.log('quotesResponse', quotesResponse);
let _quotes = quotesResponse.
                    content.
                    filter((o) => (!!o.video.thumbnail)).
                    filter((_, i) => (i < 50));
console.log(_quotes);

let cardsFeaturedWithButtonsCarousal = _quotes.map( ({author, quote, video} : Quote)=> ({
    title: author.name,
    subtitle: video.publishedDate+'',
    text: quote,
    backgroundImageUrl: video.thumbnail,
    click: () => ( console.log('OK') ),
    buttons: []
}));

export default () => {
    let [__quotes] = useState(_quotes);
    // let [query, setQuery] = useState({text: '', startdate: 0, enddate: 1<<30, channels: [], authors: [], page: 1});

/*
    useEffect(() => {

        let x =0, diff= 0.1;
        const intrv = setInterval(() => {
            const el: any = document.querySelector('.login-page__preview');
            el.style.top=`-${x}vh`;
            el.style.left=`-${x}vw`;
            x+=diff;
            x%=100;
        }, 150);

        return ()=> (clearInterval(intrv));
    });
// */

    const loadGoogleReCaptch = () => {
        const el = window.document.createElement('script');
        el.src = `https://www.google.com/recaptcha/api.js?render=${AuthService.RECAPTCHA_API_KEY}`;
        window.document.body.appendChild(el);
    };
    useEffect(loadGoogleReCaptch);

    

    const login = (e: any) => {
        e.preventDefault();

        (window as any)['grecaptcha'].ready(function() {
            (window as any)['grecaptcha'].execute(AuthService.RECAPTCHA_API_KEY, {action: 'submit'})
            .then(function(token:any) {
                // Add your logic to submit to your backend server here.
                console.log('token', token);
                // window.location.href = `mailto:abc+${token}@gmail.com`;
            });
        });

    };

    return <div className="login-page">
        
        {/* <div className='login-page__preview position-fixed row px-0 mx-0 align-self-stretch d-flex'>
            {quotes.map(({video, author, quote, start, airtime}: Quote) => (
                
                <div className='col-1 align-self-stretch d-flex animate__animated animate__fadeInRight'>
                    <CardFeatured
                        title={author}
                        subtitle={new Date(airtime).toLocaleDateString()}
                        text={quote}
                        backgroundImageUrl={video.previewImage}                    
                        buttons={[{
                            text: 'play',
                            icon: 'play_arrow',
                            click: openLink(video.id, start)
                        }, {
                            text: `follow ${author}`,
                            icon: 'notification_add',
                            click: openLink(video.id, start)
                        }, {
                            text: `follow Channel`,
                            icon: 'notification_add',
                            click: openLink(video.id, start)
                        }, {
                            text: `Copy Quote`,
                            icon: 'content_copy',
                            click: openLink(video.id, start)
                        }, {
                            text: `Bookmark`,
                            icon: 'bookmark',
                            click: openLink(video.id, start)
                        }]} />
                </div>

            ))}
        </div> */}

        <div className='login-page__background'>
        </div>

        <div className='login-carousal row align-self-stretch d-flex'>
            <div className='col-12 col-sm-8 col-md-9 col-lg-7 align-self-stretch d-flex'>
                <Carousal
                    delay={7}
                    cards={cardsFeaturedWithButtonsCarousal} />
            </div>
            <div className='col-12 col-sm-4 col-md-3 col-lg-5 align-self-stretch d-flex'>
                <Carousal
                    delay={7}
                    cards={cardsFeaturedWithButtonsCarousal} />
            </div>

            <div className='col-12 col-sm-4 col-md-3 col-lg-5 align-self-stretch d-flex'>
                <Carousal
                    delay={4}
                    cards={cardsFeaturedWithButtonsCarousal} />
            </div>

            <div className='col-12 col-sm-8 col-md-9 col-lg-7 align-self-stretch d-flex'>
                <Carousal
                    delay={5}
                    cards={cardsFeaturedWithButtonsCarousal} />
            </div>
        </div>

        <div className='login-container row col-12'>

            <div className='col-12 col-sm-6 col-lg-3 align-self-stretch d-flex'>
                <BigButton
                    title={'Guest tour'}
                    icon='open_in_new'
                    text={<>Access now, login later</>}
                    click={login}
                />
            </div>
            
            <div className='col-12 col-sm-6 col-lg-3 align-self-stretch d-flex'>
                <BigButton
                    title={'Login'}
                    icon='folder_shared'
                    text={<>Timed session with access to history, fav lists and notification features</>}
                    click={login}
                />
            </div>
        </div>
{/* 
        <div className='login-page__modal'>
                

            <div className='login-page__modal-content'>
                
                <div className='col-12 col-sm-6 col-lg-3'>
                    <CardFeatured
                        title={'Login'}
                        text={<>
                            <div className='col-12 justify-content-between'>
                                <input type='text' className='col-8 adjust-center' placeholder='Email'/>
                            </div>
                        </>}
                        buttons={[{
                            text: 'Send',
                            icon: 'send',
                            click: (e) => (login(e))
                        }]} />
                </div>
                
                <div className='col-12 col-sm-6 col-lg-3'>
                    <CardFeatured
                        title={'Login'}
                        text={<></>}                 
                        buttons={[{
                            text: 'play',
                            icon: 'open_in_new',
                            // click: openLink(video.id, start)
                        }]} />
                </div>
            

            </div>

        </div> */}

    </div>
};