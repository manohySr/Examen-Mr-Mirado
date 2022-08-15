import React from 'react';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button';
import { useForm } from '../customHook/useForm';
import { useState } from 'react';
import url from '../baseurl';
import axios from 'axios';
const AddEtudiant = () => {
    const [values, handleChange] = useForm({
        etudiant_nom: 'RAJAONAH', etudiant_prenom : 'Manohy Saotra', etudiant_naissance: '2002-11-20',
        etudiant_telephone: '0348818375', etudiant_numeroInscription: '017-TCO/LP3'
    })
    const [maleFemale, setMaleFemale] = useState("Male");
    const [file, setFile] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setOpenSuccess(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenError(false);
      };

    const handleChangeRadio = (e) => {
        setMaleFemale(e.target.value);
    }

    const handleChangeFile = (e) => {
        if (e && e.target.files[0] !== undefined){
            console.log(e.target.files[0])
            setFile(e.target.files[0]);
        } 
    }

    const handleClickSubmit = async () => {
        try {
            if (
                values.etudiant_nom !== "" && values.etudiant_prenom !== "" &&
                values.etudiant_telephone !== "" && values.etudiant_naissance !== "" &&
                values.etudiant_numeroInscription !== "" && file !== undefined && file !== null
            ) {
        
                let formdata = new FormData();
                formdata.append("etudiant_nom", values.etudiant_nom);
                formdata.append("etudiant_prenom", values.etudiant_prenom);
                formdata.append("etudiant_naissance", values.etudiant_naissance);
                formdata.append("etudiant_telephone", values.etudiant_telephone);
                formdata.append("etudiant_sexe", maleFemale);
                formdata.append("etudiant_image", file);
                formdata.append("etudiant_numero_inscription", values.etudiant_numeroInscription);
                let requestOptions = {
                    method: 'POST',
                    headers: { "Content-Type": "multipart/form-data" },
                    data: formdata
                };
    
                await axios(`${url}/addEtudiant`, requestOptions);
                setOpenSuccess(true);
            } else {
                setOpenError(true);
            }

        } catch (error) {
            console.log(error);
            setOpenError(true);
        }
    }

    return (
        <div className='containerAddEtudiant'>
            <form>
                <div className="leftside">
                    <div className='input'>
                        <label>Numero d'inscription</label>
                        <input placeholder='017-TCO/LP3' name='etudiant_numeroInscription'
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className='input'>
                        <label>Nom</label>
                        <input placeholder='RAJAONAH' name='etudiant_nom'
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className='input'>
                        <label>Prenom(s)</label>
                        <input placeholder='Manohy Saotra' name='etudiant_prenom'
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className='boutonsubmit'>
                    <Button variant="contained" color="primary" onClick={handleClickSubmit}>
                        AJOUTER
                    </Button>
                    </div>
                </div>
                <div className="rightside">
                    <div className='input'>
                        <label>Date de naissance</label>
                        <input type='date' name='etudiant_naissance'
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className='input'>
                        <FormControl component="fieldset"
                            className='input'
                        >
                            <FormLabel>Sexe</FormLabel>
                            <RadioGroup 
                                row aria-label="position" name="position" defaultValue="top"
                                onChange={handleChangeRadio}
                                value={maleFemale}
                                id='radio'
                            >
                            <FormControlLabel
                                className='itemRadio'
                                value="Male"
                                control={<Radio color="primary" />}
                                label="Male"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                className='itemRadio'
                                value="Female"
                                control={<Radio color="primary" />}
                                label="Female"
                                labelPlacement="end"
                            />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='input'>
                        <label>Telephone</label>
                        <input type='phone' name='etudiant_telephone' placeholder='0348818375'
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className='input'>
                        <label>Image</label>
                        <input type='file' accept='image/*'
                            onChange={handleChangeFile}
                        />
                    </div>
                </div>
            </form>
            <div className="containerCard">
            <div className="headerCard">
                Numero d'inscription: {values.etudiant_numeroInscription}
                <div className="contentCard">
                    <span>Prenom(s):{values.etudiant_prenom}  Nom:{values.etudiant_nom}</span>
                    <span>Née le: {values.etudiant_naissance}</span>
                    <span>Sexe: {maleFemale}</span>
                    <span>Telephone: {values.etudiant_telephone}</span>
                </div>
            </div>
            <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openError}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Fenoina daholo azafdy"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSuccess}
                message="Lasa daholo fa bravo xd"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSuccess}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            </div>
        </div>
        </div>
    );
}

export default AddEtudiant;
