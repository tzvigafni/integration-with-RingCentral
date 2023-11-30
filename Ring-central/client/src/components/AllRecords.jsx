import { Box, CircularProgress, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardOne from "./CardOne";
import CardOnePhD from "./CardOnePhD";

function AllRecords() {

    const [dataRC, setDataRC] = useState(null);
    const [agentRC, setAgentRC] = useState(null);
    const [dataPhonedo, setDataPhonedo] = useState(null);
    const [agentPhonedo, setAgentPhonedo] = useState(null);
    const [errors, setErrors] = useState(null);
    const [saved, setSaved] = useState(null);

    let parsedPhoneNumbers;

    if (dataRC) {
        parsedPhoneNumbers = JSON.parse(dataRC);
        console.log("parsedPhoneNumbers RC - ", parsedPhoneNumbers);
    }

    if (agentRC) {
        parsedPhoneNumbers = null;
    }

    useEffect(() => {
        if (agentPhonedo) {
            const extensionId = agentRC.id;
            const phoneNumber = agentPhonedo.telephone?.telephone;

            async function fetchData() {
                try {
                    const response = await fetch(`https://ringcentral-integration.serveo.net/getphonenumbers/saveagents?extensionId=${extensionId}&phoneNumber=${phoneNumber}`);
                     const data = await response.text();
                    console.log("data --- ", data);
                    setSaved(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setErrors(error);
                }
            }
            fetchData();
        }
    }, [agentPhonedo]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://ringcentral-integration.serveo.net/getphonenumbers");
                const data = await response.text();
                setDataRC(data);
            } catch (error) {
                console.log('error -', error);
                setErrors(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1 >List Users</h1>
                <h3>Please select a call forwarding user</h3>
            </div>

            {dataRC && (
                <Grid container justifyContent="center">
                    {parsedPhoneNumbers && parsedPhoneNumbers.records.map((record) => (
                        <CardOne key={record.id} record={record} setAgentRC={setAgentRC} agentRC={agentRC} setAgentPhonedo={setAgentPhonedo} setDataRC={setDataRC} setDataPhonedo={setDataPhonedo} />
                    ))}
                </Grid>
            )}

            {dataPhonedo && (
                <Grid container justifyContent="center">
                    {dataPhonedo && dataPhonedo["hydra:member"].map((record) => (
                        <CardOnePhD key={record.id} record={record} setAgentRC={setAgentRC} agentRC={agentRC} setAgentPhonedo={setAgentPhonedo} setDataRC={setDataRC} setDataPhonedo={setDataPhonedo} />
                    ))}
                </Grid>
            )
            }

            {errors && (
                <p style={{ color: 'red', textAlign: 'center', border: '2px red solid', padding: '15px', margin: '30px' }}>
                    Internal Server Error!
                    {errors && ` ` + errors.message}
                </p>
            )}

            {saved && (
                <p style={{ color: 'green', textAlign: 'center', border: '2px green solid', padding: '15px', margin: '30px' }}>
                    Data saved successfully!
                </p>
            )}

            {!dataRC && !dataPhonedo && !errors && !saved && (
                <Box sx={{ textAlign: 'center' }}>
                    <p>Loading username data from Ring Central and Phone.do</p>
                    <CircularProgress />
                </Box>
            )}

            <br />
            <Button variant="contained"
            >
                <b><a href="/logout"
                    style={{ color: "white", textDecoration: "none" }}
                >Logout</a></b>
            </Button>
        </>
    )
}
export default AllRecords;