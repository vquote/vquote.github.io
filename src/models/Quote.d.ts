export type Video = {
    id?: number;
    thumbnail: string;
    channelId?: string;
    channel?: Channel;
    youtubeId: string;
    publishedDate: string;
}

export type Author = {
    id?: number;
    name: string;
}

export type Channel = {
    id?: number;
    name: string;
    youtubeId: string;
    thumbnail: string;
};

export type Quote = {
    id?: number|string;
    creationTime?: number;
    video: Video;
    author: Author;
    quote: string;
    starttime: number;
    endtime: number;
    publishedDate?: string;
}

export type User = {

    id?: number;
    name: string;

}

export type Playlist = {

    id?: number;
    user?: User;
    quotes: Quote[];

}
