class PersonajeModel {
    static fetchAllPersonajes() {
        return [
            {
                nombre: "Kafka",
                img: "kafka.webp",
                descripcion: "Kafka es una Stellaron Hunter conocida por su elegancia, calma y habilidad para manipular situaciones a su favor."
            },
            {
                nombre: "Acheron",
                img: "acheron.webp",
                descripcion: "Acheron es una guerrera misteriosa con gran poder, una presencia imponente y un estilo de combate letal."
            },
            {
                nombre: "Jingliu",
                img: "jingliu.webp",
                descripcion: "Jingliu es una espadachina legendaria de la Xianzhou, reconocida por su fuerza, disciplina y pasado trágico."
            },
            {
                nombre: "Dan Heng IL",
                img: "dan_heng_il.webp",
                descripcion: "Dan Heng Imbibitor Lunae representa una faceta poderosa y ancestral, ligada a su verdadera herencia."
            },
            {
                nombre: "Trailblazer",
                img: "trailblazer.webp",
                descripcion: "Trailblazer es el protagonista del viaje a bordo del Astral Express, explorando mundos y enfrentando amenazas estelares."
            }
        ];
    }

    static fetchAllFacciones() {
        return [
            {
                nombre: "Astral Express",
                img: "astral_express.webp",
                descripcion: "El Astral Express es el grupo principal de exploradores que viaja entre mundos siguiendo la ruta trazada por Akivili."
            },
            {
                nombre: "Stellaron Hunters",
                img: "stellaron_hunters.webp",
                descripcion: "Los Stellaron Hunters son una organización enigmática cuyas acciones parecen caóticas, aunque siguen un plan muy calculado."
            },
            {
                nombre: "Xianzhou Luofu",
                img: "xianzhou_luofu.webp",
                descripcion: "La Xianzhou Luofu es una de las naves de la alianza Xianzhou, con una cultura marcada por la inmortalidad y la disciplina."
            },
            {
                nombre: "Interastral Peace Corporation",
                img: "interastral_peace_corporation.webp",
                descripcion: "La Interastral Peace Corporation es una poderosa entidad económica con influencia política, tecnológica y comercial en toda la galaxia."
            }
        ];
    }
}

module.exports = PersonajeModel;