import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
    // set options.method to GET if there is no method
    options.method = options.method || 'GET';

    // set options.headers to empty object if doesn't exist
    options.headers = options.headers || {};

    // if options.method is not GET then content-type set to application/json
    // XSRF-token set to value of XSRF-token cookie
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    // call default window's fetch with url and options
    const res = await window.fetch(url, options);

    // throw error if response > 400
    if (res.status >= 400) throw res;

    return res;
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
