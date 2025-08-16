import axios from 'axios';

/**
 * Axios instance for all HTTP requests
 * Base URL is configured via vite env: VITE_API_BASE_URL
 */
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})