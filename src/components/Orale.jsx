import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Orale.css';

function Orale() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const startRecording = () => {
    setIsRecording(true);
    setShowTimer(false); // Cache le chronomètre au début
    setTimer(0); // Réinitialise le chronomètre
    setAudioURL(null); // Supprime l'URL audio existante pour cacher l'enregistrement précédent
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowTimer(true); // Affiche le chronomètre à la fin de l'enregistrement
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setAudioURL(recordedBlob.blobURL);
  };

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} seconde${seconds !== 1 ? 's' : ''}`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes} minute${minutes !== 1 ? 's' : ''} et ${remainingSeconds} seconde${remainingSeconds !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{margin:'10px'}}>
      <div className="card text-center p-4 shadow" style={{ maxWidth: '500px' }}>
        <h3 className="card-title mb-3 ">Simulateur Tâche 1 & Tâche 3</h3>
        <ReactMic
          record={isRecording}
          className={`sound-wave mb-3 ${isRecording ? 'pulse-effect' : ''}`}
          onStop={onStop}
          onData={onData}
          mimeType="audio/wav"
          strokeColor="#ccc"
          backgroundColor="#ffff"
        />
        <button
          className={`btn ${isRecording ? 'btn-danger' : 'btn-success'} mb-3 p-3`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? 'Arrêter' : 'Enregistrer'}
        </button>

        {audioURL && (
          <div>
            <h5 className="mt-3">Écouter l'enregistrement :</h5>
            <audio controls src={audioURL} className="w-100 mb-2"></audio>
            <a href={audioURL} download="enregistrement.wav" className="btn btn-success">
              Télécharger
            </a>
          </div>
        )}

        {showTimer && (
          <div className="mt-3">
            <h5>Temps : {formatTime(timer)}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orale;
