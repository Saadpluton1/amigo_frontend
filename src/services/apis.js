import axios from "axios";

const createBackendServer = baseURL => {


    const api = axios.create({
        baseURL,
        headers: {Accept: "application/json"},
        timeout: 60 * 1000
    });

    /***********    GET REQUESTS    **********/
    const getSection = async (req) => api.get(`/api/section?page=${req.page}&section=${req.section}`);
    const getSingleSection = async (req) => api.get(`/api/single-section?page=${req.page}&section=${req.section}&id=${req.id}`);
    const getSetting = async (req) => api.get(`/api/setting?page=${req.page}&section=${req.section}`);
    
    /***********    POST REQUESTS    **********/
    return {
        getSection,
        getSetting,
        getSingleSection
    };

};

const apis = createBackendServer(process.env.NODE_ENV == 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_PRODUCTION_API_URL);


export default apis;

//https://api.bscscan.com/api?module=block&action=getblockreward&blockno=2170000&apikey=11FZRCXWIQRUAP53Z8T2DBJ39M6FGZN2H5
