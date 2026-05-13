export const mailService = {
  /**
   * Triggers a cloud function or backend endpoint to send an email alert.
   * All queries are automatically routed to singhmanohar6699@gmail.com.
   * @param to Recipient email (overridden for queries)
   * @param subject Email subject
   * @param body Email content (HTML/Text)
   */
  async sendAlert(to: string, subject: string, body: string) {
    try {
      // Overriding recipient for all query/system mails
      const targetEmail = 'singhmanohar6699@gmail.com';
      
      console.log(`[MAIL_SERVICE] Sending alert to ${targetEmail}: ${subject}`);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: targetEmail, subject, body })
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
