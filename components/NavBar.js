import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  margin: '10px auto',
  width: '70%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Lexend Deca, sans-serif',
});

const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: '10px',
});

const StatusBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

const NavBar = ({ status }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <LogoBox>
          <img src="/tesla.png" alt="Tesla Logo" style={{ height: '30px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" style={{ color: '#000' }}>
            Diagnostic Portal
          </Typography>
        </LogoBox>
        <StatusBox>
          {status === 'Good' ? (
            <CheckCircleIcon style={{ color: 'green', marginRight: '5px' }} />
          ) : (
            <ErrorIcon style={{ color: 'red', marginRight: '5px' }} />
          )}
          <Typography variant="h6" component="div" style={{ color: status === 'Good' ? 'green' : 'red' }}>
            {status}
          </Typography>
        </StatusBox>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
