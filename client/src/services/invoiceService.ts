import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.jpg';

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientAddress: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  taxRate: number;
  totalAmount: number;
}

export const invoiceService = {
  generatePDF(data: InvoiceData) {
    const doc = new jsPDF();
    
    // Header - Logo and Company Info
    doc.setFillColor(15, 23, 42); // Deep Black
    doc.rect(0, 0, 210, 40, 'F');
    
    // Add Logo (if possible, otherwise text)
    doc.setTextColor(200, 155, 60); // Gold
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('RUDRA CONSTRUCTION', 15, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Enterprise ERP Ecosystem', 15, 32);
    
    // Invoice Details Header
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(20);
    doc.text('TAX INVOICE', 140, 60);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice No: ${data.invoiceNumber}`, 140, 70);
    doc.text(`Date: ${data.date}`, 140, 75);
    
    // Bill To
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 15, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(data.clientName, 15, 68);
    doc.text(data.clientAddress, 15, 73);
    
    // Table
    (doc as any).autoTable({
      startY: 90,
      head: [['Description', 'Qty', 'Unit Price', 'Amount']],
      body: data.items.map(item => [
        item.description,
        item.quantity,
        `INR ${item.unitPrice.toLocaleString()}`,
        `INR ${item.total.toLocaleString()}`
      ]),
      headStyles: { fillColor: [200, 155, 60], textColor: [15, 23, 42], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { top: 90 },
    });
    
    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal: INR ${data.totalAmount.toLocaleString()}`, 140, finalY);
    doc.text(`GST (${data.taxRate}%): INR ${(data.totalAmount * data.taxRate / 100).toLocaleString()}`, 140, finalY + 7);
    
    doc.setFillColor(15, 23, 42);
    doc.rect(138, finalY + 12, 60, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(`TOTAL: INR ${(data.totalAmount * (1 + data.taxRate / 100)).toLocaleString()}`, 142, finalY + 19);
    
    // Footer
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.text('This is a computer-generated document. No signature required.', 105, 285, { align: 'center' });
    
    doc.save(`Invoice_${data.invoiceNumber}.pdf`);
  }
};
