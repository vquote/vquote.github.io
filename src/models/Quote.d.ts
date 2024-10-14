export type Video = {
    id?: string;
    thumbnail: string;
    channelId: string;
    youtubeId: string;
    publishedDate: string;
}

export type Author = {
    id?: string;
    name: string;
}

export type Channel = {
    id: string;
    name: string;
    youtubeId: string;
    thumbnail: string;
};

export type Quote = {
    id?: string;
    creationTime: number;
    video: Video;
    author: Author;
    channel: Channel;
    quote: string;
    starttime: number;
    endtime: number;
    publishedDate: string;
}

