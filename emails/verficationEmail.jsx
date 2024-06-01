// import {
//     Html,
//     Head,
//     Font,
//     Preview,
//     Heading,
//     Row,
//     Section,
//     Text,
//     Button,
//     Link,
//   } from '@react-email/components';

  
//   export default function VerificationEmail({ username, otp }) {
//     return (
//       <Html lang="en" dir="ltr">
//         <Head>
//           <title>Verification Code</title>
//           <Font
//             fontFamily="Roboto"
//             fallbackFontFamily="Verdana"
//             webFont={{
//               url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
//               format: 'woff2',
//             }}
//             fontWeight={400}
//             fontStyle="normal"
//           />
//         </Head>
//         <Preview>Here&apos;s your verification code: {otp}</Preview>
//         <Section>
//           <Row>
//             <Heading as="h2">Hello {username},</Heading>
//           </Row>
//           <Row>
//             <Text>
//               Thank you for registering. Please use the following verification
//               code to complete your registration:
//             </Text>
//           </Row>
//           <Row>
//             <Text>{otp}</Text> 
//           </Row>
//           <Row>
//             <Text>
//               If you did not request this code, please ignore this email.
//             </Text>
//           </Row>
//           <Row>
//             <Text>
//               To verify your email address, please click the link below:
//             </Text>
//             <Button
//               href={`http://localhost:3000/dashboard`}
//               style={{ color: '#61dafb' }}
//             >
//               Verify here
//             </Button>
//           </Row>
//         </Section>
//       </Html>
//     );
//   }



import React from 'react';
import { Email, Item, A, Box, Image, Span, renderEmail } from 'react-html-email';

export default function VerificationEmail({username,otp }){
  return (
    <Email title="OTP Verification">
      <Item align="center">
        <Span fontSize={20}>Uniika</Span>
      </Item>
      <Item>
        <Box>
          <Item>
            <Span fontSize={15}>Dear {username},</Span>
          </Item>
          <Item>
            <Span fontSize={15}>
              Your OTP for verification is: <b>{otp}</b>
            </Span>
          </Item>
          <Item>
            <Span fontSize={15}>
              Please enter this OTP to verify your account. This OTP is valid for 10 minutes.
            </Span>
          </Item>
          <Item align="center">
            <A href="http://localhost:3000/dashboard">
              <Box cellSpacing={20} bgcolor="#4CAF50" style={{ borderRadius: '5px', color: 'white', padding: '10px' }}>
                Verify Account
              </Box>
            </A>
          </Item>
        </Box>
      </Item>
    </Email>
  );
};

// Render the component to static markup
// const html = renderEmail(<VerificationEmail otp="123456" />);
