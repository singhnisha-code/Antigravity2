import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxStars = 5, 
  onRatingChange, 
  interactive = false,
  size = 20,
  className = ""
}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(starValue)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            <Star
              size={size}
              className={`${isFilled ? 'fill-primary text-primary' : 'text-slate-600'}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
