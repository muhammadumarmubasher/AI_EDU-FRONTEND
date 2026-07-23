import React, { useState } from "react";
import axios from "axios";
import "./Analyzer.css";


function Analyzer() {


    const [url, setUrl] = useState("");
    const [option, setOption] = useState("all");
    const [question, setQuestion] = useState("");

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);



    const analyzeVideo = async () => {


        if (!url) {
            setResult({
                error:"Please paste a YouTube link first."
            });
            return;
        }


        if (!url.includes("youtube.com") && !url.includes("youtu.be")) {

            setResult({
                error:"Please enter a valid YouTube URL."
            });

            return;
        }



        setLoading(true);
        setResult(null);



        try {


            const response = await axios.post(
               "https://seashell-app-3vxx4.ondigitalocean.app/api/video/analyze",
                {
                    youtubeUrl:url,
                    option,
                    question
                }
            );



            const data = response.data.data;

setResult({
    summary: data.summary,
    quiz: data.quiz,
    explanation: data.explanation
});



        } catch(error) {


            console.log("API ERROR:",error);


            setResult({

                error:
                error.response?.data?.message ||
                error.message

            });


        }



        setLoading(false);

    };






    return (

        <div className="analyzer-page">

            <div className="analyzer-card">


                <h1>
                    🤖 AI Video Analyzer
                </h1>


                <p>
                    Convert YouTube lectures into summaries,
                    quizzes and explanations.
                </p>




                <input

                    className="url-input"

                    placeholder="Paste YouTube link"

                    value={url}

                    onChange={(e)=>setUrl(e.target.value)}

                />





                <div className="options">


                {
                [
    ["summary","📄 Summary"],
    ["quiz","📝 Quiz"],
    ["explanation","💡 Explanation"],
    ["all","⚡ All"]
].map(([value,label])=>(

                    <button

                    key={value}

                    className={
                        option===value
                        ?
                        "active-option"
                        :
                        ""
                    }

                    onClick={()=>setOption(value)}

                    >

                    {label}

                    </button>


                ))

                }


                </div>






                {
                option==="qa" && (

                    <input

                    className="question-input"

                    placeholder="Ask your question..."

                    value={question}

                    onChange={(e)=>setQuestion(e.target.value)}

                    />

                )
                }







                <button

                className="analyze-btn"

                onClick={analyzeVideo}

                >

                {
                    loading
                    ?
                    "Analysing..."
                    :
                    "Analyze Video"
                }


                </button>








                {
                result && !result.error && (

                <div className="result-container">



                    <div className="result-card">

                        <h2>
                            📄 Summary
                        </h2>

                        <p>
                            {result.summary}
                        </p>

                    </div>






                    <div className="result-card">

                        <h2>
                            📝 Quiz
                        </h2>

                     {
Array.isArray(result.quiz) && result.quiz.length > 0 ? (

    result.quiz.map((item,index)=>(

        <div key={index} className="quiz-item">

            <h3>
                Q{index+1}. {item.question}
            </h3>

            <p>
                ✅ {item.answer}
            </p>

        </div>

    ))

) : (

    <p>No quiz generated.</p>

)
}


                    </div>







                    <div className="result-card">

                        <h2>
                            💡 Explanation
                        </h2>

                        <p>
                            {result.explanation}
                        </p>


                    </div>



                </div>

                )
                }






                {
                result?.error && (

                    <div className="result-card">

                        <p>
                            {result.error}
                        </p>

                    </div>

                )
                }





            </div>

        </div>

    );

}


export default Analyzer;