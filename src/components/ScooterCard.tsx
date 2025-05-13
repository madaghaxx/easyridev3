import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import Button from './ui/Button';
import { formatPrice } from '../utils/helpers';

interface ScooterProps {
  id: string;
  name: string;
  model: string;
  speed: number;
  price: number;
  image: string;
  actionType: 'rent';
}

const ScooterCard: React.FC<ScooterProps> = ({
  id,
  name,
  model,
  speed,
  price,
  image,
  actionType,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-0">
        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-500">{model}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{'Vitesse'}</span>
            <span className="font-medium">{speed} km/h</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{'Prix'}</span>
            <span className="font-bold text-green-600">{formatPrice(price)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/${actionType}/${id}`} className="w-full">
          <Button variant="primary" className="w-full">
            <span>
              {'Louer maintenant'}
            </span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ScooterCard;
