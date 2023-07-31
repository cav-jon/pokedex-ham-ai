
class Pokemon{
    number;
    name;
    type;
    types = [];
    photo;   
}
//a classe agora se estende de Pokemon, para obter o nome, foto e demais tipos
class PokemonDetails extends Pokemon{
    species;
    height;
    weight;
    abilities = [];
    gender;
    egg;

}