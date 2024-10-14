import React, { useEffect, useState } from 'react';

import CardFeatured from 'yoga1290-ui-pool/react/card-featured-with-buttons'

import { Quote } from '../../../models/Quote';

import SearchBar from './search-bar';

import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult';

import './style.scss';
import CardWithIcon from 'yoga1290-ui-pool/react/card-with-icon';
import { findQuotes } from '../../../services/QuoteService';

const openLink = (videoId:string, start: number) => ( ()=>(window.open(`https://youtu.be/${videoId}?t=${start}s`, '_blank')) );



export default () => {

    const [quotes, setQuotes] = useState<PagingAndSortingResult<Quote>>({
                                    content: [],
                                    first: true,
                                    last: true,
                                    size: 0
                                });

    const [pageNumber, setPageNumber] = useState(0);
    const [query, setQuery] = useState('');
    const [authorIds, setAuthorIds] = useState('');
    const [channelIds, setChannelIds] = useState('');
    
    const onQueryChange = (query:string, authorIds:string, channelIds:string) => {

        setQuery(query);
        setAuthorIds(authorIds);
        setChannelIds(channelIds);
        setPageNumber(0);
        return findQuotes(query, authorIds, channelIds, pageNumber).then(
            ( _quotes: PagingAndSortingResult<Quote>) => {
                setQuotes(_quotes);
            });
            
    };

    useEffect(() => {
        findQuotes(query, authorIds, channelIds, pageNumber).then(
            ( _quotes: PagingAndSortingResult<Quote>) => {
                setQuotes(_quotes);
            });
    }, [pageNumber]);


    return <div className="browse-page animate__animated animate__fadeInUp row px-0 mx-0 align-self-stretch d-flex">
        
        <SearchBar
            onQueryChange={onQueryChange} />

        {!quotes.first && <>
            <div className='col-12 col-sm-4 col-md-3 col-lg-2 align-self-stretch d-flex'>
                <CardWithIcon
                    title="Previous"
                    icon="arrow_back_ios"
                    click={()=> (setPageNumber(pageNumber-1))}
                    />
            </div>
        </>}

        {quotes.content.map(({video, author, quote, starttime}: Quote, idx:number) => (
            
            <div 
                key={`${idx}-${new Date().getTime()}`}
                className='quote-card col-12 col-sm-6 col-md-4 col-lg-3 align-self-stretch d-flex'>
                <CardFeatured
                    title={author.name}
                    subtitle={new Date(video.publishedDate).toLocaleDateString()}
                    text={quote}
                    backgroundImageUrl={video.thumbnail}                    
                    buttons={[{
                        text: 'play',
                        icon: 'play_arrow',
                        click: openLink(video.youtubeId, starttime)
                    }, {
                        text: `${`${author.name}`
                                .split(' ')
                                .filter((_, idx) =>
                                            (idx == 0))}`,
                        icon: 'notification_add',
                        click: openLink(video.youtubeId, starttime)
                    },{
                        text: `Copy`,
                        icon: 'content_copy',
                        click: openLink(video.youtubeId, starttime)
                    }, {
                        text: `Save`,
                        icon: 'bookmark',
                        click: openLink(video.youtubeId, starttime)
                    }]} />
            </div>

        ))}

        {!quotes.last && <>
            <div className='col-12 col-sm-4 col-md-3 col-lg-2 align-self-stretch d-flex'>
                <CardWithIcon
                    title="Next"
                    icon="arrow_forward_ios"
                    click={()=> (setPageNumber(pageNumber+1))}
                    />
            </div>
        </>}
    </div>
};