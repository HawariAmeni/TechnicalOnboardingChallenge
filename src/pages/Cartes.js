
import React from 'react';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Divider, FormControlLabel, Icon, IconButton, List, ListItem, ListItemText, Modal, Switch, TextField, Typography } from '@mui/material';
import card from '../../src/services/CardsMock.json'
import account from '../../src/services/accountsMock.json'
import { Autocomplete } from '@mui/material';
import { styled, } from "@mui/material";
import Stack from '@mui/material/Stack';
import background from '../assets/img/carte.png'
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
//StyleAutoComplete
const AutoComplete = styled(Autocomplete)(() => ({
  width: '450px',
  marginBottom: '10px',
}));

//StyleSwitch
const BSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

//StyleModale
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 50,
  p: 6,
};

const marks = [
  {
    value: 400,
    label: 'Min',
  },
  {
 value:4000,
    label: 'Actuel',
  },
  {
    value: 5000,
    label: 'Max',
  },

];

function Cartes() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Container className='main'>

        <Stack direction="row" spacing={2} >
          <h1>Mes Cartes</h1>
          <Button style={{ backgroundColor: '#f64427', color: 'azure', justify: 'right' }} variant="contained"><IconButton>+</IconButton>Ajouter une carte</Button>

        </Stack>
        <br></br>
        <Stack direction="row" spacing={2}>

          <AutoComplete className="auto"
            options={card.data}
            name="idCarte"
            getOptionLabel={(option) => option.type}
            renderInput={(params) => (
              <TextField   {...params} label="Types de carte" variant="outlined" name="privilege" fullWidth />
            )}
          />

          <AutoComplete
            options={card.data}
            name="idCarte"
            getOptionLabel={(option) => "Compte  " + option.accountId}
            renderInput={(params) => (
              <TextField   {...params} label="Compte" variant="outlined" name="privilege" fullWidth />
            )}
          />

          <AutoComplete
            options={card.data}
            name="idCarte"
            getOptionLabel={(option) => "Carte  " + option.cardNumber}
            renderInput={(params) => (
              <TextField   {...params} label="Carte Platinum MasterCard" variant="outlined" name="privilege" fullWidth />
            )}
          />

        </Stack>
        <br></br>

        <Card >

          <Card sx={{ maxWidth: 500 }} >


            <CardContent style={{ justify: 'center' }}>

              <h1> Carte Platinum MasterCard</h1>

              <div style={{ backgroundImage: `url(${background})`, color: "#efefef" }}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

               <label>{card.data[0].cardNumber}</label>
                <br></br>
               <label>{account.data[0].accountTitle}</label> 
                <br></br>
                date d'expiration
                <br></br>
                {card.data[0].expiryDate}
                <br></br>
                <br></br>
                <br></br>
                <br></br>

              </div>
              <Typography variant="body2" textAlign='right' color="text.secondary">
                Code pin oublié?

              </Typography>
              <FormControlLabel
                control={<BSwitch sx={{ m: 1 }} defaultChecked />}
                label="Carte active"
              />
            </CardContent>

          </Card>
          <List component="nav" aria-label="mailbox folders">
            <ListItem >
              <ListItemText primary="Statut" />
              <ListItemText style={{ color: '#c4edbf', textAlign: 'right' }} primary={card.data[0].status} />
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText primary="Date expiration" />
              <ListItemText style={{ textAlign: 'right' }} primary={card.data[0].expiryDate} />
            </ListItem>
            <ListItem >
              <ListItemText primary="Plafond disponible" />
              <ListItemText style={{ textAlign: 'right' }} primary={card.data[0].cardAvailableLimit} />
            </ListItem>
            <Divider light />
            <ListItem >
              <ListItemText primary="Plafond hedbomadaire"  />
             
              <Icon sx={{ fontSize: '20px', color: 'red' ,alignItems: 'right'}} onClick={handleOpen} >BorderColor</Icon>
              <ListItemText style={{ textAlign: 'right' }} primary={card.data[0].cardLimit} />

            </ListItem>
          </List>
        </Card>

      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Augmentation du plafond de la carte </h1>
          <Slider
          
            aria-label="Custom marks"
            defaultValue={card.data[0].cardLimit}
            getAriaValueText={marks.label}
            step={10}
            style={{ color: '#f64427' }}
            min={400}
            max={5000}
            valueLabelDisplay="auto"
            marks={marks}
          />
             <Button style={{ backgroundColor: '#f64427', color: 'azure' }} variant="contained">Valider les modifications</Button>
           <Button  variant="contained" onClick={handleClose}>Annuler </Button>
       
        </Box>
      </Modal>
    </>
  )
}
export default Cartes;