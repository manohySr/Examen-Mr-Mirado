const uuidv4 = require('uuid').v4;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../configModel/db');
const Router = require('express').Router;
const url = require('../urlBaseFolderImage');

const router = Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './folderImageProfil')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});
const upload = multer({ 
    storage: fileStorageEngine,
    fileFilter (req, files, cb) {
        const ext = path.extname(files.originalname);
        const allowed = ['.png', '.jpg', '.jpeg'];
        if (allowed.includes(ext)) {
          cb(null, true);
        } else {
          cb("File not an image", false);
        }     
    }
 });

let timeElapsed = Date.now();
const today = new Date(timeElapsed);

router.get('/getAllEtudiant', async (req, res) => {
    try {
        const allEtudiant = await pool.query(
            `SELECT * FROM etudiant;`
        );
        res.send(allEtudiant.rows);
    } catch (error) {
        console.log(error.message);
    }
})
router.get('/getPhotoProfilOneEtudiantEtudiant/:etudiant_id', async (req, res) => {
    try {
        const { etudiant_id } = req.params;
        const oneEtudiant = await pool.query(
            `SELECT * FROM etudiant WHERE etudiant_id = '${etudiant_id}';`
        );
        const filePath = `${url}\\${oneEtudiant.rows[0].etudiant_image}`; 
        let file = fs.createReadStream(filePath);
        let stat = fs.statSync(filePath);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'image/png');
        file.pipe(res);
    } catch (error) {
        console.error(error.message)
    }
})
router.get('/getOneEtudiant/:etudiant_id', async (req, res) => {
    try {
        const { etudiant_id } = req.params;
        const oneEtudiant = await pool.query(
            `SELECT * FROM etudiant WHERE etudiant_id = '${etudiant_id}';`
        );
        res.send(oneEtudiant.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})
router.delete('/getOneEtudiant/:etudiant_id', async (req, res) => {
    try {
        const { etudiant_id } = req.params;
        await pool.query(
            `DELETE FROM etudiant WHERE etudiant_id = '${etudiant_id}';`
        );
        res.send(`Etudiant supprimé de la base de donnée`);
    } catch (error) {
        console.error(error.message)
    }
})
router.delete('/deletePhotoProfilOneEtudiantEtudiant/:etudiant_id', (req, res) => {
    res.send("Gonna make it but I do not have internet for learning about OS module")
})
router.put('/getOneEtudiant/:etudiant_id', upload.single('etudiant_image'), async (req, res) => {
    try {
        const { etudiant_id } = req.params;
        const {
            etudiant_nom,
            etudiant_prenom,
            etudiant_naissance,
            etudiant_telephone,
            etudiant_sexe,
            etudiant_numero_inscription
        } = req.body;
        const etudiant_image = req.file.filename;
        await pool.query(
            `UPDATE etudiant 
            SET                 
            etudiant_nom = $1,
            etudiant_prenom = $2,
            etudiant_naissance = $3,
            etudiant_telephone = $4,
            etudiant_sexe = $5,
            etudiant_numero_inscription = $6,
            etudiant_image = $7,
            etudiant_update = $8
            WHERE etudiant_id = '${etudiant_id}';`, [
                etudiant_nom,
                etudiant_prenom,
                etudiant_naissance,
                etudiant_telephone,
                etudiant_sexe,
                etudiant_numero_inscription,
                etudiant_image,
                today
            ]
        );
        res.send(`Mise à jour de l'etudiant`);
    } catch (error) {
        console.error(error.message)
    }
})
router.post('/addEtudiant', upload.single('etudiant_image'), async (req, res) => {
    try {
        const {
            etudiant_nom,
            etudiant_prenom,
            etudiant_naissance,
            etudiant_telephone,
            etudiant_sexe,
            etudiant_numero_inscription
        } = req.body;
        const etudiant_image = req.file.filename;
        await pool.query(
            `INSERT INTO etudiant (
                etudiant_id, 
                etudiant_nom,
                etudiant_prenom,
                etudiant_naissance,
                etudiant_telephone,
                etudiant_sexe,
                etudiant_image,
                etudiant_numero_inscription,
                etudiant_creation,
                etudiant_update 
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [
                uuidv4(),
                etudiant_nom,
                etudiant_prenom,
                etudiant_naissance,
                etudiant_telephone,
                etudiant_sexe,
                etudiant_image,
                etudiant_numero_inscription,
                today, 
                today
            ]
        );
        res.send("Nouveau etudiant entré dans la base de donnée");
    } catch (error) {
        console.error(error.message);
    }
})


module.exports = router;