import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Star, 
  Image as ImageIcon,
  Clock,
  Filter,
  Search,
  MessageSquare
} from 'lucide-react';
import { reviewService, Review } from '../../services/reviewService';
import StarRating from '../../components/common/StarRating';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewService.getReviews(false);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleToggleStatus = async (review: Review) => {
    if (!review.id) return;
    try {
      await reviewService.updateReviewStatus(review.id, !review.approved);
      setReviews(prev => prev.map(r => r.id === review.id ? { ...r, approved: !r.approved } : r));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const filteredReviews = reviews
    .filter(r => {
      if (filter === 'pending') return !r.approved;
      if (filter === 'approved') return r.approved;
      return true;
    })
    .filter(r => 
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => !r.approved).length,
    average: reviews.length > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : 0
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Review Moderation</h1>
          <p className="text-slate-400">Manage client testimonials and feedback.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 pr-6 border-r border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.average}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.pending}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Pending</div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/10">

          {(['all', 'pending', 'approved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f ? 'bg-primary text-secondary' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="relative">


        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Search reviews by name or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-20 glass-card border-dashed border-white/10">
          <MessageSquare size={48} className="mx-auto mb-4 text-slate-600" />
          <p className="text-slate-500">No reviews found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold">{review.userName}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={12} />
                          {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}
                        </div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={16} />
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-4 italic">
                    "{review.comment}"
                  </p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {review.images.map((url, idx) => (
                        <img 
                          key={idx} 
                          src={url} 
                          alt="Review" 
                          className="h-20 w-20 object-cover rounded-lg border border-white/10 hover:border-primary transition-all cursor-zoom-in"
                          onClick={() => window.open(url, '_blank')}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col gap-2 justify-end md:justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  <button
                    onClick={() => handleToggleStatus(review)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      review.approved 
                        ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                        : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                    }`}
                  >
                    {review.approved ? (
                      <><XCircle size={18} /> Unapprove</>
                    ) : (
                      <><CheckCircle size={18} /> Approve</>
                    )}
                  </button>
                  <button
                    onClick={() => review.id && handleDelete(review.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white/5 text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
