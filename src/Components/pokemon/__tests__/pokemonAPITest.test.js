import {getPokemons,getPokemonByName} from "../apiServices/pokeAPI";

describe("PokemonRequests", () => {
    const mockGetPokemons = jest.fn(token => getPokemons(token));
    const mockGetPokemonByName = jest.fn(name => getPokemonByName(name));

    describe("get Pokemons", () => {
        it("Should contain array of 9 pokemons", async () => {
            const res = await mockGetPokemons(9);
            expect(res.length).toEqual(9);
        });
    });

    describe("filter Pokemons by name", () => {
        it("Should contain array of 1 pokemon containing pikachu", async () => {
            const res = await mockGetPokemonByName("Pikachu");
            expect(res.length).toEqual(1);
            const pikachu = res[0];
            expect(pikachu.name).toEqual("Pikachu");
            expect(pikachu.types[0]).toEqual("electric");
        });

        it("Should contain array of 0 pokemon pokemon doesn't exists", async () => {
            const res = await mockGetPokemonByName("blahblahsfg dfsgdfiog hfdighdfo");
            expect(res.length).toEqual(0);
        });

    });
});


/*
Leaving this here to make sure test works.
  // it("Should fail", () => {
        //     expect(1+1).toEqual(0);
        // })
*/