import {apiConstants} from "../constants/api";

export const getFormattedDate = (dateVar, format, useUTC = false) => {
    if (!dateVar) return null;
    const date = new Date(dateVar);
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();

    let month = useUTC ? date.getUTCMonth() : date.getMonth();
    month = (1 + month).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = useUTC ? date.getUTCDate().toString() : date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;


    let hours = useUTC ? date.getUTCHours() : date.getHours();
    let minutes = useUTC ? date.getUTCMinutes() : date.getMinutes();
    let seconds = useUTC ? date.getUTCSeconds() : date.getSeconds();
    let milliseconds = useUTC ? date.getUTCMilliseconds() : date.getMilliseconds();

    hours = hours > 9 ? hours : "0" + hours;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    seconds = seconds > 9 ? seconds : "0" + seconds;

    switch (format) {
        case "YYYY-MM-DD":
            return `${year}-${month}-${day}`;
        case "DD/MM/YYYY":
            return `${day}/${month}/${year}`;
        case "YYYY-MM-DD HH:mm:SS":
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        case "DD-MM-YYYY HH:mm:SS":
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        case "YYYYMMDDHHmmSSS":
            return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
        case "HH:mm:SS":
            return `${hours}:${minutes}:${seconds}`;
        default:
            console.error("Format not recognized");
            return "";
    }
};

export const timeoutPromise = (promise, ms = 5000) => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error("promise timeout"))
        }, ms);
        promise.then(
            (res) => {
                clearTimeout(timeoutId);
                resolve(res);
            },
            (err) => {
                clearTimeout(timeoutId);
                reject(err);
            }
        );
    })
};

export const getFetchWithTimeoutAndErrorHandling = async (apiRoute, serviceType, timeoutInMs = 60000, queryParams = {}) => {
    let options = {
        method: 'GET',
        headers: {'Authorization': `Basic ${btoa(`${localStorage.getItem('user')}:${localStorage.getItem('password')}`)}`}
    };

    const queryParamsParsed = new URLSearchParams(queryParams);

    return await timeoutPromise(fetch(apiConstants.host + apiRoute + '?' + queryParamsParsed, options), timeoutInMs)
        .then(res => Promise.all([res.ok, res.json()]))
        .then(([resOk, res]) => {
            if (resOk) {
                return res
            } else {
                throw new Error(res.error);
            }
        })
        .catch(err => {
            console.error("Error " + serviceType + "-service: ", err);
            throw new Error(err)
        });
};

export const postFetchWithTimeoutAndErrorHandling = async (apiRoute, serviceType, body, timeoutInMs = 60000) => {

    return await timeoutPromise(fetch(apiConstants.host + apiRoute, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${localStorage.getItem('user')}:${localStorage.getItem('password')}`)}`
        }
    }), timeoutInMs)
        .then(res => {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return res.json().then(data => {
                    return Promise.all([res.ok, data])
                });
            } else {
                return res.text().then(text => {
                    return Promise.all([res.ok, text])
                });
            }
        })
        .then(([resOk, res]) => {
            if (resOk) {
                return res
            } else {
                if(res.error) {
                    throw new Error(res.error);
                } else {
                    throw new Error(res)
                }
            }
        })
        .catch(err => {
            console.error("Error " + serviceType + "-service: ", err);
            throw new Error(err)
        });
};