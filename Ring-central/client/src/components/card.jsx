import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DialogActions } from '@mui/material';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ phoneNumbres }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            {phoneNumbres &&
                phoneNumbres.records.map(c =>
                    <Card
                        style={{ width: "18rem", margin: "25px" }}
                        sx={{ maxWidth: 345, m: 10 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={c.name}
                            subheader={c.contact.email}
                        />
                        {/* <CardMedia
                            component="img"
                            height="194"
                            image="/static/images/cards/paella.jpg"
                            alt="img"
                        /> */}
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Extension Number - {c.extensionNumber}
                                <br />
                                id - {c.id}
                            </Typography>
                        </CardContent>

                        {/* <Stack direction="row" spacing={2}>
                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            <Button variant="outlined"  startIcon={<EditIcon />}>
                                Update
                            </Button>
                        </Stack> */}

                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>More details:</Typography>
                                <Typography paragraph>
                                    uri - {c.uri}
                                </Typography>
                                <Typography paragraph>
                                    id - {c.id}
                                </Typography>
                                <Typography paragraph>
                                    extension number - {c.extensionNumber}
                                </Typography>
                                <Typography>
                                    type - {c.type}
                                </Typography>

                                <DialogActions>
                                    <Button variant="outlined" sx={{ m: 2 }}>בחירת משתמש</Button>
                                </DialogActions>

                            </CardContent>
                        </Collapse>
                    </Card>
                )}
        </>
    );
}