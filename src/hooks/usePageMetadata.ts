import { useEffect } from 'react';

/**
 * Custom hook to dynamically change the favicon and document title.
 * @param href The path to the favicon image.
 * @param title The new title of the page.
 */
export const usePageMetadata = (href: string, title?: string) => {
    useEffect(() => {
        // Update Favicon
        if (href) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                link.href = href;
                if (href.endsWith('.png')) {
                    link.type = 'image/png';
                } else if (href.endsWith('.svg')) {
                    link.type = 'image/svg+xml';
                }
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = href;
                if (href.endsWith('.png')) {
                    newLink.type = 'image/png';
                }
                document.getElementsByTagName('head')[0].appendChild(newLink);
            }
        }

        // Update Title
        if (title) {
            document.title = title;
        }
    }, [href, title]);
};
