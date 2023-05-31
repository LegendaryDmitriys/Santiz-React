import React from "react";
import NavBar from "./navbar";
import './scss/about.scss';
import Footer from "./footer";

function About (){
    return (
        <div>
            <section>
                <div className="wrapper">
                    <div className="content">
                        <div className="content-about-left">
                            <h2 className="about-header">Егор Параманов</h2>
                        </div>  
                        <div className="content-mid">
                            <article className="about-content">
                                <h3 className="about-content-header">Биография</h3>
                                <p className="about-content-text">Santiz - молодой рэпер из Казахстана, пользующийся популярностью в хип-хоп-кругах. Он является членом творческого объединения Second Squad и активно продвигает свою музыку в Сети. Его творчество отличается спокойными ритмами и мелодичностью, а тексты песен раскрывают личные истории артиста.</p>
                                <p className="about-content-text">Изначально его музыка была известна главным образом его знакомым, но в 2018 году он привлек внимание широкой публики с треком "Rastafari". Вскоре после этого были выпущены песни "Лечу", "Наш маленький мир", "Забытый бала" и другие, которые получили положительные отзывы от слушателей.</p>
                                <p className="about-content-text">В 2019 году Santiz выпустил свой дебютный альбом под названием "52 герца". После этого он дал серию концертов в разных городах, а затем объявил о работе над новым альбомом. Он продолжал публиковать новые песни, как сольно, так и в сотрудничестве с другими исполнителями.</p>
                                <p className="about-content-text">Музыка Santiz часто описывается как сочетание мягких мелодий и битов с яркими текстами и интенсивным вокалом. Он постоянно экспериментирует со своим звучанием и стилем, что делает его творчество уникальным и интересным для слушателей.</p>
                                <p className="about-content-text">Личная жизнь Santiz остается за кадром, так как он предпочитает не раскрывать информацию о ней. В свободное время он следит за событиями в футболе, исповедует ислам и имеет рыжего кота.</p>
                                <h3 className="about-content-header">Дискография</h3>
                                <p className="about-content-text">Включает в себя альбом "52 герца" (2019) и такие треки, как "Музе", "За плохое, за хорошее", "Второй том", "No pasaran", "Mon ami", "Paradise", "Забытый бала", "52 герца", "Snippet" и другие.</p>
                            </article>
                        </div>  
                        <div className="content-about-right">
                            <img className="content-right-img" src="https://ic.wampi.ru/2023/03/25/about_image.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default About;