import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, User, IndianRupee, Upload, Info, CheckCircle2, Loader2, Calendar } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { tenderService } from '../../services/tenderService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewTenderModal = ({ isOpen, onClose }: ModalProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    value: '',
    deadline: '',
    fileUrl: ''
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await storageService.uploadFile(file, 'tenders', (progress) => {
          setUploadProgress(progress);
        });
        setFormData(prev => ({ ...prev, fileUrl: url }));
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tenderService.submitTender({
        ...formData,
        status: 'Submitted'
      });
      onClose();
      setFormData({ title: '', client: '', value: '', deadline: '', fileUrl: '' });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-card border-primary/20"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold">New Tender Submission</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-all">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tender Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Highway Expansion Project - Section B"
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Issuing Authority / Client</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    placeholder="Department Name"
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Estimated Quote</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    placeholder="0.00"
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Submission Deadline</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="date" 
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Supporting Documents (PDF/DOCX)</label>
              <label className="block border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc"
                  disabled={isUploading}
                />
                
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-primary mb-3" size={32} />
                    <p className="text-sm text-slate-400">Uploading Document... {Math.round(uploadProgress)}%</p>
                    <div className="w-48 h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-primary"
                       />
                    </div>
                  </div>
                ) : formData.fileUrl ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="text-green-500 mb-3" size={32} />
                    <p className="text-sm text-green-500 font-bold uppercase tracking-widest">Document Uploaded Successfully</p>
                    <p className="text-[10px] text-slate-500 mt-2 truncate max-w-[200px]">{formData.fileUrl}</p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto mb-3 text-slate-500 group-hover:text-primary transition-colors" size={32} />
                    <p className="text-sm text-slate-400">Drag and drop files here, or <span className="text-primary font-bold">browse</span></p>
                    <p className="text-[10px] text-slate-600 uppercase mt-2">Maximum file size: 25MB</p>
                  </>
                )}
              </label>
            </div>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
              <Info className="text-primary shrink-0" size={20} />
              <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider font-medium">
                By submitting this tender, you agree to the Rudra Construction bidding terms and compliance requirements. All submissions are audited and tracked for transparency.
              </p>
            </div>

            <div className="pt-4 flex gap-4">
              <button type="button" onClick={onClose} className="flex-1 py-3 glass rounded-xl font-bold hover:bg-white/10 transition-all">
                Discard
              </button>
              <button type="submit" className="flex-1 py-3 btn-gold font-bold text-lg">
                Submit Tender
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NewTenderModal;
