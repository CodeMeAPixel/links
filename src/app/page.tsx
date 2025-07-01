import { Metadata } from 'next';
import { Suspense } from 'react';
import LinkHubContent from '@/components/layouts/links/LinkHubContent';
import Loader from '@/components/static/Loader';
import { getProfile, getPlaylist } from '@/data/linksData';

export default function LinksPage() {
    const profile = getProfile();
    const playlist = getPlaylist();

    return (
        <Suspense fallback={<Loader />}>
            <LinkHubContent profile={profile} playlist={playlist} />
        </Suspense>
    );
}
