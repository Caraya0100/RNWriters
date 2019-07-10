import { useState, useEffect } from 'react';

import * as routes from "../constants/Routes";

export function useFetch(endpoint, defaultValue) {
    const [data, setData] = useState(defaultValue);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(routes.api + '/' + endpoint);
            const json = await response.json();

            setData(json);
        }
        
        fetchData();
    }, defaultValue);

    return data;
}