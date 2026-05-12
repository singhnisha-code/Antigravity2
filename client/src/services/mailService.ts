export const mailService = {
  /**
   * Triggers a cloud function or backend endpoint to send an email alert.
   * @param to Recipient email
   * @param subject Email subject
   * @param body Email content (HTML/Text)
   */
  async sendAlert(to: string, subject: string, body: string) {
    try {
      // In a real implementation, this would be a fetch() call to your 
      // Vercel Serverless Function or Firebase Cloud Function.
      console.log(`[MAIL_SERVICE] Sending alert to ${to}: ${subject}`);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body })
      });

      return response.ok;
    } catch (error) {
      console.error("Mail service error:", error);
      return false;
    }
  },

  // Templates
  templates: {
    newTender: (title: string, client: string) => ({
      subject: `🚀 New Tender Submitted: ${title}`,
      body: `A new tender for ${client} has been submitted for review in the Rudra ERP system.`
    }),
    lowStock: (item: string, qty: number) => ({
      subject: `⚠️ Low Stock Alert: ${item}`,
      body: `The stock for ${item} has dropped to ${qty}. Please review and reorder soon.`
    })
  }
};
