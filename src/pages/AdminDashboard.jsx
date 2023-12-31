import './admin-dashboard.css';
import React from 'react';
import { BASE_URL, ENDPOINTS } from '../constants/api';
import {
  List,
  ListItem,
  IconButton,
  CircularProgress,
  TextField,
  Tooltip,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage.mjs';
import ROUTES from '../constants/routes.mjs';
import { useTranslation } from 'react-i18next';
import LangSelector from '../components/LanguageSelector.jsx';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const adminId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.adminId);

  if (!adminId) {
    window.location.href = ROUTES.login + '?admin=true';
    return null;
  }

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch(`${BASE_URL}/${ENDPOINTS.users}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    fetch(`${BASE_URL}/${ENDPOINTS.users}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setUsers(users.filter((user) => user.teacher_id !== userId));
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
    );

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 className="admin-header">{t('admin.adminTitle')}</h1>

      <div className="action-container">
        <TextField
          className="search-user-field"
          label={t('admin.searchUser')}
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', width: '50%' }}
        />
        <Tooltip title={t('admin.logout')}>
          <IconButton
            className="admin-logout-button"
            onClick={() => {
              window.localStorage.removeItem(LOCAL_STORAGE_KEYS.userId);
              window.location.href = '/';
            }}
            color="inherit">
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <LangSelector />
      </div>
      <List className="admin-list">
        {filteredUsers.map((user) => (
          <ListItem
            key={user.teacher_id}
            style={{
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '5px',
              columnGap: '20px',
            }}>
            <Tooltip title={t('admin.deleteUserTooltip')}>
              <IconButton
                className="delete-user-button"
                onClick={() => handleDeleteUser(user.teacher_id)}
                color="inherit">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {user.email}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
