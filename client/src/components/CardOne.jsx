import {
    Card,
    CardContent,
    CardHeader,
    Button,
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

function CardOne({ record, setAgentRC, setDataRC, setDataPhonedo }) {

    const handleSendingAgentRingCentral = async (record) => {
        setAgentRC(record);
        setDataRC(null);

        try {
            const response = await fetch("https://ringcentral-integration.serveo.net/getphonenumbers/getoutline")
            const data = await response.json();
            setDataPhonedo(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const CardContainer = styled('div')({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    });

    return (
        <CardContainer>
            <Card
                sx={{ maxWidth: '1rm', m: 1 }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        </Avatar>
                    }
                    title={record.name}
                    subheader={record.contact?.email}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Extension Number - {record.extensionNumber}
                        {record.contact?.businessPhone && (
                            <>
                                <br />
                                Business Phone - {record.contact?.businessPhone}
                            </>
                        )}
                        <br />
                        id - {record.id}
                        <br />
                        Type - {record.type}
                    </Typography>
                </CardContent>

                <CardContent>
                    <Button variant="contained"
                        onClick={() => handleSendingAgentRingCentral(record)} >
                        User selection
                    </Button>
                </CardContent>
            </Card>
        </CardContainer>
    )
}

export default CardOne;