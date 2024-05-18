export type Film = {
    _id: string;
    brand: string;
    name: string;
    iso: number;
    color: boolean;
    process: string;
    formatThirtyFive: boolean;
    formatOneTwenty: boolean;
    staticImageUrl: string;
    description: string;
    dateAdded: string;
}

export type Project = {
    name: string;
    filmsid: string[];
}