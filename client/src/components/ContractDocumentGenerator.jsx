import React, { useState } from 'react';
import { Download, FileText, Calendar, DollarSign, User, CheckCircle, Clock } from 'lucide-react';
import { contractService } from '../services/contractService';

const ContractDocumentGenerator = ({ contract, className = '' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDocument, setGeneratedDocument] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const documentData = await contractService.downloadContract(contract.id);
      
      // For now, the backend returns JSON data
      // In the future, this could return a PDF blob
      if (documentData.contract_data) {
        // Generate a simple text document from the contract data
        const documentContent = generateContractDocument(documentData.contract_data);
        
        // Create a blob and download link
        const blob = new Blob([documentContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `contract_${contract.title.replace(/\s+/g, '_')}_${contract.id}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setGeneratedDocument(documentData.contract_data);
      } else {
        throw new Error('No contract data received from server');
      }
    } catch (err) {
      setError(err.message || 'Failed to download contract document');
    } finally {
      setLoading(false);
    }
  };

  const generateContractDocument = (contractData) => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    const getStatusDisplay = (status) => {
      return status.replace('_', ' ').toUpperCase();
    };

    // Generate a simple contract document
    return `
CONTRACT AGREEMENT
==================

Contract ID: #${contractData.id.toString().padStart(4, '0')}
Title: ${contractData.title}
Status: ${getStatusDisplay(contractData.status)}

PARTIES INVOLVED
----------------
Client: ${contractData.client_name}
Freelancer: ${contractData.freelancer_name}

CONTRACT DETAILS
----------------
Type: ${contractData.contract_type === 'fixed' ? 'Fixed Price' : 
        contractData.contract_type === 'hourly' ? 'Hourly Rate' : 'Milestone Based'}
Description: ${contractData.description}

FINANCIAL TERMS
----------------
Total Amount: ${formatCurrency(contractData.total_amount)}
Amount Paid: ${formatCurrency(contractData.amount_paid)}
Amount in Escrow: ${formatCurrency(contractData.amount_in_escrow)}
Remaining Amount: ${formatCurrency(contractData.remaining_amount)}
Payment Progress: ${contractData.payment_progress_percentage}%

SCHEDULE
--------
Start Date: ${formatDate(contractData.start_date)}
End Date: ${formatDate(contractData.end_date)}
Expected Delivery: ${contractData.expected_delivery_date ? formatDate(contractData.expected_delivery_date) : 'Not specified'}

MILESTONES
----------
${contractData.milestones && contractData.milestones.length > 0 
  ? contractData.milestones.map(milestone => 
      `- ${milestone.title}: ${formatCurrency(milestone.amount)} (${milestone.status})`
    ).join('\n')
  : 'No milestones defined'
}

TERMS AND CONDITIONS
-------------------
${contractData.terms_and_conditions || 'Standard terms and conditions apply.'}

REQUIREMENTS
------------
${contractData.requirements || 'No specific requirements specified.'}

DELIVERABLES
------------
${contractData.deliverables || 'No specific deliverables specified.'}

PROGRESS
--------
Overall Progress: ${contractData.progress_percentage}%

TIMESTAMPS
----------
Created: ${formatDate(contractData.created_at)}
Last Updated: ${formatDate(contractData.updated_at)}
${contractData.signed_at ? `Signed: ${formatDate(contractData.signed_at)}` : 'Not yet signed'}
${contractData.completed_at ? `Completed: ${formatDate(contractData.completed_at)}` : 'Not yet completed'}

---
This contract document was generated on ${new Date().toLocaleString()}.
For official use only.
`;
  };

  const handlePrint = () => {
    if (!contract) return;

    const printWindow = window.open('', '_blank');
    const documentContent = generateContractDocument(contract);
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Contract ${contract.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <pre>${documentContent}</pre>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!contract) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Select a contract to generate documents</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Contract Documents</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownload}
            disabled={loading}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {loading ? 'Generating...' : 'Download Contract'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Contract Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Contract Info</span>
          </div>
          <p className="text-sm text-gray-700 mb-1">Title: {contract.title}</p>
          <p className="text-sm text-gray-700 mb-1">ID: #{contract.id.toString().padStart(4, '0')}</p>
          <p className="text-sm text-gray-700">Status: {contract.status.replace('_', ' ').toUpperCase()}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Financial Summary</span>
          </div>
          <p className="text-sm text-gray-700 mb-1">Total: {formatCurrency(contract.total_amount)}</p>
          <p className="text-sm text-gray-700 mb-1">Paid: {formatCurrency(contract.amount_paid)}</p>
          <p className="text-sm text-gray-700">Remaining: {formatCurrency(contract.remaining_amount)}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Parties</span>
          </div>
          <p className="text-sm text-gray-700 mb-1">Client: {contract.client_name}</p>
          <p className="text-sm text-gray-700">Freelancer: {contract.freelancer_name}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Timeline</span>
          </div>
          <p className="text-sm text-gray-700 mb-1">Start: {formatDate(contract.start_date)}</p>
          <p className="text-sm text-gray-700">End: {formatDate(contract.end_date)}</p>
        </div>
      </div>

      {/* Document Preview */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Document Preview</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          The contract document will include all relevant details:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Contract terms and conditions</li>
          <li>• Payment schedule and milestones</li>
          <li>• Deliverables and requirements</li>
          <li>• Timeline and deadlines</li>
          <li>• Contact information for both parties</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          Note: This is a text-based document. PDF generation will be implemented in a future update.
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-semibold">Contract Progress</span>
            <span className="font-bold">{contract.progress_percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${contract.progress_percentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-semibold">Payment Progress</span>
            <span className="font-bold">{contract.payment_progress_percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${contract.payment_progress_percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDocumentGenerator;