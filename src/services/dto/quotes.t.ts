
export type Quote = {
    content: {
        "id": Number,
        "author": {
            "id": Number,
            "name": String,
            "thumbnail": String
        },
        "video": {
            "id": Number,
            "channel": String,
            "youtubeId": String,
            "thumbnail": String,
            "publishedDate": String
        },
        "channel": String,
        "quote": String,
        "starttime": Number,
        "endtime": Number
    }[],
    "pageable": {
        "pageNumber": Number,
        "pageSize": Number,
        "sort": {
            "empty": Boolean,
            "unsorted": Boolean,
            "sorted": Boolean
        },
        "offset": Number,
        "paged": Boolean,
        "unpaged": Boolean
    },
    "totalPages": Number,
    "totalElements": Number,
    "last": Boolean,
    "size": Number,
    "number": Number,
    "sort": {
        "empty": Boolean,
        "unsorted": Boolean,
        "sorted": Boolean
    },
    "numberOfElements": Number,
    "first": Boolean,
    "empty": Boolean
};
