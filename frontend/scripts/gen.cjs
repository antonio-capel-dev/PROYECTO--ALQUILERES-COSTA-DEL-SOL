const fs = require("fs");
const marbella = JSON.parse(fs.readFileSync("frontend/src/data/zones-seo-marbella.json","utf8")).marbella;
const nerja = {
  intro: "Nerja es la perla de la Costa del Sol oriental, un destino que combina naturaleza salvaje, playas cristalinas y un casco historico con encanto. Famosa por el Balcon de Europa y las Cuevas de Nerja, esta localidad mantiene un caracter autentico que la distingue de los grandes destinos turisticos de la costa. Sus calas, rodeadas de acantilados y vegetacion subtropical, ofrecen una experiencia de playa unica en la provincia de Malaga.",
