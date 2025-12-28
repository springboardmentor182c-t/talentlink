import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Button,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ProjectSearchFilters({ onFiltersChange, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    skills: [],
    budget: [100, 10000],
    duration: "all",
    level: [],
    status: "all",
  });
  const [expandedFilters, setExpandedFilters] = useState(true);

  // Available skills
  const availableSkills = [
    "React",
    "UI Design",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "GraphQL",
    "CSS",
    "Figma",
    "Mobile App",
    "Next.js",
  ];

  // Handle filter changes
  const handleSkillToggle = (skill) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleBudgetChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      budget: newValue,
    }));
  };

  const handleDurationChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      duration: event.target.value,
    }));
  };

  const handleLevelToggle = (level) => {
    setFilters((prev) => ({
      ...prev,
      level: prev.level.includes(level)
        ? prev.level.filter((l) => l !== level)
        : [...prev.level, level],
    }));
  };

  const handleStatusChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({
        searchQuery,
        ...filters,
      });
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      skills: [],
      budget: [100, 10000],
      duration: "all",
      level: [],
      status: "all",
    });
    if (onFiltersChange) {
      onFiltersChange({
        searchQuery: "",
        skills: [],
        budget: [100, 10000],
        duration: "all",
        level: [],
        status: "all",
      });
    }
  };

  // Handle search
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    handleApplyFilters();
  };

  const hasActiveFilters =
    searchQuery ||
    filters.skills.length > 0 ||
    filters.duration !== "all" ||
    filters.level.length > 0 ||
    filters.status !== "all" ||
    filters.budget[0] !== 100 ||
    filters.budget[1] !== 10000;

  return (
    <Card sx={{ p: 3, mb: 3, bgcolor: "white" }}>
      {/* Search Bar */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search projects by title, client, skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#f9fafb",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={{
            bgcolor: "#3b82f6",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            "&:hover": { bgcolor: "#2563eb" },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Filter Toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pb: 2,
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TuneIcon sx={{ color: "text.secondary" }} />
          <Typography variant="subtitle2" fontWeight={600}>
            Filters
          </Typography>
          {hasActiveFilters && (
            <Chip
              label="Active"
              size="small"
              variant="outlined"
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        <IconButton
          size="small"
          onClick={() => setExpandedFilters(!expandedFilters)}
        >
          {expandedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Filters */}
      <Collapse in={expandedFilters}>
        <Stack spacing={3}>
          {/* Skills Filter */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {availableSkills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onClick={() => handleSkillToggle(skill)}
                  variant={filters.skills.includes(skill) ? "filled" : "outlined"}
                  color={
                    filters.skills.includes(skill) ? "primary" : "default"
                  }
                  icon={filters.skills.includes(skill) ? undefined : undefined}
                  sx={{
                    bgcolor: filters.skills.includes(skill)
                      ? "#eff6ff"
                      : "transparent",
                    color: filters.skills.includes(skill)
                      ? "#3b82f6"
                      : "text.secondary",
                    borderColor: filters.skills.includes(skill)
                      ? "#3b82f6"
                      : "#e5e7eb",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: filters.skills.includes(skill)
                        ? "#e0effe"
                        : "#f9fafb",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Budget Filter */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
              Budget Range
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={filters.budget}
                onChange={handleBudgetChange}
                valueLabelDisplay="auto"
                min={100}
                max={10000}
                step={100}
                marks={[
                  { value: 100, label: "$100" },
                  { value: 10000, label: "$10k" },
                ]}
                sx={{
                  "& .MuiSlider-thumb": {
                    bgcolor: "#3b82f6",
                  },
                  "& .MuiSlider-track": {
                    bgcolor: "#3b82f6",
                  },
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ${filters.budget[0]} - ${filters.budget[1]}
            </Typography>
          </Box>

          {/* Duration Filter */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              Project Duration
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={filters.duration}
                onChange={handleDurationChange}
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value="all">All Durations</MenuItem>
                <MenuItem value="less-than-1-month">Less than 1 month</MenuItem>
                <MenuItem value="1-3-months">1 - 3 months</MenuItem>
                <MenuItem value="3-6-months">3 - 6 months</MenuItem>
                <MenuItem value="more-than-6-months">More than 6 months</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Level Filter */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              Project Level
            </Typography>
            <FormGroup>
              {["Entry Level", "Intermediate", "Expert"].map((level) => (
                <FormControlLabel
                  key={level}
                  control={
                    <Checkbox
                      checked={filters.level.includes(level)}
                      onChange={() => handleLevelToggle(level)}
                      size="small"
                      sx={{
                        color: "#d1d5db",
                        "&.Mui-checked": {
                          color: "#3b82f6",
                        },
                      }}
                    />
                  }
                  label={level}
                  sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Status Filter */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              Project Status
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={filters.status}
                onChange={handleStatusChange}
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleApplyFilters}
              sx={{
                bgcolor: "#3b82f6",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { bgcolor: "#2563eb" },
              }}
            >
              Apply Filters
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleResetFilters}
              startIcon={<ClearIcon />}
              sx={{
                borderColor: "#e5e7eb",
                color: "text.secondary",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { bgcolor: "#f9fafb" },
              }}
            >
              Reset
            </Button>
          </Box>
        </Stack>
      </Collapse>
    </Card>
  );
}
