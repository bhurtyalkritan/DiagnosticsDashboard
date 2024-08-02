import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Tabs, Tab, LinearProgress } from '@mui/material';
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
  const [mockData, setMockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
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

  const handleButtonClick = (action, detail) => {
    setLoading(true);
    setLoadingProgress(0);
    setMockData(null);
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setLoading(false);
          setMockData({ type: action, data: detail });
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const renderMockData = () => {
    if (loading) {
      return (
        <Section>
          <Typography variant="h6" gutterBottom>
            {mockData?.type} in progress...
          </Typography>
          <LinearProgress variant="determinate" value={loadingProgress} />
        </Section>
      );
    }

    if (!mockData) return null;

    return (
      <Section>
        <Typography variant="h6" gutterBottom>
          {mockData.type} Result
        </Typography>
        <Typography variant="body1">
          {mockData.data}
        </Typography>
      </Section>
    );
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
          <Button variant="contained" color="primary" fullWidth onClick={() => handleButtonClick('Redeploy Module', `Module ${module} redeployed successfully.`)} sx={{ mt: 2 }}>
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
          <Button variant="contained" color="primary" fullWidth onClick={() => handleButtonClick('Reprogram Part', `Part ${part} reprogrammed successfully.`)} sx={{ mt: 2 }}>
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
        {renderMockData()}
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
          <Button variant="contained" color="primary" fullWidth onClick={() => handleButtonClick('Download Firmware', `Firmware version ${firmwareVersion} downloaded successfully.`)} sx={{ mt: 2 }}>
            Download Firmware
          </Button>
        </Section>
        <Section>
          <Typography variant="h6" gutterBottom>
            Other Advanced Functions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Reset Contactor Stress Index', 'Contactor stress index reset successfully.')}>Reset Contactor Stress Index</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Reset Contactor WOT Count', 'Contactor WOT count reset successfully.')}>Reset Contactor WOT Count</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={() => handleButtonClick('BMS Contact Reset', 'BMS contact reset successfully.')}>BMS Contact Reset</Button>
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
        {renderMockData()}
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Read All DTC', 'All DTCs read successfully.')}>Read All DTC</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Clear All DTC', 'All DTCs cleared successfully.')}>Clear All DTC</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('View DTC', 'DTC viewed successfully.')}>View DTC</Button>
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Set Ride Height', 'Ride height set successfully.')}>Set Ride Height</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Service Mode', 'Service mode activated successfully.')}>Service Mode</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Get Pressure', 'Pressure retrieved successfully.')}>Get Pressure</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Clear Crash Data', 'Crash data cleared successfully.')}>Clear Crash Data</Button>
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Check Brake System', 'Brake system checked successfully.')}>Check Brake System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Reset Brake System', 'Brake system reset successfully.')}>Reset Brake System</Button>
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Check Airbag Status', 'Airbag status checked successfully.')}>Check Airbag Status</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Reset Airbag System', 'Airbag system reset successfully.')}>Reset Airbag System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Read EEPROM', 'EEPROM read successfully.')}>Read EEPROM</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Unlock EEPROM', 'EEPROM unlocked successfully.')}>Unlock EEPROM</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Erase VIN', 'VIN erased successfully.')}>Erase VIN</Button>
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Door Handles', 'Door handles managed successfully.')}>Door Handles</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('ICE Breaker', 'ICE breaker activated successfully.')}>ICE Breaker</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Calibration Procedures', 'Calibration procedures completed successfully.')}>Calibration Procedures</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Remote Unlock Code', 'Remote unlock code set successfully.')}>Remote Unlock Code</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Charge Port', 'Charge port managed successfully.')}>Charge Port</Button>
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Read Battery Status', 'Battery status read successfully.')}>Read Battery Status</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Reset Battery System', 'Battery system reset successfully.')}>Reset Battery System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Contact Reset', 'Contact reset successfully.')}>Contact Reset</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Contactor Stress Index', 'Contactor stress index read successfully.')}>Contactor Stress Index</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('WOT Count', 'WOT count retrieved successfully.')}>WOT Count</Button>
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Check Cooling System', 'Cooling system checked successfully.')}>Check Cooling System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Reset Cooling System', 'Cooling system reset successfully.')}>Reset Cooling System</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('AirPurge Start/Stop', 'Air purge started/stopped successfully.')}>AirPurge Start/Stop</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('THC Refill/Drain', 'THC refill/drain completed successfully.')}>THC Refill/Drain</Button>
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
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Read BenchMode Status', 'BenchMode status read successfully.')}>Read BenchMode Status</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Enable BenchMode', 'BenchMode enabled successfully.')}>Enable BenchMode</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={() => handleButtonClick('Disable BenchMode', 'BenchMode disabled successfully.')}>Disable BenchMode</Button>
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