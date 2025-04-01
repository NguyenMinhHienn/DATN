import React from 'react';

interface BannerProps {
    imageUrl: string;
    title?: string;
    subtitle?: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, title, subtitle }) => {
    return (
        <div
            className="relative w-full h-64 md:h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
                {title && <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>}
                {subtitle && <p className="mt-2 text-lg md:text-xl">{subtitle}</p>}
            </div>
        </div>
    );
};

export default Banner;