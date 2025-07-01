import { Metadata } from 'next';
import { Suspense } from 'react';
import LinkHubContent from '@/components/layouts/links/LinkHubContent';
import { getProfile, getPlaylist } from '@/data/linksData';

export default function LinksPage() {
    const profile = getProfile();
    const playlist = getPlaylist();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LinkHubContent profile={profile} playlist={playlist} />
        </Suspense>
    );
}
