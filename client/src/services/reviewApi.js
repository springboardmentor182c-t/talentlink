const API_BASE = 'http://127.0.0.1:8000/api';

/**
 * Get review summary for a contract
 * Used in ReviewSummary.jsx
 */
export const getReviewSummary = async (contractId) => {
  const res = await fetch(
    `${API_BASE}/reviews/contract/${contractId}/summary/`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch review summary');
  }

  return res.json();
};

/**
 * Get review status (waiting page)
 * Used in ReviewWaiting.jsx
 */
export const getReviewStatus = async (contractId) => {
  const res = await fetch(
    `${API_BASE}/reviews/contract/${contractId}/status/`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch review status');
  }

  return res.json();
};

/**
 * Submit a new review
 * Used in ReviewForm.jsx
 */
export const submitReview = async (contractId, payload) => {
  const res = await fetch(
    `${API_BASE}/reviews/contract/${contractId}/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    throw new Error('Failed to submit review');
  }

  return res.json();
};
