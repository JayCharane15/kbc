import { useEffect, useState } from "react"
import useSound from "use-sound";
import galat from "../assets/galat.mp3";
import lock from "../assets/lock.mp3";
import intro from "../assets/intro.mp3";
import right from "../assets/right.mp3";

export default function Trivia({data, setStop, questionNumber, setQuestionNumber}) 
{
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(intro);
    const [galatsound] = useSound(galat);
    const [locksound] = useSound(lock);
    const [rightsound] = useSound(right);

    // useEffect(() => {
    //     letsPlay()
    // }, [letsPlay]);
    useEffect(() => {

        setQuestion(data[questionNumber-1])
    }, [data, questionNumber]);


    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();

        },duration);
    };

    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName("answer active");
        delay(2000, () => {
            setClassName(a.correct ? "answer correct" : "answer wrong");
        });

        delay(5000, () => {
            {
                if(a.correct){
                    rightsound();
                    delay(6000, () => {

                        setQuestionNumber(prev => prev + 1);
                        setSelectedAnswer(null);
                    });
                } else {
                    galatsound();
                    delay(6000, () => {

                        setStop(true);
                    })
                }
            }

        });

    };

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div className={selectedAnswer === a ? className : "answer"} onClick={()=>handleClick(a)}>{a.text}</div>
                ))};
            </div>
        </div>
    )

}
