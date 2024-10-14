import { Channel, Quote } from "../models/Quote";
import data from './quotes.json';
import axios from 'axios';

import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult'

import {
    URL_GET_CHANNEL,
    isDevelopmentEnvironment
} from '../config';

let markChannelId:any = {};
let channels: Channel[] = (data as any).map((o:Quote) => {
    
    const { id, name } = o.channel;

    if(!!markChannelId[id]) return null;
    else {
        markChannelId[id] = true;
        return { id, name } as Channel;
    }
}) 
.filter((v:any) => (!!v))
.sort((a:Channel, b:Channel) => a.name.localeCompare(b.name));

const mockPagingAndSortingResult = (channelName: string): PagingAndSortingResult<Channel> => {

    const content = !!channelName? channels.filter(ch => (ch.name.toLowerCase().indexOf(channelName.toLowerCase())) >= 0 ):[];
    return {
        content,
        empty: false,
        first: true,
        last: true,
        number: 1,
        numberOfElements: content.length,
        size: content.length,
        totalElements: content.length,
        totalPages: 1
    };
};

export function findChannels(channelName?: string, pageNumber?: number, sortby?:string) : Promise<PagingAndSortingResult<Channel>> {

    return isDevelopmentEnvironment?
            Promise.resolve(mockPagingAndSortingResult(channelName)): axios.get(`${URL_GET_CHANNEL}?${[
                                        channelName? `channelName=${channelName}`:'',
                                        pageNumber? `pageNumber=${pageNumber}`:'',
                                        sortby? `sortby=${sortby}`:''
                                    ].join('&')}`).then((res)=> (res.data));
}