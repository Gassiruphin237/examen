import React, { useState, useEffect } from 'react';
import { Badge, Button, Chip, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Outlet } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../css/ExpressionE.css';
import img from '../assets/tcf.jpg';
import tasksData from './Task.json'; // Importer le fichier JSON

function ExpressionE() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 3600 secondes = 1 heure
    const [disabled, setDisabled] = useState(false);
    const [tasks, setTasks] = useState({ task1: '', task2: '', task3: '' });
    const [wordCounts, setWordCounts] = useState({ wordCount1: 0, wordCount2: 0, wordCount3: 0 });
    const [selectedSubject, setSelectedSubject] = useState(0); // Pour gérer la sélection du sujet


    const formatTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };
    // Gérer les changements de texte
    const handleTextChange = (e, task) => {
        const text = e.target.value.trim();
        const words = text.split(/\s+/).filter(Boolean);
        setTasks({ ...tasks, [task]: e.target.value });

        setWordCounts({ ...wordCounts, [`wordCount${task.slice(-1)}`]: text ? words.length : 0 });
    };

    // Empêcher la copie
    const handleCopy = (e) => {
        e.preventDefault();
        alert("La copie est désactivée pour ce champ.");
    };

    // Chronomètre
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    setDisabled(true);
                    clearInterval(timer);
                    saveAsPDF();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format du temps restant (hh:mm:ss)
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Enregistrer en PDF
    const saveAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // Tâche 1
        doc.setFont('Helvetica', 'bold');
        doc.text('Tâche 1:', 10, 10);
        doc.setFont('Helvetica', 'normal');
        const task1Text = tasks.task1 || 'Aucun résultat saisi';
        const task1Lines = doc.splitTextToSize(task1Text, 190);
        doc.text(task1Lines, 10, 20);

        // Nombre de mots pour la tâche 1
        const wordCount1 = wordCounts.wordCount1 > 0 ? wordCounts.wordCount1 : 0;
        doc.text(`Nombre de mots : ${wordCount1}`, 10, 20 + task1Lines.length * 10 + 10); // 10 est un espacement

        doc.addPage(); // Ajoute une nouvelle page pour la Tâche 2

        // Tâche 2
        doc.setFont('Helvetica', 'bold');
        doc.text('Tâche 2:', 10, 10);
        doc.setFont('Helvetica', 'normal');
        const task2Text = tasks.task2 || 'Aucun résultat saisi';
        const task2Lines = doc.splitTextToSize(task2Text, 190);
        doc.text(task2Lines, 10, 20);

        // Nombre de mots pour la tâche 2
        const wordCount2 = wordCounts.wordCount2 > 0 ? wordCounts.wordCount2 : 0;
        doc.text(`Nombre de mots : ${wordCount2}`, 10, 20 + task2Lines.length * 10 + 10); // 10 est un espacement

        doc.addPage(); // Ajoute une nouvelle page pour la Tâche 3

        // Tâche 3
        doc.setFont('Helvetica', 'bold');
        doc.text('Tâche 3:', 10, 10);
        doc.setFont('Helvetica', 'normal');
        const task3Text = tasks.task3 || 'Aucun résultat saisi';
        const task3Lines = doc.splitTextToSize(task3Text, 190);
        doc.text(task3Lines, 10, 20);

        // Nombre de mots pour la tâche 3
        const wordCount3 = wordCounts.wordCount3 > 0 ? wordCounts.wordCount3 : 0;
        doc.text(`Nombre de mots : ${wordCount3}`, 10, 20 + task3Lines.length * 10 + 10); // 10 est un espacement

        doc.save('taches.pdf'); // Télécharge le fichier PDF
    };


    // Gérer le changement de sujet
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        const selectedTasks = tasksData.subjects[event.target.value].tasks;
        setTasks({ task1: '', task2: '', task3: '' }); // Réinitialiser les tâches lors du changement de sujet
        setWordCounts({ wordCount1: 0, wordCount2: 0, wordCount3: 0 });
    };

    return (
        <div className='containers' id='container'>
            <Outlet context={{ isAuthenticated, setIsAuthenticated }} />
            <form className='form' style={{ margin: '20px' }}>
                <center>
                    <img alt='img' src={img} style={{ width: '300px', borderRadius: 20 }} />
                </center>  <br />
                <p style={{ textAlign: 'center' }}>
                    <h3>Simulateur Examen Expression Ecrite TCF Canada</h3>
                </p>  <br />
                <p>Temps restant : <Chip label={formatTime(timeLeft)} color="error" /></p>

                {/* Sélection de sujet */}
                {/* <FormControl fullWidth>
                    <InputLabel id="subject-select-label">Choisir un sujet</InputLabel>
                    <Select
                        labelId="subject-select-label"
                        id="subject-select"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                    >
                        {tasksData.subjects.map((subject, index) => (
                            <MenuItem key={index} value={index}>
                                {subject.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}

                {/* Tâche 1 */}
                <h6>{tasksData.subjects[selectedSubject].tasks.task1}</h6>
                <TextField
                    label="Tâche 1"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    disabled={disabled}
                    onChange={(e) => handleTextChange(e, 'task1')}
                    value={tasks.task1}
                    style={{ marginTop: '20px' }}
                />
                <p>Nombre de mots : <Badge badgeContent={wordCounts.wordCount1} max={999} color="primary" /></p>

                {/* Tâche 2 */}
                <h6>{tasksData.subjects[selectedSubject].tasks.task2}</h6>
                <TextField
                    label="Tâche 2"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    disabled={disabled}
                    onChange={(e) => handleTextChange(e, 'task2')}
                    value={tasks.task2}
                    style={{ marginTop: '20px' }}
                />
                <p>Nombre de mots : <Badge badgeContent={wordCounts.wordCount2} max={999} color="primary" /></p>

                {/* Tâche 3 */}
                <h6>
                    {tasksData.subjects[selectedSubject].tasks.task3.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </h6>
                <TextField
                    label="Tâche 3"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    disabled={disabled}
                    onChange={(e) => handleTextChange(e, 'task3')}
                    value={tasks.task3}
                    style={{ marginTop: '20px' }}
                />
                <p>Nombre de mots : <Badge badgeContent={wordCounts.wordCount3} max={999} color="primary" /></p>

                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<CloudUploadIcon />}
                    onClick={saveAsPDF}
                    style={{ marginTop: '20px' }}
                    disabled={disabled}
                >
                    Sauvegarder en PDF
                </Button>
            </form>
        </div>
    );
}

export default ExpressionE;
