import { Author, Quote } from "../models/Quote";
import data from './quotes.json';
import axios from 'axios';

import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult'

import {
    URL_GET_QUOTES,
    URL_POST_QUOTE,
    isDevelopmentEnvironment
} from '../config';

let quotes: Quote[] = data.map((o:any) => ({
    id: o.id,
    video: {
        id: o.video.id,
        youtubeId: o.video.youtubeId,
        thumbnail: o.video.thumbnail,
        publishedDate: o.video.publishedDate
    },
    author: {
        id: o.author.id,
        name: o.author.name
    },
    channel: {
        id: o.channel.id,
        name: o.channel.name
    },
    quote: o.quote,
    starttime: o.starttime,
    endtime: o.endtime,
} as Quote ));

const mockPagingAndSortingResult = (
    quoteText: string,
    authorIds: string,
    channelIds: string,
    pageNumber: number,
): PagingAndSortingResult<Quote> => {

    let content = !!quoteText? quotes.filter(q => (`${q.quote}`.toLowerCase().indexOf(quoteText.toLowerCase())) >= 0 ):quotes;

    content = !!authorIds? content.filter(q => (
                authorIds.split(',').filter((aid:string) => aid == `${q.author.id}`).length > 0
            )):content;
    content = !!channelIds? content.filter(q => (
                channelIds.split(',').filter((cid:string) => cid == `${q.video.channel.id}`).length > 0 
            )):content;

    const PAGE_SIZE = 12;

    const pageContent = content.filter((_, idx) => 
                            (pageNumber*PAGE_SIZE <= idx &&
                                        idx <= pageNumber*PAGE_SIZE+PAGE_SIZE));
console.log('last', pageNumber*PAGE_SIZE < content.length);
    return {
        content: pageContent,
        empty: false,
        first: pageNumber == 0,
        last: (pageNumber+1)*PAGE_SIZE >= content.length,
        number: 0,
        numberOfElements: content.length,
        size: content.length,
        totalElements: content.length,
        totalPages: Math.floor(content.length / PAGE_SIZE)
    };
};

export function findQuotes(
                    quoteText?: string,
                    authorIds?:string,
                    channelIds?: string,
                    pageNumber?: number,
                    sortby?:string) : Promise<PagingAndSortingResult<Quote>> {

    return isDevelopmentEnvironment?
            Promise.resolve(mockPagingAndSortingResult(
                    quoteText,
                    authorIds,
                    channelIds,
                    pageNumber,
                )): axios.get(`${URL_GET_QUOTES}?${[
                                        quoteText? `quoteText=${quoteText}`:'',
                                        authorIds? `authorIds=${authorIds}`:'',
                                        channelIds? `channelIds=${channelIds}`:'',
                                        pageNumber? `pageNumber=${pageNumber}`:'',
                                        sortby? `sortby=${sortby}`:''
                                    ].join('&')}`).then((res)=> (res.data));
}

export function postQuote(
    youtubeId: string,
    author: Author,
    starttime:number,
    endtime:number,
    quote: string) : Promise<any> {

    const data = {
        video: {
            youtubeId
        },
        author,
        quote,
        starttime,
        endtime
    };
    
    return axios
                .post(URL_POST_QUOTE, data)
                .then((res)=> (res.data));
    /*
    return isDevelopmentEnvironment?
        Promise.resolve(mockPagingAndSortingResult): 
                        axios
                            .post(URL_POST_QUOTE, data)
                            .then((res)=> (res.data));
    // */
}
