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

function CardOnePhD({ record, setAgentRC, agentRC, setAgentPhonedo, setDataRC, setDataPhonedo }) {

    const handleSendingAgentPhonedo = async (record) => {
        await setAgentPhonedo(record);
        await setDataPhonedo(null);
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
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        id - {record?.id}
                        <br />
                        telephone - {record?.telephone?.telephone}
                    </Typography>
                </CardContent>

                <CardContent>
                    <Button variant="contained"
                        onClick={() => handleSendingAgentPhonedo(record)} >
                        User selection
                    </Button>
                </CardContent>
            </Card>
        </CardContainer>
    )
}

export default CardOnePhD;