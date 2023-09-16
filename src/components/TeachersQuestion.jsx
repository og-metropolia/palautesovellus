import React, { useState } from 'react';

export default function TeachersQuestion(props) {
    const [questions, setQuestions] = useState([{ content: "", emoji: false, draw: false, write: false }]);
    const [selectedTopic, setSelectedTopic] = useState("");

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].content = value;
        setQuestions(newQuestions);
    }

    const handleCheckboxChange = (index, type) => {
        const newQuestions = [...questions];
        newQuestions[index][type] = !newQuestions[index][type];
        setQuestions(newQuestions);
    }

    const addQuestion = () => {
        setQuestions([...questions, { content: "", emoji: false, draw: false, write: false }]);
    }

    const handleSubmit = () => {
        console.log({
            topic: selectedTopic,
            questions: questions
        });
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: props.color, backgroundColor: props.backgroundColor }}>Kysymykset</h1>

            <div style={{ marginBottom: '20px' }}>
                <label>Yhteinen aihe kaikille kysymyksille: </label>
                <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                    <option value="">Valitse aihe...</option>
                    <option value="math">Matematiikka</option>
                    <option value="language">Äidinkieli</option>
                    <option value="play">Leikki</option>
                    <option value="journey">Retki</option>
                    <option value="sport">Liikunta</option>
                    <option value="question">Tuntitehtävä</option>
                    <option value="mood">Tunnekysely</option>

                </select>
            </div>

            {questions.map((q, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <textarea
                        value={q.content}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        placeholder="Kirjoita kysymys tähän..."
                        rows="3"
                        style={{ width: '100%', marginBottom: '10px' }}
                    ></textarea>

                    <div style={{ marginTop: '10px' }}>
                        <label>Vastauksen tyyppi:</label><br/>

                        <input type="checkbox" id={`emoji-${index}`} checked={q.emoji} onChange={() => handleCheckboxChange(index, 'emoji')} />
                        <label htmlFor={`emoji-${index}`}>Emoji-vastaus</label><br/>

                        <input type="checkbox" id={`draw-${index}`} checked={q.draw} onChange={() => handleCheckboxChange(index, 'draw')} />
                        <label htmlFor={`draw-${index}`}>Piirto-vastaus</label><br/>

                        <input type="checkbox" id={`write-${index}`} checked={q.write} onChange={() => handleCheckboxChange(index, 'write')} />
                        <label htmlFor={`write-${index}`}>Kirjoitus-vastaus</label>
                    </div>
                </div>
            ))}

            <button style={{ marginTop: '20px', marginRight: '10px' }} onClick={addQuestion}>Lisää kysymys</button>
            <button style={{ marginTop: '20px' }} onClick={handleSubmit}>Lähetä kysymykset</button>
        </div>
    );
}
