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

export function useFetchGQL(query, defaultValue) {
    const [data, setData] = useState(defaultValue);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(routes.api + '/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({
                  query,
                })
            });
            const json = await response.json();

            setData(json.data.entries);
        }
        
        fetchData();
    }, defaultValue);

    return data;
}