import { useState, useEffect } from 'react';

import {getAll} from '../api/Entries';

export function useFetch() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function fetchEntries() {
            const response = await getAll();
            //console.log(response);
            setEntries(response);
        }
        
        fetchEntries();
    }, []);

    return entries;
}