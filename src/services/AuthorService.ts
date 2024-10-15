import { Author, Quote } from "../models/Quote";
import data from './quotes.json';
import axios from 'axios';

import PagingAndSortingResult from 'yoga1290-ui-pool/react/search-and-select-list/model/PagingAndSortingResult';

import {
    URL_GET_AUTHORS,
    isDevelopmentEnvironment
} from '../config';
let markAuthorId:any = {};
let authors: Author[] = (data as any).map((o:Quote) => {
    
    const { id, name } = o.author;

    if(!!markAuthorId[id]) return null;
    else {
        markAuthorId[id] = true;
        return { id, name } as Author;
    }
})
.filter((v:any) => (!!v))
.sort((a:Author, b:Author) => a.name.localeCompare(b.name));

const mockPagingAndSortingResult = (authorName: string): PagingAndSortingResult<Author> => {

    const content = !!authorName? authors.filter(ch => (ch.name.toLowerCase().indexOf(authorName.toLowerCase())) >= 0 ):[];
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

export function findAuthors(authorName?: string, pageNumber?: number, sortby?:string, mock:boolean = isDevelopmentEnvironment) : Promise<PagingAndSortingResult<Author>> {

    return !!mock?
            Promise.resolve(mockPagingAndSortingResult(authorName)): axios.get(`${URL_GET_AUTHORS}?${[
                                        authorName? `authorName=${authorName}`:'',
                                        pageNumber? `pageNumber=${pageNumber}`:'',
                                        sortby? `sortby=${sortby}`:''
                                    ].join('&')}`).then((res)=> (res.data));
}