import React, { useEffect, useState } from 'react';
import { getProposalsPerProject, getFreelancersPerSkill } from '../services/analyticsService';
import BarChartPlaceholder from './BarChartPlaceholder';
import PieChartPlaceholder from './PieChartPlaceholder';

export default function AnalyticsPanel() {
  const [proposals, setProposals] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [pData, sData] = await Promise.all([
          getProposalsPerProject({ page_size: 10 }),
          getFreelancersPerSkill({ page_size: 10 }),
        ]);

        // proposals may be paginated (DRF) or raw list
        const proposalsList = Array.isArray(pData) ? pData : pData.results || [];
        const skillsList = Array.isArray(sData) ? sData : sData.results || [];

        if (!mounted) return;

        setProposals(proposalsList.map((p) => ({
          position: p.title,
          count: p.proposal_count,
        })));

        setSkills(skillsList);
      } catch (err) {
        console.error('Analytics load error', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Proposals By Project</h3>
          </div>
          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading...</div>
          ) : (
            <BarChartPlaceholder data={proposals} />
          )}
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 h-full">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Freelancers By Skill</h3>
          </div>
          {loading ? (
            <div className="py-8 text-center text-gray-500">Loading...</div>
          ) : (
            <PieChartPlaceholder data={skills.reduce((acc, s) => ({ ...acc, [s.skill || 'Unknown']: s.freelancer_count || 0 }), {})} />
          )}
        </div>
      </div>
    </div>
  );
}
