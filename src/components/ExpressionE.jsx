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

        tasksData.subjects[selectedSubject].tasks.forEach((task, index) => {
            if (index > 0) doc.addPage(); 
            doc.setFont('Helvetica', 'bold');
            doc.text(`Tâche ${index + 1}:`, 10, 10);
            doc.setFont('Helvetica', 'normal');
            const taskText = tasks[`task${index + 1}`] || 'Aucun résultat saisi';
            const taskLines = doc.splitTextToSize(taskText, 190);
            doc.text(taskLines, 10, 20);
            const wordCount = wordCounts[`wordCount${index + 1}`] || 0;
            doc.text(`Nombre de mots : ${wordCount}`, 10, 30 + taskLines.length * 10);
        });

        doc.save('taches.pdf');
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
                </center>
                <p style={{ textAlign: 'center' }}>
                    <h3>Simulateur Examen Expression Ecrite TCF Canada</h3>
                </p>
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
                    label={tasksData.subjects[selectedSubject].tasks.task1}
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
                    label={tasksData.subjects[selectedSubject].tasks.task2}
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
                <h6>{tasksData.subjects[selectedSubject].tasks.task3}</h6>
                <TextField
                    label={tasksData.subjects[selectedSubject].tasks.task3}
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
