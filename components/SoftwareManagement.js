import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { Line } from 'react-chartjs-2';
import VehicleDisplay from './VehicleModel';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const Container = styled(Box)({
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontFamily: 'Lexend Deca, sans-serif',
  maxWidth: '100%',
  margin: '0 auto',
});

const Section = styled(Box)({
  marginBottom: '20px',
});

const tabs = ['Functions', 'Live Data', 'Advanced Functions'];

const subsections = [
  'DTC', 'Air Suspension', 'Brakes/ESP/TPMS', 'Airbag', 'Body', 'Battery/BMS', 'Cooling', 'BenchMode'
];

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const SoftwareManagement = () => {
  const [tab, setTab] = useState(0);
  const [section, setSection] = useState(subsections[0]);
  const [module, setModule] = useState('');
  const [part, setPart] = useState('');
  const [firmwareVersion, setFirmwareVersion] = useState('');
  const [liveData, setLiveData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Live Voltage Data',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const voltage = Math.random() * (15 - 12) + 12;

      setLiveData((prevData) => {
        const updatedLabels = [...prevData.labels, now].slice(-10); // Keep only last 10 data points
        const updatedData = [...prevData.datasets[0].data, voltage].slice(-10); // Keep only last 10 data points

        return {
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRedeploy = () => {
    console.log(`Redeploying module: ${module}`);
  };

  const handleReprogram = () => {
    console.log(`Reprogramming part: ${part}`);
  };

  const handleDownloadFirmware = () => {
    console.log(`Downloading firmware version: ${firmwareVersion}`);
  };

  const renderFunctions = () => {
    return (
      <>
        <Section>
          <Typography variant="h6" gutterBottom>
            Redeploy Car Modules
          </Typography>
          <TextField
            label="Module Name"
            variant="outlined"
            fullWidth
            value={module}
            onChange={(e) => setModule(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleRedeploy} sx={{ mt: 2 }}>
            Redeploy Module
          </Button>
        </Section>
        <Section>
          <Typography variant="h6" gutterBottom>
            Reprogram Used Parts
          </Typography>
          <TextField
            label="Part Name"
            variant="outlined"
            fullWidth
            value={part}
            onChange={(e) => setPart(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleReprogram} sx={{ mt: 2 }}>
            Reprogram Part
          </Button>
        </Section>
        <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
          <InputLabel id="section-select-label">Select Section</InputLabel>
          <Select
            labelId="section-select-label"
            value={section}
            label="Select Section"
            onChange={(e) => setSection(e.target.value)}
          >
            {subsections.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderSection()}
      </>
    );
  };

  const renderAdvancedFunctions = () => {
    return (
      <>
        <Section>
          <Typography variant="h6" gutterBottom>
            Download Current Firmware
          </Typography>
          <TextField
            label="Firmware Version"
            variant="outlined"
            fullWidth
            value={firmwareVersion}
            onChange={(e) => setFirmwareVersion(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleDownloadFirmware} sx={{ mt: 2 }}>
            Download Firmware
          </Button>
        </Section>
        <Section>
          <Typography variant="h6" gutterBottom>
            Other Advanced Functions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth>Reset Contractor Stress Index</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth>Reset Contractor WOT Count</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth>BMS Contact Reset</Button>
            </Grid>
          </Grid>
        </Section>
        <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
          <InputLabel id="section-select-label">Select Section</InputLabel>
          <Select
            labelId="section-select-label"
            value={section}
            label="Select Section"
            onChange={(e) => setSection(e.target.value)}
          >
            {subsections.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderSection()}
      </>
    );
  };

  const renderLiveData = () => {
    return (
      <Section>
        <Typography variant="h6" gutterBottom>
          Live Data
        </Typography>
        <Line
          data={liveData}
          options={{
            scales: {
              x: { title: { display: true, text: 'Time' } },
              y: { title: { display: true, text: 'Voltage (V)' } },
            },
          }}
        />
      </Section>
    );
  };

  const renderSection = () => {
    switch (section) {
      case 'DTC':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              Diagnostic Trouble Codes (DTC)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Read All DTC</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Clear All DTC</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>View DTC</Button>
              </Grid>
            </Grid>
          </Section>
        );
      case 'Air Suspension':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              Air Suspension Management
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Set Ride Height</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Service Mode</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Get Pressure</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Clear Crash Data</Button>
              </Grid>
            </Grid>
          </Section>
        );
      case 'Brakes/ESP/TPMS':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              Brake System Diagnostics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Check Brake System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Reset Brake System</Button>
              </Grid>
            </Grid>
          </Section>
        );
      case 'Airbag':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              Airbag Diagnostics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Check Airbag Status</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Reset Airbag System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Read EEPROM</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Unlock EEPROM</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Erase VIN</Button>
              </Grid>
            </Grid>
          </Section>
        );
      case 'Body':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              Body Control
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Door Handles</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>ICE Breaker</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Calibration Procedures</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Remote Unlock Code</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Charge Port</Button>
              </Grid>
            </Grid>
          </Section>
        );
      case 'Battery/BMS':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              Battery Management
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Read Battery Status</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Reset Battery System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Contact Reset</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Contractor Stress Index</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>WOT Count</Button>
              </Grid>
            </Grid>
          </Section>
        );
      case 'Cooling':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              Cooling System Management
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Check Cooling System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Reset Cooling System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>AirPurge Start/Stop</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>THC Refill/Drain</Button>
              </Grid>
            </Grid>
          </Section>
        );
      case 'BenchMode':
        return (
          <Section>
            <Typography variant="h6" gutterBottom>
              BenchMode
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Read BenchMode Status</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Enable BenchMode</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>Disable BenchMode</Button>
              </Grid>
            </Grid>
          </Section>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom align="center">
        Software Management
      </Typography>
      <VehicleDisplay modelPath="/models/tesla_model_3.glb" />
      <Tabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {tabs.map((tabLabel, index) => (
          <Tab key={index} label={tabLabel} />
        ))}
      </Tabs>
      {tab === 0 && renderFunctions()}
      {tab === 1 && renderLiveData()}
      {tab === 2 && renderAdvancedFunctions()}
    </Container>
  );
};

export default SoftwareManagement;
