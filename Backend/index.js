const express = require('express');
const Tareas = require('./Models/Tareas');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); 

const app = express();


app.use(cors());


app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

const upload = multer({ storage: storage });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/tarea', async (req, resp) => {
    try {
        const listaTarea = await Tareas.findAll();
        if (listaTarea.length === 0) {
            resp.status(400).json({ 'Mensaje': 'No hay información para mostrar' });
        } else {
            resp.status(200).json(listaTarea);
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({ "error": 'Ocurrió un error: ' + error.message });
    }
});


app.post('/tarea', upload.single('imagen'), async (req, resp) => {
    try {
        const { DescripcionTarea, Responsable } = req.body;
        let RutaImagen = null;

        if (req.file) {
           
            RutaImagen = `/uploads/${req.file.filename}`;
        }

        const tarea = await Tareas.create({
            DescripcionTarea,
            Responsable,
            RutaImagen 
        });
        resp.status(200).json({ 'Mensaje': 'Registro creado', data: tarea });
    } catch (error) {
        resp.status(500).json({ "error": 'Ocurrió un error: ' + error.message });
    }
});


app.put('/tarea/:IdTarea', upload.single('imagen'), async (req, resp) => {
    try {
        const { DescripcionTarea, Responsable } = req.body;
        let updateData = { DescripcionTarea, Responsable };

        if (req.file) {
            updateData.RutaImagen = `/uploads/${req.file.filename}`;
        }

        const [updated] = await Tareas.update(updateData, {
            where: { IdTarea: req.params.IdTarea }
        });

        if (updated) {
            resp.status(200).json({ 'Mensaje': 'Registro actualizado' });
        } else {
            resp.status(400).json({ 'Mensaje': 'No existe registro a actualizar' });
        }
    } catch (error) {
        resp.status(500).json({ "error": 'Ocurrió un error: ' + error.message });
    }
});


app.delete('/tarea/:IdTarea', async (req, resp) => {
    try {
        const deleted = await Tareas.destroy({
            where: { IdTarea: req.params.IdTarea }
        });

        if (deleted) {
            resp.status(200).json({ 'Mensaje': 'Eliminado correctamente' });
        } else {
            resp.status(400).json({ 'Mensaje': 'No existe registro a eliminar' });
        }
    } catch (error) {
        resp.status(500).json({ "error": 'Ocurrió un error: ' + error.message });
    }
});

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Aplicación ejecutando en puerto ${PORT}`);
});