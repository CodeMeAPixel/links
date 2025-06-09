import { Metadata } from 'next';
import LinkHubContent from '@/components/layouts/links/LinkHubContent';
import { getProfile, getPlaylist } from '@/data/linksData';

export default function LinksPage() {
    const profile = getProfile();
    const playlist = getPlaylist();

    return <LinkHubContent profile={profile} playlist={playlist} />;
}
