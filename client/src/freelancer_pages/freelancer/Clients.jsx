import React, { useEffect, useState } from "react";
import { Typography, Grid, Card, Avatar, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";
import profileService from "../../services/profileService";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await profileService.client.listProfiles();
        const items = data?.results || data || [];
        if (!mounted) return;
        setClients(items);
      } catch (err) {
        console.error("Failed to load clients", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const openProfile = async (profile) => {
    // profile may already be full object or minimal; fetch detail if needed
    if (!profile) return;
    setDetailLoading(true);
    try {
      const id = profile.id;
      const userId = profile.user || profile.user_id || profile.userId || profile.userId;
      let detail = { ...profile };

      // If profile already has substantial fields, use it
      const hasDetail = !!(profile.bio || profile.title || profile.company || profile.email || profile.phone || profile.skills);

      if (!hasDetail) {
        // Try multiple ways to fetch a rich profile, prefer profile id, then user id, then listProfiles filter
        if (id) {
          try {
            const d1 = await profileService.client.getProfileById(id);
            if (d1) detail = { ...detail, ...d1 };
          } catch (e) {
            // ignore and continue
            console.debug('getProfileById failed', id, e?.message || e);
          }
        }

        if ((!detail.bio && !detail.title && !detail.email) && userId) {
          try {
            const d2 = await profileService.client.getProfileByUserId(userId);
            if (d2) detail = { ...detail, ...d2 };
          } catch (e) {
            console.debug('getProfileByUserId failed', userId, e?.message || e);
          }
        }

        // As a last attempt, try listProfiles filtered by possible ids (some APIs return arrays)
        if ((!detail.bio && !detail.title && !detail.email) && (userId || id)) {
          try {
            const list = await profileService.client.listProfiles({ user_id: userId || id });
            const arr = list?.results || list || [];
            if (arr && arr.length > 0) detail = { ...detail, ...arr[0] };
          } catch (e) {
            console.debug('listProfiles filter failed', e?.message || e);
          }
        }

        // If still missing, try freelancer service as a fallback (some data might live there)
        if ((!detail.bio && !detail.title && !detail.email) && userId) {
          try {
            const f = await profileService.freelancer.getProfileByUserId(userId);
            if (f) detail = { ...detail, ...f };
          } catch (e) {
            console.debug('freelancer.getProfileByUserId fallback failed', userId, e?.message || e);
          }
        }
      }

      setSelected(detail);
    } catch (err) {
      console.error('Failed to load profile detail', err);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <FreelancerLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Find New Clients</Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress /></Box>
      ) : (
        <Grid container spacing={3}>
          {clients.map((c) => (
            <Grid item xs={12} sm={6} md={3} key={c.id || c.user || JSON.stringify(c)}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Avatar sx={{ width: 64, height: 64, margin: "0 auto", mb: 2 }} src={c.profile_image || c.avatar || undefined}>{!(c.profile_image || c.avatar) && (c.first_name ? (c.first_name[0] + (c.last_name ? c.last_name[0] : '')).toUpperCase() : 'C')}</Avatar>
                <Typography variant="h6">{c.name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || c.company || 'Client'}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{c.title || c.company || ''}</Typography>
                <Button variant="outlined" size="small" fullWidth onClick={() => openProfile(c)}>View Profile</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Client Profile</DialogTitle>
        <DialogContent dividers>
          {detailLoading && <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}
          {!detailLoading && selected && (
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar src={selected.profile_image || selected.avatar} sx={{ width: 72, height: 72 }}>
                  {!selected.profile_image && !selected.avatar && (selected.first_name ? (selected.first_name[0] + (selected.last_name ? selected.last_name[0] : '')).toUpperCase() : 'C')}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selected.name || `${selected.first_name || ''} ${selected.last_name || ''}`.trim() || 'Client'}</Typography>
                  {selected.title || selected.company ? (
                    <Typography variant="body2" color="text.secondary">{[selected.title, selected.company].filter(Boolean).join(' • ')}</Typography>
                  ) : null}
                </Box>
              </Box>

              {/* Contact & Metadata */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {selected.email && <Box><Typography variant="caption" color="text.secondary">Email</Typography><Typography variant="body2">{selected.email}</Typography></Box>}
                {selected.phone && <Box><Typography variant="caption" color="text.secondary">Phone</Typography><Typography variant="body2">{selected.phone}</Typography></Box>}
                {selected.location && <Box><Typography variant="caption" color="text.secondary">Location</Typography><Typography variant="body2">{selected.location}</Typography></Box>}
                {selected.website && <Box><Typography variant="caption" color="text.secondary">Website</Typography><Typography variant="body2"><a href={selected.website} target="_blank" rel="noreferrer">{selected.website}</a></Typography></Box>}
              </Box>

              {/* Bio */}
              {selected.bio && (
                <Box>
                  <Typography variant="subtitle2">About</Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{selected.bio}</Typography>
                </Box>
              )}

              {/* Skills / Expertise */}
              {selected.skills && (
                <Box>
                  <Typography variant="subtitle2">Skills</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {selected.skills.split(',').map((s, i) => (
                      <Box key={i} sx={{ px: 1.5, py: 0.5, bgcolor: 'grey.100', borderRadius: 1, fontSize: 12 }}>{s.trim()}</Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Documents / Portfolio */}
              {selected.portfolio_links && (
                <Box>
                  <Typography variant="subtitle2">Portfolio</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                    {selected.portfolio_links.split(',').map((link, i) => (
                      <a key={i} href={link.trim()} target="_blank" rel="noreferrer">{link.trim()}</a>
                    ))}
                  </Box>
                </Box>
              )}

              {selected.documents && (
                <Box>
                  <Typography variant="subtitle2">Documents</Typography>
                  <a href={selected.documents.startsWith('http') ? selected.documents : selected.documents} target="_blank" rel="noreferrer">{selected.documents.split('/').pop()}</a>
                </Box>
              )}

              {/* Metadata */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {selected.created_at && <Typography variant="caption" color="text.secondary">Joined: {new Date(selected.created_at).toLocaleDateString()}</Typography>}
                {selected.company && <Typography variant="caption" color="text.secondary">Company: {selected.company}</Typography>}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </FreelancerLayout>
  );
}