import jsPDF from 'jspdf';
import 'jspdf-autotable';

export interface PayslipData {
  employeeId: string;
  employeeName: string;
  role: string;
  month: string;
  year: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  workingDays: number;
  presentDays: number;
}

export const payrollService = {
  generatePayslipPDF(data: PayslipData) {
    const doc = new jsPDF();
    const netSalary = (data.baseSalary + data.allowances) - data.deductions;
    const proratedSalary = (netSalary / data.workingDays) * data.presentDays;

    // Header
    doc.setFillColor(200, 155, 60); // Gold
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('RUDRA CONSTRUCTION', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`PAYSLIP FOR ${data.month.toUpperCase()} ${data.year}`, 105, 22, { align: 'center' });

    // Employee Details
    doc.setFontSize(12);
    doc.text('Employee Information', 15, 45);
    doc.line(15, 47, 65, 47);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${data.employeeName}`, 15, 55);
    doc.text(`ID: ${data.employeeId}`, 15, 60);
    doc.text(`Designation: ${data.role}`, 15, 65);

    doc.text(`Total Working Days: ${data.workingDays}`, 140, 55);
    doc.text(`Present Days: ${data.presentDays}`, 140, 60);
    doc.text(`Leave Taken: ${data.workingDays - data.presentDays}`, 140, 65);

    // Salary Structure Table
    (doc as any).autoTable({
      startY: 80,
      head: [['Description', 'Earnings (INR)', 'Deductions (INR)']],
      body: [
        ['Basic Salary', data.baseSalary.toLocaleString(), '0'],
        ['HRA & Allowances', data.allowances.toLocaleString(), '0'],
        ['Professional Tax', '0', (data.deductions / 2).toLocaleString()],
        ['Provident Fund', '0', (data.deductions / 2).toLocaleString()],
      ],
      headStyles: { fillColor: [15, 23, 42], textColor: [200, 155, 60] },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    
    // Net Pay Box
    doc.setFillColor(248, 250, 252);
    doc.rect(15, finalY, 180, 20, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('NET SALARY PAYABLE:', 25, finalY + 12);
    doc.setFontSize(14);
    doc.text(`INR ${proratedSalary.toLocaleString()}`, 140, finalY + 12);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Note: This is an electronically generated payslip and does not require a physical signature.', 105, 280, { align: 'center' });

    doc.save(`Payslip_${data.employeeName.replace(' ', '_')}_${data.month}.pdf`);
  }
};
