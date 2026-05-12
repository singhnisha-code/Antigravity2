// Placeholder for CMS Controller
let landingContent = {
  hero: {
    title: 'Building the Future of Enterprise Infrastructure',
    subtitle: 'Experience the next generation of construction management. Real-time ERP solutions designed for elite builders and infrastructure firms.',
  },
  stats: [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Active Tenders', value: '120+' },
  ]
};

exports.getLandingContent = async (req, res) => {
  res.status(200).json(landingContent);
};

exports.updateLandingContent = async (req, res) => {
  landingContent = { ...landingContent, ...req.body };
  res.status(200).json(landingContent);
};
