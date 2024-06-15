import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import { Analytics } from "@vercel/analytics/react"

function App() {
    const [move, setMove] = useState(false);
    const [start, setStart] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [time, setTime] = useState<any>(null);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Numove</title>
                <link rel="icon" type="image/x-icon" href="../public/favicon.ico"/>
                <meta name={"description"}
                      content={"Quantos segundos você consegue ficar sem mover o seu mouse?"}/>
                <meta property="og:title" content="Numove" />
                <meta property="og:description" content="Quantos segundos você consegue ficar sem mover o seu mouse?" />
                <meta property="og:image" content="https://numove.vercel.app/"/>
                
                <meta property="twitter:card" content="summary_large_image">
                <meta property="twitter:title" content="Numove">
                <meta property="twitter:description" content="Quantos segundos você consegue ficar sem mover o seu mouse?">
                <meta property="twitter:image:alt" content="Tela com um botão de comece">
                <meta property="twitter:image:type" content="image/png">
                <meta property="twitter:image" content="https://numove.vercel.app/">
                <meta property="twitter:image:width" content="1200">
                <meta property="twitter:image:height" content="630">
                <meta property="next-size-adjust">
            </Helmet>
            <Analytics/>
            <div
                className={"flex justify-center items-center h-screen w-screen flex-col max-[1000px]:hidden select-none ".concat(start ? move ? "bg-red-200" : "bg-green-200" : "bg-teal-100")}
                onMouseMove={() => {
                    if (start) {
                        setMove(true);
                        if (move && time === null) {
                            setTime(Date.now() - startTime);
                        }
                    }
                }}>

                {start && !move ? <h1 className={"uppercase font-bold text-gray-900"}>Não Mova o Mouse! :)</h1> : null}

                {start && move ? <><h1 className={"uppercase font-bold text-gray-900"}>Você Moveu o Mouse!! :(</h1>
                    <span>{time / 1000} segundos</span></> : null}
                {!start ? <button
                    className={"bg-teal-50 h-10 p-4 flex justify-center items-center font-bold text-gray-600 rounded-lg hover:bg-gray-50"}
                    onClick={
                        () => {
                            if (!start) {
                                setStart(true);
                                setStartTime(Date.now())
                            }
                        }
                    }>Comece</button> : null}
                {move ?
                    <h1 className={"bg-teal-50 h-10 p-4 flex justify-center items-center font-bold text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer m-2 select-none active:bg-gray-100"}
                        onClick={
                            () => {
                                navigator.clipboard.writeText(`Deixei o meu mouse parado por ${time / 1000} segundos\n\nVenha NÃO mover o seu mouse também:\nnumove.vercel.app`);
                            }
                        }>Compartilhe</h1> : null}
            </div>
            <div className={"h-screen w-screen bg-[#F5F5DC] flex justify-center items-center min-[1000px]:hidden"}>
                <h1 className={"uppercase font-bold"}>Abra o site no computador!</h1>
            </div>
        </>

    );
}

export default App;
