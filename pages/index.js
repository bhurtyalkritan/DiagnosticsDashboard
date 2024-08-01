import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import dynamic from 'next/dynamic';
import VoltageChart from '../components/VoltageChart';
import StatusMessages from '../components/StatusMessages';
import AnomalyDetection from '../components/AnomalyDetection';
import VehicleStats from '../components/VehicleStats';
import VehiclePieChart from '../components/VehiclePieChart';
import TestCard from '../components/TestCard';
import NavBar from '../components/NavBar';
import VehicleHealthReport from '../components/VehicleHealthReport';
import LiveDataMonitoring from '../components/LiveDataMonitoring';
import EmissionTesting from '../components/EmissionTesting';
import {
  mockVoltageData,
  mockStatusMessages,
  mockVehicleSpecs,
  mockVehicleTypes,
} from './mockData';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

const StyledContainer = styled(Container)({
  fontFamily: 'Lexend Deca, sans-serif',
  marginTop: '20px',
});

const StyledPaper = styled(Paper)({
  padding: '16px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export default function Home() {
  const [voltageData, setVoltageData] = useState(mockVoltageData);
  const [statusMessages, setStatusMessages] = useState(mockStatusMessages);
  const [vehicleTypes, setVehicleTypes] = useState(mockVehicleTypes);
  const [vehicleSpecs, setVehicleSpecs] = useState(mockVehicleSpecs);
  const [status, setStatus] = useState('Good');

  // Uncomment this section to fetch real data from the server
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const voltageResponse = await axiosInstance.get('/voltage?records=100');
  //       setVoltageData(voltageResponse.data.data);

  //       const statusResponse = await axiosInstance.get('/voltage/alerts');
  //       setStatusMessages(statusResponse.data);

  //       const vehicleTypesResponse = await axiosInstance.get('/vehicle/types');
  //       setVehicleTypes(vehicleTypesResponse.data);

  //       const vehicleSpecsResponse = await axiosInstance.get('/vehicle/specs');
  //       setVehicleSpecs(vehicleSpecsResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setStatus('Down');
  //     }
  //   }

  //   fetchData();
  // }, []);

  const vehicleData = {
    voltageData,
    statusMessages,
    vehicleSpecs,
  };

  return (
    <StyledContainer>
      <NavBar status={status} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" align="center" gutterBottom>
              Status Messages
            </Typography>
            <StatusMessages messages={statusMessages} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" align="center" gutterBottom>
              Vehicle Specifications
            </Typography>
            <VehicleStats data={vehicleSpecs} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" align="center" gutterBottom>
              Anomaly Detection
            </Typography>
            <AnomalyDetection data={voltageData} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" align="center" gutterBottom>
              Voltage Data
            </Typography>
            <VoltageChart data={voltageData} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" align="center" gutterBottom>
              Vehicle Types Distribution
            </Typography>
            <VehiclePieChart data={vehicleTypes} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" align="center" gutterBottom>
              Test API
            </Typography>
            <TestCard />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <LiveDataMonitoring />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <EmissionTesting />
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper>
            {typeof window !== 'undefined' && (
              <PDFDownloadLink
                document={<VehicleHealthReport vehicleData={vehicleData} />}
                fileName="vehicle_health_report.pdf"
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) =>
                  loading ? (
                    <Button variant="contained" color="primary" disabled fullWidth>
                      Generating Report...
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" fullWidth>
                      Generate Vehicle Health Report
                    </Button>
                  )
                }
              </PDFDownloadLink>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
