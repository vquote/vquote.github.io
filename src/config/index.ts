export const isDevelopmentEnvironment = true;//process.env.NODE_ENV !== 'production';
// export const isDevelopmentEnvironment = false;//process.env.NODE_ENV !== 'production';
// export const isDevelopmentEnvironment = true;//process.env.NODE_ENV !== 'production';

export const HOST = `${window.location.host.match(/([^:]*)/)[1]}:8080`;

console.log('HOST:' , HOST);


export const URL_POST_AUTH = `http://${HOST}/auth`;
export const URL_POST_QUOTE = `http://${HOST}/quote`;
export const URL_GET_QUOTES = `http://${HOST}/quotes`;
export const URL_GET_AUTHORS = `http://${HOST}/authors`;
export const URL_GET_CHANNEL = `http://${HOST}/channels`;
export const URL_GET_PLAYLISTS = `http://${HOST}/playlists`;


export const RECAPTCHA_API_KEY = '6Ld2pzkqAAAAADhIFMLa_IuIO4_Z83m41cv2vzBH';