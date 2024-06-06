// components/VerificationEmail.js
import React from 'react';
import { Html, Head, Body, Container, Text, Link, Section } from '@react-email/components';

export default function VerificationEmail({ username, otp }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={section} align="center">
            <Text style={header}>Uniika</Text>
          </Section>
          <Section style={section}>
            <Text style={paragraph}>Dear {username},</Text>
            <Text style={paragraph}>
              Your OTP for verification is: <b>{otp}</b>
            </Text>
            <Text style={paragraph}>
              Please enter this OTP to verify your account. This OTP is valid for 10 minutes.
            </Text>
            <Section align="center" style={section}>
              <Link href="http://localhost:3000/dashboard" style={buttonLink}>
                <Container style={buttonContainer}>
                  <Text style={buttonText}>Verify Account</Text>
                </Container>
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f6f6',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '80%',
  maxWidth: '600px',
};

const section = {
  marginBottom: '20px',
};

const header = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center',
};

const paragraph = {
  fontSize: '15px',
  margin: '10px 0',
};

const buttonLink = {
  textDecoration: 'none',
};

const buttonContainer = {
  backgroundColor: '#4CAF50',
  borderRadius: '5px',
  padding: '10px',
  textAlign: 'center',
};

const buttonText = {
  color: 'white',
  fontWeight: 'bold',
};

