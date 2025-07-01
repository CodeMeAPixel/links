"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearch, IoClose, IoCalendarOutline, IoResizeOutline, IoCodeSlashOutline, IoEyeOutline, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import * as IoIcons from 'react-icons/io5';
import { Gallery, GalleryItem } from '@/types/links';

interface GallerySectionProps {
    gallery: Gallery;
}

const ITEMS_PER_PAGE = 6;

const GalleryItemCard = ({ item, onClick, isActive }: { item: GalleryItem; onClick: (item: GalleryItem) => void; isActive: boolean }) => {
    return (
        <motion.div
            className={`relative overflow-hidden rounded-xl transition-all group cursor-pointer ${isActive
                    ? 'bg-primary-500/10 border border-primary-500 shadow-lg shadow-primary-500/20'
                    : 'bg-card border border-color-border hover:border-primary-500/50 hover:shadow-md'
                }`}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(item)}
        >
            {/* Featured Badge */}
            {item.featured && (
                <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    ⭐ Featured
                </div>
            )}

            <div className="p-4">
                <div className="flex items-start gap-4">
                    {/* Image with hover effects and copyright protection */}
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-300 select-none">
                        <Image
                            src={item.thumbnailUrl || item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        {/* Copyright watermark for thumbnail */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-white/30 text-[6px] font-bold transform -rotate-12 select-none">
                                © 2025 ByteBrush Studios
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                                <IoEyeOutline className="text-white w-5 h-5" />
                                <span className="text-white text-xs font-medium">Expand</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                        <h3 className={`text-base font-semibold mb-1 ${isActive ? 'text-primary-300' : 'text-color-text group-hover:text-primary-400'
                            } transition-colors`}>
                            {item.title}
                        </h3>

                        {/* Description */}
                        {item.description && (
                            <p className="text-sm text-color-text-muted mb-2 line-clamp-2">
                                {item.description}
                            </p>
                        )}

                        {/* Category and Date */}
                        <div className="flex items-center gap-2 mb-2 text-xs text-color-text-muted">
                            <span className="px-2 py-1 bg-color-border/30 rounded-full">
                                {item.category.replace('-', ' ')}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <IoCalendarOutline className="w-3 h-3" />
                                {new Date(item.createdDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map(tag => (
                                <span
                                    key={tag}
                                    className={`text-xs px-2 py-0.5 rounded-full transition-colors ${isActive
                                            ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                            : 'bg-color-border/20 text-color-text-muted group-hover:bg-primary-800/20 group-hover:text-primary-400'
                                        }`}
                                >
                                    #{tag}
                                </span>
                            ))}
                            {item.tags.length > 3 && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-color-border/20 text-color-text-muted">
                                    +{item.tags.length - 3}
                                </span>
                            )}
                        </div>

                        {/* Dimensions info */}
                        {item.dimensions && (
                            <div className="mt-2 text-xs text-color-text-muted flex items-center gap-1">
                                <IoResizeOutline className="w-3 h-3" />
                                <span>{item.dimensions.width}×{item.dimensions.height}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-400'
                        : 'bg-gradient-to-r from-primary-500/0 to-primary-400/0 group-hover:from-primary-500/50 group-hover:to-primary-400/50'
                    }`} />
            </div>

            {/* Subtle corner decoration */}
            <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="absolute top-0 right-0 w-6 h-6 bg-primary-500 rotate-45 translate-x-[8px] -translate-y-[8px]"></div>
            </div>
        </motion.div>
    );
};

export default function GallerySection({ gallery }: GallerySectionProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        gallery.items.forEach(item => {
            item.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [gallery.items]);

    // Filter items based on category, search, and tags
    const filteredItems = useMemo(() => {
        return gallery.items.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = searchTerm === '' ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesTags = selectedTags.length === 0 ||
                selectedTags.every(selectedTag =>
                    item.tags.some(itemTag => itemTag.toLowerCase() === selectedTag.toLowerCase())
                );

            return matchesCategory && matchesSearch && matchesTags;
        });
    }, [gallery.items, activeCategory, searchTerm, selectedTags]);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    const getIconComponent = (iconName: string) => {
        const IconComponent = (IoIcons as any)[iconName];
        return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
        setCurrentPage(1);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-color-text mb-1">{gallery.title}</h2>
                    <p className="text-sm text-color-text-muted">{gallery.description}</p>
                </div>

                {/* Search and filter UI */}
                <div className="mb-4 flex flex-col gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search designs or tags..."
                            className="w-full p-2 pl-8 rounded-md bg-card border border-color-border focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <div className="absolute top-0 left-0 mt-2 ml-2 flex items-center pointer-events-none">
                            <IoSearch className="w-4 h-4 text-color-text-muted" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        <button
                            onClick={() => {
                                setActiveCategory('all');
                                setCurrentPage(1);
                            }}
                            className={`px-2 py-0.5 text-xs rounded-full transition-colors ${activeCategory === 'all'
                                ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                }`}
                        >
                            All
                        </button>
                        {gallery.categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveCategory(category.id);
                                    setCurrentPage(1);
                                }}
                                className={`px-2 py-0.5 text-xs rounded-full transition-colors ${activeCategory === category.id
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Info message for users */}
                    <div className="flex items-center gap-2 p-3 bg-primary-900/20 border border-primary-700/30 rounded-lg">
                        <IoEyeOutline className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        <p className="text-sm text-primary-300">
                            <span className="font-medium">Tip:</span> Click on any design card to view the full image in an expanded view with detailed information.
                        </p>
                    </div>
                </div>

                {/* Current Selected Item */}
                {selectedItem && (
                    <div className="mb-4">
                        <div className="w-full bg-card border border-color-border rounded-md p-3 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src={selectedItem.thumbnailUrl || selectedItem.imageUrl}
                                        alt={selectedItem.title}
                                        fill
                                        className="object-cover rounded-md shadow-sm"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-medium text-color-text">{selectedItem.title}</h4>
                                    <p className="text-xs text-color-text-muted">{selectedItem.description}</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                                {selectedItem.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-0.5 bg-primary-800/30 text-primary-300 rounded-full border border-primary-700/30"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Meta info */}
                            <div className="flex justify-between text-xs text-color-text-muted">
                                <span>{formatDate(selectedItem.createdDate)}</span>
                                {selectedItem.dimensions && (
                                    <span>{selectedItem.dimensions.width}×{selectedItem.dimensions.height}</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Gallery list */}
                <div className="space-y-1 pb-8">
                    {paginatedItems.length > 0 ? (
                        paginatedItems.map((item: GalleryItem) => (
                            <GalleryItemCard
                                key={item.id}
                                item={item}
                                onClick={setSelectedItem}
                                isActive={selectedItem?.id === item.id}
                            />
                        ))
                    ) : (
                        <div className="text-center p-4 text-color-text-muted">
                            No designs found. Try adjusting your filters.
                        </div>
                    )}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md bg-primary-700/30 hover:bg-primary-600/40 text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <IoChevronBack className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`px-2 py-1 rounded-md transition-colors ${currentPage === pageNumber
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-card hover:bg-card-alt text-color-text-muted'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md bg-primary-700/30 hover:bg-primary-600/40 text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <IoChevronForward className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Gallery Item Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                        formatDate={formatDate}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// Gallery Modal Component
function GalleryModal({
    item,
    onClose,
    formatDate
}: {
    item: GalleryItem;
    onClose: () => void;
    formatDate: (date: string) => string;
}) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative max-w-4xl max-h-[90vh] bg-card rounded-xl border border-color-border overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                    <IoClose className="w-5 h-5" />
                </button>

                {/* Image with Copyright Protection */}
                <div className="relative aspect-[16/10] max-h-[60vh] select-none">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain pointer-events-none"
                        sizes="(max-width: 1024px) 100vw, 80vw"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                    />

                    {/* Multiple Copyright Watermarks */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Center watermark */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12">
                            <div className="text-white/20 text-2xl font-bold select-none">
                                © 2025 ByteBrush Studios
                            </div>
                        </div>

                        {/* Top left watermark */}
                        <div className="absolute top-8 left-8 transform -rotate-12">
                            <div className="text-white/15 text-lg font-bold select-none">
                                © 2025 ByteBrush Studios
                            </div>
                        </div>

                        {/* Bottom right watermark */}
                        <div className="absolute bottom-8 right-8 transform -rotate-12">
                            <div className="text-white/15 text-lg font-bold select-none">
                                © 2025 ByteBrush Studios
                            </div>
                        </div>

                        {/* Top right watermark */}
                        <div className="absolute top-8 right-8 transform rotate-12">
                            <div className="text-white/15 text-lg font-bold select-none">
                                © 2025 ByteBrush Studios
                            </div>
                        </div>

                        {/* Bottom left watermark */}
                        <div className="absolute bottom-8 left-8 transform rotate-12">
                            <div className="text-white/15 text-lg font-bold select-none">
                                © 2025 ByteBrush Studios
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-color-text mb-1">{item.title}</h2>
                            {item.description && (
                                <p className="text-color-text-muted">{item.description}</p>
                            )}
                        </div>
                        {item.featured && (
                            <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Copyright Notice */}
                    <div className="mb-4 p-3 bg-orange-900/20 border border-orange-700/30 rounded-lg">
                        <p className="text-sm text-orange-300 flex items-center gap-2">
                            <span className="text-orange-400">©</span>
                            <strong>Copyright 2025 ByteBrush Studios.</strong> All rights reserved. This design is protected by copyright law.
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-primary-800/30 text-primary-300 rounded-full border border-primary-700/30"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-color-text-muted">
                            <IoCalendarOutline className="w-4 h-4" />
                            <span>{formatDate(item.createdDate)}</span>
                        </div>

                        {item.dimensions && (
                            <div className="flex items-center gap-2 text-color-text-muted">
                                <IoResizeOutline className="w-4 h-4" />
                                <span>{item.dimensions.width}×{item.dimensions.height}</span>
                            </div>
                        )}

                        {item.fileSize && (
                            <div className="flex items-center gap-2 text-color-text-muted">
                                <IoCodeSlashOutline className="w-4 h-4" />
                                <span>{item.fileSize}</span>
                            </div>
                        )}

                        {item.software && item.software.length > 0 && (
                            <div className="flex items-center gap-2 text-color-text-muted">
                                <span className="text-xs">Made with: {item.software.join(', ')}</span>
                            </div>
                        )}
                    </div>

                    {item.clientProject && (
                        <div className="mt-4 p-3 bg-primary-800/20 border border-primary-700/30 rounded-lg">
                            <p className="text-sm text-primary-300">
                                <strong>Client Project:</strong> This design was created for a client.
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}