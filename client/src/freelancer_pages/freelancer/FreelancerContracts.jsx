import React, { useEffect, useState, useMemo } from "react";
import { Typography, Card, Box, Chip, TextField, MenuItem, Stack, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from "@mui/icons-material/Description";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";
import { contractService } from "../../services/contractService";
import profileService from "../../services/profileService";
import { useUser } from "../../context/UserContext";

export default function Contracts() {
  const { user } = useUser();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // If backend returns contracts scoped by authenticated user, this will work for freelancers.
        // Optionally pass freelancer id: { freelancer: user.id }
        const data = await contractService.getContracts(user ? { freelancer: user.id } : {});
        const items = data?.results || data || [];
        if (!mounted) return;
        setContracts(items);

        // If client name is missing from some contracts, fetch contract details and merge
        const needDetail = items.filter((c) => {
          const name = c.client?.name || c.client_name || (c.client && typeof c.client === 'object' && (c.client.name || c.client.first_name));
          return !name;
        });

        if (needDetail.length > 0) {
          await Promise.all(needDetail.map(async (c) => {
            try {
              const d = await contractService.getContract(c.id);
              if (d) {
                // If client field is an id, try resolving client profile by user id
                if (d.client && (typeof d.client === 'number' || typeof d.client === 'string')) {
                  try {
                    const pf = await profileService.client.getProfileByUserId(d.client);
                    if (pf) d.client = pf;
                  } catch (e) {
                    // ignore
                  }
                }
                setContracts((prev) => prev.map((p) => p.id === d.id ? { ...p, ...d } : p));
              }
            } catch (err) {
              console.debug('Failed to fetch contract detail', c.id, err?.message || err);
            }
          }));
        }
      } catch (err) {
        console.error("Failed to load contracts", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [user]);

  const statuses = useMemo(() => ["all", "pending", "signed", "cancelled"], []);

  const visible = useMemo(() => {
    return contracts.filter((c) => {
      // Status filter
      if (status !== "all") {
        const s = (c.status || c.state || "").toString().toLowerCase();
        if (s !== status) return false;
      }

      // Query filter: contract title or client name
      if (query) {
        const q = query.toLowerCase();
        const title = (c.title || c.name || c.contract_title || "").toString().toLowerCase();
        const client = (c.client?.name || c.client_name || c.client || "").toString().toLowerCase();
        return title.includes(q) || client.includes(q);
      }

      return true;
    });
  }, [contracts, query, status]);

  const resolveName = (entity, fallback) => {
    if (entity == null) return fallback || 'N/A';
    if (typeof entity === 'string') return entity;
    if (typeof entity === 'number') return `User #${entity}`;
    if (typeof entity === 'object') {
      if (entity.name) return entity.name;
      const first = entity.first_name || entity.firstName || '';
      const last = entity.last_name || entity.lastName || '';
      const full = `${first} ${last}`.trim();
      if (full) return full;
      if (entity.username) return entity.username;
      if (entity.email) return entity.email;
    }
    return fallback || 'N/A';
  };

  return (
    <FreelancerLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Contracts</Typography>

      <Card sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search by contract or client"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
            sx={{ minWidth: 240 }}
          />

          <TextField
            select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ width: 160 }}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>{s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
            ))}
          </TextField>

          <Box sx={{ ml: 'auto' }}>
            <IconButton onClick={() => { setQuery(''); setStatus('all'); }} title="Clear filters">
              Clear
            </IconButton>
          </Box>
        </Stack>
      </Card>

      <Card sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress /></Box>
        ) : visible.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center', color: 'text.secondary' }}>No contracts found.</Box>
        ) : (
          visible.map((c) => (
            <Box key={c.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DescriptionIcon color="action" />
                <Box>
                  <Typography fontWeight={600}>{c.title || c.name || c.contract_title || 'Contract'}</Typography>
                  <Typography variant="caption" color="text.secondary">{new Date(c.created_at || c.date || c.created || Date.now()).toLocaleDateString()}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{resolveName(c.client ?? c.client_name ?? c.client_user)}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label={(c.status || c.state || '').toString().replace(/_/g, ' ') || 'Unknown'} color={(c.status || c.state || '').toString().toLowerCase() === 'signed' ? 'success' : 'warning'} size="small" />
                <Button size="small" onClick={() => { setSelectedContract(c); setDetailOpen(true); }}>View</Button>
                {/* Show sign button inline for freelancers when contract is not signed or cancelled */}
                {((c.status || c.state || '').toString().toLowerCase() !== 'signed' && (c.status || c.state || '').toString().toLowerCase() !== 'cancelled') && (
                  <Button size="small" variant="contained" onClick={async () => {
                    const id = c.id;
                    setActionLoading((s) => ({ ...s, [id]: true }));
                    try {
                      await contractService.updateContract(id, { status: 'signed' });
                      // optimistic local update
                      setContracts((prev) => prev.map((x) => x.id === id ? { ...x, status: 'signed' } : x));
                    } catch (err) {
                      console.error('Sign contract failed', err);
                    } finally {
                      setActionLoading((s) => { const n = { ...s }; delete n[id]; return n; });
                    }
                  }} disabled={!!actionLoading[c.id]}>
                    {actionLoading[c.id] ? 'Signing...' : 'Sign'}
                  </Button>
                )}
              </Box>
            </Box>
          ))
        )}
      </Card>

      {/* Details dialog */}
      <Dialog open={detailOpen} onClose={() => { setDetailOpen(false); setSelectedContract(null); }} maxWidth="md" fullWidth>
        <DialogTitle>Contract Details</DialogTitle>
        <DialogContent dividers>
          {selectedContract ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
              <Typography variant="h6">{selectedContract.title || selectedContract.name}</Typography>
              <Typography variant="body2" color="text.secondary">Client: {selectedContract.client?.name || selectedContract.client_name || selectedContract.client || 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">Amount: {selectedContract.total_amount != null ? Number(selectedContract.total_amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">Start Date: {selectedContract.start_date || 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">End Date: {selectedContract.end_date || 'N/A'}</Typography>
              <Box>
                <Typography variant="subtitle2">Terms</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{selectedContract.terms || 'No terms provided.'}</Typography>
              </Box>
            </Box>
          ) : (
            <Box>Loading...</Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDetailOpen(false); setSelectedContract(null); }}>Close</Button>
          {selectedContract && ((selectedContract.status || selectedContract.state || '').toString().toLowerCase() !== 'signed' && (selectedContract.status || selectedContract.state || '').toString().toLowerCase() !== 'cancelled') && (
            <Button variant="contained" onClick={async () => {
              const id = selectedContract.id;
              setActionLoading((s) => ({ ...s, [id]: true }));
              try {
                await contractService.updateContract(id, { status: 'signed' });
                setContracts((prev) => prev.map((x) => x.id === id ? { ...x, status: 'signed' } : x));
                setSelectedContract((s) => s ? { ...s, status: 'signed' } : s);
                setDetailOpen(false);
              } catch (err) {
                console.error('Sign from details failed', err);
              } finally {
                setActionLoading((s) => { const n = { ...s }; delete n[id]; return n; });
              }
            }} disabled={!!actionLoading[selectedContract?.id]}> {actionLoading[selectedContract?.id] ? 'Signing...' : 'Sign Contract'}</Button>
          )}
        </DialogActions>
      </Dialog>
    </FreelancerLayout>
  );
}