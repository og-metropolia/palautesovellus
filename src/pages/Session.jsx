import { BASE_URL, ENDPOINTS } from '../constants/api';

export default function Session(props) {
    const id = props.match.params.id
    const response = fetch(`${BASE_URL}/${ENDPOINTS.question}/${id}`).then(res => res.json());

    if (!response) return <p>Virhe ladatessa kysymyksiä.</p>;
    return (
        response.then(data => {
            data.questions.forEach(question => {
                <p>
                    {question.content}
                </p>
            })
        })

    )
    }
