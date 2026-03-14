const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    res.redirect("/inicio");
});

router.get("/inicio", (req,res)=>{
    res.render("inicio");
});

router.get("/personajes",(req,res)=>{

    const personajes = [
        {nombre:"Kafka", img:"kafka.webp"},
        {nombre:"Acheron", img:"acheron.webp"},
        {nombre:"Jingliu", img:"jingliu.webp"},
        {nombre:"Dan Heng IL", img:"dan_heng_il.webp"},
        {nombre:"Trailblazer", img:"trailblazer.webp"}
    ];

    res.render("personajes",{personajes});
});

router.get("/facciones",(req,res)=>{

    const facciones = [
        {nombre:"Astral Express", img:"astral_express.webp"},
        {nombre:"Stellaron Hunters", img:"stellaron_hunters.webp"},
        {nombre:"Xianzhou Luofu", img:"xianzhou_luofu.webp"},
        {nombre:"Interastral Peace Corporation", img:"interastral_peace_corporation.webp"}
    ];

    res.render("facciones",{facciones});
});

router.get("/galeria",(req,res)=>{
    res.render("galeria");
});

router.get("/preguntas",(req,res)=>{
    res.render("preguntas");
});

module.exports = router;