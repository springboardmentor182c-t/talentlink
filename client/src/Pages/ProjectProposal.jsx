import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProposalForm from "../components/ProposalForm";
import ProposalList from "../components/ProposalList";
import ProposalSidebar from "../components/ProposalSidebar";
import api from "../services/api";

export default function ProjectProposal() {
  const { id } = useParams();
  const projectId = id;

  const [project, setProject] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/`);
        setProject(response.data);
      } catch (err) {
        console.error("Failed to fetch project", err);
        setProject(null);
      }
    };
    load();
  }, [projectId]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
          {/* CHANGED COLOR ONLY HERE */}
          <div className="bg-emerald-100 p-8 rounded-[24px]">
            <h2 className="text-3xl font-bold mb-4">Submit a Proposal</h2>

            {/* Project Info */}
            <div className="bg-white p-6 rounded-md mb-6">
              {project ? (
                <>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-sm">Client: {project.client_name}</p>
                  <p className="mt-2">{project.description}</p>
                </>
              ) : (
                <p>Loading project...</p>
              )}
            </div>

            {/* Proposal Form */}
            <div className="bg-white p-6 rounded-md">
              <ProposalForm
                projectId={projectId}
                onSuccess={() => setRefresh(!refresh)}
              />
            </div>

            {/* Proposal List */}
            <div className="bg-white p-6 rounded-md mt-6">
              <ProposalList projectId={projectId} refresh={refresh} />
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <ProposalSidebar currentProjectId={projectId} />
      </div>
    </div>
  );
}
