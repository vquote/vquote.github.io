// export const isDevelopmentEnvironment = false;//process.env.NODE_ENV !== 'production';
export const isDevelopmentEnvironment = true;//process.env.NODE_ENV !== 'production';

// export const HOST = window.location.host.match(/([^:]*)/)[1];
export const HOST = "10.0.0.90:8080";


export const URL_POST_AUTH = `http://${HOST}/auth`;
export const URL_POST_QUOTE = `http://${HOST}/quote`;
export const URL_GET_QUOTES = `http://${HOST}/quotes`;
export const URL_GET_AUTHORS = `http://${HOST}/authors`;
export const URL_GET_CHANNEL = `http://${HOST}/channels`;


export const RECAPTCHA_API_KEY = '6Ld2pzkqAAAAADhIFMLa_IuIO4_Z83m41cv2vzBH';