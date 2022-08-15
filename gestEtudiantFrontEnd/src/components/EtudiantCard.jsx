import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import url from '../baseurl';

const Etudiant = ({etudiant}) => {
    const handleClick = async () => {
        await axios.delete(`${url}/getOneEtudiant/${etudiant.etudiant_id}`)
    }
    const mamoakasary = async () => {
        const response = await axios.get(`${url}/getPhotoProfilOneEtudiantEtudiant/${etudiant.etudiant_id}`);
        console.log(response.data)
    }    
    
    return (
        <>
        <div className="containerCard" onClick={mamoakasary}>
            <div className="headerCard">
                {etudiant.etudiant_numero_inscription}
                <div className="contentCard">
                    <span>{etudiant.etudiant_prenom} {etudiant.etudiant_nom}</span>
                    <span>Née le {etudiant.etudiant_naissance}</span>
                    <span>Sexe: {etudiant.etudiant_sexe}</span>
                    <span>Telephone: {etudiant.etudiant_telephone}</span>
                </div>
            </div>
            <div className="footerCard">
                <IconButton onClick={handleClick}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
        </>
    );
}

export default Etudiant;
