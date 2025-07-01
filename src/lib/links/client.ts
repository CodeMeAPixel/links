import { LinkHubProfile, LinkItem, SocialLink, LinkCategory, Track, Playlist } from "@/types/links";
import { linkHubProfile } from "./data";
import {
    playlist,
    getTracksByGenre,
    getAllGenres,
    getTrackById,
    rockTracks,
    electronicTracks,
    hipHopTracks
} from "./data/playlist";
import { gallery, getGalleryItemsByCategory, getGalleryItemsByTag, getFeaturedGalleryItems, getAllTags as getAllGalleryTags } from "./data/gallery";

export class LinksClient {
    private static instance: LinksClient;
    private profile: LinkHubProfile;

    private constructor() {
        this.profile = linkHubProfile;
    }

    public static getInstance(): LinksClient {
        if (!LinksClient.instance) {
            LinksClient.instance = new LinksClient();
        }
        return LinksClient.instance;
    }

    public getProfile(): LinkHubProfile {
        return this.profile;
    }

    public getAllLinks(): LinkItem[] {
        const featuredLinks = this.profile.featuredLinks;
        const categoryLinks = this.profile.categories.flatMap(category => category.links);
        return [...featuredLinks, ...categoryLinks];
    }

    public getSocialLinks(): SocialLink[] {
        return this.profile.socialLinks;
    }

    public getFeaturedLinks(): LinkItem[] {
        return this.profile.featuredLinks;
    }

    public getCategories(): LinkCategory[] {
        return this.profile.categories;
    }

    public getLinksByCategory(categoryId: string): LinkItem[] {
        const category = this.profile.categories.find(cat => cat.id === categoryId);
        return category ? category.links : [];
    }

    public getLinkById(linkId: string): LinkItem | undefined {
        const allLinks = this.getAllLinks();
        return allLinks.find(link => link.id === linkId);
    }

    public updateDiscordStatus(discordStatus: any): void {
        this.profile.discord = discordStatus;
    }

    public getPlaylist(): Playlist {
        return playlist;
    }

    public getTrackById(trackId: string): Track | undefined {
        return getTrackById(trackId);
    }

    public getTracksByGenre(genre: string): Track[] {
        return getTracksByGenre(genre);
    }

    public getAllGenres(): string[] {
        return getAllGenres();
    }

    // New methods to directly access genre collections
    public getRockTracks(): Track[] {
        return rockTracks;
    }

    public getElectronicTracks(): Track[] {
        return electronicTracks;
    }

    public getHipHopTracks(): Track[] {
        return hipHopTracks;
    }

    public getGallery() {
        return gallery;
    }

    public getGalleryItemsByCategory(categoryId: string) {
        return getGalleryItemsByCategory(categoryId);
    }

    public getGalleryItemsByTag(tag: string) {
        return getGalleryItemsByTag(tag);
    }

    public getFeaturedGalleryItems() {
        return getFeaturedGalleryItems();
    }

    public getAllGalleryTags() {
        return getAllGalleryTags();
    }
}

export default LinksClient.getInstance();
