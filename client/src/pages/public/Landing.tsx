import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Shield, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import ReviewSection from '../../components/public/ReviewSection';


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-charcoal text-white overflow-x-hidden">
      <Helmet>
        <title>Rudra Construction | Enterprise Construction ERP & Infrastructure Solutions</title>
        <meta name="description" content="Leading the future of infrastructure with premium construction management solutions and state-of-the-art ERP systems." />
        <meta property="og:title" content="Rudra Construction Enterprise Platform" />
        <meta property="og:description" content="Experience the next generation of construction management with Rudra's real-time ERP." />
        <meta property="og:image" content="/assets/logo.jpg" />
        <meta name="keywords" content="construction, ERP, infrastructure, project management, India, civil engineering" />
      </Helmet>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Rudra Construction" className="h-10 w-10 object-contain rounded" />
          <span className="text-xl font-bold tracking-tighter text-gradient">RUDRA CONSTRUCTION</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>

        </div>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="btn-gold text-sm px-5 py-2"
          >
            Get Started
          </button>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal to-charcoal"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Building the <span className="text-gradient">Future</span> of <br />
              Enterprise Infrastructure
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the next generation of construction management. Real-time ERP solutions designed for elite builders and infrastructure firms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gold flex items-center justify-center gap-2 px-8 py-4 text-lg">
                Start Your Project <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 rounded-lg glass font-semibold hover:bg-white/10 transition-all text-lg">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-white/5 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projects Completed', value: '500+', icon: Building2 },
            { label: 'Active Tenders', value: '120+', icon: TrendingUp },
            { label: 'Satisfied Clients', value: '250+', icon: Users },
            { label: 'Quality Rating', value: '99.9%', icon: Shield },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-xl mx-auto">
              We provide end-to-end solutions for large-scale construction projects, powered by our custom enterprise ERP ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Smart Project Planning', desc: 'Advanced resource allocation and milestone tracking using AI-ready workflows.' },
              { title: 'Tender Management', desc: 'Secure, transparent bidding and tender processing for vendors and clients.' },
              { title: 'Infrastructure ERP', desc: 'Complete business operating system covering payroll, inventory, and financials.' },
            ].map((service, i) => (
              <div key={i} className="glass-card hover:border-primary/30 transition-all group cursor-default">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-secondary transition-all">
                  <Building2 size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Portals */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-10 border-primary/20 hover:border-primary/40 transition-all">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gradient">
                <Shield className="text-primary" /> Admin & Management
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Secure access for administrators, site managers, and HR personnel. Manage tenders, inventory, and financials.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="btn-gold w-full py-4 uppercase tracking-widest text-sm"
              >
                Enter Admin Portal
              </button>
            </div>

            <div className="glass-card p-10 border-white/5 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="text-primary" /> Client & Staff Portal
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Access your project status, submit reviews, and view attendance records for staff and contractors.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-4 rounded-lg glass font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all"
              >
                Access User Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Reviews Section */}
      <ReviewSection />

    </div>
  );
};

export default Landing;
