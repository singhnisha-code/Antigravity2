import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquarePlus, Image as ImageIcon } from 'lucide-react';
import { reviewService, Review } from '../../services/reviewService';
import StarRating from '../common/StarRating';
import AddReviewModal from './AddReviewModal';

const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getReviews(true);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section id="reviews" className="py-32 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold">Client Testimonials</h2>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                  <Star size={14} className="fill-primary text-primary" />
                  <span className="text-sm font-bold text-primary">{averageRating} / 5</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider ml-1">({reviews.length} Reviews)</span>
                </div>
              )}
            </div>
            <div className="h-1 w-20 bg-primary mb-6"></div>
            <p className="text-slate-400">
              Don't just take our word for it. See what our elite partners and clients have to say about their experience with Rudra Construction.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-gold flex items-center gap-2 group whitespace-nowrap"
          >
            <MessageSquarePlus size={20} className="group-hover:rotate-12 transition-transform" />
            Write a Review
          </button>
        </div>


        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card h-64 animate-pulse bg-white/5"></div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 glass-card border-dashed border-white/10">
            <p className="text-slate-500 italic">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{review.userName}</h3>
                    <div className="text-xs text-slate-500 mt-1">
                      {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Recent'}
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={16} />
                </div>
                
                <p className="text-slate-400 text-sm italic mb-6 flex-grow leading-relaxed">
                  "{review.comment}"
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {review.images.map((url, idx) => (
                        <div key={idx} className="relative group shrink-0">
                          <img 
                            src={url} 
                            alt={`Review image ${idx + 1}`} 
                            className="h-16 w-16 object-cover rounded-lg border border-white/10 group-hover:border-primary transition-colors cursor-zoom-in"
                            onClick={() => window.open(url, '_blank')}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg pointer-events-none">
                            <ImageIcon size={14} className="text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AddReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchReviews}
      />
    </section>
  );
};

export default ReviewSection;
