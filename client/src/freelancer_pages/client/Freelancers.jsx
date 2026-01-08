import React, { useEffect, useMemo, useState } from "react";
import { Typography, Grid, Card, Avatar, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, TextField } from "@mui/material";
import { useSearch } from "../../context/SearchContext";
import profileService from "../../services/profileService";

export default function Freelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await profileService.freelancer.listProfiles();
        const items = data?.results || data || [];
        if (!mounted) return;
        setFreelancers(items);
      } catch (err) {
        console.error("Failed to load freelancers", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const openProfile = async (profile) => {
    if (!profile) return;
    setDetailLoading(true);
    try {
      const id = profile.id;
      const userId = profile.user || profile.user_id || profile.userId;
      let detail = { ...profile };

      const hasDetail = !!(profile.bio || profile.title || profile.skills || profile.email);
      if (!hasDetail) {
        if (id) {
          try { const d1 = await profileService.freelancer.getProfileById(id); if (d1) detail = { ...detail, ...d1 }; } catch (e) { console.debug('getProfileById failed', id); }
        }
        if ((!detail.bio && !detail.title && !detail.email) && userId) {
          try { const d2 = await profileService.freelancer.getProfileByUserId(userId); if (d2) detail = { ...detail, ...d2 }; } catch (e) { console.debug('getProfileByUserId failed', userId); }
        }
        if ((!detail.bio && !detail.title && !detail.email) && (userId || id)) {
          try { const list = await profileService.freelancer.listProfiles({ user_id: userId || id }); const arr = list?.results || list || []; if (arr && arr.length > 0) detail = { ...detail, ...arr[0] }; } catch (e) { console.debug('listProfiles filter failed'); }
        }
      }

      setSelected(detail);
    } catch (err) {
      console.error('Failed to load freelancer detail', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const filteredFreelancers = useMemo(() => {
    if (!searchTerm) return freelancers;
    const query = searchTerm.toLowerCase();
    return freelancers.filter((freelancer) => {
      const fields = [
        freelancer.name,
        freelancer.first_name,
        freelancer.last_name,
        freelancer.title,
        freelancer.tagline,
        freelancer.skills,
        freelancer.email
      ];
      return fields.some((value) =>
        value && value.toString().toLowerCase().includes(query)
      );
    });
  }, [freelancers, searchTerm]);

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Freelancers</Typography>

      <TextField
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search freelancers"
        size="small"
        fullWidth
        disabled={loading}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress /></Box>
      ) : (
        filteredFreelancers.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 6, color: 'text.secondary' }}>No freelancers match that search.</Box>
        ) : (
          <Grid container spacing={3}>
            {filteredFreelancers.map((f) => (
              <Grid item xs={12} sm={6} md={3} key={f.id || f.user || JSON.stringify(f)}>
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <Avatar sx={{ width: 64, height: 64, margin: "0 auto", mb: 2 }} src={f.profile_image || f.avatar || undefined}>{!(f.profile_image || f.avatar) && (f.first_name ? (f.first_name[0] + (f.last_name ? f.last_name[0] : '')).toUpperCase() : 'F')}</Avatar>
                  <Typography variant="h6">{f.name || `${f.first_name || ''} ${f.last_name || ''}`.trim() || 'Freelancer'}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{f.title || f.tagline || ''}</Typography>
                  <Button variant="outlined" size="small" fullWidth onClick={() => openProfile(f)}>View Profile</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      )}

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="md" fullWidth>
        <DialogTitle>Freelancer Profile</DialogTitle>
        <DialogContent dividers>
          {detailLoading && <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}
          {!detailLoading && selected && (
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar src={selected.profile_image || selected.avatar} sx={{ width: 88, height: 88 }}>
                  {!selected.profile_image && !selected.avatar && (selected.first_name ? (selected.first_name[0] + (selected.last_name ? selected.last_name[0] : '')).toUpperCase() : 'F')}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selected.name || `${selected.first_name || ''} ${selected.last_name || ''}`.trim() || 'Freelancer'}</Typography>
                  {selected.title && <Typography variant="body2" color="text.secondary">{selected.title}</Typography>}
                </Box>
              </Box>

              {selected.bio && <Box><Typography variant="subtitle2">About</Typography><Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{selected.bio}</Typography></Box>}

              {selected.skills && <Box><Typography variant="subtitle2">Skills</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{selected.skills.split(',').map((s,i) => <Box key={i} sx={{ px:1.5, py:0.5, bgcolor:'grey.100', borderRadius:1, fontSize:12 }}>{s.trim()}</Box>)}</Box></Box>}

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {selected.email && <Box><Typography variant="caption" color="text.secondary">Email</Typography><Typography variant="body2">{selected.email}</Typography></Box>}
                {selected.phone && <Box><Typography variant="caption" color="text.secondary">Phone</Typography><Typography variant="body2">{selected.phone}</Typography></Box>}
                {selected.location && <Box><Typography variant="caption" color="text.secondary">Location</Typography><Typography variant="body2">{selected.location}</Typography></Box>}
                {selected.website && <Box><Typography variant="caption" color="text.secondary">Website</Typography><Typography variant="body2"><a href={selected.website} target="_blank" rel="noreferrer">{selected.website}</a></Typography></Box>}
              </Box>

              {selected.portfolio_links && <Box><Typography variant="subtitle2">Portfolio</Typography><Box sx={{ display:'flex', flexDirection:'column', gap:1 }}>{selected.portfolio_links.split(',').map((link,i) => <a key={i} href={link.trim()} target="_blank" rel="noreferrer">{link.trim()}</a>)}</Box></Box>}

              {selected.documents && <Box><Typography variant="subtitle2">Documents</Typography><a href={selected.documents} target="_blank" rel="noreferrer">{selected.documents.split('/').pop()}</a></Box>}

              <Box sx={{ display:'flex', gap:2, flexWrap:'wrap' }}>{selected.created_at && <Typography variant="caption" color="text.secondary">Joined: {new Date(selected.created_at).toLocaleDateString()}</Typography>}{selected.hourly_rate && <Typography variant="caption" color="text.secondary">Rate: ₹{selected.hourly_rate}/hr</Typography>}</Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
