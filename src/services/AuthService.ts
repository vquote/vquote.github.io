import axios, { AxiosResponse } from 'axios';

import {
    URL_POST_AUTH,
    RECAPTCHA_API_KEY,
    isDevelopmentEnvironment
} from '../config';


const mockAccessToken = 'TODO';

export function login(email: string, recaptchToken:string, mock:boolean = isDevelopmentEnvironment) : Promise<AxiosResponse|any> {

    return !!mock?
            Promise.resolve(mockAccessToken): axios.post(`${URL_POST_AUTH}?email=${
                                                            encodeURIComponent(email)}&recaptchToken=${
                                                                recaptchToken
                                                            }`).then((res)=> (res));
}


export default {
    login,
    RECAPTCHA_API_KEY
};