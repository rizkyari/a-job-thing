/**
 * Job model based on the API response schema
 */
export interface Job {
    id: number;
    title: string;
    descriptions?: {
        requirements?: string;
        responsibilities?: string;
        benefits?: string;
    };
    company?: {
        name?: string;
        address?: {
            street?: string; 
            additional?: string; 
            city?: string;
            state?: string; 
            postal_code?: string;
        };
        logo?: string;
    };
    location?: {
        street?: string; 
        additional?: string; 
        city?: string;
        state?: string; 
        country?: string; 
        postal_code?: string;
    };
    job_type?: string;
    job_category?: string;
    salary?: { 
        min?: number;
        max?: number;
        currency?: string;
    };
    posted_at?: string;
}

export interface JobsResponse {
    current_page: number;
    data: Job[];
    per_page: number;
    last_page: number;
    total: number;
}