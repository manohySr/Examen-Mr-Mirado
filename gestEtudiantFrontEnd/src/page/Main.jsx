import React from 'react';
import AddEtudiant from '../components/AddEtudiant';
import Etudiant from '../components/EtudiantCard';
import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';
import axios from 'axios';
import url from '../baseurl';
import { useState } from 'react';
const Main = ({selectedIndex}) => {

    const [etudiants, setEtudiants] = useState([])

    const getEtudiant = async () => {
        let requestOptions = {
            method: 'GET'
        };
        const response = await axios(`${url}/getAllEtudiant`, requestOptions);
        setEtudiants(response.data);
    }
    useEffect(() => {
        getEtudiant();
    }, [etudiants, setEtudiants])

    return (
        <div className='maincontainer'>
            {selectedIndex == 0 && (
                etudiants?.length > 0 ? (
                    <>
                    <Grid
                        container
                        spacing={2}
                    >
                        {
                            etudiants.map((etudiant) => (
                                <React.Fragment key={etudiant.etudiant_id}>
                                    <Etudiant item xs={12} spacing={3} etudiant={etudiant}/>
                                </React.Fragment>
                            )) 
                        }
                    </Grid>
                    </>
                ) : (
                    <>
                    ERROR 2002: Mila manao ajout kely lol
                    </>
                )
            )}
            {selectedIndex == 1 && (<AddEtudiant />)}
            
            {/* <AddEtudiant /> */}
        </div>
    );
}

export default Main;
