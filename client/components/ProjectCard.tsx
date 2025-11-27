interface ProjectCardProps {
  title: string;
  description: string;
  skills: string[];
  onViewDetails: () => void;
}

export function ProjectCard({
  title,
  description,
  skills,
  onViewDetails,
}: ProjectCardProps) {
  return (
    <div className="bg-sidebar rounded-3xl p-6 w-full flex flex-col gap-4">
      <div>
        <h3 className="text-foreground font-bold text-lg mb-2">{title}</h3>
        <p className="text-foreground text-sm opacity-85 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        onClick={onViewDetails}
        className="px-4 py-2.5 bg-primary text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity self-start"
      >
        View Details
      </button>
    </div>
  );
}
