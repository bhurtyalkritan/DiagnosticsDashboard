import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1px solid #ccc',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

// Create Document Component
const VehicleHealthReport = ({ vehicleData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Vehicle Health Report</Text>
        <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Overview</Text>
        <Text style={styles.text}>
          This report provides a comprehensive analysis of the vehicle&apos;s current health status,
          including real-time sensor data, engine parameters, emission test results, and more.
          Each section is designed to give you detailed insights into the vehicle&apos;s performance
          and any potential issues that may need attention.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Status Messages</Text>
        <Text style={styles.text}>
          The status messages provide real-time alerts and notifications about the vehicle&apos;s
          performance. These messages can help you quickly identify any anomalies or issues
          that need immediate attention.
        </Text>
        <View style={styles.table}>
          {vehicleData.statusMessages.length > 0 ? (
            <>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Timestamp</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Message</Text>
                </View>
              </View>
              {vehicleData.statusMessages.map((message, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{message.timestamp}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{message.alert_message}</Text>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.text}>No status messages available.</Text>
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Vehicle Specifications</Text>
        <Text style={styles.text}>
          The following table lists the key specifications of the vehicle. This information is
          essential for understanding the vehicle&apos;s capabilities and performance characteristics.
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Vehicle Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Horsepower</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Torque (lb-ft)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Weight (lbs)</Text>
            </View>
          </View>
          {vehicleData.vehicleSpecs.map((spec, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{spec.vehicle_type}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{spec.horsepower}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{spec.torque}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{spec.weight}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Voltage Data</Text>
        <Text style={styles.text}>
          This section provides detailed voltage data, including the measurements of various
          sensors and parameters. Voltage data is crucial for monitoring the electrical
          health of the vehicle.
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Timestamp</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Voltage (V)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Temperature (°C)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Current (A)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Engine RPM</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Vehicle Speed (km/h)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fuel Level (%)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Status Message</Text>
            </View>
          </View>
          {vehicleData.voltageData.map((data, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.timestamp}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.voltage}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.temperature}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.current}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.engine_rpm}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.vehicle_speed}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.fuel_level}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.status_message}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Emission Testing</Text>
        <Text style={styles.text}>
          Emission testing is critical for ensuring that the vehicle meets environmental
          standards. This section summarizes the results of various emission-related tests,
          including oxygen sensor tests and catalytic converter efficiency.
        </Text>
        <View style={styles.table}>
          {vehicleData.emissionData ? (
            <>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Test</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Result</Text>
                </View>
              </View>
              {vehicleData.emissionData.map((data, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.test}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.result}</Text>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.text}>No emission data available.</Text>
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Conclusion</Text>
        <Text style={styles.text}>
          This report has provided an in-depth analysis of the vehicle&apos;s health status. Regular
          monitoring and maintenance based on this report can help ensure optimal performance
          and longevity of the vehicle. If any issues were identified, it is recommended to
          address them promptly to avoid further complications.
        </Text>
      </View>
    </Page>
  </Document>
);

export default VehicleHealthReport;
