// components/ChangeEmail.js
import React from 'react';
import { Html, Head, Body, Container, Text, Link } from '@react-email/components';

const ChangeEmail = ({ email, token }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <table width="100%" cellPadding="0" cellSpacing="0" border="0">
          <tr>
            <td align="center">
              <Text style={header}>Uniika</Text>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                <tr>
                  <td>
                    <Text style={paragraph}>Dear {email},</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text style={paragraph}>
                      Please click the button below to update your email address to new email address '{email}'
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Link href={`http://localhost:3000/verified/logout/${token}`} style={button}>
                      <table cellSpacing="20" bgcolor="#4CAF50">
                        <tr>
                          <td align="center">
                            <Text style={buttonText}>Verify Account</Text>
                          </td>
                        </tr>
                      </table>
                    </Link>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </Container>
    </Body>
  </Html>
);

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

const header = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '15px',
  margin: '10px 0',
};

const button = {
  textDecoration: 'none',
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#ffffff',
  borderRadius: '5px',
  marginTop: '20px',
};

const buttonText = {
  color: '#ffffff',
  fontWeight: 'bold',
};

export default ChangeEmail;
