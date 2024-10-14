import React, { useEffect, useState } from 'react';
import "./style.scss";

import { Author, Channel } from '../../../../models/Quote';
import Filter from 'yoga1290-ui-pool/react/search-and-select-list';
import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult';
import { findAuthors } from '../../../../services/AuthorService';
import { findChannels } from '../../../../services/ChannelService';
// import Modal from './modal'

export type SearchBarProp = {
    onQueryChange: Function;
};

export default ({ onQueryChange }: SearchBarProp) => {


    // const [_quotes, setQuotes] = useState<PagingAndSortingResult<Quote>>(
    //     { content:[], last:true, first:true, size:0 }
    // );

    const [query, setQuery] = useState<string>('');
    const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
    const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);

    const onAuthorQuery = 
        (text: string, authorResultPageNumber:number) : Promise<PagingAndSortingResult<Author>> => {
            return findAuthors(text, authorResultPageNumber);
    };
    const onChannelQuery = 
        (text: string, authorResultPageNumber:number) : Promise<PagingAndSortingResult<Channel>> => {
            return findChannels(text, authorResultPageNumber);
    };


    const onQuoteQuery = () => {
        //TODO gather selected AuthorIDs & channels
        const authorIds = selectedAuthors.map(author =>(author.id)).join(',');
        const channelIds = selectedChannels.map(ch=>(ch.id)).join(',');

        console.log('onQuoteQuery', query, authorIds, channelIds);
        onQueryChange(query, authorIds, channelIds).then((_quotes:any) => {
            //setQuotes(_quotes);
        });
        // findQuotes(query, authorIds, channelIds).then(
        //     ( _quotes: PagingAndSortingResult<Quote>) => {
        //         onQuoteQueryResult(_quotes);
        //         setQuotes(_quotes);
        //     });
    };

    useEffect(() => {
        onQuoteQuery();
    }, [query, selectedAuthors, selectedChannels]);



    return (<>
    <div className='search-bar col-12 justify-content-between'>

        <form action="#" onSubmit={(e) => {
            e.preventDefault();
        }}>
            
            <input
                className="search-bar__query col-12"
                type="text"
                onChange={(e) => (setQuery(e.target.value))}
                placeholder="Quote" />
            <div className="search-bar__filter col-12 position-relative">
                <span className="search-bar__filter-icon position-absolute material-symbols-outlined align-middle">
                search
                </span>
            </div>

            <div className="col-12 position-relative my-2">
                <div className="search-bar__filter-panel card col-12 bg-dark animate__animated animate__fadeDown position-absolute">
                    <div className="card-body row">
                        

                        <div className='col-12 col-md-6'>
                            <Filter
                                title="Authors"
                                pathToItemTitle="name"
                                defaultItemIcon="person"
                                onItemsQuery={onAuthorQuery}
                                onSelectedItemsChange={(sAuthors: Author[])=> (setSelectedAuthors(sAuthors))}
                                />
                        </div>
                        <div className='col-12 col-md-6'>

                            <Filter
                                title="Channels"
                                pathToItemTitle="name"
                                defaultItemIcon="podcasts"
                                onItemsQuery={onChannelQuery}
                                onSelectedItemsChange={(sChannels: Channel[]) => (setSelectedChannels(sChannels))}
                                />
                        </div>

                    </div>
                </div>
            </div>

            

        </form>

    </div>
</>)};