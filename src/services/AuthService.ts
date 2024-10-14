import axios, { AxiosResponse } from 'axios';

const isDevelopmentEnvironment = false;//process.env.NODE_ENV !== 'production';
const HOST = window.location.host.match(/([^:]*)/)[1];
const URL_POST_AUTH = `http://${HOST}:8080/auth`;

const mockAccessToken = 'TODO';

const RECAPTCHA_API_KEY = '6Ld2pzkqAAAAADhIFMLa_IuIO4_Z83m41cv2vzBH';

export function login(email: string, recaptchToken:string) : Promise<AxiosResponse|any> {

    return isDevelopmentEnvironment?
            Promise.resolve(mockAccessToken): axios.post(`${URL_POST_AUTH}?email=${
                                                            encodeURIComponent(email)}&recaptchToken=${
                                                                recaptchToken
                                                            }`).then((res)=> (res));
}


export default {
    login,
    RECAPTCHA_API_KEY
};