import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

// Swap these for your own imagery / routes.
const articles = [
  {
    title: 'Nuansa Hutan Dongeng',
    image:
      'https://res.cloudinary.com/dgexwaht9/image/upload/v1783501307/iman-kMTXgQ6CRxw-unsplash_dbnu1f.jpg',
    href: '/data-destinations/698ff108b0a632d185dd8dcc',
    span: 'half',
  },
  {
    title: 'Petualangan ke Teluk Ijo',
    image:
      'https://res.cloudinary.com/dgexwaht9/image/upload/v1783569096/teluk-ijo_smqha0.jpg',
    href: '/data-destinations/69745cfe730f81f10dfefed8',
    span: 'half',
  },
  {
    title: 'Nikmati Sunrise Ujung Jawa',
    image:
      'https://res.cloudinary.com/dgexwaht9/image/upload/v1783501298/endriqstudio-mountain-4524786_1920_sakoop.jpg',
    href: '/data-destinations/69736a87769a70aef7260c30',
    span: 'full',
  },
];

const GalleryCard = ({ title, image, href }) => (
  <Card className="border-none shadow-none bg-transparent gap-3 py-0 group cursor-pointer">
    <div className="overflow-hidden rounded-xl ">
      <img
        src={image}
        alt={title}
        className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-120"
      />
    </div>

    <CardContent className="px-0">
      <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-neutral-900">
        {title}
      </h3>
    </CardContent>

    <CardFooter className="px-0">
      <a
        href={href}
        className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-900"
      >
        Read Article
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </CardFooter>
  </Card>
);

const MainGallery = () => {
  const halfArticles = articles.filter((a) => a.span === 'half');
  const fullArticles = articles.filter((a) => a.span === 'full');

  return (
    <div className="mx-auto px-4 py-2 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {halfArticles.map((article) => (
          <GalleryCard key={article.title} {...article} />
        ))}
      </div>

      {fullArticles.map((article) => (
        <GalleryCard key={article.title} {...article} />
      ))}
    </div>
  );
};

export default MainGallery;