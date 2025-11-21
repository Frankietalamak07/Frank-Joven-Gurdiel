export interface GameItem {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    badge?: string;
}

export interface NavItem {
    label: string;
    href: string;
}

export interface FeatureProps {
    title: string;
    description: string;
    imageUrl: string;
    ctaLink: string;
}